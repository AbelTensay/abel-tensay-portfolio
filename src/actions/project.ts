"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function toggleProjectPublished(projectId: string, currentPublishedState: boolean) {
  await requireAdminSession();
  try {
    await db.project.update({
      where: { id: projectId },
      data: { published: !currentPublishedState },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/work");
    return { success: true };
  } catch (err) {
    console.error("Failed to toggle published state:", err);
    return { success: false, error: "Failed to update project" };
  }
}

export async function toggleProjectFeatured(projectId: string, currentFeaturedState: boolean) {
  await requireAdminSession();
  try {
    await db.project.update({
      where: { id: projectId },
      data: { featured: !currentFeaturedState },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to toggle featured state:", err);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(projectId: string) {
  await requireAdminSession();
  try {
    await db.project.delete({
      where: { id: projectId },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/work");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete project:", err);
    return { success: false, error: "Failed to delete project" };
  }
}
