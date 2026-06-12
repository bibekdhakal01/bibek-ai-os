"use client";

import { useGithub } from "@/src/hooks/useGithub";
import { FolderKanban, Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { soundManager } from "@/src/lib/sound";

export default function GithubContent() {
  const { stats, isLoading } = useGithub();

  const handleLinkClick = () => {
    soundManager.playClick();
  };

  return (
    <div className="flex flex-col gap-5 font-mono text-xs text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <FaGithub className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          GitHub Registry
        </span>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          <span className="text-[12px] text-cyan-500/60 uppercase">RETRIEVING REGISTRY MODULES...</span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 min-h-0">
          {/* Diagnostic overview */}
          <div className="grid grid-cols-3 gap-2 bg-cyan-950/20 border border-cyan-500/10 p-3 rounded">
            <div className="flex flex-col text-center">
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-wider font-bold">REGISTRY CODE</span>
              <span className="text-[14px] font-bold text-white font-orbitron mt-0.5">@bibekdhakal01</span>
            </div>
            <div className="flex flex-col text-center border-x border-cyan-500/15">
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-wider font-bold">TOTAL COMMITS</span>
              <span className="text-[14px] font-bold text-white font-orbitron mt-0.5">{stats?.totalContributions}</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-wider font-bold">PULL REQUESTS</span>
              <span className="text-[14px] font-bold text-white font-orbitron mt-0.5">+{stats?.pullRequests}</span>
            </div>
          </div>

          {/* Active Repos List */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-widest text-cyan-500/60 flex items-center gap-1.5 mb-1 font-bold">
              <FolderKanban className="w-3.5 h-3.5" /> Registry Repositories
            </span>
            <div className="flex flex-col gap-3">
              {stats?.activeRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="bg-cyan-950/10 border border-cyan-500/10 hover:border-cyan-500/20 p-3 rounded flex flex-col gap-2 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-extrabold text-[13px] text-white tracking-wide">
                      {repo.name}
                    </span>
                    <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-400 font-mono-hud">
                      {repo.language}
                    </span>
                  </div>
                  
                  <p className="text-[12px] text-slate-300 leading-normal">
                    {repo.description}
                  </p>

                  <div className="flex items-center justify-between text-[9px] mt-1 pt-2 border-t border-cyan-500/5">
                    <div className="flex gap-3 text-cyan-500/70">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-cyan-400 fill-cyan-400/10" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-cyan-400" /> {repo.forks}
                      </span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleLinkClick}
                      className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors"
                    >
                      Repository Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Clearance Action */}
          <div className="mt-auto pt-2">
            <a
              href="https://github.com/bibekdhakal01"
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="hologram-btn py-2.5 rounded font-orbitron font-bold tracking-widest text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase border-cyan-500/20 hover:border-cyan-400/50"
            >
              Access GitHub Profile @bibekdhakal01 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
