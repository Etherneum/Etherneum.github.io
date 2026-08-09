import { GuideCategoryPage } from "@/components/GuideCategoryPage";

const ITEMS = [
  { title: "How to level up units", href: "/tutorial/upgrade", description: "The proper merging process for leveling units.", symbol: "⬆️" },
  { title: "Codes", href: "/tutorial/limited-time-events/codes", description: "Active redeem codes and their rewards.", symbol: "🎟️" },
  { title: "Team Building", href: "/tutorial/teambuilding", description: "How to build a META optimal team.", symbol: "⚔️" },
  { title: "Mutation events", href: "/tutorial/mutations", description: "Mutation bonuses and the event schedule.", symbol: "☄️" },
];

export default function BeginnerGuidePage() {
  return (
    <GuideCategoryPage
      title="Beginner"
      description="Start with the core progression and event basics that make the early game much smoother."
      items={ITEMS}
    />
  );
}
