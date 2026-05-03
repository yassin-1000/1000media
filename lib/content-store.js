const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  getSupabaseConfigIssue,
  hasSupabaseConfig,
  storyFingerprint
} = require("./feedback-store");
const {
  ensureUniqueRealtimeTitles,
  formatRealtimeSignalLesson,
  formatRealtimeSignalTitle
} = require("./realtime-title-format");

const DB_PATH = path.join(__dirname, "..", "data", "content-pipeline.db");
const SNAPSHOT_PATH = path.join(__dirname, "..", "data", "real-ingestion-snapshot.json");
const SQLITE_SCHEMA_PATH = path.join(__dirname, "..", "docs", "sqlite-content-schema.sql");

let initializationPromise = null;

function getContentStoreMode() {
  return hasSupabaseConfig() ? "supabase" : "sqlite";
}

function isSupabaseStore() {
  return getContentStoreMode() === "supabase";
}

function ensureSqliteDbDirectory() {
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

function sqliteRunSql(sql, options = {}) {
  ensureSqliteDbDirectory();
  const args = [];
  if (options.json) {
    args.push("-json");
  }
  args.push(DB_PATH, sql);
  return execFileSync("sqlite3", args, { encoding: "utf8" });
}

function sqliteReadRows(sql) {
  const output = sqliteRunSql(sql, { json: true }).trim();
  return output ? JSON.parse(output) : [];
}

function sqliteReadCount(sql) {
  const [{ count = 0 } = {}] = sqliteReadRows(sql);
  return Number(count || 0);
}

function sqliteInitializeContentStore() {
  ensureSqliteDbDirectory();
  const schema = fs.readFileSync(SQLITE_SCHEMA_PATH, "utf8");
  sqliteRunSql(schema);
  sqliteSeedFromSnapshotIfEmpty();
}

function sqliteSeedFromSnapshotIfEmpty() {
  if (sqliteReadCount("select count(*) as count from curated_stories;") > 0 || !fs.existsSync(SNAPSHOT_PATH)) {
    return;
  }

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
  const runId = sqliteCreateRetrievalRun({
    triggeredBy: "snapshot_seed",
    clientScope: "all",
    notes: "Initial seed from real-ingestion-snapshot.json"
  });

  (snapshot.results || []).forEach((clientResult) => {
    sqliteUpsertStoriesForClient({
      clientId: clientResult.client_id,
      clientName: clientResult.client_name,
      section: "human",
      stories: clientResult.human_story_signals || [],
      retrievalRunId: runId
    });

    sqliteUpsertStoriesForClient({
      clientId: clientResult.client_id,
      clientName: clientResult.client_name,
      section: "realtime",
      stories: clientResult.realtime_event_signals || [],
      retrievalRunId: runId
    });
  });

  sqliteFinishRetrievalRun(runId, "completed", "Snapshot seed completed");
}

function sqliteCreateRetrievalRun({ triggeredBy = "system", clientScope = "all", notes = "" } = {}) {
  sqliteRunSql(`
    insert into retrieval_runs (triggered_by, client_scope, status, notes)
    values (${sqlValue(triggeredBy)}, ${sqlValue(clientScope)}, 'running', ${sqlValue(notes)});
  `);

  const [{ id } = {}] = sqliteReadRows("select max(id) as id from retrieval_runs;");
  return id;
}

function sqliteFinishRetrievalRun(runId, status = "completed", notes = "") {
  if (!runId) {
    return;
  }

  sqliteRunSql(`
    update retrieval_runs
    set status = ${sqlValue(status)},
        notes = ${sqlValue(notes)},
        finished_at = datetime('now')
    where id = ${sqlValue(runId)};
  `);
}

function sourceDomain(story) {
  const firstUrl = story.source_urls?.[0] || story.canonical_url;
  if (!firstUrl) {
    return null;
  }

  try {
    return new URL(firstUrl).hostname.replace(/^www\./, "");
  } catch (_error) {
    return null;
  }
}

function normalizeSourceUrlsValue(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (_error) {
      return [];
    }
  }

  return [];
}

function curatedStoryRowFromStory({ clientId, clientName, section, story, retrievalRunId }) {
  return {
    story_fingerprint: storyFingerprint(story),
    client_id: clientId,
    client_name: clientName,
    section,
    canonical_url: story.source_urls?.[0] || story.canonical_url || null,
    source_domain: sourceDomain(story),
    title: story.title,
    person_or_subject: story.person_or_subject || null,
    person_descriptor: story.person_descriptor || null,
    event_or_subject: story.event_or_subject || null,
    summary: story.summary || "",
    why_it_fits: story.why_it_fits || null,
    why_could_go_viral: story.why_could_go_viral || null,
    lesson: story.lesson || null,
    urgency: story.urgency || null,
    platform_hint: story.platform_hint || null,
    published_at: story.published_at || null,
    source_urls_json: story.source_urls || [],
    retrieval_run_id: retrievalRunId || null,
    status: story.status || "ready",
    updated_at: story.updated_at || new Date().toISOString()
  };
}

