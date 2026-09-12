"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  FolderKanban,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FEATURED_PROJECTS } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(FEATURED_PROJECTS);

  const togglePublished = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: p.featured } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
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
              Create, edit, feature, publish, and delete project case studies.
            </Text>
          </div>

          <Link href="/admin/projects/new">
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Project
            </Button>
          </Link>
        </div>

        {/* Projects List Table */}
        <Card hoverEffect={false} className="p-0 overflow-hidden bg-neutral-900/40 border-neutral-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Project Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-neutral-900/60 transition">
                    <td className="px-6 py-4 font-semibold text-neutral-100">
                      <div className="flex items-center gap-2">
                        <span>{project.title}</span>
                        {project.featured && (
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{project.category}</td>
                    <td className="px-6 py-4 text-neutral-300">{project.role}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success" size="sm">
                        Published
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <button
                          className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                          title="Edit Project"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
