const { onRequest } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

// Environment configuration — set via Firebase CLI:
// firebase functions:config:set n8n.webhook_url="https://..."
// OR for v2 params, set in .env or Secret Manager
const N8N_WEBHOOK_URL = defineString("N8N_WEBHOOK_URL", {
  description: "The n8n webhook URL to forward events to",
  default: "",
});

// Simple in-memory rate limiter (per-instance)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 requests per IP per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimits.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// Validate payload shape
function validatePayload(data) {
  if (!data || typeof data !== "object") return "Payload must be a JSON object";
  if (!data.event || typeof data.event !== "string") return "Missing 'event' field";

  const validEvents = ["scan_completed", "inquiry_submitted", "email_subscribed"];
  if (!validEvents.includes(data.event)) return `Invalid event: ${data.event}`;

  if (!data.source || typeof data.source !== "string") return "Missing 'source' field";
  if (!data.data || typeof data.data !== "object") return "Missing 'data' field";

  // Event-specific validation
  if (data.event === "scan_completed") {
    if (!data.data.email) return "Scan requires 'email'";
    if (!data.data.studio) return "Scan requires 'studio'";
    if (!Array.isArray(data.data.questions)) return "Scan requires 'questions' array";
  }

  if (data.event === "inquiry_submitted") {
    if (!data.data.name) return "Inquiry requires 'name'";
    if (!data.data.email) return "Inquiry requires 'email'";
    if (!data.data.message) return "Inquiry requires 'message'";
  }

  if (data.event === "email_subscribed") {
    if (!data.data.email) return "Subscription requires 'email'";
  }

  return null; // valid
}

/**
 * n8nProxy — secure webhook proxy
 * 
 * The frontend calls this endpoint. This function:
 * 1. Validates the payload shape
 * 2. Rate-limits by IP
 * 3. Forwards to n8n with the webhook URL hidden server-side
 * 4. Returns a clean response to the client
 */
exports.n8nProxy = onRequest(
  {
    cors: true,
    region: "us-central1",
    maxInstances: 10,
    // Allow unauthenticated access (public form submissions)
    invoker: "public",
  },
  async (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    // Rate limiting
    const clientIp = req.headers["x-forwarded-for"] || req.ip || "unknown";
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: "Too many requests. Please try again later." });
      return;
    }

    // Validate payload
    const validationError = validatePayload(req.body);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    // Forward to n8n
    const webhookUrl = N8N_WEBHOOK_URL.value();
    if (!webhookUrl) {
      // No webhook configured — just acknowledge
      console.warn("N8N_WEBHOOK_URL not configured. Payload accepted but not forwarded.");
      res.status(200).json({ ok: true, forwarded: false });
      return;
    }

    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...req.body,
          _meta: {
            receivedAt: new Date().toISOString(),
            clientIp: typeof clientIp === "string" ? clientIp.split(",")[0].trim() : "unknown",
          },
        }),
      });

      if (!n8nResponse.ok) {
        console.error(`n8n responded with ${n8nResponse.status}`);
      }

      res.status(200).json({ ok: true, forwarded: true });
    } catch (err) {
      // Don't expose n8n errors to client — log server-side
      console.error("n8n webhook error:", err.message);
      // Still return success to client (Firestore is the source of truth)
      res.status(200).json({ ok: true, forwarded: false });
    }
  }
);
