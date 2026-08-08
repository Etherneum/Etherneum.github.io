import { TutorialSectionShell } from "@/components/TutorialSectionShell";

export default function UpgradePage() {
  return (
    <TutorialSectionShell
      title="Upgrade Order"
      description="The recommended order for spending your resources and unlocking progress."
    >
      <div className="flex flex-wrap items-center gap-2">
        {['Anime Slot', 'Coins', 'Luck', 'Anime Inventory'].map((step, i, arr) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-lg border border-ink-line bg-ink-surface px-3 py-2 font-body text-sm font-semibold text-text transition-all duration-300 ease-out hover:-translate-y-0.5">
              {step}
            </span>
            {i < arr.length - 1 && <span className="text-text-faint">→</span>}
          </div>
        ))}
      </div>
      <p className="font-body text-xs text-text-faint">
        Checkpoints (in Settings) let you start on a higher wave.
      </p>
    </TutorialSectionShell>
  );
}
