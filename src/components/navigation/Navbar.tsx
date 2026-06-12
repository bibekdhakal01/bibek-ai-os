"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Shield, Clock, Battery } from "lucide-react";
import { useOSStore } from "@/src/store/useOSStore";
import { soundManager } from "@/src/lib/sound";

export default function Navbar() {
  const { isMuted, toggleMute } = useOSStore();
  const [timeStr, setTimeStr] = useState("00:00:00 UTC+05:45");
  const [uptimeStr, setUptimeStr] = useState("00:00:00");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track system start time for Uptime
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Timer for Kathmandu clock & Uptime
    const interval = setInterval(() => {
      // Local Nepal Time (UTC+05:45)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeStr(`${formattedTime} NST`);

      // Uptime
      const diffMs = Date.now() - startTimeRef.current;
      const secs = Math.floor(diffMs / 1000) % 60;
      const mins = Math.floor(diffMs / 60000) % 60;
      const hours = Math.floor(diffMs / 3600000);
      
      const pad = (n: number) => n.toString().padStart(2, "0");
      setUptimeStr(`${pad(hours)}:${pad(mins)}:${pad(secs)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sync battery level
  useEffect(() => {
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
      });
    } else {
      // Default fake battery behavior
      setBatteryLevel(98);
    }
  }, []);

  // Draw Audio Visualizer Bars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = 120;
    canvas.height = 16;
    
    const barWidth = 3;
    const barGap = 2;
    const barCount = Math.floor(canvas.width / (barWidth + barGap));
    const heights = new Array(barCount).fill(1);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < barCount; i++) {
        // If unmuted, draw fluctuating green/cyan bars, else draw flat line
        let targetHeight = 1;
        if (!isMuted) {
          targetHeight = Math.random() * (canvas.height - 2) + 2;
        }
        
        // Smooth transitions
        heights[i] += (targetHeight - heights[i]) * 0.35;

        const x = i * (barWidth + barGap);
        const y = canvas.height - heights[i];
        
        ctx.fillStyle = isMuted 
          ? "rgba(0, 210, 255, 0.15)" 
          : "rgba(0, 245, 255, 0.85)";
        
        // Draw rounded bars
        ctx.fillRect(x, y, barWidth, heights[i]);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isMuted]);

  const handleMuteToggle = () => {
    toggleMute();
    // Enable Web Audio context on unmute
    soundManager.setMuted(!isMuted);
    setTimeout(() => {
      soundManager.playClick();
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cyber-black/45 border-b border-cyan-500/20 backdrop-blur-md px-6 py-3 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-cyan-400/90 select-none">
      {/* OS branding */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 bg-cyan-400 animate-pulse rounded-full shadow-[0_0_8px_#00f5ff]" />
        <span className="font-orbitron font-black text-sm tracking-widest text-white hover:text-cyan-300 transition-colors duration-200">
          BIBEK_AI_OS
        </span>
        <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 rounded text-cyan-500 hidden sm:inline-block">
          FW v7.1.4
        </span>
      </div>

      {/* Center stats */}
      <div className="hidden lg:flex items-center gap-8 text-[10px]">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-500/70" />
          <span>TIME: <span className="text-white font-medium">{timeStr}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-cyan-500/70" />
          <span>SECURITY: <span className="text-emerald-400 font-bold">LEVEL_ALPHA</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span>SYS_UPTIME: <span className="text-white font-medium">{uptimeStr}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className="w-3.5 h-3.5 text-cyan-500/70" />
          <span>BATTERY: <span className="text-white font-medium">{batteryLevel}%</span></span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Visualizer canvas */}
        <div className="hidden sm:block opacity-65 flex items-center h-full">
          <canvas ref={canvasRef} className="h-4" />
        </div>

        {/* Audio Mute Button */}
        <button
          onClick={handleMuteToggle}
          className="p-1.5 rounded border border-cyan-500/20 bg-cyan-950/20 hover:border-cyan-400/50 hover:bg-cyan-900/30 transition-all cursor-pointer flex items-center justify-center text-cyan-400 active:scale-95"
          title={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-cyan-500/50" />
          ) : (
            <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
}
