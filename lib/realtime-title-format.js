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
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const normalizedSubject = cleanStoryTitle(subject);
  const context = `${signal.event_or_subject || ""} ${signal.summary || ""}`.toLowerCase();

  if (!normalizedSubject) {
    return "";
  }

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(context)) {
    return `How ${normalizedSubject} could change student plans`;
  }

  if (/\boutage|offline|bug|exploit|hack|breach|security|risk|warning|warns\b/.test(context)) {
    return `Why ${normalizedSubject} could become a bigger problem`;
  }

  if (/\bscholarship|funding|grant|admission|research|application|opens|launches\b/.test(context)) {
    return `How ${normalizedSubject} could open a new door`;
  }

  if (/\bwho|report|survey|study|research|data\b/.test(context)) {
    return `What ${normalizedSubject} says about real life`;
  }

  if (/\bbitcoin|solana|crypto|market|token|defi|wallet|trader|liquidation\b/.test(context)) {
    return `Why ${normalizedSubject} could move traders now`;
  }

  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(context)) {
    return `Why ${normalizedSubject} could save critical seconds`;
  }

  if (/\bstartup|founder|funding|accelerator|investment\b/.test(context)) {
    return `Why ${normalizedSubject} could shape who wins next`;
  }

  return `Why ${normalizedSubject} matters right now`;
}

function nasDailyTitleFromSpecifics(signal) {
  const subject = tightenRealtimeTitle(signal.event_or_subject || "", 12);
  const consequence = summarizeConsequence(signal);
  const normalizedSubject = cleanStoryTitle(subject);
  const loweredSubject = normalizedSubject.toLowerCase();

  if (!normalizedSubject) {
    return "";
  }

  if (/^(How|Why|What)\b/.test(normalizedSubject)) {
    return normalizedSubject;
  }

  if (/\bvisa|policy|rule|regulation|ban|law\b/.test(loweredSubject)) {
    return `The policy shift that ${consequence}`;
  }

  if (/\boutage|offline|bug|exploit|hack|breach|security\b/.test(loweredSubject)) {
    return `${normalizedSubject}: The problem builders cannot ignore`;
  }

  if (/\bscholarship|funding|grant|admission|research\b/.test(loweredSubject)) {
    return `${normalizedSubject}: The opening students should not miss`;
  }

  if (/\bwho|report|survey|study|research\b/.test(loweredSubject)) {
    return `${normalizedSubject}: The report people will feel in real life`;
  }

  if (/\bbitcoin|solana|crypto|market|token|defi|wallet\b/.test(loweredSubject)) {
    return `${normalizedSubject}: Why traders should care now`;
  }

  if (/\bpublic safety|police|rescue|first responder|dispatch|emergency\b/.test(loweredSubject)) {
    return `${normalizedSubject}: The upgrade that could cost or save seconds`;
  }

  return deriveRealtimeTitleFrame(signal) || `${normalizedSubject}: Why this matters now`;
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
