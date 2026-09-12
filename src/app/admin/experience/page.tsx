"use client";

import React, { useState } from "react";
import { Briefcase, Edit, Plus, Trash2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EXPERIENCE_ITEMS } from "@/data/experience";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState(EXPERIENCE_ITEMS);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="CMS // Work Timeline">
              Experience Management
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Create, edit, reorder, and manage professional experience entries.
            </Text>
          </div>

          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Experience Entry
          </Button>
        </div>

        <div className="space-y-4 max-w-4xl">
          {experiences.map((exp) => (
            <Card key={exp.id} hoverEffect={false} className="p-6 space-y-4 bg-neutral-900/40 border-neutral-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-100">{exp.role}</h3>
                  <p className="text-xs font-mono text-blue-400">{exp.company} — {exp.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm">
                    {exp.startDate} - {exp.endDate}
                  </Badge>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete Entry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside font-mono">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
