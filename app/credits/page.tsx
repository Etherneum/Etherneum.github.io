"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { CREDITS } from "@/data/credits";

const CREDITS_COPY = {
  en: {
    eyebrow: "Appreciation",
    title: "Credits",
    description: "A dedicated thanks to the people and communities that helped shape this guide into something useful and enjoyable.",
    badge: "Fan-made guide",
    footer: "Not affiliated with Roll Anime to Fight or Roblox.",
  },
  es: {
    eyebrow: "Agradecimientos",
    title: "Créditos",
    description: "Un agradecimiento especial a las personas y comunidades que ayudaron a convertir esta guía en algo útil y entretenido.",
    badge: "Guía hecha por fans",
    footer: "No está afiliado con Roll Anime to Fight ni con Roblox.",
  },
};

export default function CreditsPage() {
  const { language } = useLanguage();
  const copy = CREDITS_COPY[language];
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 py-8 sm:py-10">
      <div className="overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_20px_50px_rgba(0,0,0,0.3)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-red-300/80">
              {copy.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-text-dim">
              {copy.description}
            </p>
          </div>
          <div className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-200">
            {copy.badge}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {CREDITS.map((c, index) => (
          <div
            key={c.role}
            className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-300/80">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
                <h2 className="mt-2 font-display text-xl font-black tracking-[0.06em] text-text">
                  {c.role}
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-red-200 transition-transform duration-300 group-hover:scale-110">
                ✦
              </div>
            </div>
            <p className="mt-4 font-display text-lg tracking-[0.08em] text-text">
              {c.name}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-text-faint">
        {copy.footer}
      </p>
    </div>
  );
}
