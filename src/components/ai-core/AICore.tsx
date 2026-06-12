"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { soundManager } from "@/src/lib/sound";

interface CoreParticle {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
}

export default function AICore() {
  const [hovered, setHovered] = useState(false);
  const [synergyRate, setSynergyRate] = useState(98.6);
  const [pulses, setPulses] = useState<{ id: number; scale: number }[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleArray = useRef<CoreParticle[]>([]);
  const frameId = useRef<number>(0);
  
  // 3D Parallax Tilt Spring Physics
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  
  const rotateX = useSpring(mY, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(mX, { stiffness: 90, damping: 22 });

  // 1. Initialize Canvas Particle Orbit Swarm
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const count = 45;
    particleArray.current = [];

    // Create orbiting energy particles
    for (let i = 0; i < count; i++) {
      const distance = Math.random() * 55 + 50; // Orb radius boundaries
      particleArray.current.push({
        angle: Math.random() * Math.PI * 2,
        distance: distance,
        speed: (Math.random() * 0.012 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.4 ? "rgba(0, 245, 255, " : "rgba(0, 180, 255, ",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particleArray.current.forEach((p) => {
        // Adjust speed and compression based on hover state
        const targetSpeed = hovered ? p.speed * 2.6 : p.speed;
        const targetDist = hovered ? p.distance * 0.82 : p.distance;

        p.angle += targetSpeed;

        // Render circular path
        const x = centerX + Math.cos(p.angle) * targetDist;
        const y = centerY + Math.sin(p.angle) * targetDist;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = hovered ? 6 : 2;
        ctx.shadowColor = "#00f5ff";
        ctx.fill();
      });

      frameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId.current);
    };
  }, [hovered]);

  // 2. Mouse Coordinate Parallax Calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Map tilt angle limits (-15 to 15 degrees)
    mX.set((x / (rect.width / 2)) * 14);
    mY.set(-(y / (rect.height / 2)) * 14);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    soundManager.playHover();
    setSynergyRate(parseFloat((98.4 + Math.random() * 1.2).toFixed(2)));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mX.set(0);
    mY.set(0);
  };

  const handleCoreClick = () => {
    soundManager.playNotify();
    setSynergyRate(100);

    // Spawn concentric ripples
    const newId = Date.now();
    setPulses((prev) => [...prev, { id: newId, scale: 1 }]);

    // Explode particles slightly
    particleArray.current.forEach((p) => {
      p.distance += 40;
      setTimeout(() => {
        p.distance -= 40;
      }, 500);
    });

    setTimeout(() => {
      setSynergyRate(parseFloat((98.4 + Math.random() * 1.2).toFixed(2)));
      setPulses((prev) => prev.filter((p) => p.id !== newId));
    }, 1800);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] select-none cursor-pointer group"
    >
      {/* 3D Tilting Hologram Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center w-full h-full"
      >
        {/* Layer 1: Concentric SVG HUD Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-30px)" }}>
          {/* Compass layout ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
            className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] opacity-30 text-cyber-blue"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="12 25 4 8" />
              <text x="48.5" y="8" className="text-[3px] fill-cyan-400 font-bold tracking-widest">N</text>
              <text x="48.5" y="94.5" className="text-[3px] fill-cyan-400 font-bold tracking-widest">S</text>
            </svg>
          </motion.div>

          {/* Reverse data dash ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-[250px] h-[250px] sm:w-[330px] sm:h-[330px] opacity-50 text-cyber-cyan"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
              <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="60 20 10 30" />
            </svg>
          </motion.div>
        </div>

        {/* Layer 2: Core Orbit Particle Canvas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-10px)" }}>
          <canvas ref={canvasRef} className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]" />
        </div>

        {/* Layer 3: Concentric Energy Pulses (Ripples) */}
        {pulses.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-cyan-400/60 shadow-[0_0_18px_rgba(0,245,255,0.4)] pointer-events-none"
            style={{ transform: "translateZ(10px)" }}
          />
        ))}

        {/* Layer 4: Central Holographic Core Globe */}
        <motion.button
          onClick={handleCoreClick}
          className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center focus:outline-none cursor-pointer"
          style={{ transform: "translateZ(30px)" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Glassmorphic Shell */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-600/30 to-blue-500/20 border border-cyan-400/40 backdrop-blur-sm group-hover:border-cyan-300/80 transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.25)] group-hover:shadow-[0_0_45px_rgba(0,245,255,0.55)]" />

          {/* Pulse Node Inner Sphere */}
          <motion.div
            animate={{
              scale: hovered ? [1, 1.2, 0.92, 1.08, 1] : [1, 1.1, 0.95, 1.05, 1],
              opacity: hovered ? [0.85, 1, 0.75, 0.95, 0.85] : [0.65, 0.8, 0.55, 0.75, 0.65],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-400/25 border border-cyan-300/50 shadow-[0_0_15px_rgba(0,245,255,0.4)]"
          />

          {/* Core Nucleus */}
          <div className="relative w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white shadow-[0_0_15px_#ffffff,0_0_25px_rgba(0,245,255,1)]" />
        </motion.button>
      </motion.div>

      {/* Static HUD Telemetry Readouts around Core */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex flex-col items-center bg-cyan-950/20 border border-cyan-500/25 px-3 py-1 rounded backdrop-blur-sm text-[8px] uppercase tracking-[0.2em] font-mono text-cyan-400">
          <span>AI Core Matrix</span>
          <span className="text-[6.5px] text-cyan-500/60 mt-0.5 font-bold">V7.1.4-ONLINE</span>
        </div>
      </div>

      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex flex-col items-center text-[10px] font-mono tracking-widest text-cyan-400/90">
          <span className="hologram-text-glow-cyan text-xs font-bold font-orbitron">{synergyRate}%</span>
          <span className="text-[6.5px] text-cyan-500/50 uppercase font-bold">Synergy Rating</span>
        </div>
      </div>

      {/* Left side parameters */}
      <div className="absolute left-[2%] top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        <div className="flex flex-col items-start font-mono text-[7.5px] text-cyan-400/60 border-l border-cyan-500/20 pl-2">
          <span>SYS_THREAT: 0.00%</span>
          <span>NEURAL_LOAD: 42.1%</span>
          <span>GATEWAY: CONNECTED</span>
        </div>
      </div>

      {/* Right side parameters */}
      <div className="absolute right-[2%] top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
        <div className="flex flex-col items-end font-mono text-[7.5px] text-cyan-400/60 border-r border-cyan-500/20 pr-2">
          <span>CORE_TEMP: 34.0 °C</span>
          <span>GRID_STABLE: 100%</span>
          <span>LOC_NODE: KTM_NEPAL</span>
        </div>
      </div>
    </div>
  );
}
