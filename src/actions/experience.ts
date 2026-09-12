"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function createExperience(data: {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  displayOrder?: number;
}) {
  await requireAdminSession();
  try {
    await db.experience.create({
      data: {
        company: data.company,
        role: data.role,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate || null,
        description: data.description,
        displayOrder: data.displayOrder ?? 0,
        published: true,
      },
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to create experience:", err);
    return { success: false, error: "Failed to create experience entry" };
  }
}

export async function updateExperience(
  id: string,
  data: {
    company?: string;
    role?: string;
    location?: string;
    startDate?: string;
    endDate?: string | null;
    description?: string;
    displayOrder?: number;
    published?: boolean;
  }
) {
  await requireAdminSession();
  try {
    await db.experience.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to update experience:", err);
    return { success: false, error: "Failed to update experience entry" };
  }
}

export async function deleteExperience(id: string) {
  await requireAdminSession();
  try {
    await db.experience.delete({ where: { id } });
    revalidatePath("/admin/experience");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete experience:", err);
    return { success: false, error: "Failed to delete experience entry" };
  }
}

export async function toggleExperiencePublished(id: string, current: boolean) {
  await requireAdminSession();
  try {
    await db.experience.update({
      where: { id },
      data: { published: !current },
    });
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (err) {
    console.error("Failed to toggle experience:", err);
    return { success: false, error: "Failed to update experience" };
  }
}
