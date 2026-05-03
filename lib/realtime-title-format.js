function cleanStoryTitle(title) {
  return String(title || "").replace(/\*\*/g, "").trim();
}

function cleanLessonText(text) {
  return String(text || "")
    .replace(/^lesson:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenWords(text, maxWords = 14) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

function capitalizeFirst(text) {
  const value = String(text || "").trim();
  return value ? value[0].toUpperCase() + value.slice(1) : "";
}

function meaningfulTitleTokens(text) {
  return [...new Set(
    String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(
        (token) =>
          token &&
          (token.length >= 4 || /\d/.test(token)) &&
          ![
            "this",
            "that",
            "with",
            "from",
            "into",
            "will",
            "could",
            "should",
            "would",
            "story",
            "news",
            "update",
            "change",
            "changes",
            "warning",
            "deadline",
            "quiet",
            "smallest",
            "biggest",
            "everyone",
            "nobody",
            "about",
            "after",
            "before",
            "scholarship",
            "event",
            "policy",
            "report",
            "week",
            "award"
          ].includes(token)
      )
  )];
}

function titleMatchesSubject(title, subject) {
  const titleTokens = meaningfulTitleTokens(title);
  const subjectTokens = meaningfulTitleTokens(subject);

  if (!titleTokens.length || !subjectTokens.length) {
    return false;
  }

  return subjectTokens.some((token) => titleTokens.includes(token));
}

function isGenericRealtimeTitle(title) {
  const normalized = cleanStoryTitle(title).toLowerCase();
  if (!normalized) {
    return true;
  }

  return [
    /^the good news that comes with a warning$/,
    /^the smallest deadline with the biggest consequences$/,
    /^the quiet crisis everyone will notice too late$/,
    /^the boring update that could affect millions$/,
    /^the quiet change that could affect everyone$/,
    /^the weird news everyone will understand too late$/,
    /^the most urgent story nobody is talking about$/,
    /^the smallest update with the biggest consequences$/,
    /^the tiny deadline that could become a huge story$/,
    /^the global moment hidden inside\b/,
    /^this .+ could become the next big story$/,
    /^the .+ story nobody is talking about$/
  ].some((pattern) => pattern.test(normalized));
}

function hasNasDailyShape(title) {
  const normalized = cleanStoryTitle(title);
  if (!normalized) {
    return false;
  }

  return (
    /^(How|Why|What)\b/.test(normalized) ||
    /\b(biggest|smallest|first|last|only|fastest|most|least|highest|lowest)\b/i.test(normalized) ||
    /\b(but|despite|still|yet)\b/i.test(normalized) ||
    /\b(could|changed|opened|launched|warns|warning|crisis|deadline|problem|risk)\b/i.test(normalized)
  );
}

function clipToSentence(text) {
  const normalized = String(text || "").trim().replace(/\s+/g, " ");
  if (!normalized) {
    return "";
  }

  const match = normalized.match(/[^.!?]+/);
  return match ? match[0].trim() : normalized;
}

function stripSourceArtifacts(text) {
  return String(text || "")
    .replace(/\(\[[^\]]+\]\([^)]+\)\)/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .replace(/\([^)]*utm_source=openai[^)]*\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tightenRealtimeTitle(text, maxWords = 14) {
  const cleaned = cleanStoryTitle(text).replace(/[.,;:!?]+$/, "").trim();
  if (!cleaned) {
    return "";
  }

  const shortened = shortenWords(cleaned, maxWords) || cleaned;
  return shortened
    .replace(/[.,;:!?]+$/, "")
    .replace(/\b(and|or|with|for|from|into|recognizing|highlighting|including|about)$/i, "")
    .trim();
}

function preferredSubjectAnchor(subject) {
  const rawTokens = cleanStoryTitle(subject)
    .split(/\s+/)
    .map((token) => token.replace(/[^A-Za-z0-9]/g, ""))
    .filter(Boolean);

  const uppercaseOrNumeric = rawTokens.find(
    (token) => /\d/.test(token) || /^[A-Z0-9]{2,}$/.test(token) || /^[A-Z][a-zA-Z0-9]+$/.test(token)
  );

  if (uppercaseOrNumeric) {
    return uppercaseOrNumeric.toLowerCase();
  }

  const tokens = meaningfulTitleTokens(subject);
  return tokens[0] || "";
}

function removeLeadingSubject(text, subject) {
  const cleanedText = String(text || "").trim();
  const cleanedSubject = cleanStoryTitle(subject);

  if (!cleanedText || !cleanedSubject) {
    return cleanedText;
  }

  const escapedSubject = cleanedSubject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const subjectPattern = new RegExp(`^${escapedSubject}(?:,\\s*[^,]+,?)?\\s*`, "i");
  return cleanedText.replace(subjectPattern, "").trim();
}

function extractLeadFact(signal) {
  return stripSourceArtifacts(clipToSentence(signal.summary || ""))
    .split(/,\s+(?=[a-z])/)[0]
    .replace(/[.]+$/, "")
    .trim();
}

function extractActionClause(signal) {
  const leadFact = extractLeadFact(signal);
  let clause = removeLeadingSubject(leadFact, signal.event_or_subject || "")
    .replace(/^(an?|the)\s+/i, "")
    .replace(/^(this|that)\s+/i, "")
    .replace(/^(is|are|was|were|has|have|had)\s+/i, "")
    .replace(/,\s*(raising|highlighting|showing|creating|making|leading to|turning)\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clause) {
    clause = leadFact;
  }

  return shortenWords(
    clause
      .replace(/[.]+$/, "")
      .replace(/\b(users|people|students|traders)\s+that\b/gi, "$1 who")
      .trim(),
    12
  );
}

function inferRealtimeMode(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`.toLowerCase();

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(context)) return "policy";
  if (/\boutage|offline|bug|exploit|hack|breach|security|risk|warning|warns\b/.test(context)) return "risk";
  if (/\bscholarship|funding|grant|admission|research spot|application|opens|launches\b/.test(context)) return "opportunity";
  if (/\bwho|report|survey|study|research|data\b/.test(context)) return "report";
  if (/\bbitcoin|solana|crypto|market|token|defi|wallet|trader|liquidation\b/.test(context)) return "market";
  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(context)) return "safety";
  if (/\bstartup|founder|funding|accelerator|investment\b/.test(context)) return "business";
  return "general";
}

function extractRegion(text) {
  const value = `${text || ""}`;
  const knownRegions = [
    "Africa",
    "India",
    "Japan",
    "Europe",
    "Asia",
    "America",
    "China",
    "Canada",
    "Australia",
    "Israel"
  ];

  for (const region of knownRegions) {
    if (new RegExp(`\\b${region}\\b`, "i").test(value)) {
      return region;
    }
  }

  return "";
}

function inferHumanGroup(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`;

  if (/\bindian scholars?\b/i.test(context)) return "Indian Scholars";
  if (/\bindian students?\b/i.test(context)) return "Indian Students";
  if (/\bstudents?\b/i.test(context)) return "Students";
  if (/\btraders?\b/i.test(context)) return "Traders";
  if (/\bfounders?\b/i.test(context)) return "Founders";
  if (/\bbuilders?\b/i.test(context)) return "Builders";
  if (/\bpatients?\b/i.test(context)) return "Patients";
  if (/\bfamil(?:y|ies)\b/i.test(context)) return "Families";
  if (/\bresponders?\b/i.test(context)) return "First Responders";
  return "People";
}

function universalNeedPhrase(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`.toLowerCase();
  const region = extractRegion(context) || "the world";

  if (/\boral|tooth|toothpaste|dental\b/.test(context)) {
    return `Why ${region} needs more toothpaste`;
  }

  if (/\bvisa|student|scholarship|admission|university\b/.test(context)) {
    return `Why ${region} needs more student options`;
  }

  if (/\bpublic safety|dispatch|emergency|rescue\b/.test(context)) {
    return `Why every emergency needs better communication`;
  }

  return "";
}

function universalWhyTitle(signal) {
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`;
  const mode = inferRealtimeMode(signal);
  const region = extractRegion(context);
  const group = inferHumanGroup(signal);
  const subject = cleanStoryTitle(tightenRealtimeTitle(signal.event_or_subject || "", 12));

  if (mode === "opportunity" && region && /\bscholar|student|research\b/i.test(context)) {
    return `Why ${region} loves ${group}`;
  }

  if (mode === "report") {
    const need = universalNeedPhrase(signal);
    if (need) {
      return need;
    }
  }

  if (mode === "policy" && /\bvisa|student\b/i.test(context)) {
    return `Why student visas keep changing lives`;
  }

  if (mode === "market" && /\bborrow|limit|defi|liquidation|token\b/i.test(context)) {
    return `Why traders always want bigger bets`;
  }

  if (mode === "risk" && /\bsolana\b/i.test(context)) {
    return "Why Solana keeps testing its believers";
  }

  if (mode === "risk" && subject) {
    return `Why ${subject} matters more than it looks`;
  }

  if (mode === "business" && /\bstartup|founder|funding\b/i.test(context)) {
    return "Why the next big winners need bigger doors";
  }

  return "";
}

function candidateFromLeadFact(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const normalizedSubject = cleanStoryTitle(subject);
  const leadFact = extractLeadFact(signal);

  if (!leadFact) {
    return "";
  }

  if (!normalizedSubject) {
    return capitalizeFirst(leadFact);
  }

  const withoutSubject = removeLeadingSubject(leadFact, normalizedSubject);
  if (withoutSubject && withoutSubject !== leadFact) {
    return `${normalizedSubject} ${withoutSubject}`.replace(/\s+/g, " ").trim();
  }

  return capitalizeFirst(leadFact);
}

function isShortActionClause(actionClause) {
  const words = String(actionClause || "").split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8;
}

function startsWithProperNounPhrase(text) {
  const firstWord = String(text || "").trim().split(/\s+/)[0] || "";
  return /^[A-Z][a-zA-Z0-9'-]+$/.test(firstWord);
}

function buildRealtimeTitleCandidates(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const normalizedSubject = cleanStoryTitle(subject);
  const actionClause = extractActionClause(signal);
  const leadFact = extractLeadFact(signal);
  const mode = inferRealtimeMode(signal);
  const candidates = new Set();
  const universalTitle = universalWhyTitle(signal);

  if (universalTitle) {
    candidates.add(universalTitle);
  }

  if (leadFact) {
    candidates.add(candidateFromLeadFact(signal));
    candidates.add(shortenWords(candidateFromLeadFact(signal), 12));
  }

  if (normalizedSubject) {
    candidates.add(normalizedSubject);
  }

  if (normalizedSubject && actionClause && isShortActionClause(actionClause)) {
    candidates.add(`${normalizedSubject} ${actionClause}`);
  }

  if (normalizedSubject && actionClause && isShortActionClause(actionClause) && !startsWithProperNounPhrase(actionClause)) {
    candidates.add(`Why ${normalizedSubject} ${actionClause}`);
    candidates.add(`How ${normalizedSubject} ${actionClause}`);
  }

  if (normalizedSubject) {
    if (mode === "policy") {
      candidates.add(`How ${normalizedSubject} could change student plans`);
      candidates.add(`${normalizedSubject} could change where students apply`);
    } else if (mode === "risk") {
      candidates.add(`Why ${normalizedSubject} could become a bigger problem`);
      candidates.add(`${normalizedSubject} just raised a bigger question`);
    } else if (mode === "opportunity") {
      candidates.add(`How ${normalizedSubject} could open a new door`);
      candidates.add(`${normalizedSubject} just opened a new door`);
    } else if (mode === "report") {
      candidates.add(`What ${normalizedSubject} says about real life`);
      candidates.add(`${normalizedSubject} just made this problem feel real`);
    } else if (mode === "market") {
      candidates.add(`Why ${normalizedSubject} could move traders now`);
      candidates.add(`${normalizedSubject} could hit traders faster than expected`);
    } else if (mode === "safety") {
      candidates.add(`Why ${normalizedSubject} could save critical seconds`);
      candidates.add(`${normalizedSubject} could matter when every second counts`);
    } else if (mode === "business") {
      candidates.add(`Why ${normalizedSubject} could shape who wins next`);
      candidates.add(`${normalizedSubject} could change the next startup wave`);
    } else {
      candidates.add(`Why ${normalizedSubject} matters right now`);
    }
  }

  return [...candidates]
    .map((candidate) => cleanStoryTitle(candidate).replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function scoreRealtimeTitleCandidate(title, signal) {
  const normalized = cleanStoryTitle(title);
  const mode = inferRealtimeMode(signal);
  const tokenCount = normalized.split(/\s+/).filter(Boolean).length;
  let score = 0;

  if (!normalized) {
    return -Infinity;
  }

  score += Math.min(meaningfulTitleTokens(normalized).length, 8);
  if (/^(How|Why|What)\b/.test(normalized)) score += 2;
  if (/\d/.test(normalized)) score += 2;
  if (titleMatchesSubject(normalized, signal.event_or_subject || "")) score += 3;
  if (hasNasDailyShape(normalized)) score += 2;
  if (tokenCount <= 13) score += 1;
  if (/\b(opened|opens|raised|raises|warned|warns|says|opened|launches|cuts|cut|wins|funded)\b/i.test(normalized)) score += 2;

  if (/\bmatters right now\b/i.test(normalized)) score -= 3;
  if (/\bcould\b/i.test(normalized) && !/\d/.test(normalized)) score -= 1;
  if (/\bthing|stuff|story|update\b/i.test(normalized)) score -= 3;
  if (tokenCount > 14) score -= 4;

  if (mode === "risk" && /\bproblem|warning|offline|risk|question\b/i.test(normalized)) score += 2;
  if (mode === "opportunity" && /\bopened|door|funded|grant|scholarship\b/i.test(normalized)) score += 2;
  if (mode === "report" && /\bwhat|says|report|study|who\b/i.test(normalized)) score += 2;
  if (mode === "market" && /\btraders|market|solana|bitcoin|defi\b/i.test(normalized)) score += 2;

  return score;
}

function looksConcreteHeadline(text) {
  const normalized = cleanStoryTitle(text);
  if (!normalized) {
    return false;
  }

  const tokenCount = normalized.split(/\s+/).filter(Boolean).length;
  const hasConcreteVerb = /\b(opens?|opened|raises?|raised|warns?|warned|says?|said|cuts?|cut|launches?|launched|wins?|won|funded|changes?|changed|offline)\b/i.test(normalized);
  const hasNumber = /\d/.test(normalized);
  const hasNamedEntity = /[A-Z][a-zA-Z0-9'-]+(?:\s+[A-Z][a-zA-Z0-9'-]+)+/.test(normalized) || /^[A-Z0-9][A-Za-z0-9' -]+$/.test(normalized);

  return tokenCount >= 4 && hasNamedEntity && (hasConcreteVerb || hasNumber);
}

function pickBestRealtimeTitleCandidate(signal) {
  const universalTitle = cleanStoryTitle(universalWhyTitle(signal));
  if (universalTitle) {
    return universalTitle;
  }

  const candidates = buildRealtimeTitleCandidates(signal);
  if (!candidates.length) {
    const subjectHeadline = cleanStoryTitle(tightenRealtimeTitle(signal.event_or_subject || "", 12));
    if (looksConcreteHeadline(subjectHeadline)) {
      return subjectHeadline;
    }

    const leadHeadline = cleanStoryTitle(shortenWords(extractLeadFact(signal), 12));
    if (looksConcreteHeadline(leadHeadline)) {
      return leadHeadline;
    }

    return "";
  }

  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreRealtimeTitleCandidate(candidate, signal)
    }))
    .sort((left, right) => right.score - left.score || left.candidate.length - right.candidate.length)[0]
    .candidate;
}

function pickSpecificRealtimeTitle(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 14);
  const rawSummaryLead = clipToSentence(signal.summary || "");
  const summaryLead = tightenRealtimeTitle(rawSummaryLead, 14);

  if (summaryLead && subject && !rawSummaryLead.includes(",")) {
    const subjectTokens = meaningfulTitleTokens(subject);
    const summaryTokens = meaningfulTitleTokens(summaryLead);
    const addsSpecifics = summaryTokens.some((token) => !subjectTokens.includes(token));
    const startsWithSubjectWord = summaryLead
      .toLowerCase()
      .startsWith((subject.split(/\s+/)[0] || "").toLowerCase());

    if (addsSpecifics && startsWithSubjectWord) {
      return summaryLead;
    }
  }

  return subject || summaryLead || "";
}

function summarizeConsequence(signal) {
  const summary = clipToSentence(signal.summary || "");
  const lowered = summary.toLowerCase();

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(lowered)) {
    return "could change student plans";
  }

  if (/\bhack|breach|security|exploit|attack|outage|offline|bug\b/.test(lowered)) {
    return "could hit trust fast";
  }

  if (/\bscholarship|funding|grant|admission|research spot\b/.test(lowered)) {
    return "could open a bigger door";
  }

  if (/\bhealth|oral|dental|microbiome|sleep|who\b/.test(lowered)) {
    return "is bigger than people think";
  }

  if (/\bsolana|bitcoin|crypto|market|trader|liquidation|defi\b/.test(lowered)) {
    return "could hit traders next";
  }

  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(lowered)) {
    return "could cost real seconds";
  }

  if (/\bclimate|interfaith|faith|garden|community\b/.test(lowered)) {
    return "shows how local action scales";
  }

  if (/\beducation|student|university|school\b/.test(lowered)) {
    return "could change where students go";
  }

  if (/\bfunding|founder|startup|accelerator\b/.test(lowered)) {
    return "could change who wins next";
  }

  return "could matter more than it looks";
}

