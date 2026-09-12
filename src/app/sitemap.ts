import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { FEATURED_PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = siteConfig.nav.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: item.path === "/" ? 1.0 : 0.8,
  }));

  const projectRoutes = FEATURED_PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
