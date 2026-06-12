"use client";

import ExperienceContent from "@/src/components/modules/ExperienceContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function ExperiencePage() {
  return (
    <OSWindow title="Professional Logs // Record 005" routeOnClose="/">
      <ExperienceContent />
    </OSWindow>
  );
}
