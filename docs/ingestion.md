# Daily Ingestion Setup

This project now includes a Vercel cron scaffold for daily signal ingestion.

## Schedule

- configured schedule: `0 16 * * *`
- Vercel cron timezone is always `UTC`
- this means the function runs daily at `16:00 UTC`
- that corresponds to `12:00 AM Asia/Singapore`

Official Vercel docs:

- [Cron jobs](https://vercel.com/docs/cron-jobs)
- [Cron quickstart](https://vercel.com/docs/cron-jobs/quickstart)
- [Managing cron jobs and CRON_SECRET](https://vercel.com/docs/cron-jobs/manage-cron-jobs)
- [Usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing)

## Endpoint

- Vercel cron target: `/api/ingest`
- local manual test path after deployment: `/api/ingest?client=zoomex`

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
2. looks for the last `24 hours` of human-story and real-time signals
3. filters them through client-specific angle rules
4. returns structured JSON with source URLs

## Important limitation

Likes and dislikes can now persist to Supabase when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.

To create the feedback tables in Supabase:

1. Create a Supabase project.
2. Open the SQL editor.
3. Run [supabase-feedback-schema.sql](/Users/yassin/Documents/New%20project/docs/supabase-feedback-schema.sql).

If Supabase env vars are missing, the app falls back to the local JSON store at:

- [story-feedback.json](/Users/yassin/Documents/New%20project/data/story-feedback.json)
