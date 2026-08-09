import { TutorialSectionShell } from "@/components/TutorialSectionShell";

const ACTIVE_CODES = [
  {
    code: "NINJAUPDATEPART1!",
    subtitle: "Requires Level 76+",
    rewards: ["300,000 Gold", "Diamond Tobi", "Mythic Capsule", "Trading Ticket"],
  },
  {
    code: "FACTIONUPDATE!",
    subtitle: "Requires Level 76+",
    rewards: ["350,000 Gold", "Gold Kashimo", "Mythic Capsule", "Infinite Ticket"],
  },
];

const EXPIRED_CODES = [
  {
    code: "SORCERERPART2!",
    subtitle: "Defeat wave 76 before redeeming",
    date: "8/2/26",
    rewards: ["200k Gold", "Diamond Joti", "3 Time Potions", "2 Luck Potions"],
  },
  {
    code: "TRADING&BATTLEPASS!",
    subtitle: "Defeat wave 76 before redeeming",
    date: "8/2/26",
    rewards: ["350k Gold", "Gold Megumo", "1 Super Time Potion", "3 Trading Tickets"],
  },
];

function CodeCard({
  code,
  subtitle,
  rewards,
  date,
  isNew = false,
}: {
  code: string;
  subtitle: string;
  rewards: string[];
  date?: string;
  isNew?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-ink-line/70 bg-ink-surface p-6 shadow-[0_10px_28px_rgba(0,0,0,0.22)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-display text-xl font-black tracking-[0.06em] text-text">{code}</p>
            {isNew ? (
              <span className="rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-200">
                New
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-text-dim">{subtitle}</p>
        </div>
        {date ? (
          <span className="inline-flex rounded-full border border-ink-line/70 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-text-dim">
            {date}
          </span>
        ) : null}
      </div>

      <ul className="space-y-3">
        {rewards.map((reward) => (
          <li
            key={reward}
            className="flex items-center gap-4 rounded-2xl border border-ink-line/50 bg-ink p-4 text-sm text-text"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-base text-red-200">
              🎁
            </span>
            <span>{reward}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LimitedTimeCodesPage() {
  return (
    <TutorialSectionShell
      title="Codes"
      description="Active codes are shown first, while older redeemable codes are kept under the expired section for reference."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-black">New codes</h2>
            <div className="mt-4 grid gap-4">
              {ACTIVE_CODES.map((code) => (
                <CodeCard key={code.code} code={code.code} subtitle={code.subtitle} rewards={code.rewards} isNew />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-black">Expired codes</h2>
            <div className="mt-4 grid gap-4">
              {EXPIRED_CODES.map((code) => (
                <CodeCard key={code.code} code={code.code} subtitle={code.subtitle} rewards={code.rewards} date={code.date} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </TutorialSectionShell>
  );
}
