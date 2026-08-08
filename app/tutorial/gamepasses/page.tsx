"use client";

import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { GAMEPASS_PRIORITY, GAMEPASSES } from "@/data/gamepasses";
import { useEffect, useState } from "react";

export default function GamepassesPage() {
  const [listMounted, setListMounted] = useState(false);
  const rankMap = new Map(GAMEPASS_PRIORITY.map((name, index) => [name, index + 1]));
  const sortedGamepasses = [...GAMEPASSES].sort((a, b) => {
    const rankA = rankMap.get(a.name) ?? Number.MAX_SAFE_INTEGER;
    const rankB = rankMap.get(b.name) ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    // small delay so CSS transitions apply
    const id = setTimeout(() => setListMounted(true), 40);
    return () => clearTimeout(id);
  }, []);

  return (
    <TutorialSectionShell
      title="Gamepass Priority"
      description="Ranked gamepasses give the strongest value first. Unranked passes are mostly cosmetic or quality-of-life upgrades."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/** trigger mount animations after hydration */}
        <div style={{ display: 'none' }} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {sortedGamepasses.map((pass, idx) => {
            const rank = rankMap.get(pass.name);
            const isRanked = rank != null;
            return (
              <article
                key={pass.name}
                className={`rounded-3xl border p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform-gpu will-change-transform transition-transform duration-300 ${
                  isRanked
                    ? "border-cyan-500/20 bg-cyan-500/5 hover:-translate-y-1 hover:shadow-2xl"
                    : "border-ink-line bg-ink-surface/80 opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                }`}
                style={{ transitionDelay: `${listMounted ? idx * 40 : 0}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                      {isRanked ? `Rank ${rank}` : "Unranked"}
                    </p>
                    <h2 className="mt-3 text-lg font-display font-black tracking-[0.04em] text-text">
                      {pass.name}
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-text">
                    {pass.price}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-text-dim">{pass.description}</p>
                {!isRanked ? (
                  <p className="mt-4 rounded-2xl bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-200">
                    Low priority: not essential for progression.
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">How to use this page</p>
            <h3 className="mt-3 text-2xl font-display font-black text-text">Spend Robux smarter</h3>
            <p className="mt-4 text-sm leading-6 text-text-dim">
              Focus on the ranked passes first, especially the top 6. These passes boost core progression and summoning value most effectively.
            </p>
            <p className="mt-4 text-sm leading-6 text-text-dim">
              Unranked passes like display upgrades are fine if you want extra slots, but they don’t improve power or rewards directly.
            </p>
          </div>

          <div className="rounded-3xl border border-ink-line/70 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-ink-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Top priority</p>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-text-dim">
              {GAMEPASS_PRIORITY.slice(0, 3).map((pass, index) => (
                <li key={pass} className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-ink">
                    {index + 1}
                  </span>
                  <span>{pass}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </TutorialSectionShell>
  );
}
