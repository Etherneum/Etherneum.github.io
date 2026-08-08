import Link from "next/link";

const estimates = {
  summonsPerDay: 6000,
  killsPerDay: 270000,
  cashPerDay: (1000000000 / 27) * 24,
};

function formatTime(hours: number) {
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  return `${days}d ${remainingHours}h`;
}

export default function TitlesPage() {
  return (
    <div className="flex flex-col gap-12 transition-all duration-500 ease-out">
      <div className="rounded-2xl border border-ink-line/70 bg-gradient-to-br from-ink-surface via-ink-surface/90 to-ink-surface/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          Titles
        </h1>
        <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-text-dim">
          Estimated time to reach each title based on your sample progression rates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Summons</h2>
          <p className="mt-1 text-sm text-text-dim">Based on 6,000 summons per day.</p>
          <div className="mt-6 space-y-4">
            {[
              { title: "Lucky Spark", requirement: 1000 },
              { title: "Star Caller", requirement: 10000 },
              { title: "Rift Invoker", requirement: 50000 },
              { title: "Fate Weaver", requirement: 100000 },
              { title: "Gate Sovereign", requirement: 200000 },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text-dim">Reach {item.requirement.toLocaleString()} Summons</p>
                  </div>
                  <div className="text-sm font-semibold text-text-dim">{formatTime(item.requirement / estimates.summonsPerDay * 24)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Wave (main mode)</h2>
          <p className="mt-1 text-sm text-text-dim">Wave completion is not directly time-based, but these are the milestones to aim for.</p>
          <div className="mt-6 space-y-4">
            {[
              { title: "Wavebreaker", requirement: 25 },
              { title: "Stormwalker", requirement: 50 },
              { title: "Endless Vanguard", requirement: 75 },
              { title: "Last Stand King", requirement: 100 },
              { title: "Stronghold Myth", requirement: 125 },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text-dim">Reach Wave {item.requirement}</p>
                  </div>
                  <div className="text-sm font-semibold text-text-dim">Estimate: N/A</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Kills</h2>
          <p className="mt-1 text-sm text-text-dim">Based on 270,000 kills per day.</p>
          <div className="mt-6 space-y-4">
            {[
              { title: "Rookie Slayer", requirement: 10000 },
              { title: "Demon Reaper", requirement: 50000 },
              { title: "Mass Executioner", requirement: 250000 },
              { title: "Ruin Bringer", requirement: 500000 },
              { title: "Extinction Omen", requirement: 1000000 },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text-dim">Reach {item.requirement.toLocaleString()} Kills</p>
                  </div>
                  <div className="text-sm font-semibold text-text-dim">{formatTime(item.requirement / estimates.killsPerDay * 24)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Cash</h2>
          <p className="mt-1 text-sm text-text-dim">Based on ~1 billion cash per 27 hours.</p>
          <div className="mt-6 space-y-4">
            {[
              { title: "Coin Holder", requirement: 100000 },
              { title: "Gold Sovereign", requirement: 1000000 },
              { title: "Vault Master", requirement: 10000000 },
              { title: "Wealth Tyrant", requirement: 100000000 },
              { title: "Billion Sovereign", requirement: 1000000000 },
              { title: "Wealth Incarnate", requirement: 100000000000 },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text-dim">Reach {item.requirement.toLocaleString()} Cash</p>
                  </div>
                  <div className="text-sm font-semibold text-text-dim">{formatTime(item.requirement / estimates.cashPerDay * 24)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Infinite Tower</h2>
          <p className="mt-1 text-sm text-text-dim">Infinite Tower titles are based on tower wave milestones.</p>
          <div className="mt-6 space-y-4">
            {[
              { title: "Infinity Climber", requirement: 25 },
              { title: "Tower Conqueror", requirement: 50 },
              { title: "Infinite Sovereign", requirement: 75 },
              { title: "Castle Transcendent", requirement: 100 },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text">{item.title}</p>
                    <p className="text-sm text-text-dim">Reach Wave {item.requirement} in Infinite Tower</p>
                  </div>
                  <div className="text-sm font-semibold text-text-dim">Estimate: N/A</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">Other</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-text">VIP</p>
                  <p className="text-sm text-text-dim">Unlock by purchasing VIP gamepass</p>
                </div>
                <Link href="/tutorial/gamepasses" className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-text transition hover:bg-white/15">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
