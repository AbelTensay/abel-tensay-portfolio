"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FEATURED_PROJECTS } from "@/data/projects";

export default function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>("");

  React.use(params);

  const [title, setTitle] = useState("Digital Ekub Platform");
  const [category, setCategory] = useState("FinTech / Full-Stack");
  const [role, setRole] = useState("Full-Stack Lead & Product Architect");
  const [shortDesc, setShortDesc] = useState("A modern FinTech platform digitizing traditional Ethiopian ROSCA rotating savings.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
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
            <Heading level={1} eyebrow="CMS // Edit Case Study">
              Edit Project
            </Heading>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleUpdate}
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Update Project
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleUpdate} className="space-y-8 max-w-4xl">
          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3">
              Modify Case Study
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">Short Summary</label>
              <textarea
                rows={3}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
}
