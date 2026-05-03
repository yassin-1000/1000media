# 1000media Handoff Bible

## Purpose

This document is the fastest way for a new owner to understand:

1. what this product is supposed to do
2. how the current system works
3. what is already built
4. what is still fragile or unfinished
5. what to work on next

Use this as the main handoff document before touching the codebase.

## Product In One Paragraph

This product is a multi-client editorial dashboard for 1000media. A user picks a client tab and gets two kinds of content ideas:

- human stories
- time-sensitive content

The core idea is that each suggestion should be sourced from the public web, filtered for relevance to that client, and then rewritten in a more Nas Daily-style editorial voice so a social team feels excited to make the content.

## The Current Client List

The current client strategy config lives in [lib/client-strategies.js](/Users/yassin/Documents/New%20project/lib/client-strategies.js).

Current clients:

- Ellie Wiesel Foundation
- Zoomex
- Solana
- LeverageEDU
- Siyata PTT
- Dentiste Toothpaste
- Africa's Business Heroes
- Interfaith

Each client has:

- a profile
- human story targets
- timely news targets
- angle guidance
- search seeds

These are used during ingestion to decide what kinds of stories to look for.

## The Editorial System

The editorial operating system lives in:

- [docs/nas-daily-bible.md](/Users/yassin/Documents/New%20project/docs/nas-daily-bible.md)

It currently controls:

- what stories are worth showing
- what kinds of titles should be preferred
- how to write summaries
- what a strong lesson sounds like
- how “Nas Daily” the output should feel

Important editorial rules already encoded:

- human-first stories are preferred
- tension, contradiction, and superlatives are preferred
- language should stay around 8th-grade level
- time-sensitive content should be from today or the last 7 days
- weak conference and summit fluff should be avoided

## System Architecture

This project is moving toward a 3-layer system:

### 1. Retrieval Layer

Main file:

- [api/ingest.js](/Users/yassin/Documents/New%20project/api/ingest.js)

What it does:

- calls the OpenAI Responses API with `web_search`
- uses client strategy rules
- uses the Nas Daily Bible
- asks for 5 human stories and 5 realtime stories
- sanitizes URLs
- filters out stale realtime items
- dedupes against disliked and already-used fingerprints

### 2. Curation Layer

Main files:

- [api/ingest.js](/Users/yassin/Documents/New%20project/api/ingest.js)
- [lib/realtime-title-format.js](/Users/yassin/Documents/New%20project/lib/realtime-title-format.js)
- [lib/feedback-store.js](/Users/yassin/Documents/New%20project/lib/feedback-store.js)

What it does:

- validates URLs
- filters old realtime stories
- rewrites weak realtime titles into more specific ones
- stores likes/dislikes
- biases future ingestion away from disliked patterns
- tries to generate clearer lessons and titles for presentation

### 3. Presentation Layer

Main files:

- [index.html](/Users/yassin/Documents/New%20project/index.html)
- [app.js](/Users/yassin/Documents/New%20project/app.js)
- [api/stories.js](/Users/yassin/Documents/New%20project/api/stories.js)

What it does:

- shows one tab per client
- renders human stories and time-sensitive content
- lets users like/dislike items
- fetches more from the database pool
- triggers targeted refill ingestion if the database is too thin for a client

## Storage

### Story Store

Primary story storage is now:

- Supabase

Schema file:

- [docs/supabase-content-schema.sql](/Users/yassin/Documents/New%20project/docs/supabase-content-schema.sql)

Main table:

- `curated_stories`

Support table:

- `retrieval_runs`

Fallback local store:

- SQLite via [lib/content-store.js](/Users/yassin/Documents/New%20project/lib/content-store.js)

Local fallback DB path:

- [data/content-pipeline.db](/Users/yassin/Documents/New%20project/data/content-pipeline.db)

### Feedback Store

Likes and dislikes are persisted through:

- [api/feedback.js](/Users/yassin/Documents/New%20project/api/feedback.js)
- [lib/feedback-store.js](/Users/yassin/Documents/New%20project/lib/feedback-store.js)

In production, feedback should live in Supabase if env vars are present.

## Local Runbook

Run locally:

```bash
cd "/Users/yassin/Documents/New project"
node server.js
```

Local app:

```text
http://127.0.0.1:3000
```

Important behavior:

- local startup kicks off an ingestion run
- local server also schedules hourly ingestion while it is running
- local can use Supabase if `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set

## Production Runbook

Main production config:

- [vercel.json](/Users/yassin/Documents/New%20project/vercel.json)

Current cron config:

- `/api/ingest`
- schedule: `0 * * * *`

Meaning:

- the app is configured to run every hour on the hour in UTC

Required production env vars:

- `OPENAI_API_KEY`
- `CRON_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## What Is Working

As of May 1, 2026:

- multi-client tabbed dashboard exists
- human stories and time-sensitive sections exist
- Supabase story store is connected
- likes/dislikes are wired
- hourly ingestion runs are being recorded in `retrieval_runs`
- ingestion no longer fully dies when a single client fails
- realtime cards now use `Nas Daily title` and `Lesson` instead of `Why it works` and `Why now`

## Current Known Problems

This project is usable, but not fully reliable yet.

### 1. Ingestion Quality Is Still Unstable

Recent hourly runs show partial success, not perfect success.

Examples of recent failure patterns:

- malformed structured JSON from the model
- fetch/network failures
- bad timestamps like `"2017"` failing Supabase timestamptz parsing

