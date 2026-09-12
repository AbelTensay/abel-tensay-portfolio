import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";

export async function getSiteSettings() {
  try {
    const settings = await db.siteSettings.findMany();
    const configMap: Record<string, string> = {};
    settings.forEach((s) => {
      configMap[s.key] = s.value;
    });

    return {
      title: configMap.site_title || siteConfig.title,
      description: configMap.site_description || siteConfig.description,
      name: configMap.author_name || siteConfig.name,
      email: configMap.contact_email || siteConfig.links.email,
    };
  } catch {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      name: siteConfig.name,
      email: siteConfig.links.email,
    };
  }
}
