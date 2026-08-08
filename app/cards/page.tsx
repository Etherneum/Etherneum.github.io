"use client";

import { useMemo, useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const UI_COPY = {
  en: {
    title: "Cards",
    subtitle: (count: number) => `${count} units`,
    searchPlaceholder: "Search units...",
    clear: "Clear",
    clearAll: "Clear all",
    noResultsTitle: "No units match",
    noResultsBody: "Try a different search or turn a rarity filter back on.",
    qualityTier: "Quality tier",
    value: "Value",
    valueOptions: [
      { value: "all", label: "All" },
      { value: "low", label: "Low" },
      { value: "mid", label: "Mid" },
      { value: "high", label: "High" },
    ],
  },
  es: {
    title: "Cartas",
    subtitle: (count: number) => `${count} unidades`,
    searchPlaceholder: "Buscar unidades...",
    clear: "Borrar",
    clearAll: "Limpiar todo",
    noResultsTitle: "No hay unidades que coincidan",
    noResultsBody: "Prueba con otra búsqueda o vuelve a activar un filtro de rareza.",
    qualityTier: "Nivel de calidad",
    value: "Valor",
    valueOptions: [
      { value: "all", label: "Todo" },
      { value: "low", label: "Bajo" },
      { value: "mid", label: "Medio" },
      { value: "high", label: "Alto" },
    ],
  },
};
import { Unit } from "@/data/units";
import { RARITY_ORDER, RARITY_META, Rarity } from "@/data/rarity";
import { TRAIT_TIERS } from "@/data/traits";
import { MUTATIONS } from "@/data/mutations";
import { getDetailsById, normalizeId } from "@/data/unitDetails";
import { QUALITY_TIER_LIST } from "@/data/tierlists";
import CardTile from "@/components/CardTile";
import Portal from "@/components/Portal";

function getImagePathCandidates(unitName: string) {
  const slug = normalizeId(unitName);
  const normalizedName = unitName
    .replace(/\s+/g, "_")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9_]/g, "");
  const strippedParentheses = unitName.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const strippedName = strippedParentheses
    .replace(/\s+/g, "_")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9_]/g, "");

  return [
    `/cards/${encodeURIComponent(`${normalizedName}.png`)}`,
    `/cards/${encodeURIComponent(`${strippedName}.png`)}`,
    `/cards/${encodeURIComponent(`${slug}.png`)}`,
  ].filter(Boolean);
}

function parseMutationValue(value?: string) {
  if (!value) return 0;

  const normalized = value.trim().toLowerCase();

  if (normalized.startsWith("x")) {
    const multiplier = Number(normalized.slice(1));
    return Number.isFinite(multiplier) ? multiplier - 1 : 0;
  }

  const match = normalized.match(/([+-]?\d+(?:\.\d+)?)/);
  if (!match) return 0;
  return Number(match[1]) / 100;
}

function getBuffPercent(buffs: string | undefined, keyword: "damage" | "health" | "speed") {
  if (!buffs) return 0;
  const lower = buffs.toLowerCase();

  if (keyword === "speed") {
    const fasterMatch = lower.match(/([+-]?\d+(?:\.\d+)?)%\s*faster/);
    const slowerMatch = lower.match(/([+-]?\d+(?:\.\d+)?)%\s*slower/);
    const match = fasterMatch ?? slowerMatch;
    if (!match) return 0;
    const sign = slowerMatch ? -1 : 1;
    return Number(match[1]) / 100 * sign;
  }

  const match = lower.match(new RegExp(`([+-]?\\d+(?:\\.\\d+)?)%\\s*${keyword}`));
  return match ? Number(match[1]) / 100 : 0;
}

