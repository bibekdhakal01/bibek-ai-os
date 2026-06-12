"use client";

import { Brain, Terminal, Code2, Flame } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useGithub } from "@/src/hooks/useGithub";
import { projectsData } from "@/src/data/projects";

export default function RightPanel() {
  const { stats, isLoading } = useGithub();

  // Pick a subset of contributions for a mini-grid (e.g. past 80 days: 5 rows, 16 cols)
  const miniGrid = stats?.contributionsGrid ? stats.contributionsGrid.slice(-80) : [];

  return (
    <aside className="w-80 h-[calc(100vh-140px)] fixed right-6 top-20 z-20 flex flex-col gap-5 text-sm font-mono tracking-wide select-none hidden xl:flex">
      {/* 1. Developer Intel (GitHub & Tech Stack) */}
      <div className="hologram-panel cyber-corner p-4 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between border-b border-cyan-500/25 pb-2.5 text-cyan-400">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="font-orbitron font-bold text-sm uppercase tracking-wider">Developer Intel</span>
          </div>
          <span className="text-[12px] font-bold text-cyan-500/70">INDEXED</span>
        </div>

        {/* GitHub Stats Summary */}
        <div className="grid grid-cols-2 gap-3 bg-cyan-950/10 border border-cyan-500/10 p-2.5 rounded">
          <div className="flex flex-col">
            <span className="text-[11px] text-cyan-500/60 uppercase font-bold">Total Commits</span>
            <span className="text-base font-bold text-white font-orbitron mt-0.5">
              {isLoading ? "..." : stats?.totalContributions || 348}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-cyan-500/60 uppercase font-bold">Active Projects</span>
            <span className="text-base font-bold text-white font-orbitron mt-0.5">
              {projectsData.length}
            </span>
          </div>
        </div>

        {/* Mini Github Contribution Calendar Grid */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] uppercase tracking-wider text-cyan-500/75 flex items-center gap-1.5 font-bold">
            <FaGithub className="w-3.5 h-3.5" /> Commit Heatmap · @bibekdhakal01
          </span>
          <div className="flex flex-col gap-1.5 p-2 bg-cyan-950/20 border border-cyan-500/15 rounded">
            {isLoading ? (
              <div className="h-10 flex items-center justify-center text-[11px] text-cyan-500/50">
                LOADING GRID DATA...
              </div>
            ) : (
              <div className="grid grid-flow-col grid-rows-5 gap-1.5 justify-center">
                {miniGrid.length > 0 ? (
                  miniGrid.map((day, idx) => {
                    let bgClass = "bg-cyan-950/40 border border-cyan-500/5";
                    if (day.level === 1) bgClass = "bg-cyan-950/80 border border-cyan-500/20";
                    else if (day.level === 2) bgClass = "bg-cyan-800/40 border border-cyan-500/30";
                    else if (day.level === 3) bgClass = "bg-cyan-600/40 border border-cyan-400/40";
                    else if (day.level === 4) bgClass = "bg-cyan-400/80 shadow-[0_0_4px_rgba(0,245,255,0.4)]";

                    return (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-sm ${bgClass}`}
                        title={`${day.date}: ${day.count} commits`}
                      />
                    );
                  })
                ) : (
                  // Fallback visual mock data if github fetching fails or is offline
                  Array.from({ length: 80 }).map((_, idx) => {
                    const level = Math.floor(Math.random() * 5);
                    let bgClass = "bg-cyan-950/40 border border-cyan-500/5";
                    if (level === 1) bgClass = "bg-cyan-950/80 border border-cyan-500/20";
                    else if (level === 2) bgClass = "bg-cyan-800/40 border border-cyan-500/30";
                    else if (level === 3) bgClass = "bg-cyan-600/40 border border-cyan-400/40";
                    else if (level === 4) bgClass = "bg-cyan-400/80 shadow-[0_0_4px_rgba(0,245,255,0.4)]";
                    return (
                      <div key={idx} className={`w-2 h-2 rounded-sm ${bgClass}`} />
                    );
                  })
                )}
              </div>
            )}
            <div className="flex justify-between items-center text-[10px] text-cyan-500/50 mt-1">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-950/40 rounded-sm" />
                <div className="w-1.5 h-1.5 bg-cyan-950/80 rounded-sm" />
                <div className="w-1.5 h-1.5 bg-cyan-800/40 rounded-sm" />
                <div className="w-1.5 h-1.5 bg-cyan-600/40 rounded-sm" />
                <div className="w-1.5 h-1.5 bg-cyan-400/80 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Overview */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] uppercase tracking-wider text-cyan-500/75 flex items-center gap-1.5 font-bold">
            <Code2 className="w-3.5 h-3.5" /> Core Allocations
          </span>
          <div className="flex flex-col gap-3 text-[12px]">
            {[
              { name: "Python · CNN · ML", val: 85 },
              { name: "React / HTML / CSS", val: 90 },
              { name: "PHP / MySQL Backend", val: 82 },
              { name: "Java & C++ (Core)", val: 78 },
            ].map((st, idx: number) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="text-white font-semibold">{st.name}</span>
                  <span className="text-cyan-400 font-bold">{st.val}%</span>
                </div>
                <div className="w-full h-1 bg-cyan-950/30 rounded overflow-hidden border border-cyan-500/10">
                  <div
                    className="h-full bg-cyan-400 shadow-[0_0_6px_#00f5ff]"
                    style={{ width: `${st.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Focus & Target Diagnostics */}
      <div className="hologram-panel cyber-corner-sm p-4 h-56 flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-cyan-500/25 pb-2 text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span className="font-orbitron font-bold text-sm uppercase tracking-wider">Cognitive Targets</span>
        </div>

        <div className="flex flex-col gap-3.5 text-[12px]">
          {/* Current Focus */}
          <div className="flex flex-col gap-1.5">
            <span className="text-cyan-500/75 flex items-center gap-1.5 font-semibold">
              <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> CURRENT FOCUS
            </span>
            <div className="bg-cyan-950/25 border border-cyan-500/15 p-2 rounded text-slate-200">
              <span className="text-white font-bold text-sm">Computer Vision Gestures</span>
              <p className="text-[12px] text-cyan-400/80 mt-0.5 leading-relaxed">
                Refining gesture control models using CNN & OpenCV pipelines.
              </p>
            </div>
          </div>

          {/* Learning Status */}
          <div className="flex flex-col gap-1.5">
            <span className="text-cyan-500/70 font-semibold">LEARNING PIPELINE:</span>
            <div className="flex justify-between items-center bg-cyan-950/15 border border-cyan-500/10 p-2 rounded">
              <span className="text-white font-bold">Deep Learning Models</span>
              <span className="text-[11px] bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-400 font-bold animate-pulse">
                ACTIVE LOAD
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