The good news:

- hourly runs now complete even when one or two clients fail
- failures are recorded in `retrieval_runs.notes`

The bad news:

- not every client refresh is clean every hour
- source quality and formatting are still inconsistent

### 2. Retrieval Is Still Too Prompt-Driven

Right now the app mostly relies on OpenAI web search with prompt guidance.

That means it is still weaker than a true source-map system with:

- explicit RSS feeds
- explicit approved domains
- explicit banned domains
- explicit X accounts
- deterministic raw-candidate storage

This is the biggest architecture gap remaining.

### 3. Some Older Stored Rows Are Low Quality

The database contains legacy rows from earlier ingestion iterations.

That means some items in the store may still have:

- vague titles
- mismatched lessons
- weak source domains
- repetitive patterns

The UI and normalization layer try to clean this up on read, but the data itself is not perfectly clean.

### 4. Raw Candidate Layer Does Not Exist Yet

The intended 3-layer architecture is not fully implemented yet.

What exists now:

- direct retrieval into curated stories

What does not exist yet:

- `raw_candidates`
- `source_feeds`
- explicit candidate scoring pipeline
- explicit client-match scoring tables

This means debugging source quality is still harder than it should be.

## Current Database Reality

The database has active content and active run history, but should be treated as a live working dataset, not a clean gold master.

Recent status summary:

- hourly runs are present and mostly marked `completed`
- some runs still include partial client errors
- content volume is large enough to power the dashboard, but quality control still needs work

Use `retrieval_runs` as the first place to inspect pipeline health.

## The Most Important Files

Start here:

- [README.md](/Users/yassin/Documents/New%20project/README.md)
- [docs/handoff-bible.md](/Users/yassin/Documents/New%20project/docs/handoff-bible.md)
- [docs/nas-daily-bible.md](/Users/yassin/Documents/New%20project/docs/nas-daily-bible.md)
- [docs/ingestion.md](/Users/yassin/Documents/New%20project/docs/ingestion.md)

Core code:

- [server.js](/Users/yassin/Documents/New%20project/server.js)
- [api/ingest.js](/Users/yassin/Documents/New%20project/api/ingest.js)
- [api/stories.js](/Users/yassin/Documents/New%20project/api/stories.js)
- [api/feedback.js](/Users/yassin/Documents/New%20project/api/feedback.js)
- [lib/content-store.js](/Users/yassin/Documents/New%20project/lib/content-store.js)
- [lib/feedback-store.js](/Users/yassin/Documents/New%20project/lib/feedback-store.js)
- [lib/realtime-title-format.js](/Users/yassin/Documents/New%20project/lib/realtime-title-format.js)
- [lib/client-strategies.js](/Users/yassin/Documents/New%20project/lib/client-strategies.js)
- [app.js](/Users/yassin/Documents/New%20project/app.js)
- [index.html](/Users/yassin/Documents/New%20project/index.html)

## What The Next Owner Should Do First

### Priority 1: Stabilize Ingestion

Goal:

- make hourly runs reliably succeed for all 8 clients

Work:

- harden structured output parsing even more
- validate and normalize timestamps before Supabase insert
- improve retry logic for transient fetch failures
- capture better logging per client

Success looks like:

- multiple consecutive hourly runs with all 8 clients succeeding

### Priority 2: Build A Real Source Map

Goal:

- reduce junk results and make source selection deterministic

Work:

- create a source config file per client
- add approved domains
- add banned URL patterns
- add RSS feeds
- add adjacent-topic-to-source mapping

Success looks like:

- fewer junk URLs
- fewer repeated weak sources
- better relevance consistency client to client

### Priority 3: Add A Raw Candidate Layer

Goal:

- separate retrieval from curation

Work:

- create `raw_candidates`
- create `source_feeds`
- store raw source items before rewriting
- score raw candidates before publishing them as curated stories

Success looks like:

- easier debugging
- inspectable source quality
- cleaner ranking and dedupe logic

### Priority 4: Clean Existing Curated Data

Goal:

- improve what users already see

Work:

- remove low-quality rows
- backfill better lessons
- re-normalize titles
- suppress bad domains

Success looks like:

- the current dashboard feed feels consistently sharper, even before future architecture improvements

## Editorial Rules For The Next Owner

Do not weaken these principles:

- human stories should feel human, not corporate
- time-sensitive content must be truly fresh
- titles should feel like content titles, not copied headlines
- every idea should help a team imagine the first frame of the video
- vague writing is failure
- conference fluff is usually failure
- the dashboard should excite creators, not just inform them

If a story is technically relevant but emotionally dead, it should usually be rejected.

## How To Judge If The Product Is Improving

The app is improving if:

- hourly runs succeed more often
- fewer stories feel generic
- fewer stories repeat
- time-sensitive items are truly fresh
- titles are sharper and more specific
- lessons feel memorable
- likes/dislikes begin to produce visibly better ranking

The app is not improving if:

- the dashboard is only getting more complicated
- the story quality stays inconsistent
- the source quality is still noisy
- users still do not trust the feed

## Final Advice To The Next Owner

Do not treat this like a generic content dashboard.

This is really an editorial engine with a dashboard UI attached to it.

The hardest part is not the frontend.
The hardest part is:

- story selection
- source control
- freshness
- dedupe
- editorial rewriting

If those pieces become strong, the product becomes valuable very quickly.
