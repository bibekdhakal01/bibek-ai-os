"use client";

import ProjectsContent from "@/src/components/modules/ProjectsContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function ProjectsPage() {
  return (
    <OSWindow title="Project Repositories // Record 003" routeOnClose="/">
      <ProjectsContent />
    </OSWindow>
  );
}
