"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const GUIDE_COPY = {
  en: {
    title: "Guide",
    subtitle: "Explore the main guide topics with a smoother, more polished experience.",
    categoryTitle: "Explore by experience",
    overview: "Guide overview",
    categories: [
      { title: "Beginner", href: "/tutorial/beginner", description: "Core progression and simple starting advice.", symbol: "🌱" },
      { title: "Intermediate", href: "/tutorial/intermediate", description: "Traits, cloning, and stronger mid-game routines.", symbol: "⚙️" },
      { title: "Endgame", href: "/tutorial/endgame", description: "Late-game systems, event efficiency, and progression depth.", symbol: "🏁" },
      { title: "Other", href: "/tutorial/other", description: "Extra guides and support content.", symbol: "🧭" },
    ],
    items: [
      { title: "Team Building", href: "/tutorial/teambuilding", description: "How to build a META optimal team.", symbol: "⚔️" },
      { title: "Traits benefits", href: "/tutorial/traits", description: "Trait tiers, buffs, and drop rates.", symbol: "✦" },
      { title: "How to level up units", href: "/tutorial/upgrade", description: "The proper merging process for leveling units.", symbol: "⬆️" },
      { title: "Mutation events", href: "/tutorial/mutations", description: "Mutation bonuses and the event schedule.", symbol: "☄️" },
      { title: "Merging & cloning", href: "/tutorial/merging", description: "How merging and cloning work in practice.", symbol: "🧬" },
      { title: "Clone machine", href: "/tutorial/clone-machine", description: "Clone machine timings by mutation, trait, rarity, and level 1 baseline data.", symbol: "🧪" },
      { title: "Evolution Machine", href: "/tutorial/evolution-machine", description: "How to evolve god units with Infinite Tower and crafting materials.", symbol: "🔧" },
      { title: "Gamepass priority", href: "/tutorial/gamepasses", description: "The recommended order for gamepasses.", symbol: "🛡️" },
      { title: "Order vs Chaos", href: "/tutorial/order-vs-chaos", description: "A dedicated limited-time event page with shop items, quests, and success tips.", symbol: "⚖️", tag: "NEW" },
      { title: "Free-to-play tokens", href: "/tutorial/free-to-play-tokens", description: "How to earn tokens and spend them efficiently without Robux.", symbol: "🪙" },
      { title: "Titles", href: "/tutorial/titles", description: "Achievement titles and approximate time estimates.", symbol: "🏷️" },
      { title: "Codes", href: "/tutorial/limited-time-events/codes", description: "Active redeem codes and their rewards.", symbol: "🎟️" },
      { title: "Infinite Tower", href: "/tutorial/infinite-tower", description: "Rewards and strategies for endless wave combat.", symbol: "🏰" },
      { title: "Admin Abuse", href: "/tutorial/admin-abuse", description: "Weekly update event with free items, Astronaut mutation, obby, and boss rewards.", symbol: "⚠️" },
      { title: "Season 2 Battle Pass", href: "/tutorial/season-2-battle-pass", description: "Dedicated guide entry for the second battle pass rewards and progression.", symbol: "🗓️" },
      { title: "Limited Time Events", href: "/tutorial/limited-time-events", description: "Event hub for battle passes and limited-time content.", symbol: "🎉" },
    ],
    badge: (index: number) => `Guide ${index + 1}`,
    action: "Open section →",
  },
  es: {
    title: "Guía",
    subtitle: "Explora los temas principales de la guía con una experiencia más fluida y pulida.",
    categoryTitle: "Explora por experiencia",
    overview: "Resumen de la guía",
    categories: [
      { title: "Principiante", href: "/tutorial/beginner", description: "Progresión básica y consejos iniciales.", symbol: "🌱" },
      { title: "Intermedio", href: "/tutorial/intermediate", description: "Traits, clonación y rutinas más fuertes de mitad de juego.", symbol: "⚙️" },
      { title: "Endgame", href: "/tutorial/endgame", description: "Sistemas de fin de juego, eficiencia de eventos y profundidad de progresión.", symbol: "🏁" },
      { title: "Otros", href: "/tutorial/other", description: "Guías adicionales y contenido de soporte.", symbol: "🧭" },
    ],
    items: [
      { title: "Construcción de equipo", href: "/tutorial/teambuilding", description: "Cómo construir un equipo META óptimo.", symbol: "⚔️" },
      { title: "Beneficios de traits", href: "/tutorial/traits", description: "Niveles de traits, buffs y probabilidades de drop.", symbol: "✦" },
      { title: "Cómo subir de nivel unidades", href: "/tutorial/upgrade", description: "El proceso adecuado de fusión para subir de nivel las unidades.", symbol: "⬆️" },
      { title: "Eventos de mutación", href: "/tutorial/mutations", description: "Bonos de mutación y calendario del evento.", symbol: "☄️" },
      { title: "Fusión y clonación", href: "/tutorial/merging", description: "Cómo funcionan la fusión y la clonación en la práctica.", symbol: "🧬" },
      { title: "Máquina de clonación", href: "/tutorial/clone-machine", description: "Tiempos de la máquina de clonación por mutación, trait, rareza y datos base de nivel 1.", symbol: "🧪" },
      { title: "Prioridad de gamepasses", href: "/tutorial/gamepasses", description: "El orden recomendado para los gamepasses.", symbol: "🛡️" },
      { title: "Order vs Chaos", href: "/tutorial/order-vs-chaos", description: "Una página dedicada del evento limitado con objetos de tienda, misiones y consejos para tener éxito.", symbol: "⚖️", tag: "NUEVO" },
      { title: "Tokens para free-to-play", href: "/tutorial/free-to-play-tokens", description: "Cómo ganar tokens y gastarlos eficientemente sin Robux.", symbol: "🪙" },
      { title: "Títulos", href: "/tutorial/titles", description: "Títulos de logro y estimaciones aproximadas de tiempo.", symbol: "🏷️" },
      { title: "Códigos", href: "/tutorial/limited-time-events/codes", description: "Códigos activos de canje y sus recompensas.", symbol: "🎟️" },
      { title: "Torre Infinita", href: "/tutorial/infinite-tower", description: "Recompensas y estrategias para combate de olas infinitas.", symbol: "🏰" },
      { title: "Abuso de administrador", href: "/tutorial/admin-abuse", description: "Evento de actualización semanal con artículos gratis, mutación astronauta, obby y recompensas de boss.", symbol: "⚠️" },
      { title: "Battle Pass Season 2", href: "/tutorial/season-2-battle-pass", description: "Entrada dedicada de la guía para las recompensas y progresión del segundo battle pass.", symbol: "🗓️" },
      { title: "Eventos de tiempo limitado", href: "/tutorial/limited-time-events", description: "Centro de eventos de tiempo limitado y battle passes.", symbol: "🎉" },
    ],
    badge: (index: number) => `Guía ${index + 1}`,
    action: "Abrir sección →",
  },
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-4 font-display text-2xl font-black tracking-[0.06em] text-text sm:text-3xl">
      {title}
    </h2>
  );
}

