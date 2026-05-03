# Hourly Ingestion Product System

## Goal

Build the dashboard as a 3-layer system that:

- fetches fresh stories every hour
- stores them in a shared database
- curates and scores them before the team sees them
- makes the dashboard fast because the UI reads from stored results instead of waiting on live web search

This is the recommended architecture for reliability, speed, and quality control.

## Recommended Database

Use Supabase/Postgres in production and keep SQLite only as a local fallback:

- production: shared, persistent, Vercel-compatible
- local fallback: `data/content-pipeline.db`
- easy to inspect during development

## System Overview

### 1. Retrieval Layer

Purpose:
- pull raw candidate stories from the internet every hour

Sources:
- explicit RSS feeds
- trusted domains
- selected X accounts
- Google News-style web search queries
- optional YouTube/news video sources later

Output:
- raw candidate items stored in the database

### 2. Curation Layer

Purpose:
- clean, dedupe, classify, and score the raw candidate items

Tasks:
- remove stale content
- remove broken URLs
- remove junk pages
- classify by client
- score for relevance
- score for Nas Daily fit
- rewrite accepted items into dashboard-ready cards

Output:
- curated, dashboard-ready stories stored in the database

### 3. Presentation Layer

Purpose:
- show precomputed results instantly in the dashboard

Rules:
- dashboard reads only from the database
- `Fetch more` loads more from the database pool
- `Dislike` replaces from the database pool
- optional admin button triggers a fresh ingestion run manually

## Why This Is Better Than Live Search On Click

### Old system

- user clicks a tab
- app searches live
- app waits
- source quality is inconsistent
- results can repeat
- broken pages can sneak in

### New system

- background ingestion runs every hour
- raw stories are cleaned and scored first
- dashboard loads instantly
- fetch more is deterministic
- bad sources are filtered before the user sees them

## Hourly Schedule

Recommended schedule:

- every hour on the hour

Examples:

- `00:00`
- `01:00`
- `02:00`
- etc.

If using a cron job:

- run `0 * * * *`

## Local Database Tables

### `source_feeds`

Stores the places we ingest from.

Suggested fields:

- `id`
- `kind` (`rss`, `domain`, `x_account`, `search_query`)
- `client_id` nullable
- `label`
- `url_or_query`
- `priority`
- `active`
- `created_at`
- `updated_at`

### `retrieval_runs`

Stores each ingestion run.

Suggested fields:

- `id`
- `started_at`
- `finished_at`
- `status`
- `triggered_by` (`cron`, `manual`)
- `notes`

### `raw_candidates`

Stores raw fetched items before curation.

Suggested fields:

- `id`
- `retrieval_run_id`
- `source_feed_id`
- `source_type`
- `source_domain`
- `canonical_url`
- `title`
- `published_at`
- `author`
- `raw_text`
- `raw_summary`
- `metadata_json`
- `url_status`
- `content_hash`
- `created_at`

### `candidate_client_matches`

Stores how a raw item maps to one or more clients.

Suggested fields:

- `id`
- `raw_candidate_id`
- `client_id`
- `match_score`
- `match_reason`
- `adjacent_topic`
- `created_at`

### `curated_stories`

Stores final dashboard-ready stories.

Suggested fields:

- `id`
- `client_id`
- `section` (`human`, `realtime`)
- `story_fingerprint`
- `canonical_url`
- `source_domain`
- `published_at`
- `event_or_subject`
- `person_or_subject`
- `person_descriptor`
- `nas_title`
- `summary`
- `why_it_fits`
- `why_could_go_viral`
- `lesson`
- `urgency`
- `nas_score`
- `relevance_score`
- `freshness_score`
- `status` (`ready`, `hidden`, `rejected`, `used`)
- `created_at`
- `updated_at`

### `story_feedback`

Stores likes and dislikes from users.

Suggested fields:

- `id`
- `curated_story_id`
- `client_id`
- `action` (`like`, `dislike`)
- `created_at`

### `story_replacements`

Optional table to track what replaced what.

Suggested fields:

- `id`
- `rejected_story_id`
- `replacement_story_id`
- `created_at`

## Retrieval Layer Design

### Inputs

Each client should have:

- trusted domains
- RSS feeds
- selected search queries
- selected X accounts
- adjacent topics

### Retrieval process

