const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-4.1-mini";
const CACHE_TTL_MS = 10 * 60 * 1000;
const REALTIME_MAX_AGE_DAYS = 7;
const LIVE_INGEST_FALLBACK_URL =
  process.env.LIVE_INGEST_FALLBACK_URL || "https://1000media-psi.vercel.app/api/ingest";
const { CLIENTS } = require("../lib/client-strategies");
const {
  getClientPreferenceSummary,
  listRejectedFingerprints,
  storyFingerprint
} = require("../lib/feedback-store");

const responseCache = new Map();
const inFlightRequests = new Map();

const SIGNAL_SCHEMA = {
  name: "daily_ingestion_result",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["client_id", "client_name", "human_story_signals", "realtime_event_signals"],
    properties: {
      client_id: { type: "string" },
      client_name: { type: "string" },
      human_story_signals: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "title",
            "person_or_subject",
            "person_descriptor",
            "summary",
            "why_could_go_viral",
            "lesson",
            "platform_hint",
            "published_at",
            "source_urls"
          ],
          properties: {
            title: { type: "string" },
            person_or_subject: { type: "string" },
            person_descriptor: { type: "string" },
            summary: { type: "string" },
            why_could_go_viral: { type: "string" },
            lesson: { type: "string" },
            platform_hint: { type: "string" },
            published_at: { type: "string" },
            source_urls: {
              type: "array",
              minItems: 1,
              maxItems: 4,
              items: { type: "string" }
            }
          }
        }
      },
      realtime_event_signals: {
        type: "array",
        minItems: 5,
        maxItems: 5,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "title",
            "event_or_subject",
            "summary",
            "why_it_fits",
            "urgency",
            "published_at",
            "source_urls"
          ],
          properties: {
            title: { type: "string" },
            event_or_subject: { type: "string" },
            summary: { type: "string" },
            why_it_fits: { type: "string" },
            urgency: { type: "string" },
            published_at: { type: "string" },
            source_urls: {
              type: "array",
              minItems: 1,
              maxItems: 4,
              items: { type: "string" }
            }
          }
        }
      }
    }
  }
};

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload, null, 2));
}

function isAuthorized(request) {
  if (request.query?.client) {
    return true;
  }

  if (!process.env.CRON_SECRET) {
    return true;
  }

  return request.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
}

function shouldUseRemoteIngestionFallback(request) {
  return Boolean(!process.env.OPENAI_API_KEY && !process.env.VERCEL && request.query?.client);
}

async function fetchRemoteIngestionFallback(request) {
  const url = new URL(LIVE_INGEST_FALLBACK_URL);
  Object.entries(request.query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || "Remote live ingestion failed");
  }

  return {
    ...payload,
    source_mode: "remote-live",
    source_note:
      "Local OPENAI_API_KEY is not set, so localhost used the live Vercel ingestion endpoint."
  };
}

async function buildPrompt(client) {
  const seeds = client.searchSeeds.map((seed) => `- ${seed}`).join("\n");
  const guidance = client.angleGuidance.map((line) => `- ${line}`).join("\n");
  const humanStoryTargets = client.humanStoryTargets.map((target) => `- ${target}`).join("\n");
  const timelyNewsTargets = client.timelyNewsTargets.map((target) => `- ${target}`).join("\n");
  const preferences = await getClientPreferenceSummary(client.id);
  const liked = preferences.liked_terms.length
    ? `Positive historical feedback for this client: ${preferences.liked_terms.join(", ")}.`
    : `There is no historical positive feedback yet for this client.`;
  const disliked = preferences.disliked_terms.length
    ? `Avoid patterns historically disliked by this client: ${preferences.disliked_terms.join(", ")}.`
    : `There is no historical negative feedback yet for this client.`;

  return [
    `You are collecting daily sourced content signals for ${client.name}.`,
    `Search the public web for the last 24 hours only.`,
    `Do not use the client's own website as the main source of ideas.`,
    `Prefer news articles, interviews, YouTube coverage, public profiles, and reputable reporting.`,
    `Client profile: ${client.profile}`,
    `Human story targets for this client. Use these to decide what kinds of people and personal stories are relevant:`,
    humanStoryTargets,
    `Time-sensitive news targets for this client. Use these to decide what global timely news, competitor updates, cultural moments, and industry stories are relevant:`,
    timelyNewsTargets,
    `Use these seed directions as starting points, but expand beyond them if better results appear:`,
    seeds,
    `Fit rules:`,
    guidance,
    liked,
    disliked,
    `Return exactly 5 human_story_signals and exactly 5 realtime_event_signals.`,
    `Return only items with at least one source URL and a real publication timestamp if available.`,
    `For human_story_signals, write titles in a bold Nas Daily-style headline format.`,
    `Human story titles should sound like: "This guy turned X into Y", "This student did X", or "This founder built X".`,
    `Avoid markdown, quotation marks, labels, and asterisks in titles.`,
    `For human_story_signals, summaries must stay factual and sourced; do not invent details.`,
    `For why_could_go_viral, do not be vague. Explain the exact social angle, why someone would share it, or the creative hook that could make it travel.`,
    `For human_story_signals, each summary should be 4 or 5 short sentences max.`,
    `For realtime_event_signals, include not just direct industry headlines but also adjacent-world news buckets that matter to the client: policy, regulation, medical news, government changes, consumer behavior, culture, sports, entertainment, cleaning/wellness, startup news, macro shifts, and other believable piggyback moments.`,
    `Avoid over-indexing on summits, conferences, expos, roundtables, and generic industry events unless there is a concrete announcement, policy shift, human consequence, market impact, or very clear audience takeaway.`,
    `For realtime_event_signals, every item must be from today or within the last 7 days only. If it is older than 7 days, do not include it.`,
    `For realtime_event_signals, the title must be the suggested Nas Daily-style post title, not a dry news headline.`,
    `Every realtime title must be highly varied and curiosity-driven. Use superlatives, contradiction, oxymoron, surprising stakes, or a counterintuitive framing.`,
    `Avoid repeated generic title structures like "This X could become the next big story".`,
    `Put the actual news context in the summary, including what happened and why the team should care.`,
    `Realtime titles should sound like: "The Boring Update That Could Affect Millions", "The Good News That Comes With A Warning", "The Smallest Deadline With The Biggest Consequences", or "The Quiet Crisis Everyone Will Notice Too Late".`,
    `Source preference order: Reuters, AP, BBC, CNN, New York Times, Financial Times, Wall Street Journal, major local/national newsrooms, credible public RSS-style news sources, and relevant public X posts from verified reporters, institutions, founders, or agencies.`,
    `Do not rely mainly on the client's own site, conference agendas, event landing pages, or low-information promo pages.`,
    `If there are not enough perfect matches in the last 24 hours, broaden slightly while keeping the match clearly useful for the client.`,
    `If a result is weakly relevant, leave it out rather than forcing it in.`
  ].join("\n");
}

