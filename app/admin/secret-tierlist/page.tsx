"use client";
import React, { useEffect, useState } from "react";
import { getUnitByName } from "@/data/units";
import { RARITY_META } from "@/data/rarity";

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
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [allLists, setAllLists] = useState<Record<string, TierRow[]>>({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [rows, setRows] = useState<TierRow[]>([]);
  const [activeSearchRow, setActiveSearchRow] = useState<number | null>(null);
  const [rowSearch, setRowSearch] = useState<Record<number, string>>({});

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
      // also fetch card list to map unit names to images
      try {
        const cards = await fetch("/cards/list.json").then((r) => r.json());
        const map: Record<string, string> = {};
        function normalize(s: string) {
          return s.replace(/[()\[\].,\-]/g, "").toLowerCase().trim();
        }
        for (const c of cards) {
          if (!c || !c.name) continue;
          map[c.name] = c.image || "";
          map[normalize(c.name)] = c.image || "";
        }
        setImageMap(map);
      } catch (e) {
        // ignore missing cards file
      }
      setAllLists(t ?? {});
      // Try to auto-select the same tier list the public page is using.
      try {
        const stored = localStorage.getItem('tierlistTab');
        const map: Record<string, string> = {
          tanks: 'TANKS_TIER_LIST',
          damage: 'DAMAGE_DEALERS_TIER_LIST',
          support: 'SUPPORT_TIER_LIST',
        };
        if (stored && map[stored] && (t ?? {})[map[stored]]) {
          setSelectedKey(map[stored]);
        }
      } catch (e) {
        // ignore
      }
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

  function addUnitToRow(rowIndex: number, unitName: string) {
    setRows((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const copy = prevArr.map((r) => ({ ...r, units: Array.isArray(r.units) ? [...r.units] : [] }));
      if (!copy[rowIndex].units.includes(unitName)) copy[rowIndex].units.push(unitName);
      return copy;
    });
    setMessage(`Added ${unitName}`);
  }

  function removeAllFromRow(rowIndex: number) {
    setRows((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      return prevArr.map((r, idx) => (idx === rowIndex ? { ...r, units: [] } : r));
    });
    setMessage(`Cleared ${rows[rowIndex]?.label ?? "row"}`);
  }

  function removeUnitFromRow(rowIndex: number, unitName: string) {
    setRows((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const copy = prevArr.map((r) => ({ ...r, units: Array.isArray(r.units) ? [...r.units] : [] }));
      const idx = copy[rowIndex]?.units.indexOf(unitName);
      if (idx != null && idx !== -1) copy[rowIndex].units.splice(idx, 1);
      return copy;
    });
    setMessage(`Removed ${unitName}`);
  }

  function searchOptions(rowIndex: number) {
    const query = rowSearch[rowIndex] || "";
    const lower = query.toLowerCase().trim();
    const ranked = new Set<string>();
    rows.forEach((r) => r.units.forEach((u) => ranked.add(u)));
    return availableUnits
      .filter((u) => !ranked.has(u) && (u.toLowerCase().includes(lower) || lower === ""))
      .slice(0, 12);
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

          <div className="space-y-4">
            {rows.map((row, idx) => (
              <div key={row.label} className="rounded-[1.2rem] border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-transparent p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5" onDragOver={allowDrop} onDrop={(e) => onDropToRow(e, idx)}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3" style={{ color: row.color }}>
                      <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: row.color }} />
                      <div>
                        <div className="font-display text-2xl font-black tracking-[0.06em] sm:text-3xl">{row.label}</div>
                        {row.sublabel && <p className="font-body text-xs text-text-faint">{row.sublabel}</p>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveSearchRow(idx === activeSearchRow ? null : idx)}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-text transition hover:bg-white/15"
                      >
                        Add unit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAllFromRow(idx)}
                        className="rounded-full border border-red-400 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                      >
                        Remove all
                      </button>
                    </div>
                  </div>

                  {activeSearchRow === idx ? (
                    <div className="rounded-2xl border border-white/10 bg-ink-surface/80 p-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <input
                          value={rowSearch[idx] || ""}
                          onChange={(e) => setRowSearch((prev) => ({ ...prev, [idx]: e.target.value }))}
                          placeholder="Search units to add..."
                          className="w-full rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm text-text outline-none transition focus:border-white/20 sm:w-80"
                        />
                        <button
                          type="button"
                          onClick={() => setActiveSearchRow(null)}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold text-text transition hover:bg-white/15"
                        >
                          Close
                        </button>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 max-h-64 overflow-y-auto">
                        {searchOptions(idx).map((name) => {
                          const image = imageMap[name] || imageMap[name.toLowerCase()];
                          return (
                            <button
                              key={name}
                              type="button"
                              onClick={() => addUnitToRow(idx, name)}
                              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-text transition hover:bg-white/10 justify-between"
                            >
                                <div className="flex items-center gap-3">
                                  {image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={image} alt={name} className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
                                  ) : (
                                    <span className="h-10 w-10 rounded-lg bg-white/10" />
                                  )}
                                  <span className="truncate max-w-[12rem]">{name}</span>
                                </div>
                                <div className="ml-3 flex-shrink-0 text-right text-xs text-text-faint">
                                  {(() => {
                                    const unit = getUnitByName(name);
                                    const hp = unit?.stats?.health;
                                    const dmg = unit?.stats?.damage;
                                    const fmt = (n: number | undefined) => (n == null ? "—" : n.toLocaleString());
                                    return (
                                      <div className="flex flex-col">
                                        <span>HP: {fmt(hp as any)}</span>
                                        <span>DMG: {fmt(dmg as any)}</span>
                                      </div>
                                    );
                                  })()}
                                </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-2 md:grid-cols-2">
                    {row.units.map((name) => {
                      const unit = getUnitByName(name);
                      const meta = unit ? RARITY_META[unit.rarity] : null;
                      const id = unit ? unit.id : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      const image = imageMap[name] || imageMap[id] || imageMap[name.toLowerCase()];
                      return (
                        <div
                          key={name}
                          draggable
                          onDragStart={(e) => onDragStart(e, name, selectedKey, idx)}
                          className={`w-full flex items-center justify-between gap-2 rounded-[0.95rem] border px-2.5 py-2 font-body text-xs font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 sm:text-sm ${
                            meta ? `${meta.border} ${meta.bg} ${meta.text}` : "border-white/10 bg-white/5 text-text-dim"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <div className="h-12 w-12 overflow-hidden rounded-lg border border-black/20 bg-black/10 sm:h-14 sm:w-14">
                                <img src={image} alt={name} className="h-full w-full object-cover" loading="lazy" />
                              </div>
                            ) : (
                              <span className="h-12 w-12 rounded-lg border border-current/20 bg-black/10 sm:h-14 sm:w-14" />
                            )}
                            <span className="truncate">{name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => removeUnitFromRow(idx, name)}
                              onMouseDown={(e) => e.stopPropagation()}
                              className="rounded-full border border-red-400 bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border p-2" onDragOver={allowDrop} onDrop={onDropToUnranked}>
            <div className="font-semibold">Unranked Units (drag here to unrank)</div>
            <div className="mt-2 flex flex-col gap-2">
              {computeUnranked().map((u) => (
                <div key={u} draggable onDragStart={(e) => onDragStart(e, u, null, null)} className="w-full p-2 bg-white/5 border rounded text-sm">
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
