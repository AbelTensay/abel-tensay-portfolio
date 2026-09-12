import { getSkillCategories } from "@/lib/data-access";
import AdminSkillsClient from "./AdminSkillsClient";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const categories = await getSkillCategories();
  return <AdminSkillsClient initialCategories={categories} />;
}
