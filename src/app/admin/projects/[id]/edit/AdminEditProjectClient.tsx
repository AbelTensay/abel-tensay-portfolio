"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updateProject } from "@/actions";

const inputCls =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition";
const labelCls = "block text-xs font-mono uppercase text-neutral-400 mb-1.5";

interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technicalApproach: string;
  result: string;
  role: string;
  category: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  githubUrl: string | null;
  liveUrl: string | null;
  technologies: { technology: { name: string } }[];
}

export default function AdminEditProjectClient({
  project,
}: {
  project: ProjectRecord;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [category, setCategory] = useState(project.category);
  const [role, setRole] = useState(project.role);
  const [shortDesc, setShortDesc] = useState(project.shortDescription);
  const [fullDesc, setFullDesc] = useState(project.fullDescription);
  const [problem, setProblem] = useState(project.problem);
  const [solution, setSolution] = useState(project.solution);
  const [technicalApproach, setTechnicalApproach] = useState(project.technicalApproach);
  const [result, setResult] = useState(project.result);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>(
    project.technologies.map((t) => t.technology.name)
  );
  const [githubUrl, setGithubUrl] = useState(project.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl ?? "");
  const [featured, setFeatured] = useState(project.featured);
  const [published, setPublished] = useState(project.published);

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies((prev) => [...prev, trimmed]);
    }
    setTechInput("");
  };

  const removeTech = (name: string) =>
    setTechnologies((prev) => prev.filter((t) => t !== name));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await updateProject(project.id, {
        title,
        slug,
        category,
        role,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        problem,
        solution,
        technicalApproach,
        result,
        technologies,
        githubUrl,
        liveUrl,
        featured,
        published,
      });
      if (res.success) {
        router.push("/admin/projects");
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
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
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="sm"
            isLoading={isPending}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Update Project
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-xl px-4 py-3">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-100 border-b border-neutral-800 pb-3 font-mono uppercase tracking-wider">
              Basic Metadata
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Project Title *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>URL Slug *</label>
                <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Short Summary</label>
              <textarea rows={2} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Full Description</label>
              <textarea rows={4} value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </Card>

          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-100 border-b border-neutral-800 pb-3 font-mono uppercase tracking-wider">
              Case Study Content
            </h2>
            <div>
              <label className={labelCls}>Problem</label>
              <textarea rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Solution</label>
              <textarea rows={3} value={solution} onChange={(e) => setSolution(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Technical Approach</label>
              <textarea rows={3} value={technicalApproach} onChange={(e) => setTechnicalApproach(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Results & Impact</label>
              <textarea rows={2} value={result} onChange={(e) => setResult(e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </Card>

          <Card hoverEffect={false} className="p-6 space-y-4 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-100 border-b border-neutral-800 pb-3 font-mono uppercase tracking-wider">
              Technologies
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add technology..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono transition flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400 transition">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Card>

          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-100 border-b border-neutral-800 pb-3 font-mono uppercase tracking-wider">
              Links & Visibility
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>GitHub URL</label>
                <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Live URL</label>
                <input type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 rounded accent-blue-500" />
                <span className="text-xs font-mono text-neutral-300">Published</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded accent-amber-500" />
                <span className="text-xs font-mono text-neutral-300">Featured on Homepage</span>
              </label>
            </div>
          </Card>

          <div className="flex justify-end gap-4 pb-8">
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary" size="sm" isLoading={isPending} leftIcon={<Save className="h-4 w-4" />}>
              Update Project
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
