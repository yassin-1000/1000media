# 1000media Content Ideas Dashboard

This repo now includes a working browser dashboard you can run on `localhost` and deploy to `Vercel`, backed by an hourly ingestion pipeline and a local SQLite content database.

## Open the dashboard locally

From the project folder, run:

```bash
node server.js
```

Then open:

```text
http://127.0.0.1:3000
```

## What is in the app

- multi-client tabs
- human stories and time-sensitive content
- likes/dislikes with feedback persistence
- hourly ingestion into a local SQLite store
- dashboard reads curated stories from the database
- Vercel cron support for production refreshes

Main app files:

- [index.html](/Users/yassin/Documents/New%20project/index.html)
- [styles.css](/Users/yassin/Documents/New%20project/styles.css)
- [app.js](/Users/yassin/Documents/New%20project/app.js)
- [server.js](/Users/yassin/Documents/New%20project/server.js)
- [api/ingest.js](/Users/yassin/Documents/New%20project/api/ingest.js)
- [api/stories.js](/Users/yassin/Documents/New%20project/api/stories.js)
- [vercel.json](/Users/yassin/Documents/New%20project/vercel.json)
- [docs/ingestion.md](/Users/yassin/Documents/New%20project/docs/ingestion.md)

## Deploy to Vercel

This project is set up as a static site, so the easiest deployment path is:

1. Push this repo to GitHub.
2. In Vercel, click `Add New...` -> `Project`.
3. Import the GitHub repo.
4. Keep the default static settings and deploy.

Because this app is plain `HTML/CSS/JS`, you do not need a build step.

For production ingestion, add:

- `OPENAI_API_KEY`
- `CRON_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Product blueprint

The strategy and future architecture are still documented here:

- [MVP Spec](/Users/yassin/Documents/New%20project/docs/content-dashboard-mvp.md)
- [Hourly Ingestion Product System](/Users/yassin/Documents/New%20project/docs/hourly-ingestion-product-system.md)
- [Daily Ideas JSON Schema](/Users/yassin/Documents/New%20project/docs/schemas/daily-ideas.schema.json)
- [Client Intake Template](/Users/yassin/Documents/New%20project/docs/templates/client-intake-template.md)
