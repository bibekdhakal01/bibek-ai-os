"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, Minimize2, Maximize2, Terminal } from "lucide-react";
import { soundManager } from "@/src/lib/sound";

interface OSWindowProps {
  title: string;
  children: React.ReactNode;
  routeOnClose?: string;
  defaultPosition?: { x: number; y: number };
}

export default function OSWindow({
  title,
  children,
  routeOnClose = "/",
  defaultPosition = { x: 0, y: 0 },
}: OSWindowProps) {
  const router = useRouter();
  const [isBooted, setIsBooted] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Play click on open
  useEffect(() => {
    soundManager.playClick();
    
    // Simulate short window boot logs
    const logs = [
      `CONNECTING STREAM: ${title.toUpperCase()}...`,
      "COMPILING SHADER SCHEMATICS...",
      "DECRYPTING CONTENT SEGMENTS...",
      "SUCCESS: INTERFACE DRAW COMPLETE."
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < logs.length) {
        setBootLogs((prev) => [...prev, logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooted(true), 150); // Finish boot sequence
      }
    }, 100);

    return () => clearInterval(interval);
  }, [title]);

  const handleClose = () => {
    soundManager.playClick();
    router.push(routeOnClose);
  };

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        drag
        dragMomentum={false}
        dragListener={true}
        // Let the user drag within the screen bounds roughly
        dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto w-full max-w-3xl h-[580px] flex flex-col hologram-panel cyber-corner shadow-[0_0_40px_rgba(0,210,255,0.18)] bg-panel-bg text-slate-100"
      >
        {/* Window Bezel Titlebar (Acts as Drag Handle) */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 bg-cyan-950/20 px-4 py-2.5 cursor-grab active:cursor-grabbing select-none">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[13px] uppercase tracking-wider font-bold">
            <Terminal className="w-4 h-4" />
            <span>{title}</span>
            <span className="text-[11px] opacity-40">// PORT_8080</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="text-cyan-500/50 hover:text-cyan-400 transition-colors p-1 rounded cursor-pointer">
              <Minimize2 className="w-4 h-4" />
            </button>
            <button className="text-cyan-500/50 hover:text-cyan-400 transition-colors p-1 rounded cursor-pointer">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="text-cyan-500/60 hover:text-red-400 hover:bg-red-950/20 transition-all p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative corner indicators */}
        <div className="absolute left-1 top-1 w-1.5 h-1.5 border-l border-t border-cyan-400/40 pointer-events-none" />
        <div className="absolute right-1 top-1 w-1.5 h-1.5 border-r border-t border-cyan-400/40 pointer-events-none" />
        <div className="absolute left-1 bottom-1 w-1.5 h-1.5 border-l border-b border-cyan-400/40 pointer-events-none" />
        <div className="absolute right-1 bottom-1 w-1.5 h-1.5 border-r border-b border-cyan-400/40 pointer-events-none" />

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto p-5 relative min-h-0 bg-cyan-950/5">
          {/* Subtle grid line inside window */}
          <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />

          {!isBooted ? (
            /* Window Terminal Boot Log */
            <div className="font-mono text-[12px] text-cyan-400/80 flex flex-col gap-1.5">
              {bootLogs.map((log, idx) => (
                <div key={idx} className="flex gap-1.5 items-center">
                  <span className="text-cyan-500/40">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              <span className="w-1.5 h-3 bg-cyan-400 animate-pulse mt-0.5" />
            </div>
          ) : (
            /* Booted target children content */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full font-sans"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* Bottom Status bar */}
          <div className="border-t border-cyan-500/15 bg-cyan-950/10 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono-hud text-cyan-500/60 uppercase select-none">
          <span>SYS_STATUS: VERIFIED</span>
          <span>MEM: 100% OK</span>
        </div>
      </motion.div>
    </div>
  );
}

