export async function askGPT(message) {
  const res = await fetch("https://feature-test-six.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data.reply?.content ?? "No response";
}
