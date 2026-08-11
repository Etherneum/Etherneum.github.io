"use client";
import React, { useEffect, useState } from "react";

type TierRow = {
  label: string;
  sublabel?: string;
  color: string;
  units: string[];
};

export default function AdminTierlistPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [allLists, setAllLists] = useState<Record<string, TierRow[]>>({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [rows, setRows] = useState<TierRow[]>([]);

  useEffect(() => {
    if (!selectedKey && Object.keys(allLists).length) {
      const arrayKeys = Object.keys(allLists).filter((k) => Array.isArray((allLists as any)[k]));
      if (arrayKeys.length) setSelectedKey(arrayKeys[0]);
    }
  }, [allLists]);

  useEffect(() => {
    if (selectedKey) {
      const value = (allLists as any)[selectedKey];
      setRows(JSON.parse(JSON.stringify(Array.isArray(value) ? value : [])));
    }
  }, [selectedKey]);

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
        await loadData();
      } else {
        setMessage("Incorrect password");
      }
    } catch (e) {
      setMessage("Error checking password");
    }
  }

  async function loadData() {
    try {
      const [t, u] = await Promise.all([
        fetch("/api/admin/tierlist").then((r) => r.json()),
        fetch("/api/admin/units").then((r) => r.json()),
      ]);
      setAllLists(t ?? {});
      setAvailableUnits(u ?? []);
      setMessage("");
    } catch (e) {
      setMessage("Failed to load data");
    }
  }

  function computeUnranked(): string[] {
    const ranked = new Set<string>();
    if (Array.isArray(rows)) rows.forEach((r) => (r.units || []).forEach((u) => ranked.add(u)));
    return availableUnits.filter((u) => !ranked.has(u));
  }

  function onDragStart(e: React.DragEvent, unit: string, fromKey: string | null, fromIndex: number | null) {
    e.dataTransfer.setData("application/json", JSON.stringify({ unit, fromKey, fromIndex }));
  }

  function onDropToRow(e: React.DragEvent, rowIndex: number) {
    e.preventDefault();
    const payload = JSON.parse(e.dataTransfer.getData("application/json") || "null");
    if (!payload) return;
    const { unit, fromKey } = payload as { unit: string; fromKey: string | null };
    setRows((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const copy = prevArr.map((r) => ({ ...r, units: Array.isArray(r.units) ? [...r.units] : [] }));
      // remove from any row that contains it
      for (const r of copy) {
        const idx = r.units.indexOf(unit);
        if (idx !== -1) r.units.splice(idx, 1);
      }
      // add to target row if not present
      if (!copy[rowIndex].units.includes(unit)) copy[rowIndex].units.push(unit);
      return copy;
    });
    setMessage(`Moved ${payload.unit}`);
  }

  function onDropToUnranked(e: React.DragEvent) {
    e.preventDefault();
    const payload = JSON.parse(e.dataTransfer.getData("application/json") || "null");
    if (!payload) return;
    const { unit } = payload as { unit: string };
    setRows((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const copy = prevArr.map((r) => ({ ...r, units: Array.isArray(r.units) ? [...r.units] : [] }));
      for (const r of copy) {
        const idx = r.units.indexOf(unit);
        if (idx !== -1) r.units.splice(idx, 1);
      }
      return copy;
    });
    setMessage(`Unranked ${payload.unit}`);
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function copyTierlistJSON() {
    if (!selectedKey) return setMessage("No list selected");
    const out = rows.map((r) => ({ label: r.label, sublabel: r.sublabel, color: r.color, units: r.units }));
    navigator.clipboard.writeText(JSON.stringify(out, null, 2));
    setMessage("Tierlist copied to clipboard");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin: Tierlist Editor (hidden)</h1>
      {!authed ? (
        <div className="space-y-2 max-w-sm">
          <p>Enter admin password to access the editor.</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 w-full" placeholder="Password" />
          <div className="flex gap-2 mt-2">
            <button onClick={checkPassword} className="bg-blue-600 text-white px-3 py-1">Unlock</button>
          </div>
          {message && <div className="text-sm text-red-600">{message}</div>}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm">Select list:</label>
            <select value={selectedKey ?? ""} onChange={(e) => setSelectedKey(e.target.value)} className="border px-2 py-1">
              {Object.keys(allLists).filter((k) => Array.isArray((allLists as any)[k])).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <button onClick={copyTierlistJSON} className="ml-auto px-3 py-1 bg-green-600 text-white">Copy Tierlist JSON</button>
            <button onClick={loadData} className="px-3 py-1 bg-gray-200">Reload</button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {rows.map((row, idx) => (
              <div key={row.label} className="border p-2" onDragOver={allowDrop} onDrop={(e) => onDropToRow(e, idx)}>
                <div className="font-semibold" style={{ color: row.color }}>{row.label}{row.sublabel ? ` — ${row.sublabel}` : ''}</div>
                <div className="mt-2 space-y-1">
                  {row.units.map((u) => (
                    <div key={u} draggable onDragStart={(e) => onDragStart(e, u, selectedKey, idx)} className="p-1 bg-gray-100 rounded">
                      {u}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border p-2" onDragOver={allowDrop} onDrop={onDropToUnranked}>
            <div className="font-semibold">Unranked Units (drag here to unrank)</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {computeUnranked().map((u) => (
                <div key={u} draggable onDragStart={(e) => onDragStart(e, u, null, null)} className="p-1 bg-white border rounded text-sm">
                  {u}
                </div>
              ))}
            </div>
          </div>

          {message && <div className="text-sm text-gray-700">{message}</div>}
        </div>
      )}
    </div>
  );
}
