const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { storyFingerprint } = require("./feedback-store");

const DB_PATH = path.join(__dirname, "..", "data", "content-pipeline.db");
const SNAPSHOT_PATH = path.join(__dirname, "..", "data", "real-ingestion-snapshot.json");
const SCHEMA_PATH = path.join(__dirname, "..", "docs", "sqlite-content-schema.sql");

function ensureDbDirectory() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sqlValue(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "NULL";
  }

  return `'${String(value).replace(/'/g, "''")}'`;
}

function runSql(sql, options = {}) {
  ensureDbDirectory();
  const args = [];
  if (options.json) {
    args.push("-json");
  }
  args.push(DB_PATH, sql);
  return execFileSync("sqlite3", args, { encoding: "utf8" });
}

function initializeContentStore() {
  ensureDbDirectory();
  const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
  runSql(schema);
  seedFromSnapshotIfEmpty();
}

function seedFromSnapshotIfEmpty() {
  const [{ count = 0 } = {}] = readRows("select count(*) as count from curated_stories;");
  if (Number(count) > 0 || !fs.existsSync(SNAPSHOT_PATH)) {
    return;
  }

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
  const runId = createRetrievalRun({
    triggeredBy: "snapshot_seed",
    clientScope: "all",
    notes: "Initial seed from real-ingestion-snapshot.json"
  });

  (snapshot.results || []).forEach((clientResult) => {
    upsertStoriesForClient({
      clientId: clientResult.client_id,
      clientName: clientResult.client_name,
      section: "human",
      stories: clientResult.human_story_signals || [],
      retrievalRunId: runId
    });

    upsertStoriesForClient({
      clientId: clientResult.client_id,
      clientName: clientResult.client_name,
      section: "realtime",
      stories: clientResult.realtime_event_signals || [],
      retrievalRunId: runId
    });
  });

  finishRetrievalRun(runId, "completed", "Snapshot seed completed");
}

function readRows(sql) {
  const output = runSql(sql, { json: true }).trim();
  return output ? JSON.parse(output) : [];
}

function createRetrievalRun({ triggeredBy = "system", clientScope = "all", notes = "" } = {}) {
  runSql(`
    insert into retrieval_runs (triggered_by, client_scope, status, notes)
    values (${sqlValue(triggeredBy)}, ${sqlValue(clientScope)}, 'running', ${sqlValue(notes)});
  `);

  const [{ id } = {}] = readRows("select max(id) as id from retrieval_runs;");
  return id;
}

function finishRetrievalRun(runId, status = "completed", notes = "") {
  if (!runId) {
    return;
  }

  runSql(`
    update retrieval_runs
    set status = ${sqlValue(status)},
        notes = ${sqlValue(notes)},
        finished_at = datetime('now')
    where id = ${sqlValue(runId)};
  `);
}

function sourceDomain(story) {
  const firstUrl = story.source_urls?.[0];
  if (!firstUrl) {
    return null;
  }

  try {
    return new URL(firstUrl).hostname.replace(/^www\./, "");
  } catch (_error) {
    return null;
  }
}

function upsertStoriesForClient({ clientId, clientName, section, stories, retrievalRunId }) {
  (stories || []).forEach((story) => {
    const fingerprint = storyFingerprint(story);
    const sourceUrlsJson = JSON.stringify(story.source_urls || []);
    const canonicalUrl = story.source_urls?.[0] || null;
    const domain = sourceDomain(story);

    runSql(`
      insert into curated_stories (
        story_fingerprint,
        client_id,
        client_name,
        section,
        canonical_url,
        source_domain,
        title,
        person_or_subject,
        person_descriptor,
        event_or_subject,
        summary,
        why_it_fits,
        why_could_go_viral,
        lesson,
        urgency,
        platform_hint,
        published_at,
        source_urls_json,
        retrieval_run_id,
        status,
        updated_at
      ) values (
        ${sqlValue(fingerprint)},
        ${sqlValue(clientId)},
        ${sqlValue(clientName)},
        ${sqlValue(section)},
        ${sqlValue(canonicalUrl)},
        ${sqlValue(domain)},
        ${sqlValue(story.title)},
        ${sqlValue(story.person_or_subject || null)},
        ${sqlValue(story.person_descriptor || null)},
        ${sqlValue(story.event_or_subject || null)},
        ${sqlValue(story.summary || "")},
        ${sqlValue(story.why_it_fits || null)},
        ${sqlValue(story.why_could_go_viral || null)},
        ${sqlValue(story.lesson || null)},
        ${sqlValue(story.urgency || null)},
        ${sqlValue(story.platform_hint || null)},
        ${sqlValue(story.published_at || null)},
        ${sqlValue(sourceUrlsJson)},
        ${sqlValue(retrievalRunId || null)},
        'ready',
        datetime('now')
      )
      on conflict(story_fingerprint) do update set
        client_id = excluded.client_id,
        client_name = excluded.client_name,
        section = excluded.section,
        canonical_url = excluded.canonical_url,
        source_domain = excluded.source_domain,
        title = excluded.title,
        person_or_subject = excluded.person_or_subject,
        person_descriptor = excluded.person_descriptor,
        event_or_subject = excluded.event_or_subject,
        summary = excluded.summary,
        why_it_fits = excluded.why_it_fits,
        why_could_go_viral = excluded.why_could_go_viral,
        lesson = excluded.lesson,
        urgency = excluded.urgency,
        platform_hint = excluded.platform_hint,
        published_at = excluded.published_at,
        source_urls_json = excluded.source_urls_json,
        retrieval_run_id = excluded.retrieval_run_id,
        status = 'ready',
        updated_at = datetime('now');
    `);
  });
}

function listStories({ clientId, section, limit = 5, offset = 0, excludeFingerprints = [] }) {
  const where = [
    `client_id = ${sqlValue(clientId)}`,
    `section = ${sqlValue(section)}`,
    `status = 'ready'`
  ];

  if (section === "realtime") {
    where.push(`datetime(coalesce(published_at, created_at)) >= datetime('now', '-7 days')`);
  }

  if (excludeFingerprints.length) {
    where.push(
      `story_fingerprint not in (${excludeFingerprints.map((value) => sqlValue(value)).join(", ")})`
    );
  }

  const rows = readRows(`
    select *
    from curated_stories
    where ${where.join(" and ")}
    order by datetime(coalesce(published_at, created_at)) desc, updated_at desc
    limit ${Math.max(1, Number(limit) || 5)}
    offset ${Math.max(0, Number(offset) || 0)};
  `);

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    person_or_subject: row.person_or_subject,
    person_descriptor: row.person_descriptor,
    event_or_subject: row.event_or_subject,
    summary: row.summary,
    why_it_fits: row.why_it_fits,
    why_could_go_viral: row.why_could_go_viral,
    lesson: row.lesson,
    urgency: row.urgency,
    platform_hint: row.platform_hint,
    published_at: row.published_at,
    source_urls: JSON.parse(row.source_urls_json || "[]"),
    fingerprint: row.story_fingerprint
  }));
}

function getLatestRetrievalRun(clientId = null) {
  const where = clientId ? `where client_scope = ${sqlValue(clientId)} or client_scope = 'all'` : "";
  const [row] = readRows(`
    select id, triggered_by, client_scope, status, notes, started_at, finished_at
    from retrieval_runs
    ${where}
    order by id desc
    limit 1;
  `);

  return row || null;
}

module.exports = {
  createRetrievalRun,
  finishRetrievalRun,
  getLatestRetrievalRun,
  initializeContentStore,
  listStories,
  upsertStoriesForClient
};
