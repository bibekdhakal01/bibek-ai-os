"use client";

import { useState, useMemo } from "react";
import { Cpu, Info, RefreshCw, Layers } from "lucide-react";
import { skillsData } from "@/src/data/skills";
import { HudPanel } from "@/src/components/ui/HudPanel";
import { ScanLabel, StatusBadge } from "@/src/components/ui/HudElements";
import { soundManager } from "@/src/lib/sound";

// Categories mapping
const categories = [
  { id: "All", label: "All Sectors" },
  { id: "Languages", label: "Languages" },
  { id: "Frontend", label: "Frontend" },
  { id: "Backend", label: "Backend" },
  { id: "AI & ML", label: "AI & ML" },
  { id: "Database & Tools", label: "DB & Tools" },
];

// SVG grid size
const WIDTH = 800;
const HEIGHT = 450;

// Coordinate mapping for each skill to render a balanced, clustered layout
const positions: { [key: string]: { x: number; y: number } } = {
  // Languages (Left cluster)
  "Python":      { x: 180, y: 120 },
  "C++":         { x: 130, y: 220 },
  "Java":        { x: 200, y: 280 },
  "PHP":         { x: 260, y: 200 },
  "JavaScript":  { x: 300, y: 110 },
  "SQL":         { x: 320, y: 310 },

  // Web Technologies (Center/Right cluster)
  "React & Next.js": { x: 440, y: 100 },
  "Node.js (Express)": { x: 420, y: 240 },
  "Tailwind CSS v4": { x: 550, y: 110 },
  "HTML5 & CSS3":    { x: 500, y: 190 },
  "RESTful APIs":    { x: 520, y: 290 },

  // AI & ML (Top/Bottom clusters)
  "Convolutional Neural Networks (CNN)": { x: 120, y: 60 },
  "Computer Vision":                     { x: 250, y: 50 },
  "OpenCV":                              { x: 370, y: 50 },
  "TensorFlow":                          { x: 100, y: 150 },

  // Database & Tools (Bottom Right cluster)
  "MySQL":        { x: 430, y: 370 },
  "Git & GitHub": { x: 650, y: 250 },
  "VS Code":      { x: 680, y: 150 },
};

// Define lines/relationships explicitly
const relationships = [
  // Languages connections
  { from: "JavaScript", to: "React & Next.js" },
  { from: "JavaScript", to: "Node.js (Express)" },
  { from: "PHP", to: "MySQL" },
  { from: "PHP", to: "RESTful APIs" },
  { from: "Python", to: "Computer Vision" },
  { from: "Python", to: "TensorFlow" },
  { from: "Python", to: "Convolutional Neural Networks (CNN)" },
  { from: "C++", to: "Java" },
  { from: "SQL", to: "MySQL" },

  // AI connections
  { from: "Computer Vision", to: "OpenCV" },
  { from: "Computer Vision", to: "Convolutional Neural Networks (CNN)" },
  { from: "Convolutional Neural Networks (CNN)", to: "TensorFlow" },

  // Web connections
  { from: "React & Next.js", to: "Tailwind CSS v4" },
  { from: "React & Next.js", to: "HTML5 & CSS3" },
  { from: "Node.js (Express)", to: "RESTful APIs" },
  { from: "Node.js (Express)", to: "MySQL" },
  { from: "HTML5 & CSS3", to: "Tailwind CSS v4" },

  // Tools connections
  { from: "Git & GitHub", to: "VS Code" },
  { from: "Git & GitHub", to: "React & Next.js" },
  { from: "VS Code", to: "HTML5 & CSS3" },
];

