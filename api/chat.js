// api/chat.js
import OpenAI from "openai";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export default async function handler(req, res) {
  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(200, CORS_HEADERS);
    return res.end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Apply CORS headers to the real response too
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    const { messages } = req.body || {};
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages ?? [{ role: "user", content: "Say hi!" }],
    });

    return res.status(200).json({ reply: completion.choices[0]?.message });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
