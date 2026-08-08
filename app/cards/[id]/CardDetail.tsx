'use client';

import { useEffect, useState } from 'react';
import { RARITY_META } from "@/data/rarity";
import type { Unit } from "@/data/units";
import {
  DEFAULT_MODIFIER_BONUSES,
  getModifierBreakdown,
} from "@/data/unitValues";

interface CardDetailProps {
  unit: Unit | undefined;
  displayName: string;
  imageUrl: string | undefined;
  breakdown: any;
}

export default function CardDetail({ unit, displayName, imageUrl, breakdown }: CardDetailProps) {
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const rarity = unit ? unit.rarity : ("Common" as const);
  const meta = RARITY_META[rarity];

  const forms = unit?.forms || [];
  const currentForm = forms.length > 0 ? forms[selectedFormIndex] : null;
  const currentStats = currentForm?.stats || unit?.stats;
  const currentAbility = currentForm?.ability || unit?.ability;
  const currentDisplayName = currentForm?.name || displayName;
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  useEffect(() => {
    setSelectedFormIndex(0);
  }, [unit?.id]);

  // Apply simple level multipliers per user request:
  // Level 1 = normal, Level 7 (A) => health x2.4, damage x3
  const displayedStats = currentStats
    ? {
        damage: currentStats.damage !== undefined ? Math.round(currentStats.damage * (selectedLevel === 7 ? 3 : 1)) : undefined,
        defense: currentStats.defense,
        health: currentStats.health !== undefined ? Math.round(currentStats.health * (selectedLevel === 7 ? 2.4 : 1)) : undefined,
        speed: currentStats.speed,
      }
    : null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
      <div className="flex items-start gap-4">
        <div className="h-32 w-32 overflow-hidden rounded-lg border" style={{ backgroundColor: meta.hex + "14" }}>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={currentDisplayName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">{currentDisplayName}</div>
          )}
        </div>
        <div>
          <h1 className="font-display text-2xl font-black">{currentDisplayName}</h1>
          <div
            className="mt-2 w-fit rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase"
            style={rarity === "Mythic" ? {
              color: "#f8fafc",
              borderColor: "transparent",
              borderImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3) 1",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
            } : { color: meta.hex, borderColor: meta.hex + "66", backgroundColor: meta.hex + "14" }}
          >
            {rarity}
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end gap-2">
          <div className="inline-flex items-center gap-2">
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
              Lvl 7 (A)
            </button>
          </div>
          {forms.length > 0 && (
            <button
              onClick={() => setSelectedFormIndex((prev) => (prev + 1) % forms.length)}
              className="mt-1 rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-600"
              type="button"
            >
              Switch Form
            </button>
          )}
        </div>
      </div>


      <div className="rounded-2xl border border-ink-line bg-ink-surface p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-black">Stats {currentForm && `- ${currentForm.name}`}</h2>
          <div className="inline-flex items-center gap-2">
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
              Lvl 7 (A)
            </button>
          </div>
        </div>
        {displayedStats ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {displayedStats.damage !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Damage</p>
                <p className="mt-2 text-lg font-semibold text-text">{displayedStats.damage.toLocaleString()}</p>
              </div>
            )}
            {displayedStats.defense !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Defense</p>
                <p className="mt-2 text-lg font-semibold text-text">{displayedStats.defense}</p>
              </div>
            )}
            {displayedStats.health !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Health</p>
                <p className="mt-2 text-lg font-semibold text-text">{displayedStats.health.toLocaleString()}</p>
              </div>
            )}
            {displayedStats.speed !== undefined && (
              <div className="rounded-xl border border-ink-line/70 bg-ink p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Speed (sec/atk)</p>
                <p className="mt-2 text-lg font-semibold text-text">{displayedStats.speed}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-3 text-sm text-text-faint">No stats available for this unit yet.</p>
        )}
      </div>

      {/* Modifiers / traits area: make scrollable to reduce vertical footprint */}
      <div className="rounded-2xl border border-ink-line bg-ink-surface p-3">
        <h3 className="font-display text-sm font-bold">Modifiers & Traits</h3>
        <div className="mt-2 max-h-40 overflow-y-auto pr-2 text-sm text-text-dim">
          {/* Recompute breakdown for selected level so values match */}
          {unit ? (() => {
            const local = getModifierBreakdown(unit, { mutation: null, trait: null, level: selectedLevel }, DEFAULT_MODIFIER_BONUSES);
            return (
              <div className="space-y-2">
                <div>Level multiplier: <strong>{local?.levelMultiplier ?? 1}</strong> (level {local?.level})</div>
                <div>Base value: <strong>{(local?.baseValue ?? 0).toLocaleString()}</strong></div>
                <div>Total value: <strong>{Math.round(local?.total ?? 0).toLocaleString()}</strong></div>
                <div className="pt-2">Traits and mutations can be selected from team builder — this panel is scrollable.</div>
              </div>
            );
          })() : (
            <div>No modifier data.</div>
          )}
        </div>
      </div>

      {currentAbility && (
        <div className="rounded-2xl border border-ink-line bg-ink-surface p-4">
          <div className="flex items-start justify-between gap-4">
            <div
              onClick={() => {
                if (forms.length > 0) {
                  setSelectedFormIndex((prev) => (prev + 1) % forms.length);
                }
              }}
              className={`${forms.length > 0 ? 'cursor-pointer hover:bg-ink-surface2 transition-colors p-1 rounded' : ''} flex-1`}
            >
              <h2 className="font-display text-lg font-black">{currentAbility.title}</h2>
              <p className="mt-2 text-sm text-text">{currentAbility.description}</p>
              {forms.length > 0 && (
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-faint">Current: {currentForm?.name ?? displayName} • Tap ability to switch</p>
              )}
            </div>

            {forms.length > 0 && (
              <div className="shrink-0">
                <button
                  onClick={() => setSelectedFormIndex((prev) => (prev + 1) % forms.length)}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
                  type="button"
                >
                  Switch Form
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="prose">
        <p>No bio yet. Edit data/units.ts or drop a card image into public/cards to add this unit.</p>
      </div>
    </div>
  );
}
