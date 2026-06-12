import { Project } from "@/src/types/project";

export const projectsData: Project[] = [
  {
    id: "virtual-mouse-cnn",
    title: "Virtual Mouse with CNN",
    description: "An innovative computer vision system that translates hand gestures into cursor controls. Leverages deep learning models to enable touchless mouse interactions, featuring gesture classification, real-time hand-landmark tracking, and low-latency cursor action execution.",
    tags: ["Python", "TensorFlow", "OpenCV", "CNN", "PyAutoGUI"],
    githubUrl: "https://github.com/bibekdhakal01/Virtual_mouse_using_CNN",
    status: "Active",
    metrics: [
      { label: "Accuracy", value: "94.5%" },
      { label: "Frame Rate", value: "30+ FPS" },
      { label: "Response", value: "<15ms" }
    ]
  },
  {
    id: "foodie-fly",
    title: "Foodie Fly (Food Delivery System)",
    description: "A comprehensive, high-throughput food delivery web application that optimizes user demands. Includes a dynamic customer dashboard, secure payment integration, admin order processing tools, and real-time transit status updates.",
    tags: ["React", "Node.js", "PHP", "MySQL", "REST APIs"],
    status: "Active",
    metrics: [
      { label: "Delivery Speed", value: "98%" },
      { label: "Queries", value: "<45ms" },
      { label: "Security", value: "SSL" }
    ]
  },
  {
    id: "donation-management",
    title: "Donation Management System",
    description: "A high-performance, console-based application designed to track, store, and modify charitable donation workflows. Written using modern object-oriented C++ principles, featuring custom memory-efficient data structures.",
    tags: ["C++", "Data Structures", "Algorithms", "File Handling"],
    githubUrl: "https://github.com/bibekdhakal01/To-Do-List-App", // User shared this as C++ project link or general github
    status: "Active",
    metrics: [
      { label: "Performance", value: "High" },
      { label: "Footprint", value: "<2MB" },
      { label: "Language", value: "C++17" }
    ]
  },
  {
    id: "hamro-hotel",
    title: "Hamro Hotel Management",
    description: "A secure hotel booking and hospitality management dashboard. Automates reservation lifecycles, checks room availability, handles customer billing pipelines, and manages staff duties.",
    tags: ["PHP", "MySQL", "JavaScript", "CSS3", "Tailwind CSS"],
    githubUrl: "https://github.com/bibekdhakal01/Hamro_Hotel",
    status: "Active",
    metrics: [
      { label: "Load Time", value: "1.2s" },
      { label: "DB Latency", value: "5ms" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "tourism-management",
    title: "Tourism Management System",
    description: "A Java-based desktop suite for planning, pricing, and booking customer tour packages. Implements robust object relationships, database mapping, and data export functionalities.",
    tags: ["Java", "Swing / AWT", "JDBC", "OOP", "SQL"],
    githubUrl: "https://github.com/bibekdhakal01/Tourism-Management-System-",
    status: "Active",
    metrics: [
      { label: "Architect", value: "OOP" },
      { label: "DB Engine", value: "MySQL" },
      { label: "UI Layer", value: "Desktop" }
    ]
  }
];
