import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Hash the admin password
  const passwordHash = await bcrypt.hash("82481@Amj", 12);

  // Seed Admin User
  const admin = await prisma.user.upsert({
    where: { email: "abeltensay2@gmail.com" },
    update: {
      passwordHash,
      name: "Abel Tensay",
    },
    create: {
      email: "abeltensay2@gmail.com",
      name: "Abel Tensay",
      role: "ADMIN",
      passwordHash,
    },
  });

  // Remove any old placeholder user if it exists
  await prisma.user
    .delete({ where: { email: "abeltensay@example.com" } })
    .catch(() => {
      /* no-op if not found */
    });

  console.log("Seeded Admin User:", admin.email);


  // Seed Initial Projects
  const digitalEkub = await prisma.project.upsert({
    where: { slug: "digital-ekub" },
    update: {},
    create: {
      title: "Digital Ekub Platform",
      slug: "digital-ekub",
      shortDescription:
        "A modern FinTech platform digitizing traditional Ethiopian ROSCA rotating savings and credit groups with automated payout scheduling.",
      fullDescription:
        "Digital Ekub transforms traditional community rotating savings and credit associations into a transparent, audit-ready web and mobile ecosystem.",
      problem:
        "Traditional manual Ekub systems suffer from administrative overhead, lack of payment tracking transparency, and manual audit risk.",
      solution:
        "Engineered an automated digital Ekub management platform with cryptographically verifiable payout order generation, SMS reminders, and real-time balance ledgers.",
      technicalApproach:
        "Built using Next.js App Router for server-rendered performance, PostgreSQL for transactional ACID consistency, and Zod schema validation.",
      result:
        "Streamlined group management for early pilot savings groups while providing instantaneous transaction logs.",
      role: "Full-Stack Lead & Product Architect",
      category: "FinTech / Full-Stack",
      featured: true,
      published: true,
      displayOrder: 1,
      githubUrl: "https://github.com/AbelTensay/digital-ekub",
      liveUrl: "https://digital-ekub-demo.vercel.app",
    },
  });

  const visionFeed = await prisma.project.upsert({
    where: { slug: "vision-feed-processing" },
    update: {},
    create: {
      title: "Vision Feed Processing Technology",
      slug: "vision-feed-processing",
      shortDescription:
        "High-throughput real-time video stream ingestion and computer vision processing pipeline for object detection and visual telemetry.",
      fullDescription:
        "A high-performance computer vision feed processing pipeline engineered to consume multi-camera RTSP/HTTP streams, perform real-time frame inference, and emit low-latency event alerts to analytics dashboards.",
      problem:
        "Processing multiple concurrent high-definition camera feeds introduces significant GPU memory bottlenecks and latency spikes during frame decoding.",
      solution:
        "Designed a multithreaded frame queue buffer with hardware-accelerated video decoding, reducing frame drop rate to under 0.1% under heavy load.",
      technicalApproach:
        "Implemented a decoupled producer-consumer pipeline using Python multiprocessing queues, zero-copy memory buffers, and WebSocket stream broadcasting.",
      result:
        "Achieved 60+ FPS processing speed across concurrent 1080p feeds with sub-50ms alert propagation latency.",
      role: "Systems & Vision Engineer",
      category: "Computer Vision / Systems",
      featured: true,
      published: true,
      displayOrder: 2,
      githubUrl: "https://github.com/AbelTensay/vision-feed-processing",
    },
  });

  const poultrySaas = await prisma.project.upsert({
    where: { slug: "poultry-management-saas" },
    update: {},
    create: {
      title: "Poultry Management SaaS",
      slug: "poultry-management-saas",
      shortDescription:
        "Comprehensive farm management system for tracking flock mortality, feed conversion ratios, environmental metrics, and inventory distribution.",
      fullDescription:
        "An end-to-end operational SaaS designed for commercial poultry farm managers to record daily flock data, forecast feed requirements, track yield curves, and generate regulatory compliance reports.",
      problem:
        "Poultry producers rely on fragmented paper logbooks, leading to undetected feed conversion inefficiencies and delayed mortality outbreak interventions.",
      solution:
        "Created a unified dashboard with predictive yield analytics, automated mortality thresholds, and batch inventory forecasting tools.",
      technicalApproach:
        "Developed interactive time-series visualizations with Recharts, responsive offline-tolerant data entry forms, and automated weekly PDF summary reporting.",
      result:
        "Improved daily operational tracking compliance and provided actionable insights for flock performance optimization.",
      role: "Full-Stack Engineer & UI Designer",
      category: "SaaS / Business Automation",
      featured: true,
      published: true,
      displayOrder: 3,
      githubUrl: "https://github.com/AbelTensay/poultry-saas",
      liveUrl: "https://poultry-saas-demo.vercel.app",
    },
  });

  const aioDashboard = await prisma.project.upsert({
    where: { slug: "aio-dashboard" },
    update: {},
    create: {
      title: "AIO Operations Dashboard",
      slug: "aio-dashboard",
      shortDescription:
        "All-in-One executive dashboard aggregating multi-tenant system telemetry, user analytics, and background task schedules.",
      fullDescription:
        "A unified administrative control panel built for enterprise teams to monitor live system metrics, manage user role permissions, inspect background execution logs, and trigger maintenance tasks.",
      problem:
        "Operational teams lost time switching between multiple single-purpose analytics services with inconsistent interfaces.",
      solution:
        "Designed a centralized dark-mode executive console featuring configurable widget layouts, keyboard shortcuts, and live status streaming.",
      technicalApproach:
        "Crafted modular UI component primitives with Framer Motion layout animations and optimized re-renders using client-side state slices.",
      result:
        "Delivered an intuitive, hyper-responsive management interface praised for its high visual polish and fast load speeds.",
      role: "Frontend Lead & UI/UX Designer",
      category: "Web Application / Dashboard",
      featured: true,
      published: true,
      displayOrder: 4,
      githubUrl: "https://github.com/AbelTensay/aio-dashboard",
      liveUrl: "https://aio-dashboard-demo.vercel.app",
    },
  });

  console.log("Seeded Projects:", digitalEkub.title, visionFeed.title, poultrySaas.title, aioDashboard.title);

  // Seed Experience Items
  const exp1 = await prisma.experience.upsert({
    where: { id: "exp-1" },
    update: {},
    create: {
      id: "exp-1",
      company: "DevTech Solutions",
      role: "Full-Stack Engineer & Product Developer",
      location: "Addis Ababa, Ethiopia",
      startDate: "2023",
      endDate: "Present",
      description: "Architected and deployed full-stack web applications for commercial clients using Next.js, React, Node.js, and PostgreSQL.\nDesigned intuitive, high-performance user interfaces and responsive web layouts with strong focus on UX and accessibility.\nEngineered automated REST APIs, database schemas, and Server Actions for scalable business workflow management.",
      displayOrder: 1,
      published: true,
    },
  });

  const exp2 = await prisma.experience.upsert({
    where: { id: "exp-2" },
    update: {},
    create: {
      id: "exp-2",
      company: "Technology Systems & Vision Project",
      role: "Software Engineering Lead & System Developer",
      location: "Addis Ababa, Ethiopia",
      startDate: "2022",
      endDate: "2023",
      description: "Engineered real-time video stream decoding and computer vision analytical pipelines using Python and OpenCV.\nImplemented modular data processing modules for high-frequency video telemetry and multi-feed aggregation.\nCollaborated across UI design and backend engineering to present complex visual telemetry into actionable web dashboards.",
      displayOrder: 2,
      published: true,
    },
  });

  const exp3 = await prisma.experience.upsert({
    where: { id: "exp-3" },
    update: {},
    create: {
      id: "exp-3",
      company: "Engineering & Graduate Platform",
      role: "Full-Stack Developer Intern",
      location: "Addis Ababa, Ethiopia",
      startDate: "2021",
      endDate: "2022",
      description: "Built interactive web applications, automated portal tools, and data reporting views for academic & institutional platforms.\nDeveloped responsive frontend components utilizing clean TypeScript architecture and modern CSS frameworks.",
      displayOrder: 3,
      published: true,
    },
  });

  console.log("Seeded Experiences:", exp1.company, exp2.company, exp3.company);

  // Seed Skill Categories & Skills
  const cat1 = await prisma.skillCategory.upsert({
    where: { id: "cat-1" },
    update: {},
    create: {
      id: "cat-1",
      name: "Full-Stack & Web Architecture",
      displayOrder: 1,
      skills: {
        create: [
          { name: "Next.js (App Router)", displayOrder: 1 },
          { name: "TypeScript", displayOrder: 2 },
          { name: "React 19", displayOrder: 3 },
          { name: "Node.js", displayOrder: 4 },
          { name: "Python", displayOrder: 5 },
          { name: "REST API & Server Actions", displayOrder: 6 },
        ],
      },
    },
  });

  const cat2 = await prisma.skillCategory.upsert({
    where: { id: "cat-2" },
    update: {},
    create: {
      id: "cat-2",
      name: "Database & Backend Infrastructure",
      displayOrder: 2,
      skills: {
        create: [
          { name: "PostgreSQL", displayOrder: 1 },
          { name: "Prisma ORM", displayOrder: 2 },
          { name: "Supabase PostgreSQL", displayOrder: 3 },
          { name: "FastAPI / Express", displayOrder: 4 },
          { name: "Auth.js / NextAuth", displayOrder: 5 },
          { name: "Vercel Blob Storage", displayOrder: 6 },
        ],
      },
    },
  });

  const cat3 = await prisma.skillCategory.upsert({
    where: { id: "cat-3" },
    update: {},
    create: {
      id: "cat-3",
      name: "UI/UX Design & Frontend Engineering",
      displayOrder: 3,
      skills: {
        create: [
          { name: "Tailwind CSS", displayOrder: 1 },
          { name: "Framer Motion", displayOrder: 2 },
          { name: "Three.js / R3F", displayOrder: 3 },
          { name: "Figma UI/UX Prototyping", displayOrder: 4 },
          { name: "HTML5 / Semantic Web", displayOrder: 5 },
          { name: "WCAG Accessibility", displayOrder: 6 },
        ],
      },
    },
  });

  const cat4 = await prisma.skillCategory.upsert({
    where: { id: "cat-4" },
    update: {},
    create: {
      id: "cat-4",
      name: "Computer Vision & Systems",
      displayOrder: 4,
      skills: {
        create: [
          { name: "OpenCV", displayOrder: 1 },
          { name: "Multiprocessing & Queues", displayOrder: 2 },
          { name: "WebSockets Stream Ingestion", displayOrder: 3 },
          { name: "Docker Containerization", displayOrder: 4 },
          { name: "NumPy / PyTorch", displayOrder: 5 },
        ],
      },
    },
  });

  console.log("Seeded Skill Categories:", cat1.name, cat2.name, cat3.name, cat4.name);

  // Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { key: "site_title" },
    update: { value: "Abel Tensay | Software Engineer · Full-Stack Developer · UI/UX Designer" },
    create: { key: "site_title", value: "Abel Tensay | Software Engineer · Full-Stack Developer · UI/UX Designer" },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
