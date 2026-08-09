import { GuideCategoryPage } from "@/components/GuideCategoryPage";

const ITEMS = [
  { title: "Traits benefits", href: "/tutorial/traits", description: "Trait tiers, buffs, and drop rates.", symbol: "✦" },
  { title: "Clone machine", href: "/tutorial/clone-machine", description: "Clone machine timings, mutation info, and baseline data.", symbol: "🧪" },
  { title: "Merging & cloning", href: "/tutorial/merging", description: "How merging and cloning work in practice.", symbol: "🧬" },
  { title: "Season 2 Battle Pass", href: "/tutorial/season-2-battle-pass", description: "Dedicated guide entry for the second battle pass rewards and progression.", symbol: "🗓️" },
];

export default function IntermediateGuidePage() {
  return (
    <GuideCategoryPage
      title="Intermediate"
      description="Build a stronger mid-game routine with traits, clone systems, and progression planning."
      items={ITEMS}
    />
  );
}
