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

  console.log("Seeded Project:", digitalEkub.title);

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
