"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function createSkillCategory(data: {
  name: string;
  displayOrder?: number;
}) {
  await requireAdminSession();
  try {
    await db.skillCategory.create({
      data: {
        name: data.name,
        displayOrder: data.displayOrder ?? 0,
      },
    });
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err) {
    console.error("Failed to create skill category:", err);
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteSkillCategory(id: string) {
  await requireAdminSession();
  try {
    await db.skillCategory.delete({ where: { id } });
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete skill category:", err);
    return { success: false, error: "Failed to delete category" };
  }
}

export async function addSkillToCategory(categoryId: string, name: string) {
  await requireAdminSession();
  try {
    await db.skill.create({
      data: { categoryId, name, displayOrder: 0 },
    });
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err) {
    console.error("Failed to add skill:", err);
    return { success: false, error: "Failed to add skill" };
  }
}

export async function deleteSkill(id: string) {
  await requireAdminSession();
  try {
    await db.skill.delete({ where: { id } });
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete skill:", err);
    return { success: false, error: "Failed to delete skill" };
  }
}

export async function updateSkillCategoryName(id: string, name: string) {
  await requireAdminSession();
  try {
    await db.skillCategory.update({ where: { id }, data: { name } });
    revalidatePath("/admin/skills");
    return { success: true };
  } catch (err) {
    console.error("Failed to update skill category:", err);
    return { success: false, error: "Failed to update category" };
  }
}
