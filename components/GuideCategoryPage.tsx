import Link from "next/link";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";

type GuideCategoryItem = {
  title: string;
  href: string;
  description: string;
  symbol: string;
  tag?: string;
};

type GuideCategoryPageProps = {
  title: string;
  description: string;
  items: GuideCategoryItem[];
  backHref?: string;
};

export function GuideCategoryPage({
  title,
  description,
  items,
  backHref = "/tutorial",
}: GuideCategoryPageProps) {
  return (
    <TutorialSectionShell title={title} description={description} backHref={backHref}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-red-500/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border border-white/10 bg-black/10 blur-3xl" />
            <div className="pointer-events-none absolute right-4 top-6 text-[5rem] font-black text-red-500/10 blur-sm">
              {item.symbol}
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl text-red-300 shadow-[0_10px_25px_rgba(239,68,68,0.16)]">
                  {item.symbol}
                </div>
                {item.tag ? (
                  <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-200">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <h2 className="font-display text-2xl font-black tracking-[0.05em] text-text">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-text-dim">{item.description}</p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold tracking-[0.04em] text-red-300/95">Open section →</span>
              <span className="text-xs uppercase tracking-[0.3em] text-text-faint">Guide</span>
            </div>
          </Link>
        ))}
      </div>
    </TutorialSectionShell>
  );
}
