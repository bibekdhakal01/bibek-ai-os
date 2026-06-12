export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: ProjectMetric[];
  status: "Active" | "Deploying" | "Offline" | "Maintenance";
}
