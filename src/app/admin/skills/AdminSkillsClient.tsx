"use client";

import React, { useState, useTransition } from "react";
import { Plus, Trash2, X, FolderPlus } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  createSkillCategory,
  deleteSkillCategory,
  addSkillToCategory,
  deleteSkill,
} from "@/actions";

interface SkillItem {
  id: string;
  name: string;
  displayOrder: number;
}

interface CategoryItem {
  id: string;
  name: string;
  displayOrder: number;
  skills: SkillItem[];
}

const inputCls =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition";

export default function AdminSkillsClient({
  initialCategories,
}: {
  initialCategories: CategoryItem[];
}) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [isPending, startTransition] = useTransition();

  // Category creation state
  const [showCatForm, setShowCatForm] = useState(false);
  const [catName, setCatName] = useState("");

  // Skill addition state per category
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const handleCreateCategory = () => {
    const name = catName.trim();
    if (!name) return;
    startTransition(async () => {
      const res = await createSkillCategory({ name, displayOrder: categories.length });
      if (res.success) {
        setCategories((prev) => [
          ...prev,
          { id: Date.now().toString(), name, displayOrder: prev.length, skills: [] },
        ]);
        setCatName("");
        setShowCatForm(false);
      }
    });
  };

  const handleDeleteCategory = (cat: CategoryItem) => {
    if (!confirm(`Delete category "${cat.name}" and all its skills?`)) return;
    startTransition(async () => {
      const res = await deleteSkillCategory(cat.id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      }
    });
  };

  const handleAddSkill = (catId: string) => {
    const name = (skillInputs[catId] ?? "").trim();
    if (!name) return;
    startTransition(async () => {
      const res = await addSkillToCategory(catId, name);
      if (res.success) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === catId
              ? {
                  ...c,
                  skills: [
                    ...c.skills,
                    { id: Date.now().toString(), name, displayOrder: c.skills.length },
                  ],
                }
              : c
          )
        );
        setSkillInputs((prev) => ({ ...prev, [catId]: "" }));
      }
    });
  };

  const handleDeleteSkill = (catId: string, skillId: string) => {
    startTransition(async () => {
      const res = await deleteSkill(skillId);
      if (res.success) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === catId
              ? { ...c, skills: c.skills.filter((s) => s.id !== skillId) }
              : c
          )
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="CMS // Skill Matrix">
              Skills Management
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
              · {categories.reduce((sum, c) => sum + c.skills.length, 0)} total skills
            </Text>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FolderPlus className="h-4 w-4" />}
            onClick={() => setShowCatForm(true)}
          >
            Add Skill Category
          </Button>
        </div>

        {/* New Category Form */}
        {showCatForm && (
          <Card hoverEffect={false} className="p-5 bg-neutral-900/60 border-blue-500/30 max-w-md space-y-4">
            <h3 className="text-xs font-mono uppercase text-neutral-400">New Category</h3>
            <input
              type="text"
              autoFocus
              placeholder="Category name (e.g. Frontend, DevOps)"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleCreateCategory(); } }}
              className={inputCls}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => { setShowCatForm(false); setCatName(""); }}>Cancel</Button>
              <Button variant="primary" size="sm" isLoading={isPending} onClick={handleCreateCategory}>
                Create Category
              </Button>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {categories.length === 0 && !showCatForm && (
          <Card hoverEffect={false} className="p-16 text-center text-neutral-500 space-y-3 bg-neutral-900/40 border-neutral-800">
            <p className="font-mono text-sm">No skill categories yet.</p>
            <Button variant="primary" size="sm" leftIcon={<FolderPlus className="h-4 w-4" />} onClick={() => setShowCatForm(true)}>
              Create First Category
            </Button>
          </Card>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              hoverEffect={false}
              className="p-5 space-y-4 bg-neutral-900/40 border-neutral-800 flex flex-col"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-100">{cat.name}</h3>
                <button
                  onClick={() => handleDeleteCategory(cat)}
                  disabled={isPending}
                  className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                  title="Delete Category"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2 min-h-[32px]">
                {cat.skills.length === 0 && (
                  <span className="text-[11px] font-mono text-neutral-600 italic">
                    No skills yet
                  </span>
                )}
                {cat.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(cat.id, skill.id)}
                      disabled={isPending}
                      className="hover:text-red-400 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill Input */}
              <div className="flex gap-2 mt-auto pt-3 border-t border-neutral-800">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={skillInputs[cat.id] ?? ""}
                  onChange={(e) =>
                    setSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill(cat.id);
                    }
                  }}
                  className="flex-1 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(cat.id)}
                  disabled={isPending}
                  className="px-2.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