function dedupeCuratedStoryRows(rows) {
  const byFingerprint = new Map();

  for (const row of rows || []) {
    if (!row?.story_fingerprint) {
      continue;
    }

    byFingerprint.set(row.story_fingerprint, row);
  }

  return [...byFingerprint.values()];
}

function normalizeCuratedStoryRow(row) {
  const signal = {
    title: row.title,
    event_or_subject: row.event_or_subject,
    summary: row.summary,
    why_it_fits: row.why_it_fits,
    lesson: row.lesson
  };

  return {
    id: row.id,
    title: row.section === "realtime" ? formatRealtimeSignalTitle(signal) : row.title,
    person_or_subject: row.person_or_subject,
    person_descriptor: row.person_descriptor,
    event_or_subject: row.event_or_subject,
    summary: row.summary,
    why_it_fits: row.why_it_fits,
    why_could_go_viral: row.why_could_go_viral,
    lesson: row.section === "realtime" ? formatRealtimeSignalLesson(signal) : row.lesson,
    urgency: row.urgency,
    platform_hint: row.platform_hint,
    published_at: row.published_at,
    source_urls: normalizeSourceUrlsValue(row.source_urls_json),
    fingerprint: row.story_fingerprint
  };
}

function sqliteUpsertStoriesForClient({ clientId, clientName, section, stories, retrievalRunId }) {
  (stories || []).forEach((story) => {
    const row = curatedStoryRowFromStory({
      clientId,
      clientName,
      section,
      story,
      retrievalRunId
    });
    const sourceUrlsJson = JSON.stringify(row.source_urls_json || []);

    sqliteRunSql(`
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
        ${sqlValue(row.story_fingerprint)},
        ${sqlValue(row.client_id)},
        ${sqlValue(row.client_name)},
        ${sqlValue(row.section)},
        ${sqlValue(row.canonical_url)},
        ${sqlValue(row.source_domain)},
        ${sqlValue(row.title)},
        ${sqlValue(row.person_or_subject)},
        ${sqlValue(row.person_descriptor)},
        ${sqlValue(row.event_or_subject)},
        ${sqlValue(row.summary)},
        ${sqlValue(row.why_it_fits)},
        ${sqlValue(row.why_could_go_viral)},
        ${sqlValue(row.lesson)},
        ${sqlValue(row.urgency)},
        ${sqlValue(row.platform_hint)},
        ${sqlValue(row.published_at)},
        ${sqlValue(sourceUrlsJson)},
        ${sqlValue(row.retrieval_run_id)},
        ${sqlValue(row.status)},
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
        status = excluded.status,
        updated_at = datetime('now');
    `);
  });
}

function sqliteListStories({ clientId, section, limit = 5, offset = 0, excludeFingerprints = [] }) {
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

  const rows = sqliteReadRows(`
    select *
    from curated_stories
    where ${where.join(" and ")}
    order by datetime(updated_at) desc, datetime(coalesce(published_at, created_at)) desc
    limit ${Math.max(1, Number(limit) || 5)}
    offset ${Math.max(0, Number(offset) || 0)};
  `);

  const normalized = rows.map(normalizeCuratedStoryRow);
  return section === "realtime" ? ensureUniqueRealtimeTitles(normalized) : normalized;
}

function sqliteGetLatestRetrievalRun(clientId = null) {
  const where = clientId ? `where client_scope = ${sqlValue(clientId)} or client_scope = 'all'` : "";
  const [row] = sqliteReadRows(`
    select id, triggered_by, client_scope, status, notes, started_at, finished_at
    from retrieval_runs
    ${where}
    order by id desc
    limit 1;
  `);

  return row || null;
}

function sqliteReadAllRetrievalRuns() {
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }

  try {
    return sqliteReadRows(`
      select id, triggered_by, client_scope, status, notes, started_at, finished_at
      from retrieval_runs
      order by id asc;
    `);
  } catch (_error) {
    return [];
  }
}

function sqliteReadAllCuratedStories() {
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }

  try {
    return sqliteReadRows(`
      select *
      from curated_stories
      order by id asc;
    `);
  } catch (_error) {
    return [];
  }
}

