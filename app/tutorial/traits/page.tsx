import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { TRAIT_TIERS } from "@/data/traits";

export default function TraitsPage() {
  return (
    <TutorialSectionShell
      title="Traits Benefits"
      description="Trait benefits and drop rates for each tier."
    >
      <div className="flex flex-col gap-6">
        {TRAIT_TIERS.map((tier) => (
          <div key={tier.tier}>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
              <h2 className="font-display text-lg font-black tracking-[0.06em]" style={{ color: tier.color }}>
                {tier.tier}
              </h2>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {tier.traits.map((trait) => (
                <div key={trait.name} className="rounded-xl border border-ink-line bg-ink-surface/70 p-3 transition-all duration-300 ease-out hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-body text-sm font-semibold text-text">{trait.name}</h3>
                    <span className="rounded-full border border-ink-line bg-ink-surface px-2.5 py-1 font-mono text-xs" style={{ color: tier.color }}>
                      {trait.dropChance}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm text-text-dim">{trait.buffs}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="font-body text-xs text-text-faint">The exact drop rates are shown in-game.</p>
    </TutorialSectionShell>
  );
}
