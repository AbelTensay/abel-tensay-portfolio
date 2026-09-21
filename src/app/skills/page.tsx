import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Database, Globe, Layout } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getSkillCategories } from "@/lib/data-access";

export const dynamic = "force-dynamic";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; level: string; core?: boolean }[];
}

const DEFAULT_SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Full-Stack & Web Architecture",
    icon: <Globe className="h-5 w-5 text-emerald-700" />,
    description: "Server-side rendering, API integration, routing, and modern web application framework architecture.",
    skills: [
      { name: "Next.js (App Router)", level: "Advanced", core: true },
      { name: "TypeScript", level: "Advanced", core: true },
      { name: "React 19", level: "Advanced", core: true },
      { name: "Node.js", level: "Intermediate", core: true },
      { name: "Python", level: "Intermediate", core: true },
      { name: "REST API & Server Actions", level: "Advanced", core: true },
    ],
  },
  {
    title: "Database & Backend Infrastructure",
    icon: <Database className="h-5 w-5 text-emerald-700" />,
    description: "Relational database schema modeling, transaction safety, and ORM abstractions.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", core: true },
      { name: "Prisma ORM", level: "Advanced", core: true },
      { name: "Supabase PostgreSQL", level: "Intermediate", core: true },
      { name: "FastAPI / Express", level: "Intermediate" },
      { name: "Auth.js / NextAuth", level: "Intermediate", core: true },
      { name: "Vercel Blob Storage", level: "Intermediate" },
    ],
  },
  {
    title: "UI/UX Design & Frontend Engineering",
    icon: <Layout className="h-5 w-5 text-emerald-700" />,
    description: "Responsive layouts, micro-animations, component design primitives, and accessibility standards.",
    skills: [
      { name: "Tailwind CSS", level: "Advanced", core: true },
      { name: "Framer Motion", level: "Advanced", core: true },
      { name: "Three.js / R3F", level: "Intermediate", core: true },
      { name: "Figma UI/UX Prototyping", level: "Intermediate", core: true },
      { name: "HTML5 / Semantic Web", level: "Advanced" },
      { name: "WCAG Accessibility", level: "Intermediate" },
    ],
  },
  {
    title: "Computer Vision & Systems",
    icon: <Cpu className="h-5 w-5 text-emerald-700" />,
    description: "Video stream processing queues, real-time object inference, and image processing pipeline engineering.",
    skills: [
      { name: "OpenCV", level: "Intermediate", core: true },
      { name: "Multiprocessing & Queues", level: "Intermediate" },
      { name: "WebSockets Stream Ingestion", level: "Intermediate" },
      { name: "Docker Containerization", level: "Basic" },
      { name: "NumPy / PyTorch", level: "Basic" },
    ],
  },
];

export default async function SkillsMatrixPage() {
  const dbCategories = await getSkillCategories();

  const displayCategories: SkillCategory[] =
    dbCategories.length > 0
      ? dbCategories.map((cat, idx) => ({
          title: cat.name,
          icon: DEFAULT_SKILL_CATEGORIES[idx % DEFAULT_SKILL_CATEGORIES.length]?.icon || <Globe className="h-5 w-5 text-emerald-700" />,
          description: DEFAULT_SKILL_CATEGORIES[idx % DEFAULT_SKILL_CATEGORIES.length]?.description || "Core technical proficiency and toolset.",
          skills: cat.skills.map((s) => ({
            name: s.name,
            level: "Proficient",
            core: true,
          })),
        }))
      : DEFAULT_SKILL_CATEGORIES;

  return (
    <main className="relative z-10 py-12 sm:py-20 space-y-12">
      <Container size="lg" className="space-y-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <Heading level={1} eyebrow="Capabilities // Technical Matrix" gradient>
            Technical Skills & Technologies
          </Heading>
          <Text variant="lead">
            A comprehensive breakdown of frameworks, languages, databases, and UI/UX design tools I utilize to engineer software products.
          </Text>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayCategories.map((cat, i) => (
            <Card key={i} className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    {cat.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{cat.title}</h2>
                </div>

                <Text variant="small" className="text-slate-600">
                  {cat.description}
                </Text>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block font-bold">
                  Proficiencies:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className={`font-mono ${skill.core ? "text-slate-900 font-bold" : "text-slate-600"}`}>
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="pt-8 text-center space-y-4 border-t border-slate-200">
          <Heading level={3}>Looking for a developer with this tech stack?</Heading>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Discuss Your Project
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
