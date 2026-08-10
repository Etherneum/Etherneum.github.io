"use client";

import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
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
    { href: "/local", label: "Local Preview" },
  ],
  es: [
    { href: "/tierlist", label: "Lista de niveles" },
    { href: "/cards", label: "Cartas" },
    { href: "/tutorial", label: "Guía" },
    { href: "/local", label: "Vista local" },
  ],
};

const HERO_COPY = {
  en: {
    badge: "Meta update live",
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

const SITE_TITLE = "Etherneum";
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getRandomGlitchChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export default function HomePage() {
  const { language } = useLanguage();
  const copy = useMemo(() => HERO_COPY[language], [language]);
  const spotlight = useMemo(() => withCardImages(resolveSpotlightUnits()), []);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [glitchChars, setGlitchChars] = useState<string[]>(Array(SITE_TITLE.length).fill(""));

  useEffect(() => {
    if (hoveredLetter === null) {
      setGlitchChars(Array(SITE_TITLE.length).fill(""));
      return;
    }

    const glitchIndices = [hoveredLetter - 1, hoveredLetter, hoveredLetter + 1].filter(
      (index) => index >= 0 && index < SITE_TITLE.length
    );

    const interval = window.setInterval(() => {
      setGlitchChars((current) =>
        current.map((ch, index) => (glitchIndices.includes(index) ? getRandomGlitchChar() : ""))
      );
    }, 140);

    return () => window.clearInterval(interval);
  }, [hoveredLetter]);

  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      <section className="isolate -mx-4 flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-20 sm:-mx-6 sm:px-10 sm:py-24 lg:min-h-[84vh] lg:px-12 lg:py-32">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 text-center lg:gap-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            {copy.badge}
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-display text-[3.8rem] font-black uppercase leading-[0.88] tracking-[-0.04em] text-rose-100 drop-shadow-[0_0_30px_rgba(244,63,94,0.3)] sm:text-[5.5rem]">
              {SITE_TITLE.split("").map((letter, index) => {
                const isNearby = hoveredLetter !== null && Math.abs(index - hoveredLetter) <= 1;
                const displayChar = isNearby && glitchChars[index] ? glitchChars[index] : letter;
                return (
                  <span
                    key={`${letter}-${index}`}
                    onMouseEnter={() => setHoveredLetter(index)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    className="inline-block px-0.5 transition-all duration-200"
                  >
                    <span className={`transition-all duration-200 ${isNearby ? "text-rose-200" : "text-rose-100"}`}>
                      {displayChar}
                    </span>
                  </span>
                );
              })}
            </h1>
            <p className="text-sm uppercase tracking-[0.45em] text-rose-200/90 sm:text-base">
              Roll Anime to Fight guide
            </p>
          </div>
          <p className="max-w-3xl px-4 font-body text-base leading-8 text-white/75 sm:text-lg lg:text-xl">
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {QUICK_LINKS[language].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  i === 0
                    ? "bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 text-white shadow-[0_20px_55px_-30px_rgba(251,146,60,0.55)] hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-32px_rgba(251,146,60,0.65)]"
                    : "border border-white/15 bg-white/10 text-white hover:border-white/20 hover:bg-white/15"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-card p-8 sm:p-10 lg:p-12">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:gap-6">
          {copy.features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
