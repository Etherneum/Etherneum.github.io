import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08090d",
          elevated: "#10121a",
          surface: "#161923",
          surface2: "#1e2230",
          line: "#262b3a",
        },
        text: {
          DEFAULT: "#000000",
          dim: "#4b5563",
          faint: "#6b7280",
        },
        rarity: {
          common: "#34d399",
          rare: "#38bdf8",
          epic: "#a78bfa",
          legendary: "#fbbf24",
          mythic: "#fb7185",
          secret: "#94a3b8",
          limited: "#e879f9",
          god: "#ef4444",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "diagonal-slash":
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 10px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px -8px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
