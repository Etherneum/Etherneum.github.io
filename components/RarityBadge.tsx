import { Rarity, RARITY_META } from "@/data/rarity";

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const meta = RARITY_META[rarity];
  const isMythic = rarity === "Mythic";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${meta.chip}`}
      style={isMythic ? {
        borderColor: "transparent",
        borderImage: "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #22c55e, #06b6d4, #6366f1, #c026d3) 1",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        color: "#f8fafc",
      } : undefined}
    >
      {rarity}
    </span>
  );
}
