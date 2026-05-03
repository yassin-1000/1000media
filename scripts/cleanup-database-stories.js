const fs = require("fs");
const path = require("path");
const { formatHumanStoryTitle } = require("../lib/human-title-format");
const { formatRealtimeSignalTitle } = require("../lib/realtime-title-format");
const { cleanTitle, isBlacklistedTitle, normalizeTitle } = require("../lib/title-quality");

const ENV_PATH = path.join(__dirname, "..", ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

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

loadEnvFile(ENV_PATH);

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
      `${process.env.SUPABASE_URL}/rest/v1/curated_stories?select=id,client_id,section,title,summary,person_or_subject,person_descriptor,event_or_subject,canonical_url,source_domain,published_at,updated_at,lesson,why_it_fits,why_could_go_viral&order=id.asc&limit=${pageSize}&offset=${offset}`,
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
  const sourcePenalty = /(reddit|u\.today|blogspot|wordpress|medium|wikipedia)\b/i.test(row.source_domain || "")
    ? -50
    : 0;
  const titlePenalty = isBlacklistedTitle(row.title, row.section) ? -250 : 0;
  return sourcePenalty + titlePenalty + summaryLength + lessonLength + parseDate(row.published_at) / 1_000_000_000 + parseDate(row.updated_at) / 1_000_000_000;
}

function normalizedSummary(row) {
  return String(row.summary || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
}

function storyGroupKey(row) {
  if (row.canonical_url) {
    return `${row.client_id}::${row.section}::url::${row.canonical_url}`;
  }

  return `${row.client_id}::${row.section}::summary::${normalizedSummary(row)}`;
}

function chooseBestRow(group) {
  return [...group].sort((a, b) => scoreRow(b) - scoreRow(a))[0];
}

function buildDuplicateStoryPlan(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = storyGroupKey(row);
    const list = groups.get(key) || [];
    list.push(row);
    groups.set(key, list);
  }

  const duplicateGroups = [...groups.values()].filter((group) => group.length > 1);
  const deletions = [];

  for (const group of duplicateGroups) {
    const keep = chooseBestRow(group);
    for (const row of group) {
      if (row.id !== keep.id) {
        deletions.push(row);
      }
    }
  }

  return { duplicateGroups, deletions };
}

function countTitleGroups(rows) {
  const groups = new Map();
  for (const row of rows) {
    const normalized = normalizeTitle(row.title);
    if (!normalized) {
      continue;
    }
    const list = groups.get(normalized) || [];
    list.push(row);
    groups.set(normalized, list);
  }
  return groups;
}

function uniqueWordsFromText(text) {
  return [...new Set(
    String(text || "")
      .replace(/[^A-Za-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 4)
  )];
}

function chooseAnchor(row) {
  const source = row.section === "realtime" ? row.event_or_subject : row.person_or_subject;
  const candidates = uniqueWordsFromText(source || row.summary || "");
  return candidates[0] || "";
}

function firstSentence(text) {
  const normalized = String(text || "").trim().replace(/\s+/g, " ");
  if (!normalized) {
    return "";
  }

  const match = normalized.match(/[^.!?]+/);
  return match ? match[0].trim() : normalized;
}

function shortenWords(text, maxWords = 6) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxWords)
    .join(" ");
}

