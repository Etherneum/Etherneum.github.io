"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { SUPPORT_TIER_LIST, TierRow, AUTO_TIER_CATEGORIES } from "@/data/tierlists";
import { getUnitByName } from "@/data/units";
import { UNIT_DETAILS } from "@/data/unitDetails";
import { RARITY_META } from "@/data/rarity";

type UnitMap = Record<string, { image?: string }>;

const TABS = {
  en: [
    { key: "tanks", label: "Tanks" },
    { key: "damage", label: "Damage Dealers" },
    { key: "support", label: "Support" },
  ],
  es: [
    { key: "tanks", label: "Tanques" },
    { key: "damage", label: "Atacantes" },
    { key: "support", label: "Apoyo" },
  ],
} as const;

function TierRowShelf({ row, unitMap }: { row: TierRow; unitMap: Record<string, { image?: string }>; }) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-line/70 py-5 sm:flex-row sm:gap-6">
      <div
        className="flex shrink-0 items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-1"
        style={{ color: row.color }}
      >
        <div className="flex items-center gap-2">
          <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: row.color }} />
          <span className="font-display text-3xl font-black tracking-[0.06em]">{row.label}</span>
        </div>
        {row.sublabel && (
          <p className="font-body text-xs text-text-faint sm:pl-3.5">{row.sublabel}</p>
        )}
      </div>
      <div className="flex flex-1 flex-wrap gap-2">
        {row.units.map((name) => {
          const unit = getUnitByName(name);
          const meta = unit ? RARITY_META[unit.rarity] : null;
          const id = unit ? unit.id : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const image = unitMap[id]?.image;
          return (
            <span
              key={name}
              className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-body text-xs font-medium sm:text-sm ${
                meta ? `${meta.border} ${meta.bg} ${meta.text}` : "border-ink-line text-text-dim"
              }`}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <div className="h-14 w-14 overflow-hidden rounded-md">
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <span className="h-14 w-14 rounded-md border border-current/20 bg-black/10" />
              )}
              <span>{name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function resolveTierRowCounts(category: typeof AUTO_TIER_CATEGORIES[keyof typeof AUTO_TIER_CATEGORIES], total: number) {
  const explicitCounts = category.rows.map((row) => row.size.count ?? 0);
  const explicitTotal = explicitCounts.reduce((sum, count) => sum + count, 0);
  const percentRows = category.rows.map((row) => ({
    row,
    desired: row.size.percent ? Math.round((row.size.percent / 100) * total) : 0,
  }));
  const remaining = Math.max(total - explicitTotal, 0);
  const percentTotal = percentRows.reduce((sum, entry) => sum + entry.desired, 0);
  const scale = percentTotal > remaining && percentTotal > 0 ? remaining / percentTotal : 1;

  const counts = category.rows.map((row, index) => {
    if (row.size.count != null) {
      return row.size.count;
    }
    const desired = percentRows[index].desired;
    return Math.max(Math.floor(desired * scale), 0);
  });

  let allocated = counts.reduce((sum, count) => sum + count, 0);
  if (allocated < total && counts.length > 0) {
    counts[counts.length - 1] += total - allocated;
  }
  return counts;
}

function getAutoTierRows(key: "tanks" | "damage") {
  const category = AUTO_TIER_CATEGORIES[key];
  const metric = category.metric;
  const units = UNIT_DETAILS.filter((unit) => typeof unit.stats?.[metric] === "number");
  const sortedUnits = [...units].sort((a, b) => {
    const aValue = a.stats?.[metric] ?? 0;
    const bValue = b.stats?.[metric] ?? 0;
    return category.sortDescending ? bValue - aValue : aValue - bValue;
  });
  const counts = resolveTierRowCounts(category, sortedUnits.length);
  const rows: TierRow[] = [];
  let offset = 0;

  for (let index = 0; index < category.rows.length; index += 1) {
    const row = category.rows[index];
    const count = Math.min(counts[index], sortedUnits.length - offset);
    const slice = sortedUnits.slice(offset, offset + count).map((unit) => unit.name);
    offset += count;
    rows.push({
      label: row.label,
      sublabel: row.sublabel,
      color: row.color,
      units: slice,
    });
  }

  return rows;
}

export default function TierListPage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<(typeof TABS)["en"][number]["key"]>("tanks");
  const tabs = TABS[language];
  const [unitMap, setUnitMap] = useState<UnitMap>({});
  const rows = useMemo(() => {
    if (tab === "support") return SUPPORT_TIER_LIST;
    return getAutoTierRows(tab as "tanks" | "damage");
  }, [tab]);

  useEffect(() => {
    fetch('/cards/list.json')
      .then((r) => r.json())
      .then((items: any[]) => {
        const map: UnitMap = {};
        items.forEach((it) => { map[it.id] = { image: it.image }; });
        setUnitMap(map);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          {language === "es" ? "Lista de niveles" : "Tier List"}
        </h1>
        <div className="inline-flex gap-1 rounded-full border border-ink-line bg-ink-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors duration-300 sm:flex-initial ${
                tab === t.key
                  ? "bg-rarity-legendary text-ink"
                  : "text-text-dim hover:text-text"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} className="fade-in rounded-2xl border border-ink-line bg-ink-surface px-4 sm:px-6">
        {rows.map((row) => (
          <TierRowShelf key={row.label} row={row} unitMap={unitMap} />
        ))}
      </div>
    </div>
  );
}
