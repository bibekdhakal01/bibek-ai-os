"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, Cpu, Code, Briefcase, GraduationCap, Award, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { soundManager } from "@/src/lib/sound";

const modules = [
  { id: "about", label: "About", icon: User, path: "/about" },
  { id: "skills", label: "Skills", icon: Cpu, path: "/skills" },
  { id: "projects", label: "Projects", icon: Code, path: "/projects" },
  { id: "github", label: "GitHub", icon: FaGithub, path: "/github" },
  { id: "experience", label: "Experience", icon: Briefcase, path: "/experience" },
  { id: "academics", label: "Academics", icon: GraduationCap, path: "/academics" },
  { id: "achievements", label: "Achievements", icon: Award, path: "/achievements" },
  { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
];

export default function CircularMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleModuleClick = (path: string) => {
    soundManager.playClick();
    router.push(path);
  };

  const handleMouseEnter = () => {
    soundManager.playHover();
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-35 flex items-center justify-center w-[90%] max-w-[760px] select-none">
      {/* Floating Holographic Dock */}
      <div className="hologram-panel w-full px-4 py-3 rounded-xl flex items-center justify-between sm:justify-around gap-2 overflow-x-auto scrollbar-none shadow-[0_0_20px_rgba(0,210,255,0.08)]">
        
        {/* Left bezel tech lines */}
        <div className="hidden md:block absolute left-[-15px] top-1/2 -translate-y-1/2 w-4 h-[70%] border-l border-y border-cyan-500/25 rounded-l pointer-events-none" />
        
        {/* Right bezel tech lines */}
        <div className="hidden md:block absolute right-[-15px] top-1/2 -translate-y-1/2 w-4 h-[70%] border-r border-y border-cyan-500/25 rounded-r pointer-events-none" />

        {modules.map((m) => {
          const isActive = pathname === m.path;
          const Icon = m.icon;

          return (
            <button
              key={m.id}
              onClick={() => handleModuleClick(m.path)}
              onMouseEnter={handleMouseEnter}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg border border-transparent transition-all hover:bg-cyan-950/20 active:scale-95 cursor-pointer group focus:outline-none min-w-[64px]"
            >
              {/* Active neon glow background */}
              {isActive && (
                <motion.div
                  layoutId="active-dock-bg"
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/40 rounded-lg shadow-[0_0_12px_rgba(0,210,255,0.15)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon with hover glow */}
              <div className="relative z-10">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive 
                      ? "text-white drop-shadow-[0_0_6px_#00f5ff]" 
                      : "text-cyan-400/70 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_4px_rgba(0,210,255,0.5)]"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[9px] font-orbitron font-semibold tracking-wider transition-all duration-200 ${
                  isActive 
                    ? "text-white" 
                    : "text-cyan-400/50 group-hover:text-cyan-300"
                }`}
              >
                {m.label}
              </span>

              {/* Active Indicator bar */}
              {isActive && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00f5ff]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
