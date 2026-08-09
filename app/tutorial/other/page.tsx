import { GuideCategoryPage } from "@/components/GuideCategoryPage";

const ITEMS = [
  { title: "Free-to-play tokens", href: "/tutorial/free-to-play-tokens", description: "How to earn tokens and spend them efficiently without Robux.", symbol: "🪙" },
  { title: "Titles", href: "/tutorial/titles", description: "Achievement titles and approximate time estimates.", symbol: "🏷️" },
  { title: "Admin Abuse", href: "/tutorial/admin-abuse", description: "Weekly update event with free items, Astronaut mutation, obby, and boss rewards.", symbol: "⚠️" },
  { title: "Limited Time Events", href: "/tutorial/limited-time-events", description: "Event hub for battle passes and limited-time content.", symbol: "🎉" },
];

export default function OtherGuidePage() {
  return (
    <GuideCategoryPage
      title="Other"
      description="A catch-all section for the extra guides that do not fit neatly into the main progression tracks."
      items={ITEMS}
    />
  );
}
