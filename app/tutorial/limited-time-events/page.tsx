import Link from "next/link";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const EVENTS = [
  {
    title: "Order vs Chaos",
    href: "/tutorial/order-vs-chaos",
    description: "Open the dedicated event page with the shop, quests, and success guide.",
    symbol: "⚖️",
  },
  {
    title: "Battle Pass Season 1",
    href: "/tutorial/battlepass",
    description: "Review the full first battle pass layout with free and premium rewards.",
    symbol: "🎫",
  },
  {
    title: "Codes",
    href: "/tutorial/limited-time-events/codes",
    description: "New codes first, with expired codes moved into a separate section for reference.",
    symbol: "🎟️",
  },
  {
    title: "Season 2 Battle Pass",
    href: "/tutorial/season-2-battle-pass",
    description: "A dedicated page for the second battle pass so it stays easy to find in the guide.",
    symbol: "🗓️",
  },
];

export default function LimitedTimeEventsPage() {
  return (
    <TutorialSectionShell
      title="Limited Time Events"
      description="A guide-style hub for the current event pages, battle passes, and seasonal content."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((event) => (
            <Link
              key={event.href}
              href={event.href}
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-red-500/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl text-red-300 shadow-[0_10px_25px_rgba(239,68,68,0.16)]">
                  {event.symbol}
                </div>
                <h2 className="font-display text-2xl font-black tracking-[0.05em] text-text">
                  {event.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-dim">{event.description}</p>
              </div>
              <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold tracking-[0.04em] text-red-300/95">Open section →</span>
                <span className="text-xs uppercase tracking-[0.3em] text-text-faint">Guide</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </TutorialSectionShell>
  );
}
