const { cleanTitle } = require("./title-quality");

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function humanSubjectLabel(descriptor) {
  const text = String(descriptor || "").toLowerCase();
  if (text.includes("woman")) return "This woman";
  if (text.includes("girl")) return "This girl";
  if (text.includes("boy")) return "This boy";
  if (text.includes("student")) return "This student";
  if (text.includes("founder")) return "This founder";
  if (text.includes("teacher")) return "This teacher";
  if (text.includes("developer")) return "This developer";
  if (text.includes("trader")) return "This trader";
  if (text.includes("survivor")) return "This survivor";
  if (text.includes("family")) return "This family";
  if (text.includes("team")) return "This team";
  if (text.includes("doctor")) return "This doctor";
  if (text.includes("dentist")) return "This dentist";
  if (text.includes("firefighter")) return "This firefighter";
  if (text.includes("pastor")) return "This pastor";
  if (text.includes("leader")) return "This leader";
  return "This person";
}

function normalizeSubject(subject) {
  const value = String(subject || "").trim();
  if (!value) {
    return "";
  }

  const acronymMatch = value.match(/\(([A-Z0-9]{2,})\)/);
  if (acronymMatch) {
    return acronymMatch[1];
  }

  return value
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenWords(text, maxWords = 10) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

function firstSentence(text) {
  const normalized = String(text || "").trim().replace(/\s+/g, " ");
  if (!normalized) {
    return "";
  }

  const match = normalized.match(/[^.!?]+/);
  return match ? match[0].trim() : normalized;
}

function looksLikeProperSubject(text) {
  const value = normalizeSubject(text);
  if (!value) {
    return false;
  }

  if (/\b(founder|student|teacher|trader|doctor|developer|survivor|family|team|person|organization)\b/i.test(value)) {
    return false;
  }

  return (
    /^[A-Z][a-z]+(?:\s+[A-Z][a-zA-Z'’-]+){0,5}$/.test(value) ||
    /^[A-Z0-9]{2,}$/.test(value) ||
    /^[A-Z][a-zA-Z]+(?:\s+(?:for|of|on|at|to|and|the|in)\s+[A-Z][a-zA-Z]+){0,4}(?:\s+[A-Z][a-zA-Z]+){0,4}$/.test(value)
  );
}

function cleanActionSentence(text) {
  return String(text || "")
    .replace(/^(who|that)\s+/i, "")
    .replace(/^(is|was|has|had)\s+/i, "")
    .replace(/^(a|an|the)\s+[^,]+,\s*/i, "")
    .replace(/^(despite|amid|during)\s+/i, "")
    .replace(/^(works?|worked|working)\s+to\s+/i, "")
    .replace(/^(aims?|aimed)\s+to\s+/i, "")
    .replace(/^(is dedicated to|was dedicated to)\s+/i, "")
    .replace(/^(has been actively)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function lowerFirst(text) {
  return String(text || "").replace(/^[A-Z]/, (char) => char.toLowerCase());
}

function formatHumanStoryTitle(story) {
  const rawTitle = cleanTitle(story.title);
  const person = normalizeSubject(story.person_or_subject);
  let sentence = firstSentence(story.summary || "");

  if (person) {
    const personPattern = new RegExp(`^${escapeRegExp(person)}(?:,\\s*[^,]+,)?\\s*`, "i");
    sentence = sentence.replace(personPattern, "");
  }

  sentence = cleanActionSentence(sentence);

  const action = shortenWords(sentence, 10).replace(/^[A-Z]/, (char) => char.toLowerCase());
  if (!action) {
    return rawTitle || "This person changed everything";
  }

  if (looksLikeProperSubject(person)) {
    return `${person} ${lowerFirst(action)}`;
  }

  return `${humanSubjectLabel(story.person_descriptor)} ${action}`;
}

module.exports = {
  formatHumanStoryTitle
};
