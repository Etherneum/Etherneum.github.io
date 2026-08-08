import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const TOKEN_TIPS = [
  "Use free tokens on limited summons and merge chances first.",
  "Avoid spending tokens on random bundles unless the contents are already useful.",
  "Save tokens for events and premium summons with better odds.",
  "Don’t burn tokens on early gachas that only give duplicate material or low-tier units.",
  "Prioritize token upgrades that directly improve unit power or summon efficiency.",
];

export default function F2PTokenGuidePage() {
  return (
    <TutorialSectionShell
      title="Free-to-Play Tokens"
      description="A practical guide to earning and spending tokens without buying Robux."
    >
      <div className="grid gap-8">
        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Token sources</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
              <h3 className="font-semibold">Daily rewards</h3>
              <p className="mt-2 text-sm leading-7 text-text-dim">
                Log in daily and finish the daily quest to keep a steady supply of tokens.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
              <h3 className="font-semibold">Event bonuses</h3>
              <p className="mt-2 text-sm leading-7 text-text-dim">
                Seasonal events and tower milestones often give larger token payouts.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Where not to spend tokens</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-dim">
            <li>Bundles with mostly cosmetics or random items are usually not good value.</li>
            <li>Early gachas can be tempting, but they often yield duplicates or weak upgrades.</li>
            <li>Don’t spend tokens on passes unless you know the reward is worth the long-term cost.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Smart spending</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-dim">
            {TOKEN_TIPS.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Token goals</h2>
          <p className="mt-4 text-sm leading-7 text-text-dim">
            Focus on increasing summon efficiency, power upgrades, and premium unlocks that give permanent value. If you are unsure, save tokens until a clear opportunity appears.
          </p>
        </section>
      </div>
    </TutorialSectionShell>
  );
}
