export interface GithubRepo {
  name: string;
  stars: number;
  forks: number;
  language: string;
  description: string;
  url: string;
}

export interface GithubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // contribution level for the SVG calendar grid
}

export interface GithubStats {
  totalContributions: number;
  pullRequests: number;
  issues: number;
  activeRepos: GithubRepo[];
  contributionsGrid: GithubContribution[];
}
