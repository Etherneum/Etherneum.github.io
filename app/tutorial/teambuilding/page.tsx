"use client";

import { useEffect, useMemo, useState } from "react";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import CardTile from "@/components/CardTile";
import Portal from "@/components/Portal";
import { MUTATIONS } from "@/data/mutations";
import { QUALITY_TIER_LIST } from "@/data/tierlists";
import { TRAIT_TIERS } from "@/data/traits";
import { UNITS, type Unit } from "@/data/units";

type Slot = {
  title: string;
  accent: string;
  border: string;
  text: string;
  units: string[];
};

const tankUnits = [
  "Itadoro",
  "Bon",
  "Got",
  "Shinrat",
  "Grimmick",
  "Saitomo",
  "Brocolli",
  "Gyomain",
  "Kenie",
  "Goji Shinjuku",
  "Bills",
  "Aldedo",
  "Galactic Garo",
  "Muscle",
  "Saitome (Serious)",
  "Takamoso",
];

const damageUnits = [
  "Usoff",
  "Luppi",
  "Keririn",
  "Zero",
  "Janwoo",
  "Mobi",
  "Goke",
  "Mika",
  "Rinnju",
  "Picurro",
  "Manji",
  "Tanjuro",
  "Nonomi",
  "Zinichou",
  "Truck",
  "Goji",
  "Sakuna",
  "Noruto",
  "Rengundam",
  "Acer",
  "Hoshira",
  "Kokushiro",
  "Shimo Haya",
  "Yoriki",
  "Coyote",
  "Yutta",
  "Ulquiopta",
  "Brakura",
  "Jerin",
  "Yuwah",
  "Fryren",
  "Sakuna (Heian)",
  "Shancks",
  "Aisen Divine",
  "Isoge True Form",
  "Remura",
  "Genes",
  "Golden Frozer",
];

const healerUnits = ["Orihemi", "Kiwusuke"];
const reviveUnits = ["Wise", "Kiwusuke"];
const healerReviveUnits = ["Orihemi", "Kiwusuke", "Wise"];
const buffUnits = ["Erwon", "Kiwusuke"];

type SupportRoleFilter = "any" | "healer" | "revive" | "both";

function getSupportRole(unitName: string) {
  const normalizedName = normalizeName(unitName);
  const isHealer = healerUnits.some((name) => normalizeName(name) === normalizedName);
  const isRevive = reviveUnits.some((name) => normalizeName(name) === normalizedName);

  if (isHealer && isRevive) return "both";
  if (isHealer) return "healer";
  if (isRevive) return "revive";
  return null;
}

function matchesSupportRole(unitName: string, filter: SupportRoleFilter) {
  const role = getSupportRole(unitName);

  if (filter === "any") return role !== null;
  if (filter === "healer") return role === "healer" || role === "both";
  if (filter === "revive") return role === "revive" || role === "both";
  if (filter === "both") return role === "both";
  return false;
}

const slots: Slot[] = [
  { title: "Tank", accent: "from-orange-500/35 via-amber-400/20 to-red-500/15", border: "border-orange-400/30", text: "text-amber-100", units: tankUnits },
  { title: "Tank", accent: "from-orange-500/35 via-amber-400/20 to-red-500/15", border: "border-orange-400/30", text: "text-amber-100", units: tankUnits },
  { title: "Tank", accent: "from-orange-500/35 via-amber-400/20 to-red-500/15", border: "border-orange-400/30", text: "text-amber-100", units: tankUnits },
  { title: "Tank", accent: "from-orange-500/35 via-amber-400/20 to-red-500/15", border: "border-orange-400/30", text: "text-amber-100", units: tankUnits },
  { title: "Damage Dealer / Ranged", accent: "from-sky-500/30 via-cyan-400/20 to-violet-500/15", border: "border-cyan-400/30", text: "text-cyan-100", units: damageUnits },
  { title: "Damage Dealer / Ranged", accent: "from-sky-500/30 via-cyan-400/20 to-violet-500/15", border: "border-cyan-400/30", text: "text-cyan-100", units: damageUnits },
  { title: "Damage Dealer / Ranged", accent: "from-sky-500/30 via-cyan-400/20 to-violet-500/15", border: "border-cyan-400/30", text: "text-cyan-100", units: damageUnits },
  { title: "Damage Dealer / Ranged", accent: "from-sky-500/30 via-cyan-400/20 to-violet-500/15", border: "border-cyan-400/30", text: "text-cyan-100", units: damageUnits },
  { title: "Healer", accent: "from-emerald-500/35 via-teal-400/20 to-cyan-500/15", border: "border-emerald-400/30", text: "text-emerald-100", units: healerUnits },
  { title: "Healer", accent: "from-emerald-500/35 via-teal-400/20 to-cyan-500/15", border: "border-emerald-400/30", text: "text-emerald-100", units: healerUnits },
  { title: "Healer / Revive", accent: "from-fuchsia-500/35 via-purple-400/20 to-indigo-500/15", border: "border-fuchsia-400/30", text: "text-fuchsia-100", units: healerReviveUnits },
  { title: "Buff", accent: "from-violet-500/35 via-purple-400/20 to-pink-500/15", border: "border-violet-400/30", text: "text-violet-100", units: buffUnits },
];

