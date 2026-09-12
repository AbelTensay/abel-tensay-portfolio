import { getAdminProjectById } from "@/lib/data-access";
import { notFound } from "next/navigation";
import AdminEditProjectClient from "./AdminEditProjectClient";

export const dynamic = "force-dynamic";

export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getAdminProjectById(id);
  if (!project) notFound();
  return <AdminEditProjectClient project={project} />;
}
