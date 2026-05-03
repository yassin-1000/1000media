const fs = require("fs");
const path = require("path");

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = "gpt-4.1-mini";
const CACHE_TTL_MS = 10 * 60 * 1000;
const REALTIME_MAX_AGE_DAYS = 7;
const URL_VALIDATION_TIMEOUT_MS = 6000;
const SOURCE_DATE_VALIDATION_TIMEOUT_MS = 8000;
const SOURCE_DATE_DRIFT_DAYS = 30;
const LIVE_INGEST_FALLBACK_URL =
  process.env.LIVE_INGEST_FALLBACK_URL || "https://1000media-psi.vercel.app/api/ingest";
const NAS_DAILY_BIBLE_PATH = path.join(__dirname, "..", "docs", "nas-daily-bible.md");
const { CLIENTS } = require("../lib/client-strategies");
const {
  getClientPreferenceSummary,
  listRejectedFingerprints,
  storyFingerprint
} = require("../lib/feedback-store");
const { passesClientStoryRelevance } = require("../lib/story-relevance");
const {
  createRetrievalRun,
  finishRetrievalRun,
  getContentStoreMode,
  initializeContentStore,
  upsertStoriesForClient
} = require("../lib/content-store");
const { normalizeRealtimeSignals } = require("../lib/realtime-title-format");
const { getGenericTitleReason, isBlacklistedTitle } = require("../lib/title-quality");

