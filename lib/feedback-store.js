const fs = require("fs");
const path = require("path");

const STORE_PATH = path.join(__dirname, "..", "data", "story-feedback.json");

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function ensureStoreFile() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(
      STORE_PATH,
      JSON.stringify(
        {
          story_feedback: {},
          client_preferences: {}
        },
        null,
        2
      )
    );
  }
}

function readStore() {
  ensureStoreFile();
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  } catch (_error) {
    return {
      story_feedback: {},
      client_preferences: {}
    };
  }
}

function writeStore(store) {
  ensureStoreFile();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

function cleanTitle(title) {
  return String(title || "").replace(/\*\*/g, "").trim();
}

function storyFingerprint(story) {
  return [
    cleanTitle(story.title || ""),
    story.person_or_subject || story.event_or_subject || "",
    (story.source_urls || []).join("|")
  ]
    .join("::")
    .toLowerCase();
}

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4)
    .slice(0, 24);
}

function updatePreferenceBag(bag, tokens, delta, key) {
  tokens.forEach((token) => {
    bag[token] = bag[token] || { liked_score: 0, disliked_score: 0 };
    bag[token][key] += delta;
    if (!bag[token].liked_score && !bag[token].disliked_score) {
      delete bag[token];
    }
  });
}

function buildSupabaseUrl(endpoint, query = "") {
  return `${process.env.SUPABASE_URL}/rest/v1/${endpoint}${query}`;
}

