import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const LIMITED_TIME_EVENTS = {
  intro: "The first battle pass is now grouped under Limited Time Events so it sits alongside other seasonal content in the guide.",
  highlights: [
    "Seasonal progression with a clear free and premium split.",
    "Designed to be completed in roughly 2–3 days of regular play.",
    "Focused on rewards that support progression, merging, and unit growth.",
  ],
};

export default function LimitedTimeEventsPage() {
  return (
    <TutorialSectionShell
      title="Limited Time Events"
      description="The first battle pass and other time-limited event content are collected here for quick reference."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Guide entry</p>
            <h2 className="mt-3 font-display text-2xl font-black">First battle pass</h2>
            <p className="mt-4 text-sm leading-7 text-text-dim">{LIMITED_TIME_EVENTS.intro}</p>
          </div>
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4 text-sm text-text-dim">
            <p className="font-semibold text-text">Event focus</p>
            <p className="mt-2">Fast progression and premium rewards for players who want to push through the season efficiently.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Length</p>
            <p className="mt-2 text-3xl font-black">30 levels</p>
          </div>
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Format</p>
            <p className="mt-2 text-3xl font-black">Free + Premium</p>
          </div>
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Goal</p>
            <p className="mt-2 text-3xl font-black">Season progress</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-ink-line/70 bg-ink p-5">
          <h3 className="font-display text-xl font-black">Highlights</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-text-dim">
            {LIMITED_TIME_EVENTS.highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </TutorialSectionShell>
  );
}
