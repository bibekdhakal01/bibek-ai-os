"use client";

import { projectsData } from "@/src/data/projects";
import { FolderGit2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { soundManager } from "@/src/lib/sound";

export default function ProjectsContent() {
  const handleAnchorClick = () => {
    soundManager.playClick();
  };

  return (
    <div className="flex flex-col gap-5 font-mono text-sm text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <FolderGit2 className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          Project Repositories
        </span>
      </div>

      {/* Grid List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 min-h-0">
        {projectsData.map((p) => (
          <div
            key={p.id}
            className="border border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/40 p-4 rounded flex flex-col gap-3 transition-all duration-200"
          >
            {/* Title & Status */}
            <div className="flex justify-between items-center">
              <span className="font-orbitron text-sm font-extrabold text-white tracking-wide">
                {p.title}
              </span>
              <span className="text-[12px] border border-cyan-400/35 px-2 py-0.5 rounded uppercase font-bold text-cyan-400/90 animate-pulse">
                {p.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-[12.5px] leading-relaxed text-slate-300">
              {p.description}
            </p>

            {/* Performance Metrics Readout */}
            {p.metrics && (
              <div className="grid grid-cols-3 gap-2 py-1.5 bg-cyan-950/20 border border-cyan-500/10 rounded px-2.5">
                {p.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col text-center">
                    <span className="text-[9px] text-cyan-500/60 uppercase font-bold">{m.label}</span>
                    <span className="text-[13px] font-bold text-cyan-400 font-orbitron mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[12px] bg-cyan-500/5 border border-cyan-500/10 px-2.5 py-0.5 rounded text-cyan-400/80 font-bold"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions Links */}
            <div className="flex items-center gap-4 border-t border-cyan-500/10 pt-3 mt-1 justify-end text-[12px]">
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleAnchorClick}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-white hover:underline transition-colors font-bold"
                >
                  <FaGithub className="w-4 h-4" /> Source Code
                </a>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleAnchorClick}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-white hover:underline transition-colors font-bold"
                >
                  <ExternalLink className="w-4 h-4" /> Live Interface
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
