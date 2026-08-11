"use client";
import React, { useState } from "react";

export default function AdminTierlistPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState("");

  async function checkPassword() {
    setMessage("Checking...");
    try {
      const res = await fetch("/api/admin/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data?.ok) {
        setAuthed(true);
        setMessage("Authenticated — loading tierlists...");
        const r = await fetch("/api/admin/tierlist");
        const body = await r.json();
        setJsonText(JSON.stringify(body, null, 2));
        setMessage("");
      } else {
        setMessage("Incorrect password");
      }
    } catch (e) {
      setMessage("Error checking password");
    }
  }

  function downloadJSON() {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tierlists.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyJSON() {
    navigator.clipboard.writeText(jsonText);
    setMessage("JSON copied to clipboard");
  }

  function validateJSON() {
    try {
      JSON.parse(jsonText);
      setMessage("Valid JSON");
    } catch (e) {
      setMessage("Invalid JSON: " + (e as Error).message);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Tierlists (hidden)</h1>
      {!authed ? (
        <div className="space-y-2 max-w-sm">
          <p>Enter admin password to access the editor.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Password"
          />
          <div className="flex gap-2">
            <button onClick={checkPassword} className="bg-blue-600 text-white px-3 py-1">
              Unlock
            </button>
          </div>
          {message && <div className="text-sm text-red-600">{message}</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm">Edit the JSON below, then use Copy or Download to send changes.</p>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={24}
            className="w-full font-mono text-sm border p-2"
          />
          <div className="flex gap-2">
            <button onClick={validateJSON} className="px-3 py-1 bg-gray-200">Validate</button>
            <button onClick={copyJSON} className="px-3 py-1 bg-green-600 text-white">Copy JSON</button>
            <button onClick={downloadJSON} className="px-3 py-1 bg-indigo-600 text-white">Download</button>
          </div>
          {message && <div className="text-sm text-gray-700">{message}</div>}
          <div className="text-sm text-gray-600">Tip: send the exported JSON to the maintainer to update the site.</div>
        </div>
      )}
    </div>
  );
}
