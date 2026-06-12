"use client";

import { motion } from "framer-motion";

interface HudPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  corner?: "full" | "sm" | "none";
  glow?: boolean;
}

export function HudPanel({
  children,
  className = "",
  delay = 0,
  corner = "full",
  glow = false,
}: HudPanelProps) {
  const cornerClass =
    corner === "full" ? "cyber-corner" : corner === "sm" ? "cyber-corner-sm" : "";
  const glowClass = glow
    ? "shadow-[0_0_30px_rgba(0,210,255,0.08),inset_0_0_20px_rgba(0,210,255,0.04)]"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`hologram-panel ${cornerClass} ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
