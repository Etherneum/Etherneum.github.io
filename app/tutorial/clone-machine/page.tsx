"use client";

import { useMemo, useState } from "react";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import CardTile from "@/components/CardTile";
import Portal from "@/components/Portal";
import { UNITS, type Unit } from "@/data/units";

type UnitRarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic" | "Secret" | "God";
type MutationOption = "None" | "Gold" | "Diamond" | "Demon" | "Destroyer" | "Hollow" | "Slayer" | "Cursed";
type TraitOption = "None" | "Rare" | "Epic" | "Legendary" | "Mythic" | "God";

const rarityCosts: Record<UnitRarity, number> = {
  Common: 3,
  Rare: 4,
  Epic: 6,
  Legendary: 8,
  Mythic: 10,
  Secret: 12,
  God: 15,
};

const baseTimes: Record<UnitRarity, number> = {
  Common: 1,
  Rare: 5,
  Epic: 15,
  Legendary: 45,
  Mythic: 60,
  Secret: 120,
  God: 240,
};

const mutationMultipliers: Record<MutationOption, number> = {
  None: 1,
  Gold: 1.5,
  Diamond: 2,
  Demon: 3,
  Destroyer: 4.5,
  Hollow: 6,
  Slayer: 7.5,
  Cursed: 9,
};

const fullTraitBenchmarks: Record<UnitRarity, number> = {
  Common: 240,
  Rare: 240,
  Epic: 240,
  Legendary: 360,
  Mythic: 720,
  Secret: 960,
  God: 1200,
};

const traitWeights: Record<TraitOption, number> = {
  None: 0,
  Rare: 0.25,
  Epic: 0.5,
  Legendary: 0.75,
  Mythic: 0.9,
  God: 1,
};