const responseCache = new Map();
const inFlightRequests = new Map();
let nasDailyBibleCache = null;
const DEFAULT_OUTPUT_TOKENS = 4200;
const RETRY_OUTPUT_TOKENS = 6200;

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
            "lesson",
            "urgency",
            "published_at",
            "source_urls"
          ],
          properties: {
            title: { type: "string" },
            event_or_subject: { type: "string" },
            summary: { type: "string" },
            why_it_fits: { type: "string" },
            lesson: { type: "string" },
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

function shouldUseRemoteIngestionForLocalRun() {
  return Boolean(!process.env.OPENAI_API_KEY && !process.env.VERCEL);
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

async function fetchRemoteIngestionForClient(clientId, request) {
  return fetchRemoteIngestionFallback({
    ...request,
    query: {
      ...(request.query || {}),
      client: clientId
    }
  });
}

async function buildPrompt(client) {
  const excludedFingerprints = readExcludedFingerprints();
  const nasDailyBible = loadNasDailyBible();
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
  const excluded =
    excludedFingerprints.length > 0
      ? `Do not return stories that match or closely repeat these already visible fingerprints: ${excludedFingerprints
          .slice(0, 30)
          .join(" | ")}.`
      : `There are no request-specific exclusions.`;

  return [
    `You are collecting daily sourced content signals for ${client.name}.`,
    `Search the public web for the last 24 hours only.`,
    `Do not use the client's own website as the main source of ideas.`,
    `Prefer news articles, interviews, YouTube coverage, public profiles, and reputable reporting.`,
    `Client profile: ${client.profile}`,
    `Use the following Nas Daily Bible as a mandatory editorial operating system for both story selection and story writing:`,
    nasDailyBible,
    `Use the bible to decide both which stories deserve to be shown and how every accepted story should be written, framed, and emotionally presented.`,
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
    excluded,
    `Return exactly 5 human_story_signals and exactly 5 realtime_event_signals.`,
    `Return only items with at least one source URL and a real publication timestamp if available.`,
    `For human_story_signals, write titles in a bold Nas Daily-style headline format.`,
    `Human story titles should sound like: "This guy turned X into Y", "This student did X", or "This founder built X".`,
    `Avoid markdown, quotation marks, labels, asterisks, placeholders, and generic template titles.`,
    `Do not return titles like "This student did X", "This founder built X", "This guy did X", or any title that still contains X/Y placeholders.`,
    `For human_story_signals, summaries must stay factual and sourced; do not invent details.`,
    `For why_could_go_viral, do not be vague. Explain the exact social angle, why someone would share it, or the creative hook that could make it travel.`,
    `For human_story_signals, each summary should be 4 or 5 short sentences max.`,
    `For realtime_event_signals, include not just direct industry headlines but also adjacent-world news buckets that matter to the client: policy, regulation, medical news, government changes, consumer behavior, culture, sports, entertainment, cleaning/wellness, startup news, macro shifts, and other believable piggyback moments.`,
    `Avoid over-indexing on summits, conferences, expos, roundtables, and generic industry events unless there is a concrete announcement, policy shift, human consequence, market impact, or very clear audience takeaway.`,
    `For realtime_event_signals, every item must be from today or within the last 7 days only. If it is older than 7 days, do not include it.`,
    `For realtime_event_signals, title is still the Nas Daily Title for the content idea, not the raw article headline.`,
    `But event_or_subject is now even more important: make it a clean, concrete fact anchor naming the company, country, policy, product, event, person, or number.`,
    `The first sentence of every realtime summary must plainly explain what actually happened in factual language, because the system may use that sentence to build a better final title.`,
    `Do not make event_or_subject vague. Good event_or_subject values look like: "Japan opens 1,000 funded research spots", "WHO says only 17% of Africa has essential oral care access", or "Solana co-founder warns Ethereum layer 2s are not quantum-safe".`,
    `For realtime_event_signals, the title must still sound punchy, but it must explain the actual story clearly.`,
    `Every realtime title must name the concrete subject: include the company, country, policy, product, event, person, or number in the title itself.`,
    `For realtime_event_signals, do not stop at a clean subject label. Push the title into a Nas Daily frame.`,
    `Every realtime title should do at least one of these: use a superlative, present a contradiction, ask a sharp question, or turn a small update into a big consequence.`,
    `Good patterns are: "The policy shift that could change student plans", "Why traders should care now", "The report people will feel in real life", or "The problem builders cannot ignore".`,
    `Bare labels like "Student Visa Policy Changes", "Solana Network Stability", or "Oral Health Research" are not good enough.`,
    `Do not use vague shells like "The Good News That Comes With A Warning", "The Quiet Crisis Everyone Will Notice Too Late", "The Boring Update That Could Affect Millions", or "The Smallest Deadline With The Biggest Consequences" unless the title also names the real subject and event.`,
    `Do not return low-information titles like "Oral Health Research", "Student Visa Policy Changes", "New Visa Rules 2026", or similar generic labels that could apply to many stories.`,
    `Avoid repeated generic title structures and do not return multiple titles with the same pattern in one response.`,
    `Put the actual news context in the summary, including what happened and why the team should care.`,
    `For realtime_event_signals, lesson must be one simple sentence that sounds like the ending line of a strong Nas Daily video.`,
    `The lesson should be human, memorable, written at an 8th grade level, and slightly bigger than the event itself.`,
    `Good realtime title examples: "Japan Just Opened 1,000 Funded Research Spots For Indian Scholars", "WHO Says Only 17% Of Africa Has Essential Oral Care Access", "Cardano Wants $50 Million To Build On Bitcoin", or "A New Visa Rule Could Reshape Indian Study Abroad Plans".`,
    `Source preference order: Reuters, AP, BBC, CNN, New York Times, Financial Times, Wall Street Journal, major local/national newsrooms, credible public RSS-style news sources, and relevant public X posts from verified reporters, institutions, founders, or agencies.`,
    `Do not rely mainly on the client's own site, conference agendas, event landing pages, or low-information promo pages.`,
    `Do not return URLs that appear broken, missing, or likely to lead to 404 pages.`,
    `If there are not enough perfect matches in the last 24 hours, broaden slightly while keeping the match clearly useful for the client.`,
    `If a result is weakly relevant, leave it out rather than forcing it in.`
  ].join("\n");
}

function loadNasDailyBible() {
  if (nasDailyBibleCache) {
    return nasDailyBibleCache;
  }

  try {
    nasDailyBibleCache = fs.readFileSync(NAS_DAILY_BIBLE_PATH, "utf8").trim();
  } catch (_error) {
    nasDailyBibleCache =
      "Nas Daily Bible file missing. Prioritize human-first, surprising, visual, high-tension stories and write them in a punchy, curiosity-driven way.";
  }

  return nasDailyBibleCache;
}

function readExcludedFingerprints() {
  try {
    const raw = global.__currentIngestRequest?.query?.exclude || "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((value) => String(value || "")).filter(Boolean) : [];
  } catch (_error) {
    return [];
  }
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

function extractJsonObject(text) {
  const raw = String(text || "").trim();
  if (!raw) {
    return null;
  }

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  return raw.slice(start, end + 1);
}

function parseStructuredPayload(payload, clientName) {
  if (payload?.output_parsed && typeof payload.output_parsed === "object") {
    return payload.output_parsed;
  }

  const outputText = extractStructuredText(payload) || "{}";
  const candidates = [outputText, extractJsonObject(outputText)].filter(Boolean);

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (_error) {
      // keep trying recovery candidates
    }
  }

  const reason = payload?.incomplete_details?.reason || payload?.status || "invalid_json_output";
  const sample = outputText.slice(0, 400).replace(/\s+/g, " ");
  throw new Error(
    `OpenAI returned unreadable structured output for ${clientName} (${reason}). Sample: ${sample}`
  );
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

function normalizeSourceUrls(sourceUrls) {
  const seen = new Set();
  return (sourceUrls || []).filter((value) => {
    try {
      const normalized = new URL(value).toString();
      if (seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    } catch (_error) {
      return false;
    }
  });
}

async function isLiveUrlUsable(url) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (_error) {
    return false;
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), URL_VALIDATION_TIMEOUT_MS);

  try {
    const headResponse = await fetch(parsedUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal
    });

    if ([404, 410].includes(headResponse.status)) {
      return false;
    }

    return true;
  } catch (_error) {
    return true;
  } finally {
    clearTimeout(timeout);
  }
}

function parseIsoDateCandidate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function extractSourcePublishedDateFromHtml(html) {
  const patterns = [
    /"datePublished"\s*:\s*"([^"]+)"/i,
    /property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i,
    /name=["']article:published_time["'][^>]*content=["']([^"']+)["']/i,
    /property=["']og:published_time["'][^>]*content=["']([^"']+)["']/i,
    /<time[^>]*datetime=["']([^"']+)["']/i,
    /"dateModified"\s*:\s*"([^"]+)"/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const parsed = match ? parseIsoDateCandidate(match[1]) : null;
    if (parsed) {
      return parsed;
    }
  }

  return null;
}

async function verifySourcePublishedDate(url, claimedPublishedAt) {
  if (!claimedPublishedAt) {
    return { ok: true, verifiedPublishedAt: null, reason: "no_claimed_date" };
  }

  const claimedDate = parseIsoDateCandidate(claimedPublishedAt);
  if (!claimedDate) {
    return { ok: false, verifiedPublishedAt: null, reason: "invalid_claimed_date" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SOURCE_DATE_VALIDATION_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return { ok: true, verifiedPublishedAt: claimedPublishedAt, reason: "html_unavailable" };
    }

    const html = await response.text();
    const sourceDate = extractSourcePublishedDateFromHtml(html);
    if (!sourceDate) {
      return { ok: true, verifiedPublishedAt: claimedPublishedAt, reason: "source_date_missing" };
    }

    const ageMs = Date.now() - sourceDate.getTime();
    const maxAgeMs = REALTIME_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    const driftMs = Math.abs(sourceDate.getTime() - claimedDate.getTime());
    const maxDriftMs = SOURCE_DATE_DRIFT_DAYS * 24 * 60 * 60 * 1000;

    if (ageMs > maxAgeMs) {
      return {
        ok: false,
        verifiedPublishedAt: sourceDate.toISOString(),
        reason: "source_date_too_old"
      };
    }

    if (driftMs > maxDriftMs) {
      return {
        ok: false,
        verifiedPublishedAt: sourceDate.toISOString(),
        reason: "source_date_mismatch"
      };
    }

    return {
      ok: true,
      verifiedPublishedAt: sourceDate.toISOString(),
      reason: "source_date_verified"
    };
  } catch (_error) {
    return { ok: true, verifiedPublishedAt: claimedPublishedAt, reason: "source_date_fetch_failed" };
  } finally {
    clearTimeout(timeout);
  }
}

async function sanitizeSignals(runs) {
  const sanitizeSignal = async (signal, section) => {
    const genericTitleReason = getGenericTitleReason(signal.title, section);
    if (genericTitleReason) {
      return null;
    }

    const source_urls = normalizeSourceUrls(signal.source_urls);
    if (!source_urls.length) {
      return null;
    }

    const primaryUrlIsUsable = await isLiveUrlUsable(source_urls[0]);
    if (!primaryUrlIsUsable) {
      return null;
    }

    if (section === "realtime" && !isRecentRealtimeSignal(signal)) {
      return null;
    }

    if (section === "realtime") {
      const sourceDateCheck = await verifySourcePublishedDate(source_urls[0], signal.published_at);
      if (!sourceDateCheck.ok) {
        return null;
      }

      return {
        ...signal,
        published_at: sourceDateCheck.verifiedPublishedAt || signal.published_at,
        source_urls
      };
    }

    return {
      ...signal,
      source_urls
    };
  };

  const human_story_signals = (
    await Promise.all((runs.human_story_signals || []).map((signal) => sanitizeSignal(signal, "human")))
  ).filter(Boolean);

  const realtime_event_signals = (
    await Promise.all(
      (runs.realtime_event_signals || []).map((signal) => sanitizeSignal(signal, "realtime"))
    )
  ).filter(Boolean);

  return {
    ...runs,
    human_story_signals,
    realtime_event_signals
  };
}

async function dedupeSignals(clientId, runs) {
  const humanRejected = new Set(await listRejectedFingerprints(clientId, "human"));
  const realtimeRejected = new Set(await listRejectedFingerprints(clientId, "realtime"));
  const seen = new Set();

  const filterSignals = (signals, rejected) =>
    (signals || []).filter((signal) => {
      const section = signal.event_or_subject ? "realtime" : "human";
      if (!passesClientStoryRelevance(clientId, section, signal)) {
        return false;
      }
      if (isBlacklistedTitle(signal.title, signal.event_or_subject ? "realtime" : "human")) {
        return false;
      }
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
    realtime_event_signals: normalizeRealtimeSignals(
      filterSignals(runs.realtime_event_signals, realtimeRejected).filter(isRecentRealtimeSignal)
    )
  };
}

async function fetchSignalsForClientAttempt(client, maxOutputTokens = DEFAULT_OUTPUT_TOKENS) {
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
        max_output_tokens: maxOutputTokens,
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
  return sanitizeSignals(parseStructuredPayload(payload, client.name));
}

async function fetchSignalsForClient(client) {
  try {
    return await fetchSignalsForClientAttempt(client, DEFAULT_OUTPUT_TOKENS);
  } catch (error) {
    if (!/unreadable structured output|max_output_tokens|incomplete/i.test(error.message)) {
      throw error;
    }

    return fetchSignalsForClientAttempt(client, RETRY_OUTPUT_TOKENS);
  }
}

function shouldBypassCache(request) {
  return (
    Boolean(request.query?.refresh) ||
    Boolean(request.query?.exclude) ||
    request.headers["cache-control"] === "no-cache"
  );
}

async function getSignalsForClient(client, request) {
  const cacheKey = `${client.id}::${request.query?.exclude || ""}`;
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

async function runIngestionForClients(selectedClients, request, options = {}) {
  let shouldPersist = options.persist !== false;
  const triggeredBy = options.triggeredBy || "manual";
  let retrievalRunId = null;
  let storageWarning = null;

  if (shouldPersist) {
    try {
      await initializeContentStore();
      retrievalRunId = await createRetrievalRun({
        triggeredBy,
        clientScope:
          selectedClients.length === CLIENTS.length
            ? "all"
            : selectedClients.map((client) => client.id).join(","),
        notes: "Curated web ingestion run"
      });
    } catch (error) {
      shouldPersist = false;
      storageWarning = `Persistent story storage is unavailable in this environment: ${error.message}`;
    }
  }

  try {
    const runs = [];
    const clientErrors = [];

    for (const client of selectedClients) {
      try {
        let result;

        if (shouldUseRemoteIngestionFallback(request) || shouldUseRemoteIngestionForLocalRun()) {
          const remotePayload = await fetchRemoteIngestionForClient(client.id, request);
          result = remotePayload.results?.[0] || {
            client_id: client.id,
            client_name: client.name,
            human_story_signals: [],
            realtime_event_signals: [],
            warning: remotePayload.error || "Remote ingestion returned no result"
          };
        } else {
          result = await getSignalsForClient(client, request);
        }

        const curated = await dedupeSignals(client.id, {
          ...result,
          client_id: client.id,
          client_name: client.name
        });

        if (shouldPersist) {
          await upsertStoriesForClient({
            clientId: curated.client_id,
            clientName: curated.client_name,
            section: "human",
            stories: curated.human_story_signals || [],
            retrievalRunId
          });

          await upsertStoriesForClient({
            clientId: curated.client_id,
            clientName: curated.client_name,
            section: "realtime",
            stories: curated.realtime_event_signals || [],
            retrievalRunId
          });
        }

        runs.push(curated);
      } catch (error) {
        clientErrors.push(`${client.id}: ${error.message}`);
        runs.push({
          client_id: client.id,
          client_name: client.name,
          human_story_signals: [],
          realtime_event_signals: [],
          warning: error.message
        });
      }
    }

    if (shouldPersist) {
      const successfulClients = runs.filter(
        (run) => !run.warning && ((run.human_story_signals || []).length || (run.realtime_event_signals || []).length)
      ).length;
      const status = successfulClients > 0 ? "completed" : "failed";
      const notes = clientErrors.length
        ? `Processed ${runs.length} client(s); ${successfulClients} succeeded; errors: ${clientErrors.join(" | ")}`
        : `Processed ${runs.length} client(s)`;
      await finishRetrievalRun(retrievalRunId, status, notes);
    }

    return {
      ok: true,
      ran_at: new Date().toISOString(),
      schedule_note:
        shouldPersist
          ? `This endpoint writes curated results into the ${getContentStoreMode()} story store before the dashboard reads them.`
          : "This endpoint is serving live curated results without persistent story storage in this environment.",
      storage_warning: storageWarning,
      client_errors: clientErrors,
      clients_processed: selectedClients.map((client) => client.id),
      results: runs
    };
  } catch (error) {
    if (shouldPersist) {
      await finishRetrievalRun(retrievalRunId, "failed", error.message);
    }

    throw error;
  }
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
    global.__currentIngestRequest = request;
    const payload = await runIngestionForClients(selectedClients, request, {
      persist: true,
      triggeredBy: request.query?.client ? "manual" : "cron"
    });

    return sendJson(response, 200, payload);
  } catch (error) {
    return sendJson(response, 500, {
      ok: false,
      error: error.message
    });
  } finally {
    global.__currentIngestRequest = null;
  }
};

module.exports.runIngestionForClients = runIngestionForClients;
