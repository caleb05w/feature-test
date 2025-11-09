import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function ImportScreen() {
  const [load, setLoad] = useState(""); // string, not null
  const [response, setResponse] = useState("");

  const handleUpload = async () => {
    setResponse("Generating a response…");
    try {
      const cargo = await fetch(
        "https://feature-test-six.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: load || "Hello!" }],
          }),
        }
      );

      if (!cargo.ok) {
        const text = await cargo.text().catch(() => "");
        throw new Error(`HTTP ${cargo.status} ${text}`);
      }

      const data = await cargo.json();
      setResponse(data?.reply?.content ?? "No response from server.");
    } catch (e) {
      console.warn("fetch error:", e);
      setResponse(`Error: ${e?.message ?? String(e)}`);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.flexCol}>
        <View style={styles.flexRow}>
          <TextInput
            style={styles.upload}
            placeholder="Ask GPT…"
            value={load}
            onChangeText={setLoad}
          />
          <Button title="upload" onPress={handleUpload} />
        </View>
        <Text>{response || "no response"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCol: { flexDirection: "column", gap: 24, alignItems: "center" },
  flexRow: { flexDirection: "row", gap: 12, alignItems: "center" },
  upload: {
    borderColor: "#D9D9D9",
    borderWidth: 2,
    padding: 12,
    borderRadius: 12,
    minWidth: 220,
  },
});
