import { GuideCategoryPage } from "@/components/GuideCategoryPage";

const ITEMS = [
  { title: "Infinite Tower", href: "/tutorial/infinite-tower", description: "Rewards and strategies for endless wave combat.", symbol: "🏰" },
  { title: "Gamepass priority", href: "/tutorial/gamepasses", description: "The recommended order for gamepasses.", symbol: "🛡️" },
  { title: "Evolution Machine", href: "/tutorial/evolution-machine", description: "How to evolve god units with Infinite Tower and crafting materials.", symbol: "🔧" },
  { title: "Order vs Chaos", href: "/tutorial/order-vs-chaos", description: "A dedicated limited-time event page with shop items, quests, and success tips.", symbol: "⚖️", tag: "NEW" },
];

export default function EndgameGuidePage() {
  return (
    <GuideCategoryPage
      title="Endgame"
      description="Push into the late-game systems where progression, endgame content, and event efficiency matter most."
      items={ITEMS}
    />
  );
}
