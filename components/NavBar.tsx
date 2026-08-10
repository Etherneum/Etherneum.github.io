"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const LINKS = {
  en: [
    { href: "/", label: "Home" },
    { href: "/cards", label: "Cards" },
    { href: "/trades", label: "Trades" },
    { href: "/tierlist", label: "Tier List" },
    { href: "/tutorial", label: "Guide" },
    { href: "/credits", label: "Credits" },
  ],
  es: [
    { href: "/", label: "Inicio" },
    { href: "/cards", label: "Cartas" },
    { href: "/trades", label: "Intercambios" },
    { href: "/tierlist", label: "Lista de niveles" },
    { href: "/tutorial", label: "Guía" },
    { href: "/credits", label: "Créditos" },
  ],
};

const SETTINGS_COPY = {
  en: {
    language: "Language",
    open: "Open settings",
    motion: "Reduced motion",
    motionOn: "On",
    motionOff: "Off",
    graphics: "Reduce lag",
    graphicsOn: "On",
    graphicsOff: "Off",
    compact: "Compact mode",
    compactOn: "On",
    compactOff: "Off",
  },
  es: {
    language: "Idioma",
    open: "Abrir ajustes",
    motion: "Movimiento reducido",
    motionOn: "Activado",
    motionOff: "Desactivado",
    graphics: "Reducir lag",
    graphicsOn: "Activado",
    graphicsOff: "Desactivado",
    compact: "Modo compacto",
    compactOn: "Activado",
    compactOff: "Desactivado",
  },
};

export default function NavBar() {
  const pathname = usePathname();
  const { language, setLanguage, reduceMotion, toggleReduceMotion, lowGraphics, toggleLowGraphics, compactMode, toggleCompactMode } = useLanguage();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const links = LINKS[language];
  const settingsCopy = SETTINGS_COPY[language];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-text shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]">
            Etherneum
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            {links.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-200 sm:text-sm ${
                    active
                      ? "text-rarity-legendary"
                      : "text-text-dim hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((v) => !v)}
              aria-label={settingsCopy.open}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-text shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:border-rarity-god/40 hover:bg-white/10"
            >
              <span className="transition-transform duration-300 group-hover:rotate-90">⚙</span>
            </button>
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-ink-line/70 bg-ink-surface/95 p-3 shadow-xl shadow-black/30 animate-[fadeIn_0.2s_ease-out]">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint">{settingsCopy.language}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-sm transition ${language === "en" ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("es")}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-sm transition ${language === "es" ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                  >
                    ES
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint">
                      {settingsCopy.motion}
                    </p>
                    <button
                      type="button"
                      onClick={toggleReduceMotion}
                      className={`w-full rounded-lg px-2 py-1.5 text-sm transition ${reduceMotion ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                    >
                      {reduceMotion ? settingsCopy.motionOn : settingsCopy.motionOff}
                    </button>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint">
                      {settingsCopy.graphics}
                    </p>
                    <button
                      type="button"
                      onClick={toggleLowGraphics}
                      className={`w-full rounded-lg px-2 py-1.5 text-sm transition ${lowGraphics ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                    >
                      {lowGraphics ? settingsCopy.graphicsOn : settingsCopy.graphicsOff}
                    </button>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-faint">
                      {settingsCopy.compact}
                    </p>
                    <button
                      type="button"
                      onClick={toggleCompactMode}
                      className={`w-full rounded-lg px-2 py-1.5 text-sm transition ${compactMode ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                    >
                      {compactMode ? settingsCopy.compactOn : settingsCopy.compactOff}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
