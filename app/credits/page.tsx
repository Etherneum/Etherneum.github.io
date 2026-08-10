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
    <div className="mx-auto flex max-w-6xl flex-col gap-6 py-8 sm:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-white/5 p-6 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-text-faint">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-3 font-body text-sm leading-7 text-text-dim sm:text-base">
              {copy.description}
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-text-dim">
            {copy.badge}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {CREDITS.map((c, index) => (
          <article
            key={c.role}
            className="group rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-5 shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-faint">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
                <h2 className="mt-2 font-display text-xl font-black tracking-[0.06em] text-text">
                  {c.role}
                </h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-text-dim transition-transform duration-300 group-hover:scale-110">
                ✦
              </div>
            </div>
            <p className="mt-4 font-display text-lg tracking-[0.08em] text-white">
              {c.name}
            </p>
          </article>
        ))}
      </section>

      <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-text-faint">
        {copy.footer}
      </p>
    </div>
  );
}
