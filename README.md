# 1000media Content Ideas Dashboard

This repo now includes a working browser dashboard you can run on `localhost` and deploy to `Vercel` as a public demo.

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

- multi-client selector
- `50/50` split between evergreen and real-time ideas
- event watch panel
- story bank search
- weekly publishing rhythm
- copy-to-clipboard brief buttons
- local approval state stored in the browser

Main app files:

- [index.html](/Users/yassin/Documents/New%20project/index.html)
- [styles.css](/Users/yassin/Documents/New%20project/styles.css)
- [app.js](/Users/yassin/Documents/New%20project/app.js)
- [server.js](/Users/yassin/Documents/New%20project/server.js)
- [vercel.json](/Users/yassin/Documents/New%20project/vercel.json)
- [docs/ingestion.md](/Users/yassin/Documents/New%20project/docs/ingestion.md)

## Deploy to Vercel

This project is set up as a static site, so the easiest deployment path is:

1. Push this repo to GitHub.
2. In Vercel, click `Add New...` -> `Project`.
3. Import the GitHub repo.
4. Keep the default static settings and deploy.

Because this app is plain `HTML/CSS/JS`, you do not need a build step.

## Product blueprint

The strategy and future architecture are still documented here:

- [MVP Spec](/Users/yassin/Documents/New%20project/docs/content-dashboard-mvp.md)
- [Daily Ideas JSON Schema](/Users/yassin/Documents/New%20project/docs/schemas/daily-ideas.schema.json)
- [Client Intake Template](/Users/yassin/Documents/New%20project/docs/templates/client-intake-template.md)
