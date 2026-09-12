"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export interface CreateProjectInput {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technicalApproach: string;
  result: string;
  role: string;
  category: string;
  featured?: boolean;
  published?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export async function createProject(input: CreateProjectInput) {
  await requireAdminSession();
  try {
    const project = await db.project.create({
      data: {
        title: input.title,
        slug: input.slug,
        shortDescription: input.shortDescription,
        fullDescription: input.fullDescription || input.shortDescription,
        problem: input.problem || input.shortDescription,
        solution: input.solution || input.shortDescription,
        technicalApproach: input.technicalApproach || input.shortDescription,
        result: input.result || input.shortDescription,
        role: input.role,
        category: input.category,
        featured: input.featured ?? false,
        published: input.published ?? true,
        githubUrl: input.githubUrl || null,
        liveUrl: input.liveUrl || null,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true, project };
  } catch (err) {
    console.error("Failed to create project:", err);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, input: Partial<CreateProjectInput>) {
  await requireAdminSession();
  try {
    const project = await db.project.update({
      where: { id },
      data: {
        ...input,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    revalidatePath("/");
    return { success: true, project };
  } catch (err) {
    console.error("Failed to update project:", err);
    return { success: false, error: "Failed to update project" };
  }
}

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
