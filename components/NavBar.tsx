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
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-text">
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
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-white/10 to-white/5 px-3 py-2 text-sm font-semibold text-text shadow-[0_12px_28px_-14px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-rarity-god/40 hover:bg-white/10"
            >
              <span className="text-base transition-transform duration-300 group-hover:rotate-90">⚙</span>
              <span className="hidden text-[11px] uppercase tracking-[0.24em] sm:inline">
                {language === "es" ? "Ajustes" : "Settings"}
              </span>
              <span className="flex items-center gap-1">
                {reduceMotion ? <span className="h-2 w-2 rounded-full bg-emerald-400" /> : <span className="h-2 w-2 rounded-full bg-white/30" />}
                {lowGraphics ? <span className="h-2 w-2 rounded-full bg-sky-400" /> : <span className="h-2 w-2 rounded-full bg-white/30" />}
                {compactMode ? <span className="h-2 w-2 rounded-full bg-amber-400" /> : <span className="h-2 w-2 rounded-full bg-white/30" />}
              </span>
            </button>
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-[1.1rem] border border-white/10 bg-ink-surface/95 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-faint">
                    {language === "es" ? "Preferencias" : "Preferences"}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-text-dim">
                    {language === "es" ? "Rápido" : "Quick"}
                  </span>
                </div>
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
                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    onClick={toggleReduceMotion}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-sm transition ${reduceMotion ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                  >
                    <span>{settingsCopy.motion}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em]">{reduceMotion ? settingsCopy.motionOn : settingsCopy.motionOff}</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleLowGraphics}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-sm transition ${lowGraphics ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                  >
                    <span>{settingsCopy.graphics}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em]">{lowGraphics ? settingsCopy.graphicsOn : settingsCopy.graphicsOff}</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleCompactMode}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-sm transition ${compactMode ? "bg-rarity-god/20 text-white" : "bg-white/5 text-text-dim hover:text-text"}`}
                  >
                    <span>{settingsCopy.compact}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em]">{compactMode ? settingsCopy.compactOn : settingsCopy.compactOff}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
