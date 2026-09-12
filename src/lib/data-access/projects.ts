import { db } from "@/lib/db";
import { FEATURED_PROJECTS, ProjectData } from "@/data/projects";

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    if (projects.length === 0) return FEATURED_PROJECTS;

    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      role: p.role,
      category: p.category,
      featured: p.featured,
      technologies: p.technologies.map((t) => t.technology.name),
      problem: p.problem,
      solution: p.solution,
      technicalApproach: p.technicalApproach,
      result: p.result,
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
    }));
  } catch {
    return FEATURED_PROJECTS;
  }
}

export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const allProjects = await getProjects();
  return allProjects.filter((p) => p.featured);
}

export async function getAdminProjects() {
  try {
    return await db.project.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        technologies: {
          include: { technology: true },
        },
        images: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getAdminProjectById(id: string) {
  try {
    return await db.project.findUnique({
      where: { id },
      include: {
        technologies: { include: { technology: true } },
        images: true,
      },
    });
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const allProjects = await getProjects();
  return allProjects.find((p) => p.slug === slug) || null;
}


