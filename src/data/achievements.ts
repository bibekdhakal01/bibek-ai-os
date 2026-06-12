import { Achievement } from "@/src/types/achievement";

export const achievementsData: Achievement[] = [
  {
    id: "virtual-mouse-cnn",
    title: "Virtual Mouse via CNN — Gesture Control System",
    issuer: "Personal Research Project · GitHub",
    date: "2024",
    description: "Built a hands-free virtual mouse using Python, OpenCV, and MediaPipe's CNN landmark detection. The system tracks hand gestures in real-time to control cursor movement and click actions, demonstrating applied AI for human-computer interaction.",
    clearanceLevel: "AI_RESEARCH_BADGE",
    metric: {
      label: "Tech Stack",
      value: "Python · CNN · OpenCV"
    }
  },
  {
    id: "hamro-hotel-fullstack",
    title: "Hamro Hotel — Full-Stack Hotel Management System",
    issuer: "Academic & Personal Project · Deployed on Cloudflare Pages",
    date: "2025",
    description: "Designed and deployed a complete hotel management platform using PHP, MySQL, and HTML/CSS. Covers room booking, check-in/check-out workflows, billing, and an admin dashboard.",
    clearanceLevel: "FULLSTACK_CLEARANCE",
    metric: {
      label: "Live Demo",
      value: "Cloudflare Pages"
    }
  },
  {
    id: "tourism-management-java",
    title: "Tourism Management System — Java Desktop App",
    issuer: "Academic Project · BSc Computing, Itahari International College",
    date: "2024",
    description: "Developed a Java Swing desktop application for managing tourist packages, bookings, and customer records. Applied OOP principles and relational database design using JDBC for persistent storage.",
    clearanceLevel: "ACADEMIC_DISTINCTION",
    metric: {
      label: "Platform",
      value: "Java · JDBC · Swing"
    }
  },
  {
    id: "linkedin-profile-recognition",
    title: "LinkedIn Profile — Software Developer & AI Enthusiast",
    issuer: "LinkedIn · Verified Professional Identity",
    date: "2023 – Present",
    description: "Established a verified professional presence on LinkedIn, showcasing expertise in AI/ML, full-stack web development, and systems design. Connected with industry peers, recruiters, and open-source contributors.",
    clearanceLevel: "PROFESSIONAL_ID_VERIFIED",
    metric: {
      label: "Profile",
      value: "bibek-dhakal-7bb62a283"
    }
  },
  {
    id: "22-repos-github",
    title: "22 Public Repositories on GitHub",
    issuer: "GitHub · @bibekdhakal01",
    date: "2023 – 2026",
    description: "Consistently pushed code across 22+ public repositories spanning AI/ML experiments, PHP backends, Java desktop apps, weather APIs, and modern web apps — demonstrating breadth and commitment to open development.",
    clearanceLevel: "OPEN_SOURCE_CONTRIBUTOR",
    metric: {
      label: "Repositories",
      value: "22 Public Repos"
    }
  }
];