export default function TutorialPage() {
  const { language } = useLanguage();
  const copy = GUIDE_COPY[language];

  return (
    <div className="flex flex-col gap-14 transition-all duration-500 ease-out">
      <div className="rounded-2xl border border-ink-line/70 bg-gradient-to-br from-ink-surface via-ink-surface/90 to-ink-surface/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-text-dim">
          {copy.subtitle}
        </p>
      </div>

      <section>
        <SectionHeading title={copy.categoryTitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-red-500/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_40%)]" />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/10 bg-white/5 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border border-white/10 bg-black/10 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl text-red-300 shadow-[0_10px_25px_rgba(239,68,68,0.16)]">
                  {category.symbol}
                </div>
                <h3 className="font-display text-2xl font-black tracking-[0.05em] text-text">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-dim">{category.description}</p>
              </div>
              <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold tracking-[0.04em] text-red-300/95">Open section →</span>
                <span className="text-xs uppercase tracking-[0.3em] text-text-faint">Guide</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title={copy.overview} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-red-500/10 bg-gradient-to-br from-ink-surface via-ink-surface/95 to-red-500/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_16px_42px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-red-400/20 hover:shadow-[0_18px_48px_rgba(255,255,255,0.08)]"
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
                <h3 className="font-display text-2xl font-black tracking-[0.05em] text-text transition-colors duration-300 group-hover:text-red-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-dim">{item.description}</p>
              </div>
              <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold tracking-[0.04em] text-red-300/95 transition-colors duration-200 group-hover:text-red-200">
                  {copy.action}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-text-faint">Guide</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
