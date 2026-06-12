"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/src/data/profile";

const statusMessages = [
  "NEURAL PATHWAYS STABLE",
  "COGNITIVE MATRIX ONLINE",
  "AI SYSTEMS OPTIMAL",
  "IDENTITY AUTHENTICATED",
];

const tags = ["AI Engineer", "Full-Stack Dev", "Builder", "Problem Solver"];

export default function HomePage() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [tagIdx, setTagIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = setInterval(() => setStatusIdx((i) => (i + 1) % statusMessages.length), 3200);
    const t = setInterval(() => setTagIdx((i) => (i + 1) % tags.length), 2400);
    return () => { clearInterval(s); clearInterval(t); };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none select-none flex flex-col items-center gap-0 w-full">

      {/* ── Identity block (floats above core) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-2 text-center"
      >
        {/* Clearance badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-2 border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-sm px-3 py-1 rounded-full"
        >
          <span className="status-dot-active" />
          <span className="text-hud-xs font-mono uppercase tracking-[0.22em] text-cyan-400">
            CLEARANCE: ALPHA · SYSTEM ACTIVE
          </span>
        </motion.div>

        {/* Primary name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.08em] text-white hologram-text-glow-white leading-none"
        >
          {profileData.name.toUpperCase()}
        </motion.h1>

        {/* Rotating tag */}
        <div className="h-6 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={tagIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="font-orbitron font-semibold text-sm sm:text-base tracking-[0.18em] text-cyan-400"
            >
              {tags[tagIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Spacer for the AI Core (visible behind this layer) ── */}
      <div className="h-[260px] sm:h-[360px] md:h-[420px]" />

      {/* ── Status ticker + action hints (below core) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="flex flex-col items-center gap-3"
      >
        {/* Rotating status message */}
        <div className="h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#00f5ff]" />
              <span className="text-hud-xs font-mono uppercase tracking-[0.2em] text-cyan-400/80">
                {statusMessages[statusIdx]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Click hint */}
        <motion.p
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-hud-xs font-mono uppercase tracking-[0.25em] text-cyan-500/50"
        >
          ↑ Interact with core · Select a module below ↓
        </motion.p>

        {/* Location + version pill row */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {[
            `⌖ ${profileData.location}`,
            `FW ${profileData.version}`,
            `SYN ${profileData.synergyLevel}%`,
          ].map((pill) => (
            <span
              key={pill}
              className="text-hud-xs font-mono tracking-[0.14em] text-cyan-500/60 border border-cyan-500/12 bg-cyan-950/15 px-2.5 py-0.5 rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
