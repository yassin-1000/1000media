const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-4.1-mini";
const {
  getClientPreferenceSummary,
  listRejectedFingerprints,
  storyFingerprint
} = require("../lib/feedback-store");

const CLIENTS = [
  {
    id: "elie-wiesel-foundation",
    name: "Elie Wiesel Foundation",
    profile:
      "Mission-led organization focused on memory, ethics, human dignity, education, resilience, and moral courage.",
    angleGuidance: [
      "Prioritize stories about courage, remembrance, education, intergenerational memory, and human dignity.",
      "Reject celebrity gossip, shallow trend-jacking, and irrelevant finance or entertainment stories.",
      "Be especially careful with sensitive, political, or religious material."
    ],
    searchSeeds: [
      "human courage story last 24 hours",
      "education resilience story last 24 hours",
      "survivor memory history education last 24 hours",
      "intergenerational remembrance story last 24 hours"
    ]
  },
  {
    id: "zoomex",
    name: "Zoomex",
    profile:
      "Crypto trading brand that should react to money, risk, trader psychology, sudden wins or losses, security, and fast-changing market behavior.",
    angleGuidance: [
      "Prioritize stories about sudden wealth, trading lessons, financial psychology, crypto security, and risk.",
      "Human stories can include lottery winners, people dealing with sudden money, or emotional stories around speculation.",
      "Avoid stories with weak financial relevance."
    ],
    searchSeeds: [
      "lottery winner story last 24 hours",
      "crypto trader story last 24 hours",
      "sudden wealth story last 24 hours",
      "market psychology story last 24 hours"
    ]
  },
  {
    id: "solana",
    name: "Solana",
    profile:
      "Blockchain ecosystem brand centered on builders, founders, hackathons, creator tools, developers, and people shipping products in public.",
    angleGuidance: [
      "Prioritize builders, founders, launch stories, developer wins, hackathons, and creator technology stories.",
      "Prefer people-centered technology stories over generic finance news.",
      "Avoid low-signal speculation unless there is a strong builder or community angle."
    ],
    searchSeeds: [
      "startup founder story last 24 hours",
      "developer launch story last 24 hours",
      "hackathon winner story last 24 hours",
      "young builder story last 24 hours"
    ]
  },
  {
    id: "leverageedu",
    name: "LeverageEDU",
    profile:
      "India-based edtech startup focused on study abroad, student transformation, admissions journeys, scholarships, and career mobility.",
    angleGuidance: [
      "Prioritize student success, scholarships, admissions wins, career transformation, global mobility, and first-generation achievement stories.",
      "Prefer India-relevant and student-relevant stories when possible.",
      "Include competitor moves, university policy changes, visa shifts, scholarship launches, and big global events that the brand can intelligently piggyback on.",
      "Avoid generic edtech funding stories unless there is a strong human outcome angle."
    ],
    searchSeeds: [
      "student success story last 24 hours India",
      "scholarship winner story last 24 hours",
      "study abroad success story last 24 hours",
      "first generation student achievement last 24 hours",
      "study abroad competitor update last 24 hours",
      "student visa policy change last 24 hours",
      "global cultural event brand angle last 24 hours"
    ]
  }
];

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
        minItems: 3,
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

async function buildPrompt(client) {
  const seeds = client.searchSeeds.map((seed) => `- ${seed}`).join("\n");
  const guidance = client.angleGuidance.map((line) => `- ${line}`).join("\n");
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
    `Use these seed directions as starting points, but expand beyond them if better results appear:`,
    seeds,
    `Fit rules:`,
    guidance,
    liked,
    disliked,
    `Return exactly 5 human_story_signals and 3 to 5 realtime_event_signals.`,
    `Return only items with at least one source URL and a real publication timestamp if available.`,
    `For human_story_signals, write titles in a bold Nas Daily-style headline format.`,
    `Human story titles should sound like: "This guy turned X into Y", "This student did X", or "This founder built X".`,
    `Avoid markdown, quotation marks, labels, and asterisks in titles.`,
    `For human_story_signals, summaries must stay factual and sourced; do not invent details.`,
    `For why_could_go_viral, do not be vague. Explain the exact social angle, why someone would share it, or the creative hook that could make it travel.`,
    `For human_story_signals, each summary should be 4 or 5 short sentences max.`,
    `For realtime_event_signals, include not just industry headlines but also competitor moves, policy updates, cultural moments, sports, entertainment, and big global conversations the client could piggyback on if there is a believable content angle.`,
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
    realtime_event_signals: filterSignals(runs.realtime_event_signals, realtimeRejected)
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
    const runs = [];
    for (const client of selectedClients) {
      const result = await fetchSignalsForClient(client);
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
