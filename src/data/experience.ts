export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export const EXPERIENCE_ITEMS: ExperienceData[] = [
  {
    id: "exp-1",
    company: "DevTech Solutions",
    role: "Full-Stack Engineer & Product Developer",
    location: "Addis Ababa, Ethiopia",
    startDate: "2023",
    endDate: "Present",
    description: [
      "Architected and deployed full-stack web applications for commercial clients using Next.js, React, Node.js, and PostgreSQL.",
      "Designed intuitive, high-performance user interfaces and responsive web layouts with strong focus on UX and accessibility.",
      "Engineered automated REST APIs, database schemas, and Server Actions for scalable business workflow management.",
    ],
    technologies: ["Next.js", "TypeScript", "React", "PostgreSQL", "Tailwind CSS", "Python"],
  },
  {
    id: "exp-2",
    company: "Technology Systems & Vision Project",
    role: "Software Engineering Lead & System Developer",
    location: "Addis Ababa, Ethiopia",
    startDate: "2022",
    endDate: "2023",
    description: [
      "Engineered real-time video stream decoding and computer vision analytical pipelines using Python and OpenCV.",
      "Implemented modular data processing modules for high-frequency video telemetry and multi-feed aggregation.",
      "Collaborated across UI design and backend engineering to present complex visual telemetry into actionable web dashboards.",
    ],
    technologies: ["Python", "OpenCV", "FastAPI", "React", "WebSockets", "Docker"],
  },
  {
    id: "exp-3",
    company: "Engineering & Graduate Platform",
    role: "Full-Stack Developer Intern",
    location: "Addis Ababa, Ethiopia",
    startDate: "2021",
    endDate: "2022",
    description: [
      "Built interactive web applications, automated portal tools, and data reporting views for academic & institutional platforms.",
      "Developed responsive frontend components utilizing clean TypeScript architecture and modern CSS frameworks.",
    ],
    technologies: ["React", "JavaScript", "Node.js", "Express", "PostgreSQL", "CSS3"],
  },
];

export interface CapabilityGroup {
  title: string;
  tagline: string;
  description: string;
  skills: string[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    title: "Full-Stack Engineering",
    tagline: "End-to-End System Development",
    description:
      "Building robust, production-grade applications with modern TypeScript frameworks, resilient API architecture, and transactional database schemas.",
    skills: ["Next.js (App Router)", "TypeScript", "React 19", "Node.js", "Python", "PostgreSQL & Prisma", "REST & Server Actions"],
  },
  {
    title: "UI/UX & Frontend Craft",
    tagline: "Interactive & Intuitive Experiences",
    description:
      "Crafting distinctive digital identities with refined typography, responsive micro-animations, glassmorphism aesthetics, and 3D graphics.",
    skills: ["Tailwind CSS", "Framer Motion", "Three.js / R3F", "Design Systems", "Accessibility (WCAG)", "Figma UI/UX"],
  },
  {
    title: "Product Architecture & Strategy",
    tagline: "Practical Problem Solving",
    description:
      "Translating complex business domain challenges into scalable, intuitive software products optimized for real-world user workflows.",
    skills: ["Vercel Deployment", "Database Modeling", "Real-Time Telemetry", "Performance Optimization", "Clean Code Architecture"],
  },
];