function getEffectiveStats(unit: Unit, traitName: string | null, mutationName: string | null) {
  const details = getDetailsById(unit.id)?.stats;
  const mutation = MUTATIONS.find((entry) => entry.name === mutationName);
  const trait = TRAIT_TIERS.flatMap((tier) => tier.traits).find((entry) => entry.name === traitName);

  const mutationDamageMultiplier = mutation ? parseMutationValue(mutation.damage) : 0;
  const mutationHealthMultiplier = mutation ? parseMutationValue(mutation.health) : 0;
  const mutationDefenseMultiplier = mutation ? parseMutationValue(mutation.defense) : 0;
  const mutationSpeedMultiplier = mutation ? parseMutationValue(mutation.speed) : 0;
  const traitDamageMultiplier = getBuffPercent(trait?.buffs, "damage");
  const traitHealthMultiplier = getBuffPercent(trait?.buffs, "health");
  const traitSpeedMultiplier = getBuffPercent(trait?.buffs, "speed");
  const speedMultiplier = (1 + mutationSpeedMultiplier) * (1 + traitSpeedMultiplier);

  return {
    damage: details?.damage ? details.damage * (1 + mutationDamageMultiplier + traitDamageMultiplier) : undefined,
    defense: details?.defense ? details.defense * (1 + mutationDefenseMultiplier) : undefined,
    health: details?.health ? details.health * (1 + mutationHealthMultiplier + traitHealthMultiplier) : undefined,
    speed: details?.speed ? details.speed / speedMultiplier : undefined,
  };
}

type ValueBucket = "all" | "low" | "mid" | "high";

function getValueBucket(unit: Unit): ValueBucket {
  const value = unit.value ?? 0;
  if (value >= 100000) return "high";
  if (value >= 10000) return "mid";
  return "low";
}

function getQualityTier(unit: Unit) {
  return QUALITY_TIER_LIST.find((tier) => tier.units.includes(unit.name))?.label ?? null;
}

