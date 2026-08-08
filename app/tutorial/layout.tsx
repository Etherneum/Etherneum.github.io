import { TutorialPageTransition } from "@/components/TutorialPageTransition";

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TutorialPageTransition>{children}</TutorialPageTransition>;
}
