export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "AI & ML" | "Database & Tools";
  level: number; // 0 - 100
  status: "Optimized" | "Operational" | "Loading" | "Upgrading";
}
