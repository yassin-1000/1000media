const fs = require("fs");
const path = require("path");
const { getGenericTitleReason, normalizeTitle } = require("../lib/title-quality");

const ENV_PATH = path.join(__dirname, "..", ".env.local");

function loadEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1).replace(/^"(.*)"$/, "$1");
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

if (fs.existsSync(ENV_PATH)) {
  loadEnvFile(ENV_PATH);
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}

const headers = {
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
};

async function fetchAllStories() {
  const pageSize = 1000;
  const rows = [];
  let offset = 0;

  while (true) {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/curated_stories?select=id,client_id,section,title,summary,lesson,source_domain,published_at,updated_at&order=id.asc&limit=${pageSize}&offset=${offset}`,
      { headers }
    );
    const batch = await response.json();
    rows.push(...batch);
    if (batch.length < pageSize) {
      break;
    }
    offset += pageSize;
  }

  return rows;
}

function parseDate(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.getTime() : 0;
}

function scoreRow(row) {
  const summaryLength = String(row.summary || "").trim().length;
  const lessonLength = String(row.lesson || "").trim().length;
  const titlePenalty = getGenericTitleReason(row.title, row.section) ? -1000 : 0;
  const sourcePenalty = /(reddit|u\.today|blogspot|wordpress|medium)\b/i.test(row.source_domain || "")
    ? -50
    : 0;
  const publishedScore = parseDate(row.published_at) / 1_000_000_000;
  const updatedScore = parseDate(row.updated_at) / 1_000_000_000;

  return titlePenalty + sourcePenalty + summaryLength + lessonLength + publishedScore + updatedScore;
}

function buildDuplicatePlan(rows) {
  const groups = new Map();

  for (const row of rows) {
    const normalized = normalizeTitle(row.title);
    if (!normalized) {
      continue;
    }

    const key = `${row.client_id}::${row.section}::${normalized}`;
    const list = groups.get(key) || [];
    list.push(row);
    groups.set(key, list);
  }

  const duplicateGroups = [...groups.values()].filter((group) => group.length > 1);
  const deletions = [];

  for (const group of duplicateGroups) {
    const ranked = [...group].sort((a, b) => scoreRow(b) - scoreRow(a));
    const keep = ranked[0];
    for (const row of ranked.slice(1)) {
      deletions.push({
        id: row.id,
        title: row.title,
        client_id: row.client_id,
        section: row.section,
        kept_id: keep.id
      });
    }
  }

  return { duplicateGroups, deletions };
}

async function deleteRows(ids) {
  const chunkSize = 100;
  for (let index = 0; index < ids.length; index += chunkSize) {
    const chunk = ids.slice(index, index + chunkSize);
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/curated_stories?id=in.(${chunk.join(",")})`,
      {
        method: "DELETE",
        headers: {
          ...headers,
          Prefer: "return=minimal"
        }
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed deleting duplicate rows: ${response.status} ${text}`);
    }
  }
}

async function main() {
  const apply = process.argv.includes("--apply");
  const rows = await fetchAllStories();
  const { duplicateGroups, deletions } = buildDuplicatePlan(rows);

  const summary = {
    totalRows: rows.length,
    duplicateGroups: duplicateGroups.length,
    rowsToDelete: deletions.length,
    sample: duplicateGroups.slice(0, 10).map((group) => ({
      client_id: group[0].client_id,
      section: group[0].section,
      title: group[0].title,
      count: group.length
    }))
  };

  console.log(JSON.stringify(summary, null, 2));

  if (!apply || !deletions.length) {
    return;
  }

  await deleteRows(deletions.map((row) => row.id));
  console.log(JSON.stringify({ deleted: deletions.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
