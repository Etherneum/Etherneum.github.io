"use client";
import React, { useState } from "react";

export default function AdminCombinedPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tierJson, setTierJson] = useState<string | null>(null);
  const [valuesJson, setValuesJson] = useState<string | null>(null);

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
        setMessage("");
        await loadBoth();
      } else {
        setMessage("Incorrect password");
      }
    } catch (e) {
      setMessage("Error checking password");
    }
  }

  async function loadBoth() {
    try {
      const [t, v] = await Promise.all([
        fetch("/api/admin/tierlist").then((r) => r.json()),
        fetch("/api/admin/values").then((r) => r.json()),
      ]);
      setTierJson(JSON.stringify(t, null, 2));
      setValuesJson(JSON.stringify(v, null, 2));
    } catch (e) {
      setMessage("Failed to load data");
    }
  }

  function copyToClipboard(text: string | null) {
    if (!text) return setMessage("Nothing to copy");
    navigator.clipboard.writeText(text);
    setMessage("Copied to clipboard");
  }

  function copyBoth() {
    const combined = {
      tierlists: tierJson ? JSON.parse(tierJson) : null,
      values: valuesJson ? JSON.parse(valuesJson) : null,
    };
    copyToClipboard(JSON.stringify(combined, null, 2));
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Hidden Export</h1>
      {!authed ? (
        <div className="space-y-3 max-w-sm">
          <p>Enter admin password to access export buttons.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Password"
          />
          <div className="flex gap-2">
            <button onClick={checkPassword} className="bg-blue-600 text-white px-3 py-1">Unlock</button>
          </div>
          {message && <div className="text-sm text-red-600">{message}</div>}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm">Use the buttons below to copy the current site data and send it to the maintainer.</p>
          <div className="flex gap-2">
            <button onClick={() => copyToClipboard(tierJson)} className="px-3 py-1 bg-indigo-600 text-white">Copy Tier List</button>
            <button onClick={() => copyToClipboard(valuesJson)} className="px-3 py-1 bg-green-600 text-white">Copy Value List</button>
            <button onClick={copyBoth} className="px-3 py-1 bg-gray-800 text-white">Copy Both</button>
            <button onClick={loadBoth} className="px-3 py-1 bg-gray-200">Reload</button>
          </div>
          {message && <div className="text-sm text-gray-700">{message}</div>}
          <details className="mt-4 p-2 border">
            <summary className="cursor-pointer">Preview (tierlist)</summary>
            <pre className="text-xs max-h-64 overflow-auto p-2">{tierJson}</pre>
          </details>
          <details className="mt-2 p-2 border">
            <summary className="cursor-pointer">Preview (values)</summary>
            <pre className="text-xs max-h-64 overflow-auto p-2">{valuesJson}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
