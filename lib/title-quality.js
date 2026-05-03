function cleanTitle(title) {
  return String(title || "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeTitle(title) {
  return cleanTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SHARED_GENERIC_PATTERNS = [
  /^the good news that comes with a warning$/i,
  /^the smallest deadline with the biggest consequences$/i,
  /^the quiet crisis everyone will notice too late$/i,
  /^the boring update that could affect millions$/i,
  /^the quiet change that could affect everyone$/i,
  /^the weird news everyone will understand too late$/i,
  /^the most urgent story nobody is talking about$/i,
  /^the smallest update with the biggest consequences$/i,
  /^the tiny deadline that could become a huge story$/i,
  /^the global moment hidden inside\b/i,
  /^the .+ story nobody is talking about$/i,
  /^this .+ could become the next big story$/i
];

const HUMAN_GENERIC_PATTERNS = [
  /^this student did x$/i,
  /^this founder built x$/i,
  /^this guy did x$/i,
  /^this person did x$/i,
  /^this founder turned x into y$/i,
  /^this student turned x into y$/i,
  /^this guy turned x into y$/i,
  /^this woman turned x into y$/i,
  /^this man turned x into y$/i,
  /^human story$/i,
  /^success story$/i
];

const REALTIME_GENERIC_PATTERNS = [
  /^oral health research$/i,
  /^bitcoin price prediction market$/i,
  /^new visa rules \d{4}$/i,
  /^student visa policy changes$/i,
  /^live story$/i,
  /^policy update$/i,
  /^market update$/i,
  /^education update$/i,
  /^oral health update$/i
];

const LOW_INFORMATION_TOKENS = new Set([
  "human",
  "story",
  "stories",
  "news",
  "update",
  "research",
  "market",
  "policy",
  "rules",
  "change",
  "changes",
  "visa",
  "oral",
  "health",
  "event",
  "live",
  "global"
]);

function tokenList(title) {
  return normalizeTitle(title)
    .split(/\s+/)
    .filter(Boolean);
}

function isLowInformationTitle(title) {
  const tokens = tokenList(title);
  if (!tokens.length) {
    return true;
  }

  if (tokens.length <= 2 && tokens.every((token) => LOW_INFORMATION_TOKENS.has(token))) {
    return true;
  }

  if (tokens.length <= 4 && tokens.every((token) => LOW_INFORMATION_TOKENS.has(token) || /^\d{4}$/.test(token))) {
    return true;
  }

  return false;
}

function getGenericTitleReason(title, section = "realtime") {
  const cleaned = cleanTitle(title);
  if (!cleaned) {
    return "empty";
  }

  const patterns = [
    ...SHARED_GENERIC_PATTERNS,
    ...(section === "human" ? HUMAN_GENERIC_PATTERNS : REALTIME_GENERIC_PATTERNS)
  ];

  const matched = patterns.find((pattern) => pattern.test(cleaned));
  if (matched) {
    return `pattern:${matched}`;
  }

  if (isLowInformationTitle(cleaned)) {
    return "low_information";
  }

  return null;
}

function isBlacklistedTitle(title, section = "realtime") {
  return Boolean(getGenericTitleReason(title, section));
}

module.exports = {
  cleanTitle,
  getGenericTitleReason,
  isBlacklistedTitle,
  normalizeTitle
};
