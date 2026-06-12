"use client";

import AchievementsContent from "@/src/components/modules/AchievementsContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function AchievementsPage() {
  return (
    <OSWindow title="Accomplishment Nodes // Record 007" routeOnClose="/">
      <AchievementsContent />
    </OSWindow>
  );
}
