import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const FEATURES = [
  {
    title: "Free items",
    description: "Collect free traits, essence, and other resources during the event window.",
    icon: "✨",
  },
  {
    title: "Astronaut mutation",
    description: "Astronaut is active for Admin Abuse, making it the best mutation to use.",
    icon: "🚀",
  },
  {
    title: "Obby at the Lobby",
    description: "Complete the lobby obby for additional rewards and bonus loot.",
    icon: "🎯",
  },
  {
    title: "Boss spawn",
    description: "A boss appears during Admin Abuse. Defeat it to earn extra rewards.",
    icon: "👾",
  },
];

export default function AdminAbusePage() {
  return (
    <TutorialSectionShell
      title="Admin Abuse"
      description="A weekly Sunday update event with free items, Astronaut mutation, lobby obby rewards, and boss spawn loot."
    >
      <div className="grid gap-6">
        <div className="rounded-2xl border border-ink-line bg-ink-surface p-6 shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
          <div className="mb-6 rounded-3xl border border-ink-line/70 bg-gradient-to-br from-ink-surface via-ink-surface-alt to-ink-surface/90 p-6">
            <p className="font-display text-xl font-black tracking-[0.06em] text-text">When it starts</p>
            <p className="mt-3 font-body text-sm leading-6 text-text-dim">
              Admin Abuse starts at <span className="font-semibold text-text">6 AM PST</span> on Sundays, which is typically when a new update drops. In other time zones, that is usually around <span className="font-semibold text-text">9 AM EST / 2 PM UTC</span>.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-ink-line/70 bg-ink-surface-alt p-5">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                  {feature.icon}
                </div>
                <h2 className="font-display text-lg font-black tracking-[0.05em] text-text">{feature.title}</h2>
                <p className="mt-2 font-body text-sm leading-6 text-text-dim">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-line bg-ink-surface p-6 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
          <h2 className="font-display text-xl font-black tracking-[0.06em] text-text">How to make the most of it</h2>
          <ul className="mt-4 space-y-3">
            <li className="rounded-3xl border border-ink-line/70 bg-ink-surface-alt p-4">
              <p className="font-semibold text-text">Gear up before Sunday</p>
              <p className="mt-1 text-sm text-text-dim">Have a strong team ready ahead of time so you can clear event content quickly once the update drops.</p>
            </li>
            <li className="rounded-3xl border border-ink-line/70 bg-ink-surface-alt p-4">
              <p className="font-semibold text-text">Hit the lobby obby</p>
              <p className="mt-1 text-sm text-text-dim">Complete the Obby at the Lobby for bonus rewards on top of the normal event drops.</p>
            </li>
            <li className="rounded-3xl border border-ink-line/70 bg-ink-surface-alt p-4">
              <p className="font-semibold text-text">Focus the boss</p>
              <p className="mt-1 text-sm text-text-dim">Defeating the boss during Admin Abuse gives extra loot, so bring your best units.</p>
            </li>
          </ul>
        </div>
      </div>
    </TutorialSectionShell>
  );
}
