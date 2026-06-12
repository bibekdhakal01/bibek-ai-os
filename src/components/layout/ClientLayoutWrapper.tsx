"use client";

import { usePathname } from "next/navigation";
import { useOSStore } from "@/src/store/useOSStore";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/src/components/boot/BootScreen";
import Particles from "@/src/components/ai-core/Particles";
import Navbar from "@/src/components/navigation/Navbar";
import LeftPanel from "@/src/components/panels/LeftPanel";
import RightPanel from "@/src/components/panels/RightPanel";
import CircularMenu from "@/src/components/navigation/CircularMenu";
import AICore from "@/src/components/ai-core/AICore";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const { isBooted } = useOSStore();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AnimatePresence mode="wait">
      {!isBooted ? (
        <motion.div key="boot" className="h-full w-full">
          <BootScreen />
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-full w-full min-h-screen bg-cyber-black text-slate-100 overflow-hidden font-mono"
        >
          {/* Cybernetic Background Grid & Scanline */}
          <div className="absolute inset-0 cyber-grid opacity-30 z-0 pointer-events-none" />
          <div className="pointer-events-none fixed inset-0 z-50 animate-scanline bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent opacity-25" />

          {/* Interactive Particle Network */}
          <Particles />

          {/* Top Navbar HUD */}
          <Navbar />

          {/* Side Diagnostic Panels (Fixed left & right) */}
          <LeftPanel />
          <RightPanel />

          {/* Core Desktop Space */}
          <main className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 md:px-0">
            {/* 1. Central Holographic Core (Visible in background) */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pointer-events-none z-0 ${
                isHome
                  ? "scale-100 opacity-100"
                  : "scale-75 md:scale-90 opacity-15 md:opacity-25"
              }`}
            >
              <div className="pointer-events-auto">
                <AICore />
              </div>
            </div>

            {/* 2. Floating Window Layer (foreground) */}
            <div className="relative z-10 w-full max-w-4xl flex items-center justify-center pt-12 pb-20">
              {children}
            </div>
          </main>

          {/* Bottom Dock Control Strip */}
          <CircularMenu />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
