import { db } from "@/lib/db";
import { EXPERIENCE_ITEMS, ExperienceData } from "@/data/experience";

export async function getExperiences(): Promise<ExperienceData[]> {
  try {
    const experiences = await db.experience.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });

    if (experiences.length === 0) return EXPERIENCE_ITEMS;

    return experiences.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate || "Present",
      description: e.description.split("\n"),
      technologies: ["Next.js", "TypeScript", "React", "PostgreSQL"],
    }));
  } catch {
    return EXPERIENCE_ITEMS;
  }
}

export async function getAdminExperiences() {
  try {
    return await db.experience.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    return [];
  }
}

