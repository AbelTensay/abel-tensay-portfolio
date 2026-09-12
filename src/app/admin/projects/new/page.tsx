"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Full-Stack / FinTech");
  const [role, setRole] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/admin/projects");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div className="space-y-1">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Projects</span>
            </Link>
            <Heading level={1} eyebrow="CMS // Create Case Study">
              Create New Project
            </Heading>
          </div>

          <Button
            onClick={handleSubmit}
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Project
          </Button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3">
              Basic Metadata
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Digital Ekub Platform"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="digital-ekub"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Category</label>
                <input
                  type="text"
                  placeholder="FinTech / Full-Stack"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Role</label>
                <input
                  type="text"
                  placeholder="Full-Stack Lead & Product Architect"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">Short Summary</label>
              <textarea
                rows={2}
                placeholder="Brief project tagline for cards..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </Card>

          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3">
              Case Study Content
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Problem Overview</label>
                <textarea
                  rows={3}
                  placeholder="What business problem or technical constraint does this project address?"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Solution & Technical Approach</label>
                <textarea
                  rows={3}
                  placeholder="How was the architecture engineered to solve the problem?"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
}
