import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, ExternalLink, Layers, Terminal } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getProjects, getProjectBySlug } from "@/lib/data-access";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length] || project;

  return (
    <main className="relative z-10 py-12 sm:py-20 space-y-16">
      <Container size="lg" className="space-y-12">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-emerald-700 transition-colors font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Case Study Header */}
        <div className="space-y-6 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3">
            <Badge variant="accent" size="md">
              {project.category}
            </Badge>
            <span className="font-mono text-xs text-slate-500 font-semibold">Case Study</span>
          </div>

          <Heading level={1} gradient className="text-4xl sm:text-6xl max-w-4xl">
            {project.title}
          </Heading>

          <Text variant="lead" className="max-w-3xl text-slate-700">
            {project.fullDescription}
          </Text>

          {/* Project Quick Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
                My Role
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-1">{project.role}</p>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technologies.map((t) => (
                  <span key={t} className="text-xs font-mono text-emerald-700 font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
                Architecture
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-1">Full-Stack / Server Actions</p>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
                Links & Repository
              </span>
              <div className="flex items-center gap-3 mt-1">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Problem */}
            <section className="space-y-4">
              <Heading level={2} eyebrow="01 // The Problem & Challenge">
                Problem Statement
              </Heading>
              <Text variant="body" className="text-slate-700 leading-relaxed text-lg">
                {project.problem}
              </Text>
            </section>

            {/* Technical Approach & Constraints */}
            <section className="space-y-4">
              <Heading level={2} eyebrow="02 // Technical Approach">
                Engineering Approach & Strategy
              </Heading>
              <Text variant="body" className="text-slate-700 leading-relaxed">
                {project.technicalApproach}
              </Text>
              <Card hoverEffect={false} className="p-6 bg-slate-50 border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase font-bold">
                  <Terminal className="h-4 w-4 text-emerald-700" />
                  <span>Key Engineering Principles Applied</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-mono list-disc list-inside">
                  <li>ACID transactional consistency for balance & payout execution</li>
                  <li>Strict Zod schema runtime validation on all client payload inputs</li>
                  <li>Modular component architecture with server-side data fetching</li>
                  <li>Minimal client bundle footprint and responsive light mode UI primitives</li>
                </ul>
              </Card>
            </section>

            {/* Solution & Key Features */}
            <section className="space-y-4">
              <Heading level={2} eyebrow="03 // The Solution">
                Architectural Solution
              </Heading>
              <Text variant="body" className="text-slate-700 leading-relaxed">
                {project.solution}
              </Text>
            </section>

            {/* Result & Impact */}
            <section className="space-y-4">
              <Heading level={2} eyebrow="04 // Outcome & Impact">
                Results & Impact
              </Heading>
              <div className="p-6 rounded-2xl border border-emerald-300 bg-emerald-50/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  <span>Project Outcome</span>
                </div>
                <Text variant="body" className="text-slate-800 font-medium">
                  {project.result}
                </Text>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <Card hoverEffect={false} className="space-y-6 p-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-700" />
                <span>Tech Stack Breakdown</span>
              </h3>

              <div className="space-y-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200">
                    <span className="font-mono text-slate-800 font-semibold">{tech}</span>
                    <span className="font-mono text-slate-500">Core</span>
                  </div>
                ))}
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                    Launch Live Demo
                  </Button>
                </a>
              )}
            </Card>

            <Card hoverEffect={false} className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase font-bold">
                <Layers className="h-4 w-4 text-emerald-700" />
                <span>Interested in this stack?</span>
              </div>
              <p className="text-xs text-slate-600">
                I can help architect similar software systems or bring custom digital products to production.
              </p>
              <Link href="/contact" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Contact Abel
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Bottom Navigator to Next Project */}
        <div className="pt-12 border-t border-slate-200 flex items-center justify-between">
          <Link href="/work" className="text-xs font-mono text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-bold">
            <ArrowLeft className="h-4 w-4" />
            <span>All Projects</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group text-right space-y-1"
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block font-bold">
              Next Case Study →
            </span>
            <span className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
