"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type TutorialPageTransitionProps = {
  children: ReactNode;
};

export function TutorialPageTransition({ children }: TutorialPageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = window.setTimeout(() => setIsVisible(true), 10);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 scale-[0.98]"
      }`}
    >
      {children}
    </div>
  );
}
