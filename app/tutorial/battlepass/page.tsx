import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const BATTLEPASS_REWARDS = {
  normal: [
    "100 free tokens",
    "Small XP booster",
    "Rare merge material",
    "Battlepass-only avatar border",
    "Tower ticket pack",
  ],
  premium: [
    "Premium token bundle",
    "Large XP booster",
    "Exclusive unit skin",
    "Extra daily quest slot",
    "Battlepass premium exclusive pet",
  ],
};

const SEASON_ONE_QUESTS = {
  daily: [
    "Roll 250 times",
    "Beat wave 25 on tower 10 times",
    "Play for 60 minutes",
    "Kill 500 enemies",
    "Deal 25m damage",
  ],
  weekly: [
    "Roll 5000 times",
    "Beat wave 50 on tower 10 times",
    "Play for 720 minutes",
    "Kill 5000 enemies",
    "Deal 25b damage",
  ],
};

// Reward totals (from user input)
const REWARD_SUMMARY = {
  free: {
    units: 2,
  },
  premium: {
    units: 4,
  },
  totals: {
    traitShards: { free: 285, premium: 290 },
    godEssence: { free: 24, premium: 39 },
    secretEssence: { free: 35, premium: 57 },
    tokens: { free: 40, premium: 65 },
    infiniteTickets: { free: 8, premium: 13 },
  },
};

export default function BattlepassPage() {
  return (
    <TutorialSectionShell
      title="Battlepass"
      description="Seasonal progression with 30 levels, earn rewards by grinding enemies and quests over 2–3 days."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <h2 className="font-display text-2xl font-black">Season rewards summary</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 items-start">
          {/* Free track */}
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Free track</p>
                <p className="mt-1 text-3xl font-black">{REWARD_SUMMARY.free.units} Units</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-text">
                🆓 Free
              </div>
            </div>

            <p className="text-sm text-text-dim">Contains the free-track rewards shown in the summary above.</p>
          </div>

          {/* Totals card */}
          <div className="rounded-2xl border border-ink-line/70 bg-gradient-to-br from-ink-surface/90 to-cyan-500/6 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Free | Premium</p>
                <p className="mt-1 text-lg font-black">Split shown as Free | Premium</p>
              </div>
              <div className="text-sm font-semibold text-text-dim">30 levels</div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-ink p-3">
                <p className="text-xs text-text-faint">Trait Shards</p>
                <p className="mt-1 text-lg font-black">
                  {REWARD_SUMMARY.totals.traitShards.free.toLocaleString()} <span className="mx-2 text-text-dim">|</span> {(REWARD_SUMMARY.totals.traitShards.free + REWARD_SUMMARY.totals.traitShards.premium).toLocaleString()}
                </p>
                <p className="text-xs text-text-dim mt-1">Free | Premium</p>
              </div>
              <div className="rounded-2xl bg-ink p-3">
                <p className="text-xs text-text-faint">God Essence</p>
                <p className="mt-1 text-lg font-black">
                  {REWARD_SUMMARY.totals.godEssence.free.toLocaleString()} <span className="mx-2 text-text-dim">|</span> {(REWARD_SUMMARY.totals.godEssence.free + REWARD_SUMMARY.totals.godEssence.premium).toLocaleString()}
                </p>
                <p className="text-xs text-text-dim mt-1">Free | Premium</p>
              </div>
              <div className="rounded-2xl bg-ink p-3">
                <p className="text-xs text-text-faint">Secret Essence</p>
                <p className="mt-1 text-lg font-black">
                  {REWARD_SUMMARY.totals.secretEssence.free.toLocaleString()} <span className="mx-2 text-text-dim">|</span> {(REWARD_SUMMARY.totals.secretEssence.free + REWARD_SUMMARY.totals.secretEssence.premium).toLocaleString()}
                </p>
                <p className="text-xs text-text-dim mt-1">Free | Premium</p>
              </div>
              <div className="rounded-2xl bg-ink p-3">
                <p className="text-xs text-text-faint">Tokens</p>
                <p className="mt-1 text-lg font-black">
                  {REWARD_SUMMARY.totals.tokens.free.toLocaleString()} <span className="mx-2 text-text-dim">|</span> {(REWARD_SUMMARY.totals.tokens.free + REWARD_SUMMARY.totals.tokens.premium).toLocaleString()}
                </p>
                <p className="text-xs text-text-dim mt-1">Free | Premium</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-ink p-3">
              <p className="text-xs text-text-faint">Infinite Tickets</p>
              <p className="mt-1 text-lg font-black">
                {REWARD_SUMMARY.totals.infiniteTickets.free.toLocaleString()} <span className="mx-2 text-text-dim">|</span> {(REWARD_SUMMARY.totals.infiniteTickets.free + REWARD_SUMMARY.totals.infiniteTickets.premium).toLocaleString()}
              </p>
              <p className="text-xs text-text-dim mt-1">Free | Premium</p>
            </div>
          </div>

          {/* Premium track */}
          <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/6 to-ink p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Premium track</p>
                <p className="mt-1 text-3xl font-black">{REWARD_SUMMARY.premium.units} Units</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-200">
                👑 Premium
              </div>
            </div>

            <p className="text-sm text-text-dim">Contains the premium-track rewards shown in the summary above.</p>
          </div>
        </div>
      </section>
      <div className="grid gap-8">
        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">How it works</h2>
          <p className="mt-4 text-sm leading-7 text-text-dim">
            The Battlepass has 30 levels and is designed to finish in about 2–3 days of regular play.
            Progress is earned by defeating enemies, completing tower waves, and playing through daily/weekly quests.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-line/70 bg-ink-surface p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Levels</p>
              <p className="mt-2 text-3xl font-black">30</p>
            </div>
            <div className="rounded-2xl border border-ink-line/70 bg-ink-surface p-4">
              <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Premium cost</p>
              <p className="mt-2 text-3xl font-black">749 Robux</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Rewards</h2>
          <p className="mt-4 text-sm text-text-dim">Detailed reward lists were removed — the season summary above reflects the exact rewards provided.</p>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Season 1 quests</h2>
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
              <h3 className="font-semibold">Daily quests</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-text-dim">
                {SEASON_ONE_QUESTS.daily.map((quest) => (
                  <li key={quest}>• {quest}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
              <h3 className="font-semibold">Weekly quests</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-text-dim">
                {SEASON_ONE_QUESTS.weekly.map((quest) => (
                  <li key={quest}>• {quest}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
          <h2 className="font-display text-2xl font-black">Battlepass notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-dim">
            <li>Battlepass progress comes from both kills and quest completion.</li>
            <li>Normal rewards are free; premium gives extra exclusive items.</li>
            <li>Update this page whenever season rewards or quest lists change.</li>
          </ul>
        </section>
      </div>
    </TutorialSectionShell>
  );
}
