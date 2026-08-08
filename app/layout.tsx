import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import DiscordButton from "@/components/DiscordButton";
import InteractiveBackground from "@/components/InteractiveBackground";
import { LanguageProvider } from "@/components/LanguageProvider";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roll Anime to Fight — Unofficial Guide",
  description:
    "Tier lists, unit cards, traits, mutations, and upgrade guides for the Roblox game Roll Anime to Fight.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen font-body">
        <LanguageProvider>
          <InteractiveBackground />
          <NavBar />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">{children}</main>
          <footer className="mx-auto max-w-6xl border-t border-ink-line/70 px-4 py-8 text-text-faint sm:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-body text-sm text-text">Roll Anime to Fight guide — units, tier lists, and meta help in one place.</p>
                <p className="mt-2 text-xs text-text-faint">Updated for the current game meta. Built by Eternal.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a href="/cards" className="text-rarity-legendary hover:text-white">Cards</a>
                <a href="/tierlist" className="text-rarity-legendary hover:text-white">Tier List</a>
                <a href="/tutorial" className="text-rarity-legendary hover:text-white">Guide</a>
                <a href="https://discord.com/invite/VvuzgFPZBV" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text transition hover:border-rarity-god/40 hover:bg-white/10">Discord</a>
              </div>
            </div>
          </footer>
          <DiscordButton />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
