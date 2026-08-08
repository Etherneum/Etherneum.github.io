import { TutorialSectionShell } from "@/components/TutorialSectionShell";

export default function MergingPage() {
  return (
    <TutorialSectionShell
      title="Merging & Cloning"
      description="How to merge units and copy them with essence."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-line bg-ink-surface p-5 transition-all duration-300 ease-out hover:-translate-y-0.5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Merging</h2>
          <p className="mt-2 font-body text-sm text-text-dim">
            Two of the same anime, same evolution, merge into one stronger unit.
          </p>
          <p className="mt-3 rounded-lg border border-rarity-mythic/40 bg-rarity-mythic/10 px-3 py-2 font-body text-xs text-rarity-mythic">
            Keep the trait-holder deployed before merging, or the trait is lost.
          </p>
        </div>
        <div className="rounded-xl border border-ink-line bg-ink-surface p-5 transition-all duration-300 ease-out hover:-translate-y-0.5">
          <h2 className="font-display text-lg font-black tracking-[0.06em] text-text">Cloning</h2>
          <p className="mt-2 font-body text-sm text-text-dim">
            Costs essence (drops, wheel, VIP chest, events). Copies mutation and trait.
          </p>
        </div>
      </div>
    </TutorialSectionShell>
  );
}
