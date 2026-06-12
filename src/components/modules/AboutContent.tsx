"use client";

import { motion } from "framer-motion";
import {
  User, Cpu, Target, Eye, GraduationCap, Brain,
  MapPin, Calendar, BookOpen, Zap,
} from "lucide-react";
import { profileData } from "@/src/data/profile";
import { educationData } from "@/src/data/education";
import { HudPanel } from "@/src/components/ui/HudPanel";
import {
  ScanLabel, DataRow, HudMeter, ScanOverlay, StatusBadge,
} from "@/src/components/ui/HudElements";

/* ── Stagger children helper ─────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutContent() {
  const edu = educationData[0];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="h-full overflow-y-auto pr-1 flex flex-col gap-5"
    >

      {/* ══════════════════════════════════════════════════
          HEADER — ANALYSIS REPORT TITLE
      ══════════════════════════════════════════════════ */}
      <motion.div variants={item} className="relative">
        <HudPanel className="p-4 relative overflow-hidden" glow>
          <ScanOverlay />

          {/* Top meta row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-hud-xs font-mono text-cyan-500/60 uppercase tracking-widest">
              <span className="w-1 h-4 bg-cyan-400 rounded-full" />
              <span>Report ID: BDK-001-ALPHA</span>
            </div>
            <StatusBadge text="Verified" status="ok" />
          </div>

          {/* Title */}
          <h1 className="font-orbitron font-black text-xl sm:text-2xl tracking-[0.12em] text-white hologram-text-glow-white">
            SUBJECT ANALYSIS REPORT
          </h1>
          <p className="text-hud-sm font-mono text-cyan-400/70 mt-1 tracking-wider">
            SUBJECT: {profileData.name.toUpperCase()} · ROLE: {profileData.title.toUpperCase()}
          </p>

          {/* Corner accent lines */}
          <div className="absolute left-0 bottom-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/25 rounded-bl pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/25 rounded-br pointer-events-none" />
        </HudPanel>
      </motion.div>

      {/* ══════════════════════════════════════════════════
          GRID ROW 1 — Introduction + Who Is
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">

        {/* Introduction (2 cols) */}
        <motion.div variants={item} className="sm:col-span-2">
          <HudPanel className="p-4 h-full" delay={0.05}>
            <ScanLabel text="Introduction" icon={User} tag="SEC.01" />
            <p className="text-hud-md font-mono text-slate-300 leading-relaxed">
              An AI-focused engineer building intelligent systems and immersive
              web interfaces. Passionate about bridging distributed AI runtimes
              with high-performance, cinematic frontend experiences.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["AI Engineer", "Full-Stack Dev", "Builder", "Problem Solver"].map((t) => (
                <span
                  key={t}
                  className="text-hud-xs font-mono border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </HudPanel>
        </motion.div>

        {/* Who is Bibek (3 cols) */}
        <motion.div variants={item} className="sm:col-span-3">
          <HudPanel className="p-4 h-full" delay={0.1}>
            <ScanLabel text="Who Is Bibek Dhakal" icon={Cpu} tag="SEC.02" />
            <div className="flex flex-col gap-1.5">
              <DataRow label="Full Name"   value={profileData.name} highlight delay={0.15} />
              <DataRow label="Role"        value={profileData.title} delay={0.18} />
              <DataRow label="Location"    value={
                <span className="flex items-center gap-1 justify-end">
                  <MapPin className="w-3 h-3 text-cyan-500/60" />{profileData.location}
                </span>
              } delay={0.21} />
              <DataRow label="Status"      value={
                <StatusBadge text={profileData.status.replace("_", " ")} status="ok" />
              } delay={0.24} />
              <DataRow label="Synergy"     value={`${profileData.synergyLevel}%`} highlight delay={0.27} />
              <DataRow label="Clearance"   value="LEVEL · ALPHA" highlight delay={0.30} />
            </div>
          </HudPanel>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          GRID ROW 2 — Mission + Vision
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Career Mission */}
        <motion.div variants={item}>
          <HudPanel className="p-4 h-full relative overflow-hidden" delay={0.12}>
            <ScanOverlay />
            <ScanLabel text="Career Mission" icon={Target} tag="SEC.03" accent="emerald" />
            <p className="text-hud-md font-mono text-slate-300 leading-relaxed mb-3">
              To engineer AI-native products that are not only functionally
              powerful but visually compelling — where performance and design
              are inseparable. Every system I build must be fast, intelligent,
              and feel alive.
            </p>
            <div className="flex flex-col gap-2 mt-auto">
              <HudMeter label="AI Focus"      value={94} delay={0.35} color="emerald" />
              <HudMeter label="Frontend Craft" value={97} delay={0.40} color="emerald" />
            </div>
          </HudPanel>
        </motion.div>

        {/* Vision */}
        <motion.div variants={item}>
          <HudPanel className="p-4 h-full relative overflow-hidden" delay={0.16}>
            <ScanOverlay />
            <ScanLabel text="Vision" icon={Eye} tag="SEC.04" accent="violet" />
            <p className="text-hud-md font-mono text-slate-300 leading-relaxed mb-4">
              I envision a world where AI operates seamlessly at the edge —
              running locally, privately, and instantly. My goal is to build
              the infrastructure and interfaces that make this future
              accessible, beautiful, and human-centric.
            </p>
            <div className="border border-violet-500/15 bg-violet-950/10 rounded p-2.5 flex items-start gap-2">
              <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              <p className="text-hud-xs font-mono text-violet-300/80 leading-relaxed">
                "Build systems that think, interfaces that feel, products that last."
              </p>
            </div>
          </HudPanel>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          GRID ROW 3 — Education + Philosophy
      ══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">

        {/* Education Summary (3 cols) */}
        <motion.div variants={item} className="sm:col-span-3">
          <HudPanel className="p-4 h-full" delay={0.20}>
            <ScanLabel text="Education Summary" icon={GraduationCap} tag="SEC.05" />

            {edu && (
              <div className="flex flex-col gap-3">
                {/* Degree block */}
                <div className="border border-cyan-500/15 bg-cyan-950/10 rounded p-3 relative overflow-hidden">
                  <ScanOverlay />
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-orbitron font-bold text-[13px] text-white tracking-wide leading-tight">
                      {edu.degree}
                    </h3>
                    <StatusBadge text="Active" status="ok" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <DataRow label="Institution" value={edu.institution} delay={0.25} />
                    <DataRow
                      label="Location"
                      value={
                        <span className="flex items-center gap-1 justify-end">
                          <MapPin className="w-3 h-3 text-cyan-500/50" />{edu.location}
                        </span>
                      }
                      delay={0.28}
                    />
                    <DataRow
                      label="Duration"
                      value={
                        <span className="flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3 text-cyan-500/50" />{edu.period}
                        </span>
                      }
                      delay={0.31}
                    />
                    <DataRow label="GPA" value={edu.gpa} highlight delay={0.34} />
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-hud-xs font-mono text-cyan-500/60 uppercase tracking-widest">
                    <BookOpen className="w-3 h-3" /> Core Modules
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {edu.courses.map((c, i) => (
                      <motion.div
                        key={c}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.05 }}
                        className="flex items-center gap-2 border border-cyan-500/10 bg-cyan-950/15 px-2.5 py-1.5 rounded text-hud-xs font-mono text-slate-300"
                      >
                        <span className="text-cyan-400 font-bold text-[12px]">#</span>
                        {c}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </HudPanel>
        </motion.div>

        {/* Personal Philosophy (2 cols) */}
        <motion.div variants={item} className="sm:col-span-2">
          <HudPanel className="p-4 h-full" delay={0.24}>
            <ScanLabel text="Personal Philosophy" icon={Brain} tag="SEC.06" accent="violet" />

            <div className="flex flex-col gap-3">
              {[
                {
                  title: "Craft Over Speed",
                  body: "Every line of code should be intentional. I prefer fewer, well-engineered systems over many mediocre ones.",
                },
                {
                  title: "Design as Engineering",
                  body: "Great UI is not decoration — it is the product. I treat design decisions with the same rigor as system architecture.",
                },
                {
                  title: "Always Learning",
                  body: "Technology evolves faster than any individual can master. Curiosity and adaptability are the real skills.",
                },
              ].map((phil, i) => (
                <motion.div
                  key={phil.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="border-l-2 border-violet-500/40 pl-3"
                >
                  <p className="text-hud-sm font-orbitron font-bold text-violet-300 mb-0.5">
                    {phil.title}
                  </p>
                  <p className="text-hud-xs font-mono text-slate-400 leading-relaxed">
                    {phil.body}
                  </p>
                </motion.div>
              ))}

              {/* Synergy bar */}
              <div className="mt-2">
                <HudMeter label="Overall Alignment" value={98} unit="%" delay={0.55} color="cyan" />
              </div>
            </div>
          </HudPanel>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          FOOTER STATUS BAR
      ══════════════════════════════════════════════════ */}
      <motion.div
        variants={item}
        className="flex items-center justify-between text-hud-xs font-mono text-cyan-500/40 uppercase tracking-widest px-1 pb-1"
      >
        <span>END OF REPORT · BDK-001-ALPHA</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
          CLASSIFIED · LEVEL ALPHA ACCESS
        </span>
      </motion.div>

    </motion.div>
  );
}
