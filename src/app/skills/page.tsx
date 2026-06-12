"use client";

import SkillsContent from "@/src/components/modules/SkillsContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function SkillsPage() {
  return (
    <OSWindow title="Technology Matrix // Record 002" routeOnClose="/">
      <SkillsContent />
    </OSWindow>
  );
}
