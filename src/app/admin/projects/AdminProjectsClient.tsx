"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Plus, Star, Trash2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  toggleProjectPublished,
  toggleProjectFeatured,
  deleteProject,
} from "@/actions";

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  role: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  technologies: { technology: { name: string } }[];
}

export default function AdminProjectsClient({
  initialProjects,
}: {
  initialProjects: ProjectRow[];
}) {
  const [projects, setProjects] = useState<ProjectRow[]>(initialProjects);
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);

  const handleTogglePublished = (project: ProjectRow) => {
    setActionId(project.id + "-pub");
    startTransition(async () => {
      const res = await toggleProjectPublished(project.id, project.published);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, published: !p.published } : p
          )
        );
      }
      setActionId(null);
    });
  };

  const handleToggleFeatured = (project: ProjectRow) => {
    setActionId(project.id + "-feat");
    startTransition(async () => {
      const res = await toggleProjectFeatured(project.id, project.featured);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p
          )
        );
      }
      setActionId(null);
    });
  };

  const handleDelete = (project: ProjectRow) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setActionId(project.id + "-del");
    startTransition(async () => {
      const res = await deleteProject(project.id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== project.id));
      }
      setActionId(null);
    });
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="CMS // Portfolio Projects">
              Projects Management
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""} total
              · {projects.filter((p) => p.published).length} published
              · {projects.filter((p) => p.featured).length} featured
            </Text>
          </div>
          <Link href="/admin/projects/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Project
            </Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card hoverEffect={false} className="p-16 text-center space-y-3 bg-neutral-900/40 border-neutral-800">
            <p className="text-neutral-400 font-mono text-sm">No projects yet.</p>
            <Link href="/admin/projects/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                Create your first project
              </Button>
            </Link>
          </Card>
        ) : (
          <Card hoverEffect={false} className="p-0 overflow-hidden bg-neutral-900/40 border-neutral-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Project Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Technologies</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-neutral-900/60 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>{project.title}</span>
                          {project.featured && (
                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500 font-normal">
                          /{project.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{project.category}</td>
                      <td className="px-6 py-4 text-neutral-300">{project.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {project.technologies.slice(0, 3).map((t) => (
                            <span
                              key={t.technology.name}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            >
                              {t.technology.name}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-[9px] text-neutral-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={project.published ? "success" : "outline"}
                            size="sm"
                          >
                            {project.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleFeatured(project)}
                            disabled={isPending && actionId === project.id + "-feat"}
                            className={`p-1.5 rounded transition ${
                              project.featured
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-amber-400"
                            }`}
                            title={project.featured ? "Unfeature" : "Feature"}
                          >
                            <Star className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleTogglePublished(project)}
                            disabled={isPending && actionId === project.id + "-pub"}
                            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                            title={project.published ? "Unpublish" : "Publish"}
                          >
                            {project.published ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <button
                              className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                              title="Edit Project"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(project)}
                            disabled={isPending && actionId === project.id + "-del"}
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                            title="Delete Project"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
