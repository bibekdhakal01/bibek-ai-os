"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

/* ── Section header label ──────────────────────────────── */
interface ScanLabelProps {
  text: string;
  icon?: LucideIcon;
  tag?: string;
  accent?: "cyan" | "emerald" | "violet";
}

export function ScanLabel({ text, icon: Icon, tag, accent = "cyan" }: ScanLabelProps) {
  const colors = {
    cyan:    "text-cyan-400  border-cyan-500/30  bg-cyan-500/8",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
    violet:  "text-violet-400 border-violet-500/30 bg-violet-500/8",
  };

  return (
    <div className={`flex items-center gap-2.5 pb-2.5 mb-4 border-b border-cyan-500/15`}>
      {Icon && <Icon className={`w-4 h-4 ${colors[accent].split(" ")[0]}`} />}
      <span className={`font-orbitron font-bold text-[11px] tracking-[0.18em] uppercase ${colors[accent].split(" ")[0]}`}>
        {text}
      </span>
      {tag && (
        <span className={`ml-auto text-hud-xs px-2 py-0.5 rounded border font-mono ${colors[accent]}`}>
          {tag}
        </span>
      )}
    </div>
  );
}

/* ── Key/value data row ────────────────────────────────── */
interface DataRowProps {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  delay?: number;
}

export function DataRow({ label, value, highlight = false, delay = 0 }: DataRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-start justify-between gap-4 py-1.5 border-b border-cyan-500/8 last:border-0"
    >
      <span className="text-hud-sm font-mono text-cyan-500/60 tracking-wider uppercase shrink-0">
        {label}
      </span>
      <span className={`text-hud-md font-mono text-right ${highlight ? "text-cyan-300 font-bold" : "text-slate-200"}`}>
        {value}
      </span>
    </motion.div>
  );
}

/* ── HUD progress meter ─────────────────────────────────── */
interface HudMeterProps {
  label: string;
  value: number;   // 0–100
  unit?: string;
  delay?: number;
  color?: "cyan" | "emerald" | "violet";
}

export function HudMeter({ label, value, unit = "%", delay = 0, color = "cyan" }: HudMeterProps) {
  const bar = {
    cyan:    "bg-cyan-400 shadow-[0_0_8px_#00f5ff]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    violet:  "bg-violet-400 shadow-[0_0_8px_#a78bfa]",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-1"
    >
      <div className="flex justify-between items-center text-hud-sm font-mono">
        <span className="text-cyan-500/65 uppercase tracking-wider">{label}</span>
        <span className="text-white font-bold">{value}{unit}</span>
      </div>
      <div className="w-full h-1 bg-cyan-950/60 rounded-full overflow-hidden border border-cyan-500/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${bar[color]}`}
        />
      </div>
    </motion.div>
  );
}

/* ── Scanning line overlay (decorative) ─────────────────── */
export function ScanOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />
    </div>
  );
}

/* ── Blinking status badge ──────────────────────────────── */
interface StatusBadgeProps {
  text: string;
  status?: "ok" | "warn" | "error" | "info";
}

export function StatusBadge({ text, status = "ok" }: StatusBadgeProps) {
  const colors = {
    ok:    "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    warn:  "text-amber-400  border-amber-500/30  bg-amber-950/20",
    error: "text-red-400    border-red-500/30    bg-red-950/20",
    info:  "text-cyan-400   border-cyan-500/30   bg-cyan-950/20",
  };
  const dotColors = {
    ok: "bg-emerald-400", warn: "bg-amber-400", error: "bg-red-400", info: "bg-cyan-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-hud-xs font-mono uppercase tracking-wider border px-2 py-0.5 rounded ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[status]}`} />
      {text}
    </span>
  );
}
