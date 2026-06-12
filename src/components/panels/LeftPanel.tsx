"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Cpu, Database, Activity, HardDrive } from "lucide-react";
import { profileData } from "@/src/data/profile";

export default function LeftPanel() {
  const [cpuUsage, setCpuUsage] = useState(38);
  const [ramUsage, setRamUsage] = useState(64.2);
  const [netSpeed, setNetSpeed] = useState(4.2);

  // Simulate hardware data fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.min(Math.max(Math.floor(prev + delta), 22), 65);
      });
      setRamUsage((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Math.min(Math.max(parseFloat((prev + delta).toFixed(1)), 62.0), 67.0);
      });
      setNetSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 0.8;
        return Math.min(Math.max(parseFloat((prev + delta).toFixed(2)), 1.2), 9.8);
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-80 h-[calc(100vh-140px)] fixed left-6 top-20 z-20 flex flex-col gap-5 text-sm font-mono tracking-wide select-none hidden xl:flex">
      {/* 1. Subject Biometrics Card */}
      <div className="hologram-panel cyber-corner p-4 flex flex-col gap-4 flex-1">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2.5 text-cyan-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-orbitron font-bold text-sm uppercase tracking-wider">Subject Profile</span>
          </div>
          <span className="text-[12px] font-bold animate-pulse text-cyan-400">SYS_OK</span>
        </div>

        {/* Identity Section */}
        <div className="flex flex-col gap-3">
          {/* Simulated Holographic Fingerprint / Scanbox */}
          <div className="relative w-full h-32 border border-cyan-500/20 bg-cyan-950/10 rounded flex items-center justify-center overflow-hidden">
            {/* Horizontal scan line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-cyan-400/60 shadow-[0_0_8px_rgba(0,245,255,1)] z-10"
            />
            {/* Sci-fi tech grid inside box */}
            <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
            
            {/* Target vectors */}
            <div className="absolute left-2 top-2 w-2 h-2 border-l border-t border-cyan-400/40" />
            <div className="absolute right-2 top-2 w-2 h-2 border-r border-t border-cyan-400/40" />
            <div className="absolute left-2 bottom-2 w-2 h-2 border-l border-b border-cyan-400/40" />
            <div className="absolute right-2 bottom-2 w-2 h-2 border-r border-b border-cyan-400/40" />

            <div className="text-center flex flex-col items-center justify-center gap-1 z-0">
              <span className="font-orbitron text-xs font-black tracking-widest text-cyan-300 text-shadow-sm">
                BIOMETRIC SECURED
              </span>
              <span className="text-[12px] text-cyan-400/70 font-semibold">ID: {profileData.version}</span>
            </div>
          </div>

          {/* Name Specs */}
          <div className="mt-1 flex flex-col gap-1 border-t border-cyan-500/10 pt-2.5">
            <div className="text-xl font-orbitron font-bold text-white tracking-wider">
              {profileData.name}
            </div>
            <div className="text-cyan-400 font-bold text-[13px] uppercase tracking-wider">
              {profileData.title}
            </div>
          </div>
        </div>

        {/* Core Specs */}
        <div className="flex flex-col gap-2.5 border-t border-cyan-500/15 pt-3 text-[12px]">
          <div className="flex justify-between">
            <span className="text-cyan-500/70">Location:</span>
            <span className="text-white font-medium">{profileData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500/70">OS Status:</span>
            <span className="text-emerald-400 font-bold animate-pulse">{profileData.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500/70">Cognitive Load:</span>
            <span className="text-white font-medium">Moderate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cyan-500/70">Synergy Level:</span>
            <span className="text-white font-bold">{profileData.synergyLevel}%</span>
          </div>
        </div>

        {/* Short Bio Block */}
        <div className="mt-auto border-t border-cyan-500/15 pt-3">
          <div className="text-[12px] uppercase tracking-widest text-cyan-500/65 font-bold mb-1.5">
            Identity Synopsis
          </div>
          <p className="text-[13px] text-slate-300 leading-relaxed bg-cyan-950/15 border border-cyan-500/10 p-2.5 rounded">
            {profileData.bio}
          </p>
        </div>
      </div>

      {/* 2. System Diagnostic Readings */}
      <div className="hologram-panel cyber-corner-sm p-4 h-56 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-cyan-500/25 pb-2 text-cyan-400">
          <Cpu className="w-4 h-4" />
          <span className="font-orbitron font-bold text-sm uppercase tracking-wider">Diagnostics Monitor</span>
        </div>

        {/* Stat Meters */}
        <div className="flex flex-col gap-3.5 py-1 text-[12px]">
          {/* CPU Meter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-cyan-500/70 font-semibold">
                <Activity className="w-3.5 h-3.5" /> CPU Load
              </span>
              <span className="text-white font-bold">{cpuUsage}%</span>
            </div>
            <div className="w-full h-1 bg-cyan-950/50 rounded overflow-hidden border border-cyan-500/10">
              <div
                className="h-full bg-cyan-400 transition-all duration-1000 shadow-[0_0_8px_#00f5ff]"
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          {/* RAM Meter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-cyan-500/70 font-semibold">
                <Database className="w-3.5 h-3.5" /> Memory Usage
              </span>
              <span className="text-white font-bold">{ramUsage}%</span>
            </div>
            <div className="w-full h-1 bg-cyan-950/50 rounded overflow-hidden border border-cyan-500/10">
              <div
                className="h-full bg-cyan-400 transition-all duration-1000 shadow-[0_0_8px_#00f5ff]"
                style={{ width: `${ramUsage}%` }}
              />
            </div>
          </div>

          {/* Net Flow Speed */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="flex items-center gap-1.5 text-cyan-500/70 font-semibold">
                <HardDrive className="w-3.5 h-3.5" /> Data Throughput
              </span>
              <span className="text-white font-bold">{netSpeed} MB/s</span>
            </div>
            <div className="w-full h-1 bg-cyan-950/50 rounded overflow-hidden border border-cyan-500/10">
              <div
                className="h-full bg-cyan-400 transition-all duration-1000 shadow-[0_0_8px_#00f5ff]"
                style={{ width: `${(netSpeed / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