export default function CardsPage() {
  const [query, setQuery] = useState("");
  const { language } = useLanguage();
  const [activeRarities, setActiveRarities] = useState<Set<Rarity>>(
    new Set(RARITY_ORDER)
  );
  const [selectedQualityTiers, setSelectedQualityTiers] = useState<string[]>([]);
  const [valueBucket, setValueBucket] = useState<ValueBucket>("all");
  const [units, setUnits] = useState<Unit[]>([]);
  const [selected, setSelected] = useState<Unit | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [selectedMutation, setSelectedMutation] = useState<string | null>(null);
  const [modalMounted, setModalMounted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedFormIndex, setSelectedFormIndex] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/cards/list.json")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          const normalized = data.map((unit: Unit & { image?: string }) => {
            if (unit.image) return unit;
            const imageCandidates = getImagePathCandidates(unit.name);
            return {
              ...unit,
              image: imageCandidates[0],
            };
          });
          setUnits(normalized);
        }
      })
      .catch(() => {
        if (!cancelled) setUnits([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSelectedTrait(null);
    setSelectedMutation(null);
    setSelectedLevel(1);
    setSelectedFormIndex(0);
  }, [selected?.id]);

  useEffect(() => {
    if (selected) {
      // small delay to allow portal mount then animate
      requestAnimationFrame(() => setModalMounted(true));
    } else {
      setModalMounted(false);
    }
  }, [selected]);

  const copy = UI_COPY[language];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return units
      .filter((unit) => {
        if (!activeRarities.has(unit.rarity)) return false;
        if (q && !unit.name.toLowerCase().includes(q) && !unit.id.toLowerCase().includes(q)) return false;
        if (selectedQualityTiers.length > 0 && !selectedQualityTiers.includes(getQualityTier(unit) ?? "")) return false;
        if (valueBucket !== "all" && getValueBucket(unit) !== valueBucket) return false;
        return true;
      })
      .sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity));
  }, [query, activeRarities, selectedQualityTiers, valueBucket, units]);

  const hasActiveFilters = useMemo(() => {
    return query.trim() !== "" || activeRarities.size !== RARITY_ORDER.length || selectedQualityTiers.length > 0 || valueBucket !== "all";
  }, [query, activeRarities.size, selectedQualityTiers.length, valueBucket]);

  const effectiveStats = useMemo(() => {
    if (!selected) return null;
    const details = getDetailsById(selected.id);
    if (!details) return null;

    // choose base stats: form stats if present and index valid, otherwise unit stats
    const forms = details.forms ?? [];
    const form = forms.length > 0 ? forms[selectedFormIndex % forms.length] : null;
    const baseStats = form?.stats ?? details.stats ?? null;
    if (!baseStats) return null;

    // apply trait and mutation multipliers (same logic as getEffectiveStats)
    const mutation = MUTATIONS.find((entry) => entry.name === selectedMutation);
    const trait = TRAIT_TIERS.flatMap((tier) => tier.traits).find((entry) => entry.name === selectedTrait);

    const mutationDamageMultiplier = mutation ? parseMutationValue(mutation.damage) : 0;
    const mutationHealthMultiplier = mutation ? parseMutationValue(mutation.health) : 0;
    const mutationDefenseMultiplier = mutation ? parseMutationValue(mutation.defense) : 0;
    const mutationSpeedMultiplier = mutation ? parseMutationValue(mutation.speed) : 0;
    const traitDamageMultiplier = getBuffPercent(trait?.buffs, "damage");
    const traitHealthMultiplier = getBuffPercent(trait?.buffs, "health");
    const traitSpeedMultiplier = getBuffPercent(trait?.buffs, "speed");
    const speedMultiplier = (1 + mutationSpeedMultiplier) * (1 + traitSpeedMultiplier);

    const levelDamageMul = selectedLevel === 7 ? 3 : 1;
    const levelHealthMul = selectedLevel === 7 ? 2.4 : 1;

    return {
      damage: baseStats.damage ? Math.round(baseStats.damage * (1 + mutationDamageMultiplier + traitDamageMultiplier) * levelDamageMul) : undefined,
      defense: baseStats.defense ? Math.round(baseStats.defense * (1 + mutationDefenseMultiplier)) : undefined,
      health: baseStats.health ? Math.round(baseStats.health * (1 + mutationHealthMultiplier + traitHealthMultiplier) * levelHealthMul) : undefined,
      speed: baseStats.speed ? Number((baseStats.speed / speedMultiplier).toFixed(2)) : undefined,
    };
  }, [selected, selectedTrait, selectedMutation, selectedLevel, selectedFormIndex]);

  const originalStats = useMemo(() => {
    if (!selected) return null;
    return getDetailsById(selected.id)?.stats ?? null;
  }, [selected]);

  const selectedRarityMeta = useMemo(() => {
    if (!selected) return null;
    return RARITY_META[selected.rarity];
  }, [selected]);

  const selectedRarityTitleStyle = useMemo(() => {
    if (!selected) return undefined;

    if (selected.rarity === "Mythic") {
      return {
        background: "linear-gradient(90deg, #f43f5e 0%, #fb7185 15%, #a855f7 35%, #8b5cf6 55%, #22c55e 75%, #34d399 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      };
    }

    return selectedRarityMeta?.hex ? { color: selectedRarityMeta.hex } : undefined;
  }, [selected, selectedRarityMeta]);

  function toggleRarity(rarity: Rarity) {
    setActiveRarities((prev) => {
      const next = new Set(prev);
      if (next.has(rarity)) {
        next.delete(rarity);
      } else {
        next.add(rarity);
      }
      return next;
    });
  }

  function selectOnly(rarity: Rarity) {
    setActiveRarities(new Set([rarity]));
  }

  function toggleQualityTier(label: string) {
    setSelectedQualityTiers((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      return [...prev, label];
    });
  }

  function resetFilters() {
    setQuery("");
    setActiveRarities(new Set(RARITY_ORDER));
    setSelectedQualityTiers([]);
    setValueBucket("all");
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-faint">
          {copy.subtitle(units.length)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-lg border border-ink-line bg-ink-surface px-4 py-2.5 pr-20 font-body text-sm text-text placeholder:text-text-faint focus:border-rarity-legendary"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text-dim hover:text-text"
              >
                {copy.clear}
              </button>
            )}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-red-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500/25 hover:text-white"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {RARITY_ORDER.map((rarity) => {
            const meta = RARITY_META[rarity];
            const active = activeRarities.has(rarity);
            return (
              <button
                key={rarity}
                onClick={() => toggleRarity(rarity)}
                onDoubleClick={() => selectOnly(rarity)}
                title="Click to toggle, double-click to isolate"
                className={`rounded-full border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-opacity ${meta.chip} ${
                  active ? "opacity-100" : "opacity-30"
                }`}
                style={rarity === "Mythic" ? {
                  backgroundImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3)",
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } : undefined}
              >
                {rarity}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-faint">{copy.qualityTier}</span>
          {QUALITY_TIER_LIST.map((tier) => {
            const active = selectedQualityTiers.includes(tier.label);
            return (
              <button
                key={tier.label}
                onClick={() => toggleQualityTier(tier.label)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  active ? "border-rarity-legendary/70 bg-rarity-legendary/15 text-text" : "border-ink-line bg-ink-surface text-text-dim"
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-faint">{copy.value}</span>
          {copy.valueOptions.map((option) => {
            const active = valueBucket === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setValueBucket(option.value as ValueBucket)}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  active ? "border-rarity-god/70 bg-rarity-god/15 text-text" : "border-ink-line bg-ink-surface text-text-dim"
                }`}
              >
                {option.label}
              </button>
            );
          })}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-dim hover:text-text"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-line p-12 text-center">
          <p className="font-display text-2xl font-black tracking-[0.06em] text-text-dim">{copy.noResultsTitle}</p>
          <p className="mt-1 font-body text-sm text-text-faint">
            {copy.noResultsBody}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((unit) => (
            <CardTile key={unit.id} unit={unit} onOpen={(u) => setSelected(u)} />
          ))}
        </div>
      )}

      {selected && (
        <Portal>
          <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${modalMounted ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"}`}>
              <div className="absolute inset-0" onClick={() => setSelected(null)} />
            <div className={`relative w-[90%] max-w-3xl origin-center rounded-xl border bg-ink-surface p-4 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.75)] transform-gpu transition-all duration-300 ease-out ${modalMounted ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-3"}`}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-2xl font-black">{selected.name}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLevel(1)}
                    className={`rounded-md px-2 py-1 text-sm font-medium ${selectedLevel === 1 ? 'bg-white/10' : 'bg-transparent'}`}
                    type="button"
                  >
                    Lvl 1
                  </button>
                  <button
                    onClick={() => setSelectedLevel(7)}
                    className={`rounded-md px-2 py-1 text-sm font-medium ${selectedLevel === 7 ? 'bg-white/10' : 'bg-transparent'}`}
                    type="button"
                  >
                    Lvl 7
                  </button>
                  {getDetailsById(selected.id)?.forms?.length ? (
                    <button
                      onClick={() => setSelectedFormIndex((prev) => {
                        const forms = getDetailsById(selected.id)!.forms!;
                        return (prev + 1) % forms.length;
                      })}
                      className="ml-2 rounded-md bg-rose-500 px-3 py-1 text-sm font-semibold text-white hover:bg-rose-600"
                      type="button"
                    >
                      Switch Form
                    </button>
                  ) : null}
                  <button className="ml-2 text-text-dim" onClick={() => setSelected(null)}>×</button>
                </div>
              </div>
              <div className="mt-3 flex gap-4">
                <div
                  className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-lg"
                  style={
                    selected.rarity === "Mythic"
                      ? { backgroundColor: RARITY_META[selected.rarity].hex + "14" }
                      : { backgroundColor: RARITY_META[selected.rarity].hex + "08" }
                  }
                >
                  {selected.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">No image</div>
                  )}
                </div>
                <div className="flex-1 max-h-[60vh] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase"
                      style={selected.rarity === "Mythic" ? {
                        color: "#f8fafc",
                        borderColor: "transparent",
                        borderRadius: "9999px",
                        borderImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3) 1",
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                      } : { color: RARITY_META[selected.rarity].hex, borderColor: RARITY_META[selected.rarity].hex + "66", backgroundColor: RARITY_META[selected.rarity].hex + "14" }}
                    >
                      {selected.rarity}
                    </div>
                    <div className="w-fit rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase" style={{ color: "#111", borderColor: "#ccc", backgroundColor: "#f3f4f6" }}>{QUALITY_TIER_LIST.find(r=>r.units.includes(selected.name))?.label ?? "—"}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <h4 className="font-semibold">Damage</h4>
                      <p className="text-sm font-semibold text-text">
                        {effectiveStats?.damage?.toLocaleString() ?? "—"}
                        {(selectedTrait || selectedMutation) && (
                          <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-200 animate-pulse">
                            Modified
                          </span>
                        )}
                      </p>
                      {(selectedTrait || selectedMutation) && originalStats?.damage != null && (
                        <p className="mt-1 text-[0.75rem] text-text-dim">Base {originalStats.damage.toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">Defense</h4>
                      <p className="text-sm font-semibold text-text">
                        {effectiveStats?.defense?.toLocaleString() ?? "—"}
                        {(selectedTrait || selectedMutation) && (
                          <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-200">
                            Modified
                          </span>
                        )}
                      </p>
                      {(selectedTrait || selectedMutation) && originalStats?.defense != null && (
                        <p className="mt-1 text-[0.75rem] text-text-dim">Base {originalStats.defense.toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">Health</h4>
                      <p className="text-sm font-semibold text-text">
                        {effectiveStats?.health?.toLocaleString() ?? "—"}
                        {(selectedTrait || selectedMutation) && (
                          <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-200">
                            Modified
                          </span>
                        )}
                      </p>
                      {(selectedTrait || selectedMutation) && originalStats?.health != null && (
                        <p className="mt-1 text-[0.75rem] text-text-dim">Base {originalStats.health.toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">Speed (sec/atk)</h4>
                      <p className="text-sm font-semibold text-text">
                        {effectiveStats?.speed?.toLocaleString() ?? "—"}
                        {(selectedTrait || selectedMutation) && (
                          <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-200">
                            Modified
                          </span>
                        )}
                      </p>
                      {(selectedTrait || selectedMutation) && originalStats?.speed != null && (
                        <p className="mt-1 text-[0.75rem] text-text-dim">Base {originalStats.speed.toLocaleString()}</p>
                      )}
                      <p className="mt-1 text-[0.75rem] text-text-faint">Lower is faster</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 rounded-xl border p-3 shadow-sm"
                    style={{
                      borderColor: selectedRarityMeta?.hex ? `${selectedRarityMeta.hex}55` : undefined,
                      background: selectedRarityMeta?.hex
                        ? `linear-gradient(135deg, ${selectedRarityMeta.hex}18 0%, rgba(255,255,255,0.03) 100%)`
                        : undefined,
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{
                          backgroundColor: selectedRarityMeta?.hex ? `${selectedRarityMeta.hex}22` : undefined,
                          color: selectedRarityMeta?.hex ?? undefined,
                          border: selectedRarityMeta?.hex ? `1px solid ${selectedRarityMeta.hex}44` : undefined,
                        }}
                      >
                        Ability
                      </div>
                    </div>
                    {getDetailsById(selected.id)?.ability ? (
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-white" style={selectedRarityTitleStyle}>
                          {getDetailsById(selected.id)!.ability!.title}
                        </div>
                        <div className="text-sm leading-relaxed text-text-faint">
                          {getDetailsById(selected.id)!.ability!.description}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-text-faint">No ability info</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold">Trait</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TRAIT_TIERS.map((tier) => (
                        tier.traits.map((tr) => {
                          const active = selectedTrait === tr.name;
                          return (
                            <button
                              key={tr.name}
                              onClick={() => setSelectedTrait(active ? null : tr.name)}
                              className={`rounded px-3 py-1 text-sm font-medium ${active ? 'ring-2 ring-offset-1' : ''}`}
                              style={{ backgroundColor: tier.color + '22', border: `1px solid ${tier.color}`, color: tier.color }}
                            >
                              {tr.name}
                            </button>
                          );
                        })
                      ))}
                    </div>
                    {selectedTrait && <div className="mt-2 text-sm text-text-faint">{TRAIT_TIERS.flatMap(t => t.traits).find(x => x.name === selectedTrait)?.buffs}</div>}

                    <h4 className="font-semibold mt-4">Mutation</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {MUTATIONS.map((m) => {
                        const active = selectedMutation === m.name;
                        return (
                          <button
                            key={m.name}
                            onClick={() => setSelectedMutation(active ? null : m.name)}
                            className={`rounded px-3 py-1 text-sm font-medium ${active ? 'ring-2 ring-offset-1' : ''}`}
                            style={{ backgroundColor: m.color + '22', border: `1px solid ${m.color}`, color: m.color }}
                          >
                            {m.name}
                          </button>
                        );
                      })}
                    </div>
                    {selectedMutation && <div className="mt-2 text-sm text-text-faint">{MUTATIONS.find(m => m.name === selectedMutation)?.damage} / {MUTATIONS.find(m => m.name === selectedMutation)?.health}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