function formatMinutes(totalMinutes: number) {
  if (totalMinutes < 60) {
    return `${Math.round(totalMinutes)}m`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  if (!minutes) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

export default function CloneMachinePage() {
  const [selectedUnitName, setSelectedUnitName] = useState<string>("Itadoro");
  const [mutation, setMutation] = useState<MutationOption>("None");
  const [trait, setTrait] = useState<TraitOption>("None");
  const [isUnitPickerOpen, setIsUnitPickerOpen] = useState(false);

  const selectedUnit = useMemo(() => UNITS.find((unit) => unit.name === selectedUnitName) ?? null, [selectedUnitName]);

  const estimate = useMemo(() => {
    const resolvedRarity = selectedUnit?.rarity as UnitRarity | undefined;
    const baseMinute = resolvedRarity ? baseTimes[resolvedRarity] : baseTimes.Legendary;
    const mutationTime = baseMinute * mutationMultipliers[mutation];
    const fullTraitTime = resolvedRarity ? fullTraitBenchmarks[resolvedRarity] : fullTraitBenchmarks.Legendary;
    const traitTime = baseMinute + traitWeights[trait] * (fullTraitTime - baseMinute);

    const estimatedMinutes = mutationTime * (1 + traitWeights[trait] * ((fullTraitTime / baseMinute) - 1));
    const essenceCost = resolvedRarity ? rarityCosts[resolvedRarity] : rarityCosts.Legendary;

    return {
      essenceCost,
      estimatedMinutes,
      mutationTime,
      traitTime,
      baseMinute,
    };
  }, [selectedUnitName, mutation, trait]);

  return (
    <TutorialSectionShell
      title="Clone Machine"
      description="Pick a unit, mutation, and trait to estimate the clone-machine cost and timing. The numbers are based on the values you shared and use interpolation for the gaps between known points."
    >
      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-ink-line bg-ink-surface/70 p-5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Interactive estimate</h2>
          <p className="mt-2 text-sm text-text-dim">Level 1 is assumed, since the level data was not included in your notes.</p>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-text">
              <span className="font-semibold">Unit</span>
              <button
                type="button"
                onClick={() => setIsUnitPickerOpen(true)}
                className="rounded-lg border border-ink-line bg-ink-surface2 px-3 py-2 text-left text-sm text-text"
              >
                {selectedUnit?.name ?? "Select unit"}
              </button>
            </label>

            <label className="flex flex-col gap-2 text-sm text-text">
              <span className="font-semibold">Mutation</span>
              <select
                value={mutation}
                onChange={(event) => setMutation(event.target.value as MutationOption)}
                className="rounded-lg border border-ink-line bg-ink-surface2 px-3 py-2 text-sm text-text"
              >
                {Object.keys(mutationMultipliers).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-text">
              <span className="font-semibold">Trait tier</span>
              <select
                value={trait}
                onChange={(event) => setTrait(event.target.value as TraitOption)}
                className="rounded-lg border border-ink-line bg-ink-surface2 px-3 py-2 text-sm text-text"
              >
                {Object.keys(traitWeights).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-ink-line bg-ink-surface p-3">
              <div className="text-sm font-semibold text-text">Essence cost</div>
              <div className="mt-1 font-mono text-sm text-rarity-legendary">{estimate.essenceCost} essence</div>
            </div>
            <div className="rounded-xl border border-ink-line bg-ink-surface p-3">
              <div className="text-sm font-semibold text-text">Estimated clone time</div>
              <div className="mt-1 font-mono text-sm text-rarity-legendary">{formatMinutes(estimate.estimatedMinutes)}</div>
            </div>
            <div className="rounded-xl border border-ink-line bg-ink-surface p-3">
              <div className="text-sm font-semibold text-text">Base time for this rarity</div>
              <div className="mt-1 font-mono text-sm text-rarity-legendary">{formatMinutes(estimate.baseMinute)}</div>
            </div>
            <div className="rounded-xl border border-ink-line bg-ink-surface p-3">
              <div className="text-sm font-semibold text-text">Trait benchmark</div>
              <div className="mt-1 font-mono text-sm text-rarity-legendary">{formatMinutes(estimate.traitTime)}</div>
            </div>
          </div>
        </section>

        {isUnitPickerOpen && (
          <Portal>
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
              <div className="flex max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-surface shadow-2xl">
                <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
                  <div>
                    <h3 className="font-display text-lg font-black tracking-[0.06em] text-text">Choose a unit</h3>
                    <p className="mt-1 text-sm text-text-dim">Select the unit you want to estimate for.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUnitPickerOpen(false)}
                    className="rounded-full border border-ink-line bg-ink-surface2 px-3 py-1.5 text-sm text-text"
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-3 overflow-y-auto p-5 sm:grid-cols-2 lg:grid-cols-3">
                  {UNITS.map((unit) => (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => {
                        setSelectedUnitName(unit.name);
                        setIsUnitPickerOpen(false);
                      }}
                      className="text-left"
                    >
                      <CardTile unit={unit} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Portal>
        )}

        <section className="rounded-2xl border border-ink-line bg-ink-surface/70 p-5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Essence cost by unit rarity</h2>
          <p className="mt-2 text-sm text-text-dim">The essence cost comes from the unit rarity, which is what the clone machine uses for this part of the calculation.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(rarityCosts).map(([name, cost]) => (
              <div key={name} className="rounded-xl border border-ink-line bg-ink-surface p-3">
                <div className="text-sm font-semibold text-text">{name}</div>
                <div className="mt-1 font-mono text-sm text-rarity-legendary">{cost} essence</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink-line bg-ink-surface/70 p-5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Base times by unit rarity</h2>
          <p className="mt-2 text-sm text-text-dim">These are the baseline timings for level 1 units with no mutation or trait.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(baseTimes).map(([label, minutes]) => (
              <div key={label} className="rounded-xl border border-ink-line bg-ink-surface p-3">
                <div className="text-sm font-semibold text-text">{label}</div>
                <div className="mt-1 font-mono text-sm text-rarity-legendary">{formatMinutes(minutes)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-ink-line bg-ink-surface/70 p-5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">How the estimate works</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-dim">
            <li>Mutation time scales from the base rarity time using a multiplier curve inferred from your provided values.</li>
            <li>Trait time is estimated by interpolating between the no-trait baseline and the full-trait benchmark you supplied.</li>
            <li>Level is still fixed at level 1 until you give me additional values to model the level scaling.</li>
          </ul>
        </section>
      </div>
    </TutorialSectionShell>
  );
}
