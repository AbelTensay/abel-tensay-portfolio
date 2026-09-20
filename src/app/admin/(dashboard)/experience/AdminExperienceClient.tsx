"use client";

import React, { useState, useTransition } from "react";
import { Plus, Trash2, Edit, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  toggleExperiencePublished,
} from "@/actions";

interface ExperienceRecord {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  displayOrder: number;
  published: boolean;
}

const inputCls =
  "w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition";
const labelCls = "block text-xs font-mono uppercase text-neutral-400 mb-1.5";

interface FormState {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function AdminExperienceClient({
  initialExperiences,
}: {
  initialExperiences: ExperienceRecord[];
}) {
  const [experiences, setExperiences] = useState<ExperienceRecord[]>(initialExperiences);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  const handleField = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const startCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setError(null);
  };

  const startEdit = (exp: ExperienceRecord) => {
    setEditingId(exp.id);
    setForm({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate ?? "",
      description: exp.description,
    });
    setShowForm(true);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      if (editingId) {
        const res = await updateExperience(editingId, {
          company: form.company,
          role: form.role,
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate || null,
          description: form.description,
        });
        if (res.success) {
          setExperiences((prev) =>
            prev.map((e) =>
              e.id === editingId
                ? { ...e, ...form, endDate: form.endDate || null }
                : e
            )
          );
          setShowForm(false);
          setEditingId(null);
        } else {
          setError(res.error ?? "Failed to update");
        }
      } else {
        const res = await createExperience({
          company: form.company,
          role: form.role,
          location: form.location,
          startDate: form.startDate,
          endDate: form.endDate || undefined,
          description: form.description,
          displayOrder: experiences.length,
        });
        if (res.success) {
          // Reload experience list optimistically
          setExperiences((prev) => [
            ...prev,
            {
              id: Date.now().toString(), // temp id, will be replaced on next server fetch
              company: form.company,
              role: form.role,
              location: form.location,
              startDate: form.startDate,
              endDate: form.endDate || null,
              description: form.description,
              displayOrder: prev.length,
              published: true,
            },
          ]);
          setShowForm(false);
          setForm(EMPTY_FORM);
        } else {
          setError(res.error ?? "Failed to create");
        }
      }
    });
  };

  const handleDelete = (exp: ExperienceRecord) => {
    if (!confirm(`Delete "${exp.role}" at ${exp.company}?`)) return;
    startTransition(async () => {
      const res = await deleteExperience(exp.id);
      if (res.success) {
        setExperiences((prev) => prev.filter((e) => e.id !== exp.id));
      }
    });
  };

  const handleTogglePublished = (exp: ExperienceRecord) => {
    startTransition(async () => {
      const res = await toggleExperiencePublished(exp.id, exp.published);
      if (res.success) {
        setExperiences((prev) =>
          prev.map((e) =>
            e.id === exp.id ? { ...e, published: !e.published } : e
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
            <Heading level={1} eyebrow="CMS // Work Timeline">
              Experience Management
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              {experiences.length} entr{experiences.length !== 1 ? "ies" : "y"}
              · {experiences.filter((e) => e.published).length} published
            </Text>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={startCreate}
          >
            Add Experience Entry
          </Button>
        </div>

        {/* Inline Create/Edit Form */}
        {showForm && (
          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/60 border-blue-500/30">
            <h2 className="text-sm font-bold text-neutral-100 font-mono uppercase tracking-wider">
              {editingId ? "Edit Experience Entry" : "New Experience Entry"}
            </h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-xl px-4 py-2">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Company *</label>
                  <input type="text" required placeholder="e.g. Tech Startups Inc." value={form.company} onChange={handleField("company")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Role / Title *</label>
                  <input type="text" required placeholder="e.g. Senior Full-Stack Engineer" value={form.role} onChange={handleField("role")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Location</label>
                  <input type="text" placeholder="e.g. Addis Ababa, ET" value={form.location} onChange={handleField("location")} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Start Date *</label>
                    <input type="text" required placeholder="Jan 2023" value={form.startDate} onChange={handleField("startDate")} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>End Date</label>
                    <input type="text" placeholder="Present" value={form.endDate} onChange={handleField("endDate")} className={inputCls} />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Description (one bullet per line)</label>
                <textarea
                  rows={5}
                  required
                  placeholder={"Built X feature using Y\nReduced API latency by Z%\nLed team of N engineers"}
                  value={form.description}
                  onChange={handleField("description")}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => { setShowForm(false); setEditingId(null); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isPending}>
                  {editingId ? "Update Entry" : "Create Entry"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Experience List */}
        <div className="space-y-4 max-w-4xl">
          {experiences.length === 0 && !showForm && (
            <Card hoverEffect={false} className="p-12 text-center text-neutral-500 space-y-2 bg-neutral-900/40 border-neutral-800">
              <p className="font-mono text-sm">No experience entries yet.</p>
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={startCreate}>
                Add First Entry
              </Button>
            </Card>
          )}
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              hoverEffect={false}
              className="p-6 space-y-3 bg-neutral-900/40 border-neutral-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-neutral-100">{exp.role}</h3>
                    {!exp.published && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-400 font-mono uppercase">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-blue-400">
                    {exp.company}
                    {exp.location ? ` — ${exp.location}` : ""}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500">
                    {exp.startDate} → {exp.endDate ?? "Present"}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublished(exp)}
                    disabled={isPending}
                    className={`p-1.5 rounded transition text-xs font-mono ${
                      exp.published
                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                    title={exp.published ? "Unpublish" : "Publish"}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => startEdit(exp)}
                    className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                    title="Edit"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp)}
                    disabled={isPending}
                    className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <ul className="space-y-1 text-xs text-neutral-400 font-mono">
                  {exp.description
                    .split("\n")
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((line, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-neutral-600">—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
