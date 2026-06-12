"use client";

import { educationData } from "@/src/data/education";
import { GraduationCap, BookOpen, Star } from "lucide-react";

export default function AcademicsContent() {
  return (
    <div className="flex flex-col gap-5 font-mono text-sm text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <GraduationCap className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          Academic Database
        </span>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 min-h-0">
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="border border-cyan-500/15 bg-cyan-950/5 p-4 rounded flex flex-col gap-3"
          >
            {/* Degree & GPA */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h3 className="font-orbitron font-black text-white text-sm tracking-wide leading-snug">
                  {edu.degree}
                </h3>
                <span className="text-[12px] text-cyan-400 font-bold mt-1 block">
                  {edu.institution} | <span className="text-[13px] text-cyan-500/80">{edu.location}</span>
                </span>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                <span className="text-[13px] bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5 rounded text-cyan-400 font-bold">
                  {edu.period}
                </span>
                <span className="text-[12px] text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                  <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/20" /> GPA: {edu.gpa}
                </span>
              </div>
            </div>

            {/* Courses section */}
            <div className="border-t border-cyan-500/10 pt-3.5 flex flex-col gap-2">
              <span className="text-[13px] uppercase tracking-widest text-cyan-500/70 flex items-center gap-1.5 font-bold mb-1">
                <BookOpen className="w-4 h-4 text-cyan-500/70" /> Core Modules Handled
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-slate-300">
                {edu.courses.map((course, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-cyan-950/20 border border-cyan-500/5 px-2.5 py-2 rounded">
                    <span className="text-cyan-400 font-bold">#</span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
