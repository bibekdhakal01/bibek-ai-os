"use client";

import GithubContent from "@/src/components/modules/GithubContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function GithubPage() {
  return (
    <OSWindow title="GitHub Registry // Record 004" routeOnClose="/">
      <GithubContent />
    </OSWindow>
  );
}
