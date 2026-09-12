export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  category: string;
  featured: boolean;
  technologies: string[];
  problem: string;
  solution: string;
  technicalApproach: string;
  result: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: "digital-ekub",
    title: "Digital Ekub Platform",
    slug: "digital-ekub",
    shortDescription:
      "A modern FinTech platform digitizing traditional Ethiopian ROSCA rotating savings and credit groups with automated payout scheduling and security auditing.",
    fullDescription:
      "Digital Ekub transforms traditional community rotating savings and credit associations into a transparent, audit-ready web and mobile ecosystem. It features automated cycle distributions, verified member identity management, and real-time transaction tracking.",
    role: "Full-Stack Lead & Product Architect",
    category: "FinTech / Full-Stack",
    featured: true,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Server Actions"],
    problem:
      "Traditional manual Ekub systems suffer from administrative overhead, lack of payment tracking transparency, and manual audit risk.",
    solution:
      "Engineered an automated digital Ekub management platform with cryptographically verifiable payout order generation, SMS reminders, and real-time balance ledgers.",
    technicalApproach:
      "Built using Next.js App Router for server-rendered performance, PostgreSQL for transactional ACID consistency, and Zod schema validation for strict data input boundaries.",
    result:
      "Streamlined group management for early pilot savings groups while providing instantaneous transaction logs and automated payout notifications.",
    githubUrl: "https://github.com/AbelTensay/digital-ekub",
    liveUrl: "https://digital-ekub-demo.vercel.app",
  },
  {
    id: "vision-feed-processing",
    title: "Vision Feed Processing Technology",
    slug: "vision-feed-processing",
    shortDescription:
      "High-throughput real-time video stream ingestion and computer vision processing pipeline for object detection and visual telemetry.",
    fullDescription:
      "A high-performance computer vision feed processing pipeline engineered to consume multi-camera RTSP/HTTP streams, perform real-time frame inference, and emit low-latency event alerts to analytics dashboards.",
    role: "Systems & Vision Engineer",
    category: "Computer Vision / Systems",
    featured: true,
    technologies: ["Python", "OpenCV", "FastAPI", "WebSockets", "Docker", "PyTorch"],
    problem:
      "Processing multiple concurrent high-definition camera feeds introduces significant GPU memory bottlenecks and latency spikes during frame decoding.",
    solution:
      "Designed a multithreaded frame queue buffer with hardware-accelerated video decoding, reducing frame drop rate to under 0.1% under heavy load.",
    technicalApproach:
      "Implemented a decoupled producer-consumer pipeline using Python multiprocessing queues, zero-copy memory buffers, and WebSocket stream broadcasting.",
    result:
      "Achieved 60+ FPS processing speed across concurrent 1080p feeds with sub-50ms alert propagation latency.",
    githubUrl: "https://github.com/AbelTensay/vision-feed-processing",
  },
  {
    id: "poultry-management-saas",
    title: "Poultry Management SaaS",
    slug: "poultry-management-saas",
    shortDescription:
      "Comprehensive farm management system for tracking flock mortality, feed conversion ratios, environmental metrics, and inventory distribution.",
    fullDescription:
      "An end-to-end operational SaaS designed for commercial poultry farm managers to record daily flock data, forecast feed requirements, track yield curves, and generate regulatory compliance reports.",
    role: "Full-Stack Engineer & UI Designer",
    category: "SaaS / Business Automation",
    featured: true,
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts", "Tailwind CSS"],
    problem:
      "Poultry producers rely on fragmented paper logbooks, leading to undetected feed conversion inefficiencies and delayed mortality outbreak interventions.",
    solution:
      "Created a unified dashboard with predictive yield analytics, automated mortality thresholds, and batch inventory forecasting tools.",
    technicalApproach:
      "Developed interactive time-series visualizations with Recharts, responsive offline-tolerant data entry forms, and automated weekly PDF summary reporting.",
    result:
      "Improved daily operational tracking compliance and provided actionable insights for flock performance optimization.",
    githubUrl: "https://github.com/AbelTensay/poultry-saas",
    liveUrl: "https://poultry-saas-demo.vercel.app",
  },
  {
    id: "aio-dashboard",
    title: "AIO Operations Dashboard",
    slug: "aio-dashboard",
    shortDescription:
      "All-in-One executive dashboard aggregating multi-tenant system telemetry, user analytics, and background task schedules.",
    fullDescription:
      "A unified administrative control panel built for enterprise teams to monitor live system metrics, manage user role permissions, inspect background execution logs, and trigger maintenance tasks.",
    role: "Frontend Lead & UI/UX Designer",
    category: "Web Application / Dashboard",
    featured: true,
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Zustand"],
    problem:
      "Operational teams lost time switching between multiple single-purpose analytics services with inconsistent interfaces.",
    solution:
      "Designed a centralized dark-mode executive console featuring configurable widget layouts, keyboard shortcuts, and live status streaming.",
    technicalApproach:
      "Crafted modular UI component primitives with Framer Motion layout animations and optimized re-renders using client-side state slices.",
    result:
      "Delivered an intuitive, hyper-responsive management interface praised for its high visual polish and fast load speeds.",
    githubUrl: "https://github.com/AbelTensay/aio-dashboard",
    liveUrl: "https://aio-dashboard-demo.vercel.app",
  },
];