function summarySuffix(row) {
  const subject = cleanTitle(row.person_or_subject || row.event_or_subject || "");
  let sentence = String(row.summary || "")
    .trim()
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .slice(0, 2)
    .join(" ");

  if (subject) {
    const escaped = subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sentence = sentence.replace(new RegExp(escaped, "ig"), "").trim();
  }

  const parts = sentence
    .split(/[.;,]| and | but /i)
    .map((part) =>
      part
        .replace(/^(despite|amid|after|before|during|following|in|according to)\s+/i, "")
        .replace(/^(a rare address to|a report on|a look at|the market correction|this move led to)\s+/i, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((part) => part && part.length >= 12);

  const ranked = parts.sort((a, b) => {
    const score = (value) => {
      let total = 0;
      if (/\$[\d,.]+/.test(value)) total += 8;
      if (/\b\d+(?:\.\d+)?%/.test(value)) total += 4;
      if (/\b(ukraine|climate|visa|oral|health|africa|bitcoin|solana|public safety|student|interfaith|peacebuilding|gains|funding|security|protesters|education)\b/i.test(value)) total += 6;
      if (/^(rare address|a 1\.|april \d|2026|2025|2024)/i.test(value)) total -= 6;
      if (value.split(/\s+/).length <= 2) total -= 3;
      total += Math.min(value.length, 60) / 20;
      return total;
    };
    const aScore = score(a);
    const bScore = score(b);
    return bScore - aScore;
  });

  const picked = ranked[0] || sentence;
  const compact = shortenWords(
    picked
      .replace(/\b(on|at|in|to|for|of)\s+\d{1,2}(?:,\s*\d{4})?/gi, "")
      .replace(/\bapril|may|june|july|august|september|october|november|december|january|february|march\b/gi, "")
      .replace(/\s+/g, " ")
      .trim(),
    6
  ).replace(/\s+/g, " ").trim();
  return compact ? sentenceCase(compact) : "";
}

function sentenceCase(text) {
  const cleaned = cleanTitle(text);
  return cleaned ? cleaned[0].toUpperCase() + cleaned.slice(1) : cleaned;
}

function makeUniqueTitle(baseTitle, row, usedTitles) {
  let title = sentenceCase(baseTitle) || cleanTitle(row.title) || "Live story";
  const anchor = chooseAnchor(row);
  const suffix = summarySuffix(row);
  const year = row.published_at ? new Date(row.published_at).getUTCFullYear() : null;

  if (isBlacklistedTitle(title, row.section)) {
    title = row.section === "realtime" ? sentenceCase(row.event_or_subject) : formatHumanStoryTitle(row);
  }

  let candidate = title;
  let index = 0;
  while (usedTitles.has(normalizeTitle(candidate)) || !candidate) {
    index += 1;
    if (index === 1 && suffix) {
      candidate = `${title}: ${suffix}`;
    } else if (index === 2 && anchor) {
      candidate = `${title}: ${anchor}`;
    } else if (index === 3 && year) {
      candidate = `${title} ${year}`;
    } else {
      candidate = `${title} ${index + 1}`;
    }
  }

  usedTitles.add(normalizeTitle(candidate));
  return candidate;
}

function rewriteTitle(row) {
  if (row.section === "realtime") {
    return formatRealtimeSignalTitle({
      title: row.title,
      event_or_subject: row.event_or_subject,
      summary: row.summary
    });
  }

  return formatHumanStoryTitle({
    title: row.title,
    person_or_subject: row.person_or_subject,
    person_descriptor: row.person_descriptor,
    summary: row.summary
  });
}

function buildRetitlePlan(rows) {
  const groups = countTitleGroups(rows);
  const updates = [];

  for (const group of groups.values()) {
    if (group.length < 2) {
      continue;
    }

    const usedTitles = new Set();
    const ranked = [...group].sort((a, b) => scoreRow(b) - scoreRow(a));

    if (!isBlacklistedTitle(ranked[0].title, ranked[0].section)) {
      usedTitles.add(normalizeTitle(ranked[0].title));
    }

    for (const [index, row] of ranked.entries()) {
      if (index === 0 && !isBlacklistedTitle(row.title, row.section)) {
        continue;
      }

      const rewritten = isBlacklistedTitle(row.title, row.section)
        ? rewriteTitle(row)
        : `${cleanTitle(row.title)}: ${summarySuffix(row) || chooseAnchor(row)}`;
      const unique = makeUniqueTitle(rewritten, row, usedTitles);
      if (cleanTitle(unique) !== cleanTitle(row.title)) {
        updates.push({ id: row.id, title: unique, oldTitle: row.title, client_id: row.client_id, section: row.section });
      }
    }
  }

  return updates;
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
      throw new Error(`Failed deleting duplicate stories: ${response.status} ${text}`);
    }
  }
}

async function updateTitle(row) {
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/curated_stories?id=eq.${row.id}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ title: row.title, updated_at: new Date().toISOString() })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed updating title for row ${row.id}: ${response.status} ${text}`);
  }
}

async function main() {
  const apply = process.argv.includes("--apply");
  const rows = await fetchAllStories();

  const duplicatePlan = buildDuplicateStoryPlan(rows);
  const remainingRows = rows.filter((row) => !duplicatePlan.deletions.find((entry) => entry.id === row.id));
  const retitlePlan = buildRetitlePlan(remainingRows);

  console.log(JSON.stringify({
    totalRows: rows.length,
    duplicateStoryGroups: duplicatePlan.duplicateGroups.length,
    rowsToDelete: duplicatePlan.deletions.length,
    titleGroupsToRewrite: new Set(retitlePlan.map((row) => normalizeTitle(row.oldTitle))).size,
    rowsToRetitle: retitlePlan.length,
    sampleRetitles: retitlePlan.slice(0, 20)
  }, null, 2));

  if (!apply) {
    return;
  }

  if (duplicatePlan.deletions.length) {
    await deleteRows(duplicatePlan.deletions.map((row) => row.id));
  }

  for (const row of retitlePlan) {
    await updateTitle(row);
  }

  console.log(JSON.stringify({
    deleted: duplicatePlan.deletions.length,
    retitled: retitlePlan.length
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
