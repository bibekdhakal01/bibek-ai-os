"use client";

import { achievementsData } from "@/src/data/achievements";
import { Award, ShieldCheck, TrendingUp } from "lucide-react";

export default function AchievementsContent() {
  return (
    <div className="flex flex-col gap-5 font-mono text-xs text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <Award className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          Accomplishment Nodes
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 min-h-0">
        {achievementsData.map((ac) => (
          <div
            key={ac.id}
            className="border border-cyan-500/15 bg-cyan-950/5 p-4 rounded flex flex-col gap-2.5 hover:border-cyan-500/25 transition-colors"
          >
            {/* Header Title & Date */}
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-orbitron font-extrabold text-[12px] text-white tracking-wide">
                  {ac.title}
                </h3>
                <span className="text-[9.5px] text-cyan-400/80 font-medium">{ac.issuer}</span>
              </div>
              <span className="text-[9px] bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5 rounded text-cyan-400 font-bold">
                {ac.date}
              </span>
            </div>

            {/* Description */}
            <p className="text-[12px] leading-relaxed text-slate-300">
              {ac.description}
            </p>

            {/* Clearance & Metric Bar */}
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-cyan-500/10 text-[9px]">
              <span className="flex items-center gap-1 text-cyan-500/80">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> {ac.clearanceLevel}
              </span>
              {ac.metric && (
                <span className="flex items-center gap-1 text-emerald-400 font-bold font-orbitron">
                  <TrendingUp className="w-3.5 h-3.5" /> {ac.metric.label}: {ac.metric.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
