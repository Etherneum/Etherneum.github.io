"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "es";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  lowGraphics: boolean;
  toggleLowGraphics: () => void;
  compactMode: boolean;
  toggleCompactMode: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [lowGraphics, setLowGraphics] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("raf-language") as Language | null;
    if (storedLanguage === "en" || storedLanguage === "es") {
      setLanguage(storedLanguage);
    }

    const storedMotion = window.localStorage.getItem("raf-reduce-motion");
    if (storedMotion === "true") {
      setReduceMotion(true);
    }

    const storedGraphics = window.localStorage.getItem("raf-low-graphics");
    if (storedGraphics === "true") {
      setLowGraphics(true);
    }

    const storedCompact = window.localStorage.getItem("raf-compact-mode");
    if (storedCompact === "true") {
      setCompactMode(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("raf-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem("raf-reduce-motion", reduceMotion ? "true" : "false");
    document.documentElement.classList.toggle("reduced-motion", reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    window.localStorage.setItem("raf-low-graphics", lowGraphics ? "true" : "false");
  }, [lowGraphics]);

  useEffect(() => {
    window.localStorage.setItem("raf-compact-mode", compactMode ? "true" : "false");
    document.documentElement.classList.toggle("compact-mode", compactMode);
  }, [compactMode]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      reduceMotion,
      toggleReduceMotion: () => setReduceMotion((value) => !value),
      lowGraphics,
      toggleLowGraphics: () => setLowGraphics((value) => !value),
      compactMode,
      toggleCompactMode: () => setCompactMode((value) => !value),
    }),
    [language, reduceMotion, lowGraphics, compactMode]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
