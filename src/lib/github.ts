import { GithubStats, GithubContribution } from "@/src/types/github";

export const getMockGithubStats = (): GithubStats => {
  const contributionsGrid: GithubContribution[] = [];
  const today = new Date();
  
  // Generate a grid of 365 days with realistic weights
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rnd = Math.random();
    
    let count = 0;
    if (isWeekend) {
      count = rnd > 0.80 ? Math.floor(rnd * 3) : 0;
    } else {
      count = rnd > 0.35 ? Math.floor(rnd * 5) : 0;
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count === 1) level = 1;
    else if (count === 2 || count === 3) level = 2;
    else if (count === 4) level = 3;
    else if (count >= 5) level = 4;

    contributionsGrid.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return {
    // Real stats: 22 public repos, 7 followers, 8 following (from bibekdhakal01 API)
    totalContributions: 348,
    pullRequests: 22,
    issues: 3,
    activeRepos: [
      {
        name: "Virtual_mouse_using_CNN",
        stars: 0,
        forks: 0,
        language: "Python",
        description: "AI-powered virtual mouse controlled via hand gestures using CNN, OpenCV & MediaPipe. Hands-free HCI system.",
        url: "https://github.com/bibekdhakal01/Virtual_mouse_using_CNN"
      },
      {
        name: "Hamro_Hotel",
        stars: 0,
        forks: 0,
        language: "PHP",
        description: "Full-stack hotel management system with room booking, billing, and admin dashboard. Deployed on Cloudflare Pages.",
        url: "https://github.com/bibekdhakal01/Hamro_Hotel"
      },
      {
        name: "Tourism-Management-System",
        stars: 0,
        forks: 0,
        language: "Java",
        description: "Desktop-based tourism management application built with Java Swing for itinerary and booking workflows.",
        url: "https://github.com/bibekdhakal01/Tourism-Management-System-"
      },
      {
        name: "To-Do-List-App",
        stars: 0,
        forks: 0,
        language: "CSS / JS",
        description: "Responsive task manager web app with local persistence. Live on Cloudflare Pages.",
        url: "https://github.com/bibekdhakal01/To-Do-List-App"
      },
      {
        name: "weatherApp",
        stars: 0,
        forks: 0,
        language: "HTML / JS",
        description: "Real-time weather dashboard consuming OpenWeatherMap API with clean UI.",
        url: "https://github.com/bibekdhakal01/weatherApp"
      },
      {
        name: "bibek-ai-os",
        stars: 0,
        forks: 0,
        language: "TypeScript",
        description: "Futuristic AI OS identity system — this very portfolio — built with Next.js, Framer Motion & Tailwind.",
        url: "https://github.com/bibekdhakal01/bibek-ai-os"
      }
    ],
    contributionsGrid
  };
};
