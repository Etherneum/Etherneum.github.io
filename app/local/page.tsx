import Link from "next/link";

const BATTLEPASS_LEVELS = [
  { level: 1, free: "x10 Trait Shard", premium: "Demon Susuko" },
  { level: 2, free: "x3 Secret Essence", premium: "x20 Trait Shard" },
  { level: 3, free: "x10 Trait Shard", premium: "x5 Secret Essence" },
  { level: 4, free: "x3 God Essence", premium: "x5 God Essence" },
  { level: 5, free: "x15 Trait Shard", premium: "x25 Trait Shard" },
  { level: 6, free: "x5 Secret Essence", premium: "x8 Secret Essence" },
  { level: 7, free: "x15 Token", premium: "x5 God Essence" },
  { level: 8, free: "x3 God Essence", premium: "x25 Token" },
  { level: 9, free: "x15 Trait Shard", premium: "Secret Essence (+ x1 Luck Potion bonus, exact qty covered in screenshot)" },
  { level: 10, free: "x5 Secret Essence", premium: "Demon Moru" },
  { level: 11, free: "x20 Trait Shard", premium: "x35 Trait Shard" },
  { level: 12, free: "x3 God Essence", premium: "x5 God Essence" },
  { level: 13, free: "x3 Infinite Ticket", premium: "x8 Secret Essence" },
  { level: 14, free: "x5 Secret Essence", premium: "x4 Time Potion" },
  { level: 15, free: "Demon Hakuro", premium: "x5 God Essence" },
  { level: 16, free: "x25 Trait Shard", premium: "x5 Infinite Ticket" },
  { level: 17, free: "x5 God Essence", premium: "x45 Trait Shard" },
  { level: 18, free: "x6 Secret Essence", premium: "x5 God Essence" },
  { level: 19, free: "x3 Time Potion", premium: "x12 Secret Essence" },
  { level: 20, free: "x5 God Essence", premium: "Demon Daburi" },
  { level: 21, free: "x25 Token", premium: "x50 Trait Shard" },
  { level: 22, free: "x8 Secret Essence", premium: "x5 God Essence" },
  { level: 23, free: "x35 Trait Shard", premium: "x14 Secret Essence" },
  { level: 24, free: "x5 God Essence", premium: "x40 Token" },
  { level: 25, free: "x8 Secret Essence", premium: "x6 God Essence" },
  { level: 26, free: "x40 Trait Shard", premium: "x16 Secret Essence" },
  { level: 27, free: "x5 God Essence", premium: "x5 Time Potion" },
  { level: 28, free: "x5 Infinite Ticket", premium: "x8 God Essence" },
  { level: 29, free: "x4 Time Potion", premium: "x8 Infinite Ticket" },
  { level: 30, free: "Makina", premium: "Cursed Makina" },
];

export default function LocalPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border border-ink-line/70 bg-gradient-to-br from-ink-surface via-ink-surface/90 to-red-500/10 p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Local preview</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          Battle pass preview
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-text-dim">
          This page is a local view of the first battle pass content so you can inspect the free and premium rewards without leaving the site.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tutorial/battlepass" className="guide-button inline-flex px-4 py-2 text-sm">
            Open battle pass page
          </Link>
          <Link href="/tutorial/limited-time-events" className="guide-button-secondary inline-flex px-4 py-2 text-sm">
            Open limited time events
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-black">Free track vs premium track</h2>
            <p className="mt-2 text-sm text-text-dim">A quick local reference for the first season’s rewards.</p>
          </div>
          <div className="rounded-full border border-ink-line/70 bg-ink px-4 py-2 text-sm font-semibold text-text">
            30 levels • First battle pass
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-line/70 bg-ink">
          <div className="grid grid-cols-[90px_1fr_1fr] border-b border-ink-line/70 bg-ink-surface/80 text-sm font-semibold uppercase tracking-[0.24em] text-text-faint">
            <div className="px-4 py-3">Level</div>
            <div className="border-l border-ink-line/70 px-4 py-3">Free track</div>
            <div className="border-l border-ink-line/70 px-4 py-3">Premium track</div>
          </div>
          <div className="divide-y divide-ink-line/70">
            {BATTLEPASS_LEVELS.map((entry) => (
              <div key={entry.level} className="grid grid-cols-[90px_1fr_1fr] text-sm">
                <div className="px-4 py-3 font-semibold text-text">{entry.level}</div>
                <div className="border-l border-ink-line/70 px-4 py-3 text-text-dim">{entry.free}</div>
                <div className="border-l border-ink-line/70 px-4 py-3 text-text-dim">{entry.premium}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
