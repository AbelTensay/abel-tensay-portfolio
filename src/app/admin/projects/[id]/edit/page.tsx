export default async function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Edit Project: {id}</h1>
      <p className="mt-2 text-neutral-400">Update project details and case study content</p>
    </main>
  );
}
