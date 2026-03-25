"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("openrouter");

  async function send() {
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt, provider })
    });

    const data = await res.json();
    setOutput(data.output);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AI Dashboard</h1>

      <select onChange={(e) => setProvider(e.target.value)}>
        <option value="openrouter">OpenRouter (GPT-4o)</option>
        <option value="groq">Groq (LLaMA 3)</option>
      </select>

      <br /><br />

      <textarea
        rows="5"
        cols="50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
      />

      <br /><br />

      <button onClick={send} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <pre style={{ marginTop: 20 }}>
        {output}
      </pre>
    </main>
  );
}
