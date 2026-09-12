"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

interface ProjectInput {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technicalApproach: string;
  result: string;
  role: string;
  category?: string;
  featured?: boolean;
  published?: boolean;
  displayOrder?: number;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[]; // technology names
}

export async function createProject(data: ProjectInput) {
  await requireAdminSession();
  try {
    const project = await db.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        problem: data.problem,
        solution: data.solution,
        technicalApproach: data.technicalApproach,
        result: data.result,
        role: data.role,
        category: data.category ?? "Full-Stack",
        featured: data.featured ?? false,
        published: data.published ?? true,
        displayOrder: data.displayOrder ?? 0,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
      },
    });

    if (data.technologies && data.technologies.length > 0) {
      for (const techName of data.technologies) {
        const tech = await db.technology.upsert({
          where: { name: techName },
          create: { name: techName },
          update: {},
        });
        await db.projectTechnology.create({
          data: { projectId: project.id, technologyId: tech.id },
        });
      }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true, id: project.id, slug: project.slug };
  } catch (err) {
    console.error("Failed to create project:", err);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  await requireAdminSession();
  try {
    await db.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        problem: data.problem,
        solution: data.solution,
        technicalApproach: data.technicalApproach,
        result: data.result,
        role: data.role,
        category: data.category,
        featured: data.featured,
        published: data.published,
        displayOrder: data.displayOrder,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
      },
    });

    if (data.technologies !== undefined) {
      // Remove all existing tech links then re-create
      await db.projectTechnology.deleteMany({ where: { projectId: id } });
      for (const techName of data.technologies) {
        const tech = await db.technology.upsert({
          where: { name: techName },
          create: { name: techName },
          update: {},
        });
        await db.projectTechnology.create({
          data: { projectId: id, technologyId: tech.id },
        });
      }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/work");
    revalidatePath("/");
    return { success: true };
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