async function supabaseRequest(endpoint, options = {}) {
  const response = await fetch(buildSupabaseUrl(endpoint, options.query || ""), {
    method: options.method || "GET",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function getFeedbackRowSupabase(fingerprint) {
  const query = `?fingerprint=eq.${encodeURIComponent(fingerprint)}&select=*`;
  const rows = await supabaseRequest("story_feedback_summary", { query });
  return rows?.[0] || null;
}

async function getPreferenceRowsSupabase(clientId) {
  const query = `?client_id=eq.${encodeURIComponent(clientId)}&select=term,liked_score,disliked_score`;
  return (await supabaseRequest("client_preference_terms", { query })) || [];
}

async function upsertPreferenceRowsSupabase(clientId, tokens, action) {
  const existingRows = await getPreferenceRowsSupabase(clientId);
  const byTerm = Object.fromEntries(existingRows.map((row) => [row.term, row]));
  const key = action === "like" ? "liked_score" : "disliked_score";

  const upserts = tokens.map((term) => {
    const current = byTerm[term] || { liked_score: 0, disliked_score: 0 };
    return {
      client_id: clientId,
      term,
      liked_score: current.liked_score + (key === "liked_score" ? 1 : 0),
      disliked_score: current.disliked_score + (key === "disliked_score" ? 1 : 0),
      updated_at: new Date().toISOString()
    };
  });

  if (!upserts.length) {
    return;
  }

  await supabaseRequest("client_preference_terms", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: upserts
  });
}

async function saveFeedbackSupabase({ clientId, section, action, story }) {
  const fingerprint = storyFingerprint(story);
  const existing = (await getFeedbackRowSupabase(fingerprint)) || {
    fingerprint,
    client_id: clientId,
    section,
    title: cleanTitle(story.title),
    subject: story.person_or_subject || story.event_or_subject || "",
    source_urls: story.source_urls || [],
    likes: 0,
    dislikes: 0
  };

  const updated = {
    ...existing,
    client_id: clientId,
    section,
    title: cleanTitle(story.title),
    subject: story.person_or_subject || story.event_or_subject || "",
    source_urls: story.source_urls || [],
    likes: Number(existing.likes || 0) + (action === "like" ? 1 : 0),
    dislikes: Number(existing.dislikes || 0) + (action === "dislike" ? 1 : 0),
    last_action: action,
    updated_at: new Date().toISOString()
  };

  const [saved] = await supabaseRequest("story_feedback_summary", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: [updated]
  });

  const tokens = tokenize(
    [
      cleanTitle(story.title),
      story.person_or_subject,
      story.event_or_subject,
      story.person_descriptor,
      story.summary,
      story.why_could_go_viral,
      story.why_it_fits,
      story.lesson
    ].join(" ")
  );

  await upsertPreferenceRowsSupabase(clientId, tokens, action);
  const client_preferences = await getClientPreferenceSummarySupabase(clientId);

  return {
    fingerprint,
    feedback: saved,
    client_preferences
  };
}

function saveFeedbackLocal({ clientId, section, action, story }) {
  const store = readStore();
  const fingerprint = storyFingerprint(story);
  const existing = store.story_feedback[fingerprint] || {
    fingerprint,
    client_id: clientId,
    section,
    title: cleanTitle(story.title),
    subject: story.person_or_subject || story.event_or_subject || "",
    source_urls: story.source_urls || [],
    likes: 0,
    dislikes: 0,
    last_action: null,
    updated_at: null
  };

  existing.likes += action === "like" ? 1 : 0;
  existing.dislikes += action === "dislike" ? 1 : 0;
  existing.last_action = action;
  existing.updated_at = new Date().toISOString();
  store.story_feedback[fingerprint] = existing;

  const clientPrefs = store.client_preferences[clientId] || {};
  const tokens = tokenize(
    [
      cleanTitle(story.title),
      story.person_or_subject,
      story.event_or_subject,
      story.person_descriptor,
      story.summary,
      story.why_could_go_viral,
      story.why_it_fits,
      story.lesson
    ].join(" ")
  );

  if (action === "like") {
    updatePreferenceBag(clientPrefs, tokens, 1, "liked_score");
  } else if (action === "dislike") {
    updatePreferenceBag(clientPrefs, tokens, 1, "disliked_score");
  }

  store.client_preferences[clientId] = clientPrefs;
  writeStore(store);

  return {
    fingerprint,
    feedback: existing,
    client_preferences: summarizePreferenceBag(clientPrefs)
  };
}

function summarizePreferenceBag(bag) {
  const entries = Object.entries(bag || {});
  const liked_terms = entries
    .sort((a, b) => (b[1].liked_score || 0) - (a[1].liked_score || 0))
    .slice(0, 8)
    .map(([term]) => term)
    .filter(Boolean);
  const disliked_terms = entries
    .sort((a, b) => (b[1].disliked_score || 0) - (a[1].disliked_score || 0))
    .slice(0, 8)
    .map(([term]) => term)
    .filter(Boolean);

  return { liked_terms, disliked_terms };
}

async function getClientPreferenceSummarySupabase(clientId) {
  const rows = await getPreferenceRowsSupabase(clientId);
  const bag = {};
  rows.forEach((row) => {
    bag[row.term] = {
      liked_score: row.liked_score || 0,
      disliked_score: row.disliked_score || 0
    };
  });
  return summarizePreferenceBag(bag);
}

function getClientPreferenceSummaryLocal(clientId) {
  const store = readStore();
  return summarizePreferenceBag(store.client_preferences[clientId] || {});
}

async function listRejectedFingerprintsSupabase(clientId, section) {
  const query = `?client_id=eq.${encodeURIComponent(clientId)}&section=eq.${encodeURIComponent(section)}&select=fingerprint,likes,dislikes`;
  const rows = (await supabaseRequest("story_feedback_summary", { query })) || [];
  return rows
    .filter((entry) => Number(entry.dislikes || 0) > Number(entry.likes || 0))
    .map((entry) => entry.fingerprint);
}

function listRejectedFingerprintsLocal(clientId, section) {
  const store = readStore();
  return Object.values(store.story_feedback)
    .filter(
      (entry) =>
        entry.client_id === clientId &&
        entry.section === section &&
        entry.dislikes > entry.likes
    )
    .map((entry) => entry.fingerprint);
}

async function saveFeedback(input) {
  if (hasSupabaseConfig()) {
    return saveFeedbackSupabase(input);
  }
  return saveFeedbackLocal(input);
}

async function getClientPreferenceSummary(clientId) {
  if (hasSupabaseConfig()) {
    return getClientPreferenceSummarySupabase(clientId);
  }
  return getClientPreferenceSummaryLocal(clientId);
}

async function listRejectedFingerprints(clientId, section) {
  if (hasSupabaseConfig()) {
    return listRejectedFingerprintsSupabase(clientId, section);
  }
  return listRejectedFingerprintsLocal(clientId, section);
}

module.exports = {
  cleanTitle,
  getClientPreferenceSummary,
  hasSupabaseConfig,
  listRejectedFingerprints,
  saveFeedback,
  storyFingerprint
};
