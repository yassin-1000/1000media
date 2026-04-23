const { saveFeedback } = require("../lib/feedback-store");

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload, null, 2));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (_error) {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, 405, { ok: false, error: "Method not allowed" });
  }

  try {
    const payload = await readRequestBody(request);
    const clientId = payload.client_id;
    const section = payload.section;
    const action = payload.action;
    const story = payload.story;

    if (!clientId || !section || !action || !story) {
      return sendJson(response, 400, {
        ok: false,
        error: "client_id, section, action, and story are required"
      });
    }

    if (!["human", "realtime"].includes(section)) {
      return sendJson(response, 400, { ok: false, error: "Unknown section" });
    }

    if (!["like", "dislike"].includes(action)) {
      return sendJson(response, 400, { ok: false, error: "Unknown action" });
    }

    const result = await saveFeedback({
      clientId,
      section,
      action,
      story
    });

    return sendJson(response, 200, {
      ok: true,
      fingerprint: result.fingerprint,
      feedback: result.feedback
    });
  } catch (error) {
    return sendJson(response, 500, {
      ok: false,
      error: error.message
    });
  }
};
