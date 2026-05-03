# Ingestion Setup

This project includes a Supabase-first hourly ingestion pipeline plus an hourly Vercel production cron configuration.

## Schedule

- configured Vercel schedule: `0 * * * *`
- Vercel cron timezone is always `UTC`
- this means the function runs every hour on the hour in `UTC`
- local `node server.js` also kicks off a startup ingestion run and then schedules hourly refreshes while the server is running

Production note:

- hourly Vercel cron requires a plan that supports more than daily cron
- this project is now configured for hourly production ingestion

Official Vercel docs:

- [Cron jobs](https://vercel.com/docs/cron-jobs)
- [Cron quickstart](https://vercel.com/docs/cron-jobs/quickstart)
- [Managing cron jobs and CRON_SECRET](https://vercel.com/docs/cron-jobs/manage-cron-jobs)
- [Usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing)

## Endpoint

- Vercel cron target: `/api/ingest`
- dashboard read endpoint: `/api/stories?client=zoomex`
- manual ingestion test path: `/api/ingest?client=zoomex`

## Environment variables

Set these in Vercel:

- `OPENAI_API_KEY`
- `CRON_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

`CRON_SECRET` is recommended because Vercel will automatically send it as a Bearer token when invoking the cron job.

## What the endpoint does

For each client, the ingestion function:

1. runs web search via the OpenAI Responses API
2. filters the results through client-specific angle rules and the Nas Daily Bible
3. writes curated results into Supabase when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured
4. exposes those curated stories to the dashboard through `/api/stories`

## Story Store

Production story storage uses:

- schema: [supabase-content-schema.sql](/Users/yassin/Documents/New%20project/docs/supabase-content-schema.sql)
- helper: [content-store.js](/Users/yassin/Documents/New%20project/lib/content-store.js)

Local development falls back to:

- schema: [sqlite-content-schema.sql](/Users/yassin/Documents/New%20project/docs/sqlite-content-schema.sql)
- database file: [content-pipeline.db](/Users/yassin/Documents/New%20project/data/content-pipeline.db)

The dashboard reads curated stories from the story store instead of hitting live web search on every click.

To create the story tables in Supabase:

1. Open the SQL editor in Supabase.
2. Run [supabase-content-schema.sql](/Users/yassin/Documents/New%20project/docs/supabase-content-schema.sql).
3. Redeploy or refresh the server so the content-store can initialize against Supabase.

## Likes and dislikes

Likes and dislikes still persist to Supabase when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.

To create the feedback tables in Supabase:

1. Create a Supabase project.
2. Open the SQL editor.
3. Run [supabase-feedback-schema.sql](/Users/yassin/Documents/New%20project/docs/supabase-feedback-schema.sql).

If Supabase env vars are missing, the app falls back to the local JSON store at:

- [story-feedback.json](/Users/yassin/Documents/New%20project/data/story-feedback.json)
