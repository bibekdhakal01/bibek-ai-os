"use client";

import ContactContent from "@/src/components/modules/ContactContent";
import OSWindow from "@/src/components/window/OSWindow";

export default function ContactPage() {
  return (
    <OSWindow title="Secure Comms Terminal // Record 008" routeOnClose="/">
      <ContactContent />
    </OSWindow>
  );
}