export default function SkillsContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>("React & Next.js");

  const handleCategorySelect = (catId: string) => {
    soundManager.playClick();
    setSelectedCategory(catId);
  };

  const handleNodeHover = (nodeName: string | null) => {
    if (nodeName) {
      soundManager.playHover();
    }
    setHoveredNode(nodeName);
  };

  const handleNodeClick = (nodeName: string) => {
    soundManager.playClick();
    setActiveNode(nodeName);
  };

  // Find skill object by name
  const getSkillInfo = (name: string) => {
    return skillsData.find((s) => s.name === name);
  };

  const activeNodeInfo = useMemo(() => {
    return activeNode ? getSkillInfo(activeNode) : null;
  }, [activeNode]);

  // Determine if a node/line should be highlighted
  const isNodeHighlighted = (name: string) => {
    if (hoveredNode === name || activeNode === name) return true;
    if (hoveredNode) {
      // Is connected to hovered node?
      return relationships.some(
        (r) =>
          (r.from === hoveredNode && r.to === name) ||
          (r.to === hoveredNode && r.from === name)
      );
    }
    return false;
  };

  const isLineHighlighted = (from: string, to: string) => {
    if (hoveredNode) {
      return (
        (from === hoveredNode && to === activeNode) ||
        (to === hoveredNode && from === activeNode) ||
        from === hoveredNode ||
        to === hoveredNode
      );
    }
    return from === activeNode || to === activeNode;
  };

  // Filter connections to show in graph
  const visibleRelationships = useMemo(() => {
    return relationships.filter((r) => {
      const skillFrom = getSkillInfo(r.from);
      const skillTo = getSkillInfo(r.to);
      if (!skillFrom || !skillTo) return false;

      if (selectedCategory === "All") return true;
      return (
        skillFrom.category === selectedCategory ||
        skillTo.category === selectedCategory
      );
    });
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-5 font-mono text-sm text-slate-200 h-full">
      {/* Header Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
            Technology Neural Network
          </span>
        </div>

        {/* Sector Filter buttons */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.id)}
              className={`text-[12px] font-orbitron font-bold px-2.5 py-1 rounded border transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,210,255,0.2)]"
                  : "bg-cyan-950/10 border-cyan-500/15 text-cyan-500 hover:border-cyan-400/50 hover:text-cyan-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="relative flex-1 bg-cyan-950/5 border border-cyan-500/10 rounded-lg p-3 overflow-hidden min-h-[300px]">
        {/* Subtle background details */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-cyber-grid-fine opacity-10 pointer-events-none" />

        {/* Neural Network SVG */}
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-full"
          style={{ minHeight: "260px" }}
        >
          {/* Defs for gradients & glows */}
          <defs>
            <filter id="glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-light" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          <g>
            {visibleRelationships.map((r, idx) => {
              const p1 = positions[r.from];
              const p2 = positions[r.to];
              if (!p1 || !p2) return null;

              const highlighted = isLineHighlighted(r.from, r.to);

              return (
                <line
                  key={idx}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={highlighted ? "#00f5ff" : "rgba(0, 210, 255, 0.12)"}
                  strokeWidth={highlighted ? 2.5 : 1}
                  strokeDasharray={highlighted ? "none" : "3 3"}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {skillsData.map((s) => {
              const pos = positions[s.name];
              if (!pos) return null;

              // Filter out nodes not matching selected category
              const isFilteredOut =
                selectedCategory !== "All" && s.category !== selectedCategory;

              const highlighted = isNodeHighlighted(s.name);
              const isActive = activeNode === s.name;

              return (
                <g
                  key={s.name}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    isFilteredOut ? "opacity-25" : "opacity-100"
                  }`}
                  onMouseEnter={() => handleNodeHover(s.name)}
                  onMouseLeave={() => handleNodeHover(null)}
                  onClick={() => handleNodeClick(s.name)}
                >
                  {/* Outer pulsing ring for hovered/active nodes */}
                  {(highlighted || isActive) && (
                    <circle
                      r={18}
                      fill="none"
                      stroke="#00f5ff"
                      strokeWidth="1.5"
                      opacity={isActive ? 0.75 : 0.4}
                      className="animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                  )}

                  {/* Core Node Circle */}
                  <circle
                    r={isActive ? 8 : highlighted ? 7 : 5}
                    fill={isActive ? "#ffffff" : highlighted ? "#00f5ff" : "rgba(3, 8, 24, 0.9)"}
                    stroke={highlighted || isActive ? "#00f5ff" : "rgba(0, 210, 255, 0.45)"}
                    strokeWidth={isActive ? 2.5 : highlighted ? 2 : 1.5}
                    filter={highlighted || isActive ? "url(#glow-light)" : "none"}
                    className="transition-all duration-300"
                  />

                  {/* Node Label Text */}
                  <text
                    y={-14}
                    textAnchor="middle"
                    className={`font-orbitron text-[13px] font-bold tracking-wider select-none transition-all duration-200 ${
                      isActive
                        ? "fill-white font-extrabold"
                        : highlighted
                        ? "fill-cyan-300"
                        : "fill-cyan-500/70"
                    }`}
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Helper guide overlay */}
        <div className="absolute top-2.5 left-2.5 text-[12px] text-cyan-500/50 uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Interactive Net: Hover nodes for connections, click to inspect specs.</span>
        </div>
      </div>

      {/* Selected Node Details Panel (Pristine side-HUD replacement for progress bars) */}
      <HudPanel className="p-3.5 border-t-2 relative overflow-hidden" corner="sm" glow>
        {activeNodeInfo ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              {/* Category indicator & Status */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] bg-cyan-950/20 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 uppercase font-bold tracking-wider">
                  {activeNodeInfo.category}
                </span>
                <StatusBadge text={activeNodeInfo.status} status="ok" />
              </div>

              {/* Skill Name */}
              <h2 className="text-base font-orbitron font-extrabold text-white tracking-wider uppercase mt-1">
                {activeNodeInfo.name}
              </h2>
            </div>

            {/* Proficiency metric description */}
            <div className="flex flex-col sm:text-right gap-1 min-w-[200px]">
              <span className="text-[12px] text-cyan-500/50 uppercase tracking-wider">Node Optimization Level</span>
              <div className="flex items-center sm:justify-end gap-2">
                {/* Visual tech dots index */}
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2.5 rounded-sm border ${
                        i < Math.round(activeNodeInfo.level / 20)
                          ? "bg-cyan-400 border-cyan-400 shadow-[0_0_5px_#00f5ff]"
                          : "bg-cyan-950/20 border-cyan-500/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-orbitron font-black text-sm text-cyan-300">
                  {activeNodeInfo.level}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-cyan-500/40 text-xs py-2 uppercase tracking-widest flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Select a node to query diagnostic statistics.</span>
          </div>
        )}
      </HudPanel>
    </div>
  );
}
