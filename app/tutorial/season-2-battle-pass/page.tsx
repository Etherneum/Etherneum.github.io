import { TutorialSectionShell } from "@/components/TutorialSectionShell";

export default function SeasonTwoBattlePassPage() {
  return (
    <TutorialSectionShell
      title="Season 2 Battle Pass"
      description="A dedicated guide page for the second battle pass so it can be opened and reviewed independently."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="rounded-2xl border border-ink-line/70 bg-ink p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Coming soon</p>
          <h2 className="mt-3 font-display text-2xl font-black">Season 2 rewards and progression will be added here.</h2>
          <p className="mt-4 text-sm leading-7 text-text-dim">
            This page is now in place as the dedicated location for Season 2 Battle Pass information, so it can be expanded later without mixing it into the other event pages.
          </p>
        </div>
      </section>
    </TutorialSectionShell>
  );
}