const traitOptions = TRAIT_TIERS.flatMap((tier) => tier.traits).map((trait) => trait.name);
const mutationOptions = MUTATIONS.map((mutation) => mutation.name);

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getTierInfo(unitName: string) {
  const matchingTier = QUALITY_TIER_LIST.find((row) =>
    row.units.some((entry) => normalizeName(entry) === normalizeName(unitName))
  );

  if (!matchingTier) {
    return { label: "Unranked", color: "#94a3b8", index: QUALITY_TIER_LIST.length };
  }

  return {
    label: matchingTier.label,
    color: matchingTier.color,
    index: QUALITY_TIER_LIST.findIndex((row) => row.label === matchingTier.label),
    sublabel: matchingTier.sublabel,
  };
}

function getScoreForSlot(slotTitle: string, unitName: string, mutation: string | null, trait: string | null, level: number) {
  if (!unitName) return 0;

  const tierScore = {
    META: 100,
    S: 90,
    A: 80,
    Progress: 70,
    B: 55,
    C: 35,
    Trash: 15,
    Unranked: 20,
  }[getTierInfo(unitName).label] ?? 20;

  const isMajorRole = slotTitle === "Tank" || slotTitle === "Damage Dealer / Ranged";
  const mutationBonus = mutation ? (isMajorRole ? 18 : 10) : isMajorRole ? -30 : -8;
  const traitBonus = trait ? (isMajorRole ? 18 : 10) : isMajorRole ? -20 : -6;
  const levelBonus = Math.min(12, (level - 1) * 0.12);
  const roleBonus = isMajorRole ? 8 : 4;
  const supportRole = getSupportRole(unitName);
  const supportBonus = slotTitle === "Healer / Revive"
    ? supportRole === "both"
      ? 16
      : supportRole === "revive"
        ? 14
        : supportRole === "healer"
          ? 8
          : 0
    : slotTitle === "Healer"
      ? supportRole === "both"
        ? 10
        : supportRole === "healer"
          ? 8
          : 0
      : 0;

  return Math.min(100, tierScore + mutationBonus + traitBonus + roleBonus + levelBonus + supportBonus);
}

