import { getAdminExperiences } from "@/lib/data-access";
import AdminExperienceClient from "./AdminExperienceClient";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await getAdminExperiences();
  return <AdminExperienceClient initialExperiences={experiences} />;
}
