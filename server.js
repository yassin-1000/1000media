const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function loadEnvFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      return;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^["']|["']$/g, "");
    if (process.env[key] || !value || /^(VERCEL|TURBO|NX)_?/.test(key)) {
      return;
    }

    process.env[key] = value;
  });
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";
const ROOT = __dirname;
const ingestHandler = require("./api/ingest");
const feedbackHandler = require("./api/feedback");
const storiesHandler = require("./api/stories");
const { initializeContentStore } = require("./lib/content-store");
const { CLIENTS } = require("./lib/client-strategies");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml"
};

initializeContentStore().catch((error) => {
  console.error("[content-store] initialization failed:", error.message);
});

async function runLocalHourlyIngestion(triggeredBy = "local_scheduler") {
  try {
    console.log(`[ingestion] starting ${triggeredBy} run`);
    await ingestHandler.runIngestionForClients(
      CLIENTS,
      {
        method: "GET",
        query: {},
        headers: {}
      },
      {
        persist: true,
        triggeredBy
      }
    );
    console.log(`[ingestion] completed ${triggeredBy} run`);
  } catch (error) {
    console.error(`[ingestion] ${triggeredBy} run failed:`, error.message);
  }
}

function scheduleLocalHourlyIngestion() {
  if (process.env.VERCEL) {
    return;
  }

  setTimeout(() => {
    runLocalHourlyIngestion("startup");
  }, 500);

  const hourMs = 60 * 60 * 1000;
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setMinutes(0, 0, 0);
  nextHour.setHours(nextHour.getHours() + 1);
  const delay = Math.max(1000, nextHour.getTime() - now.getTime());

  setTimeout(() => {
    runLocalHourlyIngestion("hourly");
    setInterval(() => {
      runLocalHourlyIngestion("hourly");
    }, hourMs);
  }, delay);
}

scheduleLocalHourlyIngestion();

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${HOST}:${PORT}`);
  const requestPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;

  if (requestUrl.pathname === "/api/ingest") {
    req.query = Object.fromEntries(requestUrl.searchParams.entries());
    return ingestHandler(req, res);
  }

  if (requestUrl.pathname === "/api/feedback") {
    req.query = Object.fromEntries(requestUrl.searchParams.entries());
    return feedbackHandler(req, res);
  }

  if (requestUrl.pathname === "/api/stories") {
    req.query = Object.fromEntries(requestUrl.searchParams.entries());
    return storiesHandler(req, res);
  }

  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`1000media dashboard running at http://${HOST}:${PORT}`);
});