export default function TeamBuildingPage() {
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<(string | null)[]>(Array(slots.length).fill(null));
  const [selectedMutations, setSelectedMutations] = useState<(string | null)[]>(Array(slots.length).fill(null));
  const [selectedTraits, setSelectedTraits] = useState<(string | null)[]>(Array(slots.length).fill(null));
  const [selectedLevels, setSelectedLevels] = useState<number[]>(Array(slots.length).fill(1));
  const [units, setUnits] = useState<Unit[]>([]);
  const [pendingUnitSelection, setPendingUnitSelection] = useState<{
    slotIndex: number;
    unit: Unit;
  } | null>(null);
  const [pendingMutation, setPendingMutation] = useState<string | null>(null);
  const [pendingTrait, setPendingTrait] = useState<string | null>(null);
  const [pendingLevel, setPendingLevel] = useState(1);
  const [supportRoleFilter, setSupportRoleFilter] = useState<SupportRoleFilter>("any");

  const activeSlot = activeSlotIndex === null ? null : slots[activeSlotIndex];
  const currentSlotUnit = activeSlotIndex === null ? null : selectedUnits[activeSlotIndex];
  const currentSlotMutation = activeSlotIndex === null ? null : selectedMutations[activeSlotIndex];
  const currentSlotTrait = activeSlotIndex === null ? null : selectedTraits[activeSlotIndex];
  const currentSlotLevel = activeSlotIndex === null ? 1 : selectedLevels[activeSlotIndex];
  const currentSelectedUnitData = currentSlotUnit
    ? (units.find((entry) => entry.name === currentSlotUnit) ?? UNITS.find((entry) => entry.name === currentSlotUnit))
    : null;

  useEffect(() => {
    if (activeSlotIndex === null) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeSlotIndex]);

  useEffect(() => {
    let cancelled = false;
    fetch("/cards/list.json")
      .then((response) => response.json())
      .then((data: Unit[]) => {
        if (!cancelled) setUnits(data);
      })
      .catch(() => {
        if (!cancelled) setUnits(UNITS);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pendingUnitSelection) return;

    const slotIndex = pendingUnitSelection.slotIndex;
    setPendingMutation(selectedMutations[slotIndex] ?? null);
    setPendingTrait(selectedTraits[slotIndex] ?? null);
    setPendingLevel(selectedLevels[slotIndex] ?? 1);
  }, [pendingUnitSelection, selectedMutations, selectedTraits, selectedLevels]);

  useEffect(() => {
    if (!pendingUnitSelection) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        confirmPendingSelection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingUnitSelection, pendingMutation, pendingTrait, pendingLevel]);

  const rankedUnits = useMemo(() => {
    if (activeSlotIndex === null) return [];

    const roleUnits = slots[activeSlotIndex].units;
    return units.filter((unit) => {
      const matchesRole = roleUnits.some((name) => normalizeName(name) === normalizeName(unit.name));
      if (!matchesRole) return false;
      if (activeSlot?.title === "Healer / Revive") {
        return matchesSupportRole(unit.name, supportRoleFilter);
      }
      return true;
    }).sort((a, b) => {
      const tierA = getTierInfo(a.name);
      const tierB = getTierInfo(b.name);
      if (tierA.index !== tierB.index) return tierA.index - tierB.index;
      return a.name.localeCompare(b.name);
    });
  }, [activeSlot?.title, activeSlotIndex, supportRoleFilter, units]);

  const teamScore = useMemo(() => {
    const slotScores = slots.map((slot, index) =>
      getScoreForSlot(slot.title, selectedUnits[index] ?? "", selectedMutations[index], selectedTraits[index], selectedLevels[index])
    );
    const average = slotScores.reduce((total, score) => total + score, 0) / slotScores.length;

    if (average >= 85) return { score: Math.round(average), label: "S+" };
    if (average >= 75) return { score: Math.round(average), label: "A" };
    if (average >= 60) return { score: Math.round(average), label: "B" };
    if (average >= 45) return { score: Math.round(average), label: "C" };
    if (average >= 30) return { score: Math.round(average), label: "D" };
    return { score: Math.round(average), label: "F" };
  }, [selectedLevels, selectedMutations, selectedTraits, selectedUnits]);

  const teamGuidance = useMemo(() => {
    const tankSelections = selectedUnits.slice(0, 4).filter((unit): unit is string => Boolean(unit));
    const damageSelections = selectedUnits.slice(4, 8).filter((unit): unit is string => Boolean(unit));
    const supportSelections = selectedUnits.slice(8, 12).filter((unit): unit is string => Boolean(unit));

    const weakTank = tankSelections.find((unitName) => {
      const tier = getTierInfo(unitName).label;
      return ["Trash", "C", "B", "Progress", "Unranked"].includes(tier);
    });
    const weakDamage = damageSelections.find((unitName) => {
      const tier = getTierInfo(unitName).label;
      return ["Trash", "C", "B", "Progress", "Unranked"].includes(tier);
    });
    const weakSupport = supportSelections.find((unitName) => {
      const tier = getTierInfo(unitName).label;
      return ["Trash", "C", "B", "Progress", "Unranked"].includes(tier);
    });

    if (tankSelections.length === 0) {
      return "You are missing a tank. Add a durable front-line unit such as Itadoro or Bon to improve your team's stability.";
    }

    if (damageSelections.length === 0) {
      return "You are missing a damage dealer. Add a strong damage carry such as Usoff or Luppi to boost your damage output.";
    }

    if (supportSelections.length === 0) {
      return "You need support utility. Pick a healer or revive option like Orihemi, Wise, or Kiwusuke to keep the team alive.";
    }

    if (weakTank) {
      return "One of your tanks is still underwhelming. Try swapping in a stronger tank such as Itadoro or Bon for a safer front line.";
    }

    if (weakDamage) {
      return "One of your damage slots could use an upgrade. Consider a stronger damage dealer such as Usoff or Luppi to raise your burst.";
    }

    if (weakSupport) {
      return "Your support lineup could be stronger. Wise is a strong revive pick, while Kiwusuke can cover healer or revive and Orihemi is a reliable healer.";
    }

    const unboostedMajorSlots = slots.filter((slot, index) => {
      const hasUnit = Boolean(selectedUnits[index]);
      const missingMutation = !selectedMutations[index];
      const missingTrait = !selectedTraits[index];
      return hasUnit && (slot.title === "Tank" || slot.title === "Damage Dealer / Ranged") && (missingMutation || missingTrait);
    });

    if (unboostedMajorSlots.length > 0) {
      return "Your main damage and tank slots would benefit from a mutation and trait. Add those first for a major rating increase.";
    }

    const lowLevelSlots = slots.filter((slot, index) => Boolean(selectedUnits[index]) && selectedLevels[index] < 4);
    if (lowLevelSlots.length > 0) {
      return "Level up your core units, especially your tanks and damage dealers, to make the build much stronger.";
    }

    return "Your team looks fairly balanced. Keep improving the core tanks and damage dealers, and use a reliable healer or revive support to stay consistent.";
  }, [selectedLevels, selectedMutations, selectedTraits, selectedUnits]);

  function assignUnit(index: number | null, unitName: string) {
    if (index === null) return;
    const nextUnits = [...selectedUnits];
    nextUnits[index] = unitName;
    setSelectedUnits(nextUnits);
  }

  function confirmPendingSelection() {
    if (!pendingUnitSelection) return;

    const slotIndex = pendingUnitSelection.slotIndex;
    const nextUnits = [...selectedUnits];
    nextUnits[slotIndex] = pendingUnitSelection.unit.name;
    setSelectedUnits(nextUnits);

    const nextMutations = [...selectedMutations];
    nextMutations[slotIndex] = pendingMutation;
    setSelectedMutations(nextMutations);

    const nextTraits = [...selectedTraits];
    nextTraits[slotIndex] = pendingTrait;
    setSelectedTraits(nextTraits);

    const nextLevels = [...selectedLevels];
    nextLevels[slotIndex] = pendingLevel;
    setSelectedLevels(nextLevels);

    setPendingUnitSelection(null);
  }

  return (
    <TutorialSectionShell
      title="Team Building"
      description="How to build an optimal team."
    >
      <div className="overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_20px_50px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-red-300/80">
              Front line guide
            </p>
            <h2 className="mt-2 font-display text-2xl font-black tracking-[0.08em] text-text sm:text-3xl">
              Front
            </h2>
          </div>
          <div className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-200">
            4 x 3 formation
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot, index) => {
            const selectedUnit = selectedUnits[index];
            const tierInfo = selectedUnit ? getTierInfo(selectedUnit) : null;
            const selectedUnitData = selectedUnit
              ? (units.find((entry) => entry.name === selectedUnit) ?? UNITS.find((entry) => entry.name === selectedUnit))
              : null;

            return (
              <button
                key={`${slot.title}-${index}`}
                type="button"
                onClick={() => setActiveSlotIndex(index)}
                className={`group relative aspect-square overflow-hidden rounded-[1.4rem] border bg-gradient-to-br ${slot.accent} ${slot.border} p-[1px] text-left shadow-[0_10px_30px_rgba(0,0,0,0.24)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(255,0,0,0.16)]`}
              >
                <div className="absolute inset-0 rounded-[1.3rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_45%)]" />
                <div className="relative flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-ink-surface/80 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-text-dim">
                      Slot {index + 1}
                    </span>
                    {!selectedUnitData ? (
                      <span className="rounded-full border border-white/10 bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-200">
                        Tap
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    {!selectedUnitData ? (
                      <>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-text-dim">
                          Role
                        </span>
                        <h3 className={`text-center font-display text-lg font-black tracking-[0.08em] ${slot.text}`}>
                          {slot.title}
                        </h3>
                        <p className="text-sm text-text-dim">Choose a unit</p>
                      </>
                    ) : (
                      <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.9rem] border border-white/10 bg-ink-surface/70 p-1.5">
                        <div className="flex-1 overflow-hidden rounded-[0.7rem]">
                          <CardTile unit={selectedUnitData} compact onOpen={() => {}} />
                        </div>
                        {tierInfo && tierInfo.label !== "META" ? (
                          <span
                            className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: tierInfo.color, borderColor: `${tierInfo.color}66`, backgroundColor: `${tierInfo.color}14` }}
                          >
                            {tierInfo.label}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[1.4rem] border border-red-500/20 bg-ink-surface/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-black tracking-[0.08em] text-text">
                Team build controls
              </h3>
              <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-200">
                Slot-by-slot tuning
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {slots.map((slot, index) => {
                const selectedUnit = selectedUnits[index];
                const selectedMutation = selectedMutations[index];
                const selectedTrait = selectedTraits[index];
                const selectedLevel = selectedLevels[index];
                return (
                  <div key={`${slot.title}-${index}`} className="rounded-[1.1rem] border border-white/10 bg-ink-surface/80 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-black tracking-[0.08em] text-text">{slot.title}</p>
                        <p className="text-xs text-text-dim">{selectedUnit ?? "No unit selected"}</p>
                      </div>
                      {selectedUnit ? (
                        <span
                          className="rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: getTierInfo(selectedUnit).color, borderColor: `${getTierInfo(selectedUnit).color}66`, backgroundColor: `${getTierInfo(selectedUnit).color}14` }}
                        >
                          {getTierInfo(selectedUnit).label}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Mutation
                        <select
                          value={selectedMutation ?? ""}
                          disabled={!selectedUnit}
                          onChange={(event) => {
                            const next = [...selectedMutations];
                            next[index] = event.target.value || null;
                            setSelectedMutations(next);
                          }}
                          className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">None</option>
                          {mutationOptions.map((mutation) => (
                            <option key={mutation} value={mutation}>{mutation}</option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Trait
                        <select
                          value={selectedTrait ?? ""}
                          disabled={!selectedUnit}
                          onChange={(event) => {
                            const next = [...selectedTraits];
                            next[index] = event.target.value || null;
                            setSelectedTraits(next);
                          }}
                          className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">None</option>
                          {traitOptions.map((trait) => (
                            <option key={trait} value={trait}>{trait}</option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Level
                        <input
                          type="range"
                          min="1"
                          max="7"
                          disabled={!selectedUnit}
                          value={selectedLevel}
                          onChange={(event) => {
                            const next = [...selectedLevels];
                            next[index] = Number(event.target.value);
                            setSelectedLevels(next);
                          }}
                          className="accent-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <span className="text-sm text-text">{selectedLevel}</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-red-500/20 bg-ink-surface/70 p-4">
            <h3 className="font-display text-xl font-black tracking-[0.08em] text-text">
              Team rating
            </h3>
            <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-ink-surface/80 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-300/80">
                    Overall score
                  </p>
                  <p className="mt-2 font-display text-4xl font-black tracking-[0.08em] text-text">
                    {teamScore.score}
                  </p>
                </div>
                <div className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-red-200">
                  {teamScore.label}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-text-dim">
                Tanks and damage dealers receive the biggest bonus from mutation and traits. If those roles are left basic with no mutation or trait, the score drops sharply and can fall to an F-tier build. To improve your rating, prioritize mutations and traits on the front line, use a strong healer/revive support pick when possible, and level up the units you rely on most. Kiwusuke is especially flexible because he can cover the healer or revive support role.
              </p>
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-ink-surface/80 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-300/80">
                Team guidance
              </p>
              <p className="mt-3 text-sm leading-6 text-text-dim">
                {teamGuidance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {activeSlot ? (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setActiveSlotIndex(null)} />
            <div
              className="relative z-10 flex max-h-[90vh] w-[95%] max-w-5xl flex-col overflow-hidden rounded-[1.6rem] border border-red-500/25 bg-ink-surface/95 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-red-300/80">
                    Role popup
                  </p>
                  <h3 className={`mt-2 font-display text-2xl font-black tracking-[0.08em] ${activeSlot.text}`}>
                    {activeSlot.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSlotIndex(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-dim transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="mb-5 rounded-[1.2rem] border border-white/10 bg-ink-surface/70 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-300/80">
                        Current slot
                      </p>
                      <h4 className="mt-2 font-display text-xl font-black tracking-[0.08em] text-text">
                        {activeSlot.title}
                      </h4>
                    </div>
                    {currentSelectedUnitData ? (
                      <div className="w-full max-w-[180px] overflow-hidden rounded-[1rem] border border-white/10 bg-ink-surface/80 p-1.5">
                        <CardTile unit={currentSelectedUnitData} compact onOpen={() => {}} />
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {activeSlot.title === "Healer / Revive" ? (
                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Support role filter
                        <select
                          value={supportRoleFilter}
                          onChange={(event) => setSupportRoleFilter(event.target.value as SupportRoleFilter)}
                          className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text"
                        >
                          <option value="any">Any support unit</option>
                          <option value="healer">Healer</option>
                          <option value="revive">Revive</option>
                          <option value="both">Healer + Revive</option>
                        </select>
                      </label>
                    ) : null}

                    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                      Mutation
                      <select
                        value={currentSlotMutation ?? ""}
                        disabled={!currentSlotUnit}
                        onChange={(event) => {
                          if (activeSlotIndex === null) return;
                          const next = [...selectedMutations];
                          next[activeSlotIndex] = event.target.value || null;
                          setSelectedMutations(next);
                        }}
                        className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">None</option>
                        {mutationOptions.map((mutation) => (
                          <option key={mutation} value={mutation}>{mutation}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                      Trait
                      <select
                        value={currentSlotTrait ?? ""}
                        disabled={!currentSlotUnit}
                        onChange={(event) => {
                          if (activeSlotIndex === null) return;
                          const next = [...selectedTraits];
                          next[activeSlotIndex] = event.target.value || null;
                          setSelectedTraits(next);
                        }}
                        className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">None</option>
                        {traitOptions.map((trait) => (
                          <option key={trait} value={trait}>{trait}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                      Level
                      <input
                        type="range"
                        min="1"
                        max="7"
                        disabled={!currentSlotUnit}
                        value={currentSlotLevel}
                        onChange={(event) => {
                          if (activeSlotIndex === null) return;
                          const next = [...selectedLevels];
                          next[activeSlotIndex] = Number(event.target.value);
                          setSelectedLevels(next);
                        }}
                        className="accent-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <span className="text-sm text-text">{currentSlotLevel}</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {rankedUnits.map((unit) => {
                    const tierInfo = getTierInfo(unit.name);
                    return (
                      <div key={unit.id} className="flex flex-col gap-2">
                        <div className="relative">
                          <CardTile
                            unit={unit}
                            onOpen={() => {
                              if (activeSlotIndex === null) return;
                              setActiveSlotIndex(null);
                              setPendingUnitSelection({ slotIndex: activeSlotIndex, unit });
                            }}
                          />
                          <span
                            className="absolute left-2 top-2 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: tierInfo.color, borderColor: `${tierInfo.color}66`, backgroundColor: `${tierInfo.color}14` }}
                          >
                            {tierInfo.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      ) : null}

      {pendingUnitSelection ? (
        <Portal>
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/45" onClick={() => setPendingUnitSelection(null)} />
            <div
              className="relative z-10 flex max-h-[90vh] w-[95%] max-w-3xl flex-col overflow-hidden rounded-[1.6rem] border border-red-500/25 bg-ink-surface/95 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-red-300/80">
                    Unit details
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-black tracking-[0.08em] text-text">
                    {pendingUnitSelection.unit.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingUnitSelection(null)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-text-dim transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.2rem] border border-white/10 bg-ink-surface/70 p-3">
                    <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-ink-surface/80 p-2">
                      <CardTile unit={pendingUnitSelection.unit} compact onOpen={() => {}} />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-red-400/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-200">
                        {slots[pendingUnitSelection.slotIndex].title}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-text-dim">
                        Press Enter to confirm
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[1.2rem] border border-white/10 bg-ink-surface/70 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Mutation
                        <select
                          value={pendingMutation ?? ""}
                          onChange={(event) => setPendingMutation(event.target.value || null)}
                          className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text"
                        >
                          <option value="">None</option>
                          {mutationOptions.map((mutation) => (
                            <option key={mutation} value={mutation}>{mutation}</option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                        Trait
                        <select
                          value={pendingTrait ?? ""}
                          onChange={(event) => setPendingTrait(event.target.value || null)}
                          className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 text-sm text-text"
                        >
                          <option value="">None</option>
                          {traitOptions.map((trait) => (
                            <option key={trait} value={trait}>{trait}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
                      Level
                      <input
                        type="range"
                        min="1"
                        max="7"
                        value={pendingLevel}
                        onChange={(event) => setPendingLevel(Number(event.target.value))}
                        className="accent-red-500"
                      />
                      <span className="text-sm text-text">{pendingLevel}</span>
                    </label>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={confirmPendingSelection}
                        className="rounded-full border border-red-400/30 bg-red-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-100 transition hover:bg-red-500/25"
                      >
                        Confirm unit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingUnitSelection(null)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-text-dim transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      ) : null}
    </TutorialSectionShell>
  );
}
