export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Project: {slug}</h1>
      <p className="mt-2 text-neutral-400">Detailed Case Study</p>
    </main>
  );
}
