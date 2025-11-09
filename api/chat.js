// api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Basic CORS for your mobile app
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");

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
