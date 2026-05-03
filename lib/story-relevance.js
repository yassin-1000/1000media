function buildContext(signal) {
  return [
    signal.title || "",
    signal.event_or_subject || "",
    signal.person_or_subject || "",
    signal.person_descriptor || "",
    signal.summary || "",
    signal.why_it_fits || "",
    signal.lesson || ""
  ]
    .join(" ")
    .toLowerCase();
}

function buildPrimaryContext(signal) {
  return [
    signal.title || "",
    signal.event_or_subject || "",
    signal.person_or_subject || "",
    signal.person_descriptor || "",
    signal.summary || ""
  ]
    .join(" ")
    .toLowerCase();
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

const CLIENT_RULES = {
  "dentiste-toothpaste": {
    realtime: {
      requiredPrimary: [
        /\boral\b/,
        /\bdental\b/,
        /\bdentist\b/,
        /\bteeth\b/,
        /\btooth\b/,
        /\btoothpaste\b/,
        /\bbreath\b/,
        /\bhygiene\b/,
        /\bmicrobiome\b/,
        /\bgum\b/,
        /\bcaries\b/,
        /\bcavity\b/,
        /\bmouth\b/
      ],
      adjacent: [
        /\bsleep\b/,
        /\bwellness\b/,
        /\bkissing\b/,
        /\bdating\b/,
        /\bconfidence\b/,
        /\bsmoking\b/,
        /\bsugar\b/,
        /\bcoffee\b/,
        /\boral-b\b/,
        /\bcolgate\b/,
        /\bsensodyne\b/,
        /\bcrest\b/,
        /\blisterine\b/,
        /\btherabreath\b/
      ],
      bannedUnlessRequired: [
        /\bvisa\b/,
        /\bstudy abroad\b/,
        /\binternational education\b/,
        /\bscholarship\b/,
        /\bindian students?\b/,
        /\bresearch positions?\b/,
        /\buniversity\b/,
        /\badmission\b/
      ]
    }
  },
  leverageedu: {
    realtime: {
      required: [
        /\bstudent\b/,
        /\bstudents\b/,
        /\bstudy abroad\b/,
        /\bvisa\b/,
        /\bscholarship\b/,
        /\badmission\b/,
        /\buniversity\b/,
        /\beducation\b/,
        /\bcampus\b/,
        /\bindia\b/,
        /\bindian\b/,
        /\bstartup\b/,
        /\bfounder\b/,
        /\byouth\b/
      ]
    }
  }
};

function passesClientStoryRelevance(clientId, section, signal) {
  const rule = CLIENT_RULES[clientId]?.[section];
  if (!rule) {
    return true;
  }

  const context = buildContext(signal);
  const primaryContext = buildPrimaryContext(signal);
  const hasRequiredPrimary = !rule.requiredPrimary || hasAny(primaryContext, rule.requiredPrimary);
  if (rule.requiredPrimary && !hasRequiredPrimary) {
    return false;
  }

  if (!rule.requiredPrimary && rule.required && !hasAny(context, rule.required)) {
    return false;
  }

  if (rule.bannedUnlessRequired && hasAny(primaryContext, rule.bannedUnlessRequired) && !hasRequiredPrimary) {
    return false;
  }

  return true;
}

module.exports = {
  passesClientStoryRelevance
};
