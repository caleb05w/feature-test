"use client";

import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function ImportScreen() {
  const [load, setLoad] = useState(null);
  const [response, setResponse] = useState(null);

  //need to be async because this relies on a function that takes time to send
  const handleUpload = async () => {
    console.log("preparing load");
    setResponse("Generating a response");
    const cargo = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: input || "Hello!" }],
      }),
    });
    const data = await cargo.json();
    setResponse(data?.reply?.content ?? "failed");
  };

  return (
    <View style={styles.page}>
      <View style={styles.flexCol}>
        <View style={styles.flexRow}>
          <TextInput
            style={styles.upload}
            placeholder="setload..."
            value={load}
            onChangeText={(e) => {
              setLoad(e);
            }}
          ></TextInput>
          <Button
            title="upload"
            onPress={() => {
              handleUpload();
            }}
          ></Button>
        </View>
        <Text>{response ?? "no response"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignItems: "center",
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  upload: {
    borderColor: "#D9D9D9",
    borderWidth: 2,
    padding: 12,
    borderRadius: 12,
  },
});
