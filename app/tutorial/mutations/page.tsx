"use client";

import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { MUTATIONS } from "@/data/mutations";
import { useEffect, useState } from "react";

function formatMutationValue(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized.startsWith("x")) {
    return normalized;
  }
  return value;
}

export default function MutationsPage() {
  const [rowsMounted, setRowsMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setRowsMounted(true), 40);
    return () => clearTimeout(id);
  }, []);
  return (
    <TutorialSectionShell
      title="Mutation Events"
      description="Each mutation gives a percentage boost to damage and health, and events happen on a fixed schedule."
    >
      <div className="overflow-hidden rounded-xl border border-ink-line transition-all duration-300 ease-out hover:-translate-y-0.5">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-ink-surface2 font-body text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-2.5 font-semibold">Mutation</th>
              <th className="px-4 py-2.5 font-semibold">Damage</th>
              <th className="px-4 py-2.5 font-semibold">Health</th>
            </tr>
          </thead>
          <tbody>
            {MUTATIONS.map((mut, i) => (
              <tr
                key={mut.name}
                className={`${i % 2 === 0 ? "bg-ink-surface" : "bg-ink-surface/60"} ${mut.name === "Astronaut" ? "ring-2 ring-amber-300/20 bg-amber-200/5" : ""}`}
                style={{ transition: 'all 220ms ease', transitionDelay: `${rowsMounted ? i * 40 : 0}ms`, transform: rowsMounted ? 'translateY(0)' : 'translateY(6px)', opacity: rowsMounted ? 1 : 0 }}
              >
                <td className="px-4 py-3 font-body text-sm font-semibold" style={{ color: mut.color }}>
                  {mut.name}
                  {mut.name === "Astronaut" && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-200/10 px-2 py-0.5 text-xs font-semibold text-amber-200 animate-pulse">✦</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-text">{formatMutationValue(mut.damage)}</td>
                <td className="px-4 py-3 font-mono text-sm text-text">{formatMutationValue(mut.health)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-ink-line bg-ink-surface p-5 transition-all duration-300 ease-out hover:-translate-y-0.5">
        <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Event schedule</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            { name: "Demon", time: "xx:15" },
            { name: "Destroyer", time: "xx:30" },
            { name: "Hollow", time: "xx:45" },
            { name: "Slayer", time: "xx:00" },
            { name: "Astronaut", time: "Every Admin Abuse" },
          ].map((event) => (
            <li key={event.name} className="flex items-center justify-between gap-3 border-b border-ink-line/70 py-2 transition-all duration-300 ease-out last:border-none hover:-translate-y-0.5">
              <span className="font-body text-sm font-semibold text-text">{event.name}</span>
              <span className="font-mono text-sm text-text-dim">{event.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </TutorialSectionShell>
  );
}
