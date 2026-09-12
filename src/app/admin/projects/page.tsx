import { getAdminProjects } from "@/lib/data-access";
import AdminProjectsClient from "./AdminProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  return <AdminProjectsClient initialProjects={projects} />;
}
