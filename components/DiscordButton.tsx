"use client";

import { useState } from "react";

const DISCORD_URL = "https://discord.com/invite/VvuzgFPZBV";
const GIVEAWAY_URL = "https://discord.gg/ERX7tXP6S5";

export default function DiscordButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <div className="relative flex flex-col items-end gap-1">
        <div className="rounded-full border border-[#5865F2]/40 bg-[#10131f]/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c7d2fe] shadow-lg backdrop-blur">
          Discord
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open Discord links"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#5865F2] text-white shadow-[0_18px_40px_-20px_rgba(88,101,242,0.75)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0.5"
        >
          <span className="discord-pulse absolute inset-0 rounded-full" aria-hidden="true" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="relative z-10">
            <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.003-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.662a.06.06 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
          </svg>
        </button>

        {isOpen ? (
          <div className="absolute bottom-14 right-0 min-w-[200px] flex flex-col gap-2 rounded-3xl border border-white/10 bg-[#0c1321]/95 p-3 shadow-xl shadow-black/30 backdrop-blur-xl">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl bg-[#5865F2] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#4b5fe2]"
            >
              Official Discord
            </a>
            <a
              href={GIVEAWAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl bg-white/10 px-3 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Giveaways
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
