"use client";

import Link from "next/link";
import { useMemo } from "react";
import { UNITS } from "@/data/units";
import CardTile from "@/components/CardTile";
import { useLanguage } from "@/components/LanguageProvider";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function getImagePathCandidates(unitName: string) {
  const slug = normalize(unitName);
  const normalizedName = unitName
    .replace(/\s+/g, "_")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9_]/g, "");
  const strippedParentheses = unitName.replace(/\s*\(.*?\)\s*/g, " ").trim();
  const strippedName = strippedParentheses
    .replace(/\s+/g, "_")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9_]/g, "");

  const candidates = [
    `/cards/${encodeURIComponent(`${normalizedName}.png`)}`,
    `/cards/${encodeURIComponent(`${strippedName}.png`)}`,
    `/cards/${encodeURIComponent(`${slug}.png`)}`,
  ];

  return [...new Set(candidates)];
}

function withCardImages(units: typeof UNITS) {
  return units.map((unit) => {
    const imageCandidates = unit.image ? [unit.image] : getImagePathCandidates(unit.name);
    return {
      ...unit,
      image: imageCandidates[0],
      imageCandidates,
    };
  });
}

const SPOTLIGHT_NAMES = ["Sakuna (Heian)", "Goji (Shinjuku)", "Ais", "Kiwusuke", "Aldedo", "Wise"];

function resolveSpotlightUnits() {
  return SPOTLIGHT_NAMES
    .map((name) => {
      const key = normalize(name);
      const match = UNITS.find((unit) => {
        const unitName = normalize(unit.name);
        return unitName.includes(key) || key.includes(unitName);
      });
      return match;
    })
    .filter(Boolean) as typeof UNITS;
}

const QUICK_LINKS = {
  en: [
    { href: "/tierlist", label: "Tier List" },
    { href: "/cards", label: "Cards" },
    { href: "/tutorial", label: "Guide" },
  ],
  es: [
    { href: "/tierlist", label: "Lista de niveles" },
    { href: "/cards", label: "Cartas" },
    { href: "/tutorial", label: "Guía" },
  ],
};

const HERO_COPY = {
  en: {
    badge: "Meta update live",
    title: ["ROLL ANIME", "TO FIGHT"],
    subtitle: "Tier lists, unit cards, and everything else you need in one place.",
    featureTitle: "Quick paths",
    featureDescription: "Get the best units, trade smarter, and follow the meta with clear, fast guides.",
    features: [
      {
        title: "Search every unit",
        description: "Find cards by name, rarity, or meta value in one place.",
      },
      {
        title: "Check tier lists",
        description: "See which units lead the meta and which ones to avoid.",
      },
      {
        title: "Follow the guide",
        description: "Learn traits, mutations, and team builds for better matches.",
      },
    ],
    sectionTitle: "Meta spotlight",
    viewAll: "View all",
  },
  es: {
    badge: "Nuevas guías disponibles",
    title: ["ROLL ANIME", "TO FIGHT"],
    subtitle: "Listas de nivel, cartas y todo lo que necesitas en un solo lugar.",
    featureTitle: "Rutas rápidas",
    featureDescription: "Consigue las mejores unidades, comercia con inteligencia y sigue el meta con guías claras y rápidas.",
    features: [
      {
        title: "Busca todas las unidades",
        description: "Encuentra cartas por nombre, rareza o valor meta en un solo lugar.",
      },
      {
        title: "Revisa las listas de nivel",
        description: "Ve qué unidades lideran el meta y cuáles evitar.",
      },
      {
        title: "Sigue la guía",
        description: "Aprende traits, mutaciones y construcción de equipo para mejores partidas.",
      },
    ],
    sectionTitle: "Destacados del meta",
    viewAll: "Ver todo",
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const copy = useMemo(() => HERO_COPY[language], [language]);
  const spotlight = useMemo(() => withCardImages(resolveSpotlightUnits()), []);

  return (
    <div className="flex flex-col gap-16">
      <section className="relative isolate flex min-h-[calc(100vh-6rem)] w-full flex-col items-start justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-surface/70 via-ink-surface/40 to-transparent p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:min-h-[calc(100vh-5rem)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
        <div className="absolute left-1/2 top-6 h-32 w-32 -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative z-10 flex max-w-2xl flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-200">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            {copy.badge}
          </div>
          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-[0.08em] text-white sm:text-7xl">
            {copy.title[0]}
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-700 bg-clip-text text-transparent">{copy.title[1]}</span>
          </h1>
          <p className="max-w-md font-body text-sm text-white/80 sm:text-base">
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            {QUICK_LINKS[language].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-5 py-3 font-body text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                  i === 0
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 rounded-[2rem] border border-white/10 bg-ink-surface/80 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">
              {copy.featureTitle}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-text-faint">
              {copy.featureDescription}
            </p>
          </div>
          <Link
            href="/tutorial"
            className="guide-button inline-flex whitespace-nowrap px-5 py-3 text-sm"
          >
            Open the guide
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {copy.features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-ink-line/70 bg-ink p-5">
              <h3 className="font-display text-lg font-black tracking-[0.04em] text-text">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-faint">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-black tracking-[0.06em] text-text">{copy.sectionTitle}</h2>
          <Link href="/cards" className="font-body text-sm text-text-dim transition-colors hover:text-text">
            {copy.viewAll} &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {spotlight.map((unit, i) => (
            <div key={unit.id} style={{ transitionDelay: `${i * 40}ms` }} className="transform-gpu transition-all duration-300 hover:scale-105">
              <CardTile key={unit.id} unit={unit} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