function deriveRealtimeTitleFrame(signal) {
  return pickBestRealtimeTitleCandidate(signal);
}

function nasDailyTitleFromSpecifics(signal) {
  return deriveRealtimeTitleFrame(signal);
}

function formatRealtimeSignalTitle(signal) {
  const rawTitle = cleanStoryTitle(signal.title);
  const subject = cleanStoryTitle(signal.event_or_subject || "");
  const specificFallback = pickSpecificRealtimeTitle(signal);
  const subjectAnchor = preferredSubjectAnchor(subject);
  const rawIncludesAnchor = subjectAnchor
    ? meaningfulTitleTokens(rawTitle).includes(subjectAnchor)
    : false;

  if (
    rawTitle &&
    !isGenericRealtimeTitle(rawTitle) &&
    (!subject || (titleMatchesSubject(rawTitle, subject) && (!subjectAnchor || rawIncludesAnchor))) &&
    hasNasDailyShape(rawTitle)
  ) {
    return rawTitle;
  }

  return nasDailyTitleFromSpecifics(signal) || specificFallback || rawTitle || "Live story";
}

function inferRealtimeLesson(signal) {
  const context = [
    signal.event_or_subject || "",
    signal.summary || "",
    signal.why_it_fits || ""
  ]
    .join(" ")
    .toLowerCase();

  if (/\bvisa|policy|government|rule|regulation|law|ban\b/.test(context)) {
    return "A boring policy change can quietly change someone's whole future.";
  }

  if (/\bstudent|scholarship|admission|university|study abroad|education\b/.test(context)) {
    return "The biggest education stories are really about access.";
  }

  if (/\bhealth|medical|oral|tooth|teeth|dent|sleep|microbiome|doctor|clinic\b/.test(context)) {
    return "Health stories spread when people can feel the change in daily life.";
  }

  if (/\bcrypto|bitcoin|solana|wallet|trader|token|defi|market|hack|security\b/.test(context)) {
    return "Money stories go viral when the risk suddenly feels human.";
  }

  if (/\bstartup|founder|funding|investor|business|entrepreneur\b/.test(context)) {
    return "The strongest business stories show one new door opening for real people.";
  }

  if (/\bfirst responder|dispatch|public safety|emergency|ambulance|fire|responder|communication\b/.test(context)) {
    return "The best safety stories reveal the invisible system people rely on.";
  }

  if (/\bholocaust|survivor|memory|remembrance|wiesel|genocide|dialogue\b/.test(context)) {
    return "History matters most when one human voice makes it impossible to ignore.";
  }

  if (/\bclimate|faith|interfaith|sustain|garden|environment\b/.test(context)) {
    return "Big global problems feel real when one small action becomes visible.";
  }

  return "The best viral news stories are the ones that quickly show what changes for people.";
}

function formatRealtimeSignalLesson(signal) {
  return cleanLessonText(signal.lesson) || inferRealtimeLesson(signal);
}

function normalizeRealtimeSignal(signal) {
  if (!signal) {
    return signal;
  }

  return {
    ...signal,
    title: formatRealtimeSignalTitle(signal),
    lesson: formatRealtimeSignalLesson(signal)
  };
}

function normalizeRealtimeSignals(signals) {
  return (signals || []).map(normalizeRealtimeSignal);
}

module.exports = {
  formatRealtimeSignalLesson,
  formatRealtimeSignalTitle,
  normalizeRealtimeSignal,
  normalizeRealtimeSignals
};
