"use client";

import AcademicsContent from "@/src/components/modules/AcademicsContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function AcademicsPage() {
  return (
    <OSWindow title="Academic Database // Record 006" routeOnClose="/">
      <AcademicsContent />
    </OSWindow>
  );
}
