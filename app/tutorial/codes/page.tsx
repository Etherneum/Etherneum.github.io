import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const CODES = [
  {
    code: "SORCERERPART2!",
    subtitle: "Defeat wave 76 before redeeming",
    date: "8/2/26",
    rewards: [
      { icon: "/cards/items/Gold_Coin.png", alt: "gold coin", label: "200k Gold" },
      { icon: "/cards/Joti.png", alt: "joti", label: "Diamond Joti" },
      { icon: "/cards/items/Time_Potion.png", alt: "time potion", label: "3 Time Potions" },
      { icon: "/cards/items/Luck_Potion.png", alt: "luck potion", label: "2 Luck Potions" },
    ],
  },
  {
    code: "TRADING&BATTLEPASS!",
    subtitle: "Defeat wave 76 before redeeming",
    date: "8/2/26",
    rewards: [
      { icon: "/cards/items/Gold_Coin.png", alt: "gold coin", label: "350k Gold" },
      { icon: "/cards/Megumo.png", alt: "megumo", label: "Gold Megumo" },
      { icon: "/cards/items/Super_Time_Potion.png", alt: "super time potion", label: "1 Super Time Potion" },
      { icon: "/cards/items/Trading_Ticket.png", alt: "trading ticket", label: "3 Trading Tickets" },
    ],
  },
];

export default function CodesPage() {
  return (
    <TutorialSectionShell
      title="Codes"
      description="Redeem the latest available codes for gold, units, and resources."
    >
      <div className="grid gap-6">
        {CODES.map((code) => (
          <div
            key={code.code}
            className="rounded-2xl border border-ink-line bg-ink-surface p-6 shadow-[0_10px_28px_rgba(0,0,0,0.22)]"
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl font-black tracking-[0.06em] text-text">
                  {code.code}
                </p>
                <p className="mt-1 text-sm text-text-dim">{code.subtitle}</p>
              </div>
              <span className="inline-flex rounded-full border border-ink-line/70 bg-ink-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
                {code.date}
              </span>
            </div>

            <ul className="space-y-3">
              {code.rewards.map((reward) => (
                <li
                  key={`${code.code}-${reward.label}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-line/50 bg-ink-surface-alt px-4 py-3 text-sm text-text"
                >
                  <img
                    src={reward.icon}
                    alt={reward.alt}
                    className="h-12 w-12 shrink-0"
                  />
                  <span>{reward.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </TutorialSectionShell>
  );
}