For each hourly run:

1. load active source feeds
2. pull latest items from RSS
3. run web search queries on trusted domains
4. pull recent public posts from selected X accounts if available
5. normalize URLs and titles
6. insert raw items into `raw_candidates`

### Retrieval rules

- prefer recent content only
- normalize canonical URLs
- reject duplicate URLs immediately
- keep raw text for later classification
- store source metadata for debugging

## Curation Layer Design

### Stage 1: Cleaning

Remove:

- 404 pages
- 410 pages
- archive pages
- tag pages
- category pages
- search result pages
- homepages
- empty pages
- PR fluff
- conference agendas
- event landing pages without a real story

### Stage 2: Freshness Filter

For `realtime`:

- keep today first
- then last 7 days
- reject older items

For `human`:

- allow a wider freshness range if still relevant

### Stage 3: Deduplication

Deduplicate by:

- canonical URL
- normalized title
- content hash
- semantic near-duplicate score

### Stage 4: Client Classification

For each raw candidate:

- match it to one or more clients
- use adjacent-topic rules
- use client source map
- use keyword and semantic scoring

Examples:

- `Dentiste` can match oral health, wellness, cleaning, sleep, Thai consumer products
- `LeverageEDU` can match visa changes, scholarships, government policy, India startup news
- `Siyata PTT` can match first responders, emergency management, telecom resilience, public safety

### Stage 5: Nas Daily Fit Scoring

Score each candidate on:

- human clarity
- surprise
- contradiction
- superlative potential
- visual potential
- broad relatability
- urgency
- simplicity

Suggested score outputs:

- `nas_score`
- `relevance_score`
- `freshness_score`

### Stage 6: Rewrite

For accepted items:

- rewrite title in Nas Daily style
- rewrite summary at 8th-grade level
- generate why-it-fits
- generate why-it-could-go-viral
- generate lesson

Save the result in `curated_stories`.

## Presentation Layer Design

### Dashboard rules

The dashboard should:

- query `curated_stories`
- never call live web search directly during normal browsing
- show only `status = ready`

### Default loading behavior

When user opens a client:

- load top `5` human stories
- load top `5` realtime stories

Order by:

1. freshness
2. relevance
3. nas score
4. feedback-adjusted quality

### Fetch More

When user clicks `Fetch more stories`:

- load the next page from `curated_stories`
- do not call OpenAI live
- do not show duplicates already visible

### Dislike

When user clicks `Dislike`:

1. save dislike in `story_feedback`
2. mark current story as lower-ranked or hidden for that session
3. replace it with the next best story from the same client/section pool

### Like

When user clicks `Like`:

1. save like in `story_feedback`
2. boost similar items over time

### Admin refresh

Optional button:

- `Run fresh ingestion now`

This should:

- trigger a manual retrieval run
- trigger curation
- update the local DB
- refresh the dashboard after completion

## Source Map Design

Create a real source map file later, for example:

- `lib/source-map.js`

For each client define:

- `preferred_domains`
- `preferred_rss_feeds`
- `preferred_x_accounts`
- `search_queries`
- `adjacent_topics`
- `blocked_domains`
- `blocked_url_patterns`

This becomes the control plane for ingestion quality.

## Suggested API Shape

### Admin / ingestion

- `POST /api/admin/run-ingestion`
- `GET /api/admin/ingestion-status`

### Dashboard

- `GET /api/stories?client=leverageedu&section=human&limit=5&offset=0`
- `GET /api/stories?client=leverageedu&section=realtime&limit=5&offset=0`
- `POST /api/feedback`

### Replacement

- `POST /api/stories/replace`

Input:

- `client_id`
- `section`
- `story_id`

Output:

- next best replacement from DB

## Recommended Build Order

### Phase 1

- add SQLite database
- add tables
- move dashboard reads to DB

### Phase 2

- build source map
- build hourly retrieval job
- store raw candidates

### Phase 3

- build curation pipeline
- add dedupe
- add URL validation
- add Nas Daily scoring and rewrite

### Phase 4

- replace live fetch-more with DB pagination
- replace dislike replacement with DB replacement
- add admin refresh button

## Final Product Rule

The dashboard should feel like:

- a fast editorial desk
- not a live search box

That means:

- retrieval is background work
- curation is a pipeline
- presentation is instant
