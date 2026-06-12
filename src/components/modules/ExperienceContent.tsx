"use client";

import { experienceData } from "@/src/data/experience";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceContent() {
  return (
    <div className="flex flex-col gap-5 font-mono text-sm text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <Briefcase className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          Professional Logs
        </span>
      </div>

      {/* Timeline entries */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1 min-h-0">
        {experienceData.length > 0 ? (
          experienceData.map((exp) => (
            <div
              key={exp.id}
              className="relative border-l border-cyan-500/20 pl-5 ml-2 flex flex-col gap-3 group hover:border-cyan-400 transition-colors"
            >
              {/* Timeline node dot */}
              <div className="absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 bg-cyber-black border border-cyan-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_6px_#00f5ff] rounded-full transition-all duration-200" />

              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="font-orbitron font-extrabold text-sm text-white tracking-wide">
                    {exp.role}
                  </h3>
                  <span className="text-[12px] text-cyan-400 font-bold mt-1 block">
                    {exp.company} | <span className="text-[11px] text-cyan-500/80 font-normal">{exp.location}</span>
                  </span>
                </div>
                <span className="text-[11px] bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5 rounded text-cyan-400 font-bold flex items-center gap-1.5 w-fit shrink-0">
                  <Calendar className="w-3.5 h-3.5" /> {exp.period}
                </span>
              </div>

              {/* Description lines */}
              <ul className="list-none flex flex-col gap-2 text-[12px] text-slate-300 pl-1">
                {exp.description.map((desc: string, idx: number) => (
                  <li key={idx} className="flex gap-2 items-start leading-relaxed">
                    <span className="text-cyan-400 mt-0.5 select-none font-bold">&gt;</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mt-1">
                {exp.technologies.map((t: string) => (
                  <span
                    key={t}
                    className="text-[10px] bg-cyan-500/5 border border-cyan-500/15 px-2.5 py-0.5 rounded text-cyan-400 font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-cyan-500/50 py-10 uppercase tracking-widest">
            No professional experience records loaded.
          </div>
        )}
      </div>
    </div>
  );
}