function extractStructuredText(payload) {
  if (payload.output_text && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  for (const item of payload.output || []) {
    if (item.type !== "message") {
      continue;
    }

    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text?.trim()) {
        return content.text.trim();
      }
    }
  }

  return null;
}

function isRecentRealtimeSignal(signal) {
  const publishedAt = signal?.published_at;
  if (!publishedAt) {
    return false;
  }

  const publishedDate = new Date(publishedAt);
  if (Number.isNaN(publishedDate.getTime())) {
    return false;
  }

  const maxAgeMs = REALTIME_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - publishedDate.getTime() <= maxAgeMs;
}

async function dedupeSignals(clientId, runs) {
  const humanRejected = new Set(await listRejectedFingerprints(clientId, "human"));
  const realtimeRejected = new Set(await listRejectedFingerprints(clientId, "realtime"));
  const seen = new Set();

  const filterSignals = (signals, rejected) =>
    (signals || []).filter((signal) => {
      const fingerprint = storyFingerprint(signal);
      if (rejected.has(fingerprint) || seen.has(fingerprint)) {
        return false;
      }
      seen.add(fingerprint);
      return true;
    });

  return {
    ...runs,
    human_story_signals: filterSignals(runs.human_story_signals, humanRejected),
    realtime_event_signals: filterSignals(runs.realtime_event_signals, realtimeRejected).filter(
      isRecentRealtimeSignal
    )
  };
}

async function fetchSignalsForClient(client) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      client_id: client.id,
      client_name: client.name,
      human_story_signals: [],
      realtime_event_signals: [],
      warning: "OPENAI_API_KEY is not set"
    };
  }

  const prompt = await buildPrompt(client);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  let response;
  try {
    response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        tools: [
          {
            type: "web_search",
            user_location: {
              type: "approximate",
              timezone: "Asia/Singapore"
            }
          }
        ],
        tool_choice: "required",
        max_output_tokens: 2200,
        text: {
          format: {
            type: "json_schema",
            ...SIGNAL_SCHEMA
          }
        },
        input: prompt
      }),
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`OpenAI ingestion timed out for ${client.name} after 45 seconds`);
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI ingestion failed for ${client.name}: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const outputText = extractStructuredText(payload) || "{}";
  return JSON.parse(outputText);
}

function shouldBypassCache(request) {
  return Boolean(request.query?.refresh) || request.headers["cache-control"] === "no-cache";
}

async function getSignalsForClient(client, request) {
  const cacheKey = client.id;
  const cached = responseCache.get(cacheKey);

  if (!shouldBypassCache(request) && cached && Date.now() - cached.createdAt < CACHE_TTL_MS) {
    return cached.value;
  }

  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const requestPromise = fetchSignalsForClient(client)
    .then((result) => {
      responseCache.set(cacheKey, {
        createdAt: Date.now(),
        value: result
      });
      return result;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    return sendJson(response, 405, { ok: false, error: "Method not allowed" });
  }

  if (!isAuthorized(request)) {
    return sendJson(response, 401, { ok: false, error: "Unauthorized" });
  }

  const clientId = request.query?.client;
  const selectedClients = clientId
    ? CLIENTS.filter((client) => client.id === clientId)
    : CLIENTS;

  if (!selectedClients.length) {
    return sendJson(response, 404, { ok: false, error: "Unknown client id" });
  }

  try {
    if (shouldUseRemoteIngestionFallback(request)) {
      return sendJson(response, 200, await fetchRemoteIngestionFallback(request));
    }

    const runs = [];
    for (const client of selectedClients) {
      const result = await getSignalsForClient(client, request);
      runs.push(await dedupeSignals(client.id, result));
    }

    return sendJson(response, 200, {
      ok: true,
      ran_at: new Date().toISOString(),
      schedule_note:
        "This endpoint is designed for Vercel Cron. Persist the results into a database before wiring the dashboard to live ingestion.",
      clients_processed: selectedClients.map((client) => client.id),
      results: runs
    });
  } catch (error) {
    return sendJson(response, 500, {
      ok: false,
      error: error.message
    });
  }
};
