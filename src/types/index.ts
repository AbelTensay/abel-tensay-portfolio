export interface NavItem {
  name: string;
  path: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  role: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  coverImage?: string;
  technologies: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  description: string[];
  displayOrder: number;
  published: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  category: string;
  skills: string[];
  displayOrder: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
