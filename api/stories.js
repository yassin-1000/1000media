const { CLIENTS } = require("../lib/client-strategies");
const { listRejectedFingerprints } = require("../lib/feedback-store");
const {
  getLatestRetrievalRun,
  initializeContentStore,
  listStories
} = require("../lib/content-store");
const { runIngestionForClients } = require("./ingest");

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload, null, 2));
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseExclude(raw) {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((value) => String(value || "")).filter(Boolean) : [];
  } catch (_error) {
    return [];
  }
}

async function listSectionStories(clientId, section, limit, excludeFingerprints = []) {
  const rejected = await listRejectedFingerprints(clientId, section);
  return listStories({
    clientId,
    section,
    limit,
    excludeFingerprints: [...new Set([...(excludeFingerprints || []), ...rejected])]
  });
}

async function refreshClientStories(client) {
  await runIngestionForClients(
    [client],
    {
      method: "GET",
      query: { client: client.id, refresh: String(Date.now()) },
      headers: { "cache-control": "no-cache" }
    },
    {
      persist: true,
      triggeredBy: "db_refill"
    }
  );
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    return sendJson(response, 405, { ok: false, error: "Method not allowed" });
  }

  const clientId = request.query?.client;
  const client = CLIENTS.find((entry) => entry.id === clientId);

  if (!client) {
    return sendJson(response, 404, { ok: false, error: "Unknown client id" });
  }

  const section = request.query?.section;
  if (section && !["human", "realtime"].includes(section)) {
    return sendJson(response, 400, { ok: false, error: "Unknown section" });
  }

  try {
    initializeContentStore();

    const exclude = parseExclude(request.query?.exclude);
    const humanLimit = parsePositiveInt(request.query?.human_limit, 5);
    const realtimeLimit = parsePositiveInt(request.query?.realtime_limit, 5);
    const sectionLimit = parsePositiveInt(request.query?.limit, 5);
    const wantsHuman = !section || section === "human";
    const wantsRealtime = !section || section === "realtime";

    const result = {
      client_id: client.id,
      client_name: client.name,
      human_story_signals: [],
      realtime_event_signals: [],
      warning: null,
      source_mode: "database",
      source_note: "Curated stories loaded from the local SQLite store."
    };

    if (wantsHuman) {
      result.human_story_signals = await listSectionStories(
        client.id,
        "human",
        section ? sectionLimit : humanLimit,
        exclude
      );
    }

    if (wantsRealtime) {
      result.realtime_event_signals = await listSectionStories(
        client.id,
        "realtime",
        section ? sectionLimit : realtimeLimit,
        exclude
      );
    }

    const needsRealtimeRefill =
      wantsRealtime &&
      result.realtime_event_signals.length < (section ? sectionLimit : realtimeLimit) &&
      exclude.length === 0;
    const needsHumanRefill =
      wantsHuman &&
      result.human_story_signals.length < (section ? sectionLimit : humanLimit) &&
      exclude.length === 0;

    if (needsHumanRefill || needsRealtimeRefill) {
      await refreshClientStories(client);

      if (wantsHuman) {
        result.human_story_signals = await listSectionStories(
          client.id,
          "human",
          section ? sectionLimit : humanLimit,
          exclude
        );
      }

      if (wantsRealtime) {
        result.realtime_event_signals = await listSectionStories(
          client.id,
          "realtime",
          section ? sectionLimit : realtimeLimit,
          exclude
        );
      }

      result.source_note =
        "Curated stories loaded from SQLite after topping up this client with a fresh ingestion run.";
    }

    if (!result.human_story_signals.length && !result.realtime_event_signals.length) {
      result.warning = "No curated stories are in the database yet for this client.";
    }

    return sendJson(response, 200, {
      ok: true,
      ran_at: new Date().toISOString(),
      latest_retrieval_run: getLatestRetrievalRun(client.id),
      results: [result]
    });
  } catch (error) {
    return sendJson(response, 500, {
      ok: false,
      error: error.message
    });
  }
};
