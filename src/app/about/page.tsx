"use client";

import AboutContent from "@/src/components/modules/AboutContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function AboutPage() {
  return (
    <OSWindow title="Subject Biography // Record 001" routeOnClose="/">
      <AboutContent />
    </OSWindow>
  );
}
