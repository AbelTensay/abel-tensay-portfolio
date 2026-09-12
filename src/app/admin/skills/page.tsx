"use client";

import React, { useState } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CAPABILITIES } from "@/data/experience";

export default function AdminSkillsPage() {
  const [capabilities, setCapabilities] = useState(CAPABILITIES);

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="CMS // Skill Matrix">
              Skills Management
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Categorize skills, reorder categories, and add new technology stack tags.
            </Text>
          </div>

          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Skill Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <Card key={i} hoverEffect={false} className="p-6 space-y-4 bg-neutral-900/40 border-neutral-800 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-xs text-blue-400 font-semibold">{cap.tagline}</span>
                <h3 className="text-lg font-bold text-neutral-100">{cap.title}</h3>
                <Text variant="small" className="text-neutral-400">{cap.description}</Text>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-800">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.skills.map((skill) => (
                    <Badge key={skill} variant="accent" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
