"use client";

import { motion } from "framer-motion";

interface EnergyRingProps {
  hovered: boolean;
}

export default function EnergyRing({ hovered }: EnergyRingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer compass ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] opacity-40"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyber-blue">
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeDasharray="1 3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="15 30 5 10 30 15"
          />
          {/* Compass labels */}
          <text x="48.5" y="8" className="text-[3px] fill-cyan-400 font-sans tracking-widest font-bold">N</text>
          <text x="48.5" y="95" className="text-[3px] fill-cyan-400 font-sans tracking-widest font-bold">S</text>
          <text x="92" y="51.5" className="text-[3px] fill-cyan-400 font-sans tracking-widest font-bold">E</text>
          <text x="5" y="51.5" className="text-[3px] fill-cyan-400 font-sans tracking-widest font-bold">W</text>
        </svg>
      </motion.div>

      {/* Middle tech dial (Reverse direction) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute w-[290px] h-[290px] sm:w-[390px] sm:h-[390px] opacity-60"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyber-cyan">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="80 15 20 45"
          />
        </svg>
      </motion.div>

      {/* Inner fast data ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] opacity-75"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyber-blue">
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="180 10 30 10"
          />
          <circle
            cx="50"
            cy="50"
            r="29"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="2 2"
          />
        </svg>
      </motion.div>

      {/* Dynamic scan sweep line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] opacity-20 pointer-events-none"
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-cyan-500/20 origin-right rounded-l-full border-r border-cyan-400/30" />
      </motion.div>

      {/* Pulsing Aura */}
      <motion.div
        animate={{
          scale: hovered ? [1, 1.05, 0.98, 1.03, 1] : [1, 1.02, 0.99, 1.01, 1],
          opacity: hovered ? 0.8 : 0.4,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full bg-cyan-500/5 blur-xl pointer-events-none"
      />
    </div>
  );
}