function buildSupabaseUrl(endpoint, params) {
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/${endpoint}`);
  if (params) {
    for (const [key, value] of params.entries()) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
}

async function supabaseRequest(endpoint, options = {}) {
  if (!hasSupabaseConfig()) {
    throw new Error(getSupabaseConfigIssue() || "Supabase is not configured");
  }

  const response = await fetch(buildSupabaseUrl(endpoint, options.params), {
    method: options.method || "GET",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      ...(options.method && options.method !== "GET" && options.method !== "HEAD"
        ? { Prefer: options.prefer || "return=representation" }
        : {}),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase story store request failed: ${response.status} ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function chunkArray(items, chunkSize = 50) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

async function verifySupabaseStoryTables() {
  try {
    const curatedParams = new URLSearchParams();
    curatedParams.set("select", "id");
    curatedParams.set("limit", "1");
    await supabaseRequest("curated_stories", { params: curatedParams });

    const runParams = new URLSearchParams();
    runParams.set("select", "id");
    runParams.set("limit", "1");
    await supabaseRequest("retrieval_runs", { params: runParams });
  } catch (error) {
    throw new Error(
      `Supabase story tables are not ready. Run docs/supabase-content-schema.sql in the Supabase SQL editor. ${error.message}`
    );
  }
}

async function supabaseHasCuratedStories() {
  const params = new URLSearchParams();
  params.set("select", "id");
  params.set("limit", "1");
  const rows = await supabaseRequest("curated_stories", { params });
  return Array.isArray(rows) && rows.length > 0;
}

async function supabaseInsertRetrievalRun(run) {
  const [row] = await supabaseRequest("retrieval_runs", {
    method: "POST",
    body: [
      {
        triggered_by: run.triggered_by || run.triggeredBy || "system",
        client_scope: run.client_scope || run.clientScope || "all",
        status: run.status || "running",
        notes: run.notes || "",
        started_at: run.started_at || run.startedAt || new Date().toISOString(),
        finished_at: run.finished_at || run.finishedAt || null
      }
    ]
  });

  return row?.id || null;
}

async function importLocalSqliteIntoSupabaseIfAvailable() {
  if (!fs.existsSync(DB_PATH)) {
    return false;
  }

  const localStories = sqliteReadAllCuratedStories();
  if (!localStories.length) {
    return false;
  }

  const runIdMap = new Map();
  const localRuns = sqliteReadAllRetrievalRuns();
  for (const run of localRuns) {
    const newId = await supabaseInsertRetrievalRun(run);
    runIdMap.set(run.id, newId);
  }

  const rows = dedupeCuratedStoryRows(localStories.map((row) => ({
    story_fingerprint: row.story_fingerprint,
    client_id: row.client_id,
    client_name: row.client_name,
    section: row.section,
    canonical_url: row.canonical_url,
    source_domain: row.source_domain,
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
    source_urls_json: normalizeSourceUrlsValue(row.source_urls_json),
    retrieval_run_id: runIdMap.get(row.retrieval_run_id) || null,
    status: row.status || "ready",
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString()
  })));

  const params = new URLSearchParams();
  params.set("on_conflict", "story_fingerprint");

  for (const chunk of chunkArray(rows, 40)) {
    await supabaseRequest("curated_stories", {
      method: "POST",
      params,
      prefer: "resolution=merge-duplicates,return=representation",
      body: chunk
    });
  }

  return true;
}

async function seedSupabaseFromSnapshotIfEmpty() {
  if (!fs.existsSync(SNAPSHOT_PATH)) {
    return false;
  }

  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
  const runId = await supabaseInsertRetrievalRun({
    triggered_by: "snapshot_seed",
    client_scope: "all",
    status: "running",
    notes: "Initial seed from real-ingestion-snapshot.json"
  });

  try {
    for (const clientResult of snapshot.results || []) {
      await supabaseUpsertStoriesForClient({
        clientId: clientResult.client_id,
        clientName: clientResult.client_name,
        section: "human",
        stories: clientResult.human_story_signals || [],
        retrievalRunId: runId
      });

      await supabaseUpsertStoriesForClient({
        clientId: clientResult.client_id,
        clientName: clientResult.client_name,
        section: "realtime",
        stories: clientResult.realtime_event_signals || [],
        retrievalRunId: runId
      });
    }

    await supabaseFinishRetrievalRun(runId, "completed", "Snapshot seed completed");
    return true;
  } catch (error) {
    await supabaseFinishRetrievalRun(runId, "failed", error.message);
    throw error;
  }
}

async function initializeSupabaseContentStore() {
  await verifySupabaseStoryTables();

  if (await supabaseHasCuratedStories()) {
    return;
  }

  if (await importLocalSqliteIntoSupabaseIfAvailable()) {
    return;
  }

  await seedSupabaseFromSnapshotIfEmpty();
}

async function initializeContentStore() {
  if (!isSupabaseStore()) {
    sqliteInitializeContentStore();
    return;
  }

  if (!initializationPromise) {
    initializationPromise = initializeSupabaseContentStore().catch((error) => {
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
}

async function supabaseCreateRetrievalRun({ triggeredBy = "system", clientScope = "all", notes = "" } = {}) {
  return supabaseInsertRetrievalRun({
    triggered_by: triggeredBy,
    client_scope: clientScope,
    status: "running",
    notes
  });
}

async function supabaseFinishRetrievalRun(runId, status = "completed", notes = "") {
  if (!runId) {
    return;
  }

  const params = new URLSearchParams();
  params.set("id", `eq.${runId}`);
  await supabaseRequest("retrieval_runs", {
    method: "PATCH",
    params,
    body: {
      status,
      notes,
      finished_at: new Date().toISOString()
    }
  });
}

async function supabaseUpsertStoriesForClient({ clientId, clientName, section, stories, retrievalRunId }) {
  const rows = dedupeCuratedStoryRows((stories || []).map((story) =>
    curatedStoryRowFromStory({
      clientId,
      clientName,
      section,
      story,
      retrievalRunId
    })
  ));

  if (!rows.length) {
    return;
  }

  const params = new URLSearchParams();
  params.set("on_conflict", "story_fingerprint");

  for (const chunk of chunkArray(rows, 40)) {
    await supabaseRequest("curated_stories", {
      method: "POST",
      params,
      prefer: "resolution=merge-duplicates,return=representation",
      body: chunk
    });
  }
}

async function supabaseListStories({ clientId, section, limit = 5, offset = 0, excludeFingerprints = [] }) {
  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("client_id", `eq.${clientId}`);
  params.set("section", `eq.${section}`);
  params.set("status", "eq.ready");
  params.set("order", "updated_at.desc,published_at.desc.nullslast");
  params.set("limit", String(Math.max(25, limit + excludeFingerprints.length + offset + 10)));
  if (offset) {
    params.set("offset", String(offset));
  }
  if (section === "realtime") {
    params.set("published_at", `gte.${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`);
  }

  const rows = await supabaseRequest("curated_stories", { params });
  const excluded = new Set(excludeFingerprints || []);

  const normalized = (rows || [])
    .map(normalizeCuratedStoryRow)
    .filter((row) => !excluded.has(row.fingerprint))
    .slice(0, limit);

  return section === "realtime" ? ensureUniqueRealtimeTitles(normalized) : normalized;
}

async function supabaseGetLatestRetrievalRun(clientId = null) {
  const params = new URLSearchParams();
  params.set("select", "id,triggered_by,client_scope,status,notes,started_at,finished_at");
  params.set("order", "id.desc");
  params.set("limit", "1");
  if (clientId) {
    params.set("or", `(client_scope.eq.${clientId},client_scope.eq.all)`);
  }

  const [row] = (await supabaseRequest("retrieval_runs", { params })) || [];
  return row || null;
}

async function createRetrievalRun(options) {
  if (isSupabaseStore()) {
    return supabaseCreateRetrievalRun(options);
  }

  return sqliteCreateRetrievalRun(options);
}

async function finishRetrievalRun(runId, status, notes) {
  if (isSupabaseStore()) {
    return supabaseFinishRetrievalRun(runId, status, notes);
  }

  return sqliteFinishRetrievalRun(runId, status, notes);
}

async function upsertStoriesForClient(input) {
  if (isSupabaseStore()) {
    return supabaseUpsertStoriesForClient(input);
  }

  return sqliteUpsertStoriesForClient(input);
}

async function listStories(input) {
  if (isSupabaseStore()) {
    return supabaseListStories(input);
  }

  return sqliteListStories(input);
}

async function getLatestRetrievalRun(clientId = null) {
  if (isSupabaseStore()) {
    return supabaseGetLatestRetrievalRun(clientId);
  }

  return sqliteGetLatestRetrievalRun(clientId);
}

module.exports = {
  createRetrievalRun,
  finishRetrievalRun,
  getContentStoreMode,
  getLatestRetrievalRun,
  initializeContentStore,
  listStories,
  upsertStoriesForClient
};
