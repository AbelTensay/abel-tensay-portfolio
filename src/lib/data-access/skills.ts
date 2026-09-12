import { db } from "@/lib/db";

export interface SkillCategoryWithSkills {
  id: string;
  name: string;
  displayOrder: number;
  skills: { id: string; name: string; displayOrder: number }[];
}

export async function getSkillCategories(): Promise<SkillCategoryWithSkills[]> {
  try {
    const categories = await db.skillCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        skills: { orderBy: { displayOrder: "asc" } },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      displayOrder: cat.displayOrder,
      skills: cat.skills.map((s) => ({
        id: s.id,
        name: s.name,
        displayOrder: s.displayOrder,
      })),
    }));
  } catch {
    return [];
  }
}
