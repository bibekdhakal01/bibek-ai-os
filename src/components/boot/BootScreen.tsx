"use client";

import { useEffect, useState } from "react";
import { useOSStore } from "@/src/store/useOSStore";
import { soundManager } from "@/src/lib/sound";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert } from "lucide-react";

const bootLines = [
  "BIOS VERSION: v7.1.4-STARKCORE",
  "RAM DETECTED: 64.0 GB COGNITIVE MEMORY ALLOC",
  "LOADING CORE MODULES...",
  "  -> [OK] src/data/profile.ts (1.2KB)",
  "  -> [OK] src/data/skills.ts (3.4KB)",
  "  -> [OK] src/data/projects.ts (4.8KB)",
  "CONNECTING SECURE NEURAL CHANNELS...",
  "  -> LOCALHOST PORT [8000] ONLINE",
  "  -> GATEWAY KTM_NEPAL SECURED",
  "AUTHENTICATING SUBJECT COGNITIVE SIGNATURE...",
  "  -> IDENTITY DETECTED: BIBEK DHAKAL",
  "SYSTEM MATRIX STATUS: STABLE [98.6%]",
  "OS READY FOR INITIALIZATION."
];

export default function BootScreen() {
  const { boot, toggleMute } = useOSStore();
  const [lines, setLines] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    // Print lines sequentially
    let lineIdx = 0;
    const printInterval = setInterval(() => {
      if (lineIdx < bootLines.length) {
        setLines((prev) => [...prev, bootLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(printInterval);
      }
    }, 150);

    // Increase percentage loading
    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setBootReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 45);

    return () => {
      clearInterval(printInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleBootTrigger = () => {
    // Enable audio by unmuting on this user action
    toggleMute();
    soundManager.setMuted(false);
    
    // Play boot audio
    soundManager.playBoot();

    // Trigger store boot action
    boot();
  };

  return (
    <div className="fixed inset-0 bg-cyber-black flex flex-col justify-between p-6 sm:p-12 z-55 font-mono text-cyan-400 select-none">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-cyan-500/25 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 animate-pulse" />
          <span className="font-orbitron font-black text-sm tracking-widest text-white">
            BIBEK_AI_OS_BOOT
          </span>
        </div>
        <span className="text-[10px] text-cyan-500/60 font-semibold">SECURE CONSOLE</span>
      </div>

      {/* Terminal Screen */}
      <div className="flex-1 my-6 overflow-y-auto text-[11px] sm:text-xs flex flex-col gap-1.5 scrollbar-none max-w-2xl">
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className={line?.includes("[OK]") ? "text-emerald-400" : line?.includes("IDENTITY DETECTED") ? "text-white font-bold" : ""}
          >
            {line}
          </motion.div>
        ))}

        {percent < 100 && (
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-3.5 bg-cyan-400 mt-1"
          />
        )}
      </div>

      {/* Footer / Initialization Controls */}
      <div className="border-t border-cyan-500/25 pt-6 flex flex-col items-center gap-4">
        {/* Loading Progress Bar */}
        <div className="w-full max-w-md flex flex-col gap-2">
          <div className="flex justify-between text-[10px]">
            <span>SECTOR SCAN PROGRESS</span>
            <span className="font-bold">{percent}%</span>
          </div>
          <div className="w-full h-2 bg-cyan-950/40 border border-cyan-500/20 rounded overflow-hidden">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_8px_#00f5ff] transition-all duration-100"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Cinematic Start Trigger */}
        <AnimatePresence>
          {bootReady && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 w-full max-w-xs flex justify-center"
            >
              <button
                onClick={handleBootTrigger}
                className="hologram-btn py-3 px-6 rounded-lg font-orbitron font-black text-xs tracking-[0.2em] uppercase w-full flex items-center justify-center gap-2 group border-cyan-400 animate-pulse-slow cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-cyan-400 group-hover:animate-spin" />
                Initialize System
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
