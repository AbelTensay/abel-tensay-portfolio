"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { HeroSceneWrapper } from "@/components/3d";
import { FEATURED_PROJECTS } from "@/data/projects";
import { EXPERIENCE_ITEMS, CAPABILITIES } from "@/data/experience";

export default function HomePage() {
  return (
    <main className="relative z-10 space-y-8 sm:space-y-16 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 sm:pt-24 sm:pb-36 overflow-hidden min-h-[85vh] flex items-center">
        {/* Responsive 3D Interactive Canvas Scene Background */}
        <HeroSceneWrapper />

        <Container size="lg" className="space-y-8 relative z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-blue-300">
              Software Engineer · Full-Stack · UI/UX Designer
            </span>
          </motion.div>

          {/* Hero Typography */}
          <div className="space-y-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Heading
                level={1}
                gradient
                className="text-5xl sm:text-7xl lg:text-8xl tracking-tight drop-shadow-2xl"
              >
                ABEL TENSAY
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl drop-shadow-md"
            >
              Engineering production-grade software products with full-stack architecture, resilient backend code, and distinctive UI/UX design.
            </motion.p>
          </div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link href="/work">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Selected Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="glass" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                Let&apos;s Work Together
              </Button>
            </Link>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3"
          >
            {["Next.js", "TypeScript", "React 19", "Python", "PostgreSQL", "Tailwind CSS", "Three.js"].map(
              (tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 rounded-lg border border-neutral-800/60 bg-neutral-900/40 px-3 py-2 text-xs font-mono text-neutral-400 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
                  <span>{tech}</span>
                </div>
              )
            )}
          </motion.div>
        </Container>
      </section>

      {/* ================= FEATURED WORK SECTION ================= */}
      <Section id="work">
        <Container size="lg" className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <Heading level={2} eyebrow="Selected Work" gradient>
              Practical Products Engineered
            </Heading>
            <Link href="/work">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Projects
              </Button>
            </Link>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-blue-400" />
                    </h3>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1">
                    <Text variant="body" className="text-neutral-300">
                      {project.shortDescription}
                    </Text>

                    <div className="rounded-lg bg-neutral-950/60 p-3.5 border border-neutral-800/60 space-y-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                        Role & Impact:
                      </span>
                      <p className="text-xs text-neutral-300">{project.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="ghost" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1 font-medium"
                    >
                      <span>Read Case Study</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-neutral-400 hover:text-blue-400 flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= PRODUCT PHILOSOPHY ================= */}
      <Section id="philosophy">
        <Container size="lg" className="space-y-12">
          <Heading level={2} eyebrow="Philosophy" gradient>
            Engineering Meets UI/UX Design
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hoverEffect={false} className="space-y-4 border-neutral-800/60">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-neutral-100">Products Over Prototypes</h4>
              <Text variant="small" className="text-neutral-400">
                Software should solve tangible business problems. I focus on building complete, maintainable end-to-end systems built for production scale.
              </Text>
            </Card>

            <Card hoverEffect={false} className="space-y-4 border-neutral-800/60">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-neutral-100">Full-Stack Ownership</h4>
              <Text variant="small" className="text-neutral-400">
                From PostgreSQL schemas and Server Actions to state management and responsive styling, I bridge data architecture with client-side performance.
              </Text>
            </Card>

            <Card hoverEffect={false} className="space-y-4 border-neutral-800/60">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-neutral-100">UI/UX Polish & Motion</h4>
              <Text variant="small" className="text-neutral-400">
                A great product must feel intuitive and alive. I implement intentional micro-interactions, editorial typography, and responsive layouts.
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ================= CAPABILITIES & SKILLS MATRIX ================= */}
      <Section id="capabilities">
        <Container size="lg" className="space-y-12">
          <Heading level={2} eyebrow="Capabilities" gradient>
            Technical Stack & Core Skills
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <Card key={i} className="space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-medium">
                    {cap.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-100">{cap.title}</h3>
                  <Text variant="small" className="text-neutral-400">
                    {cap.description}
                  </Text>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-800/60">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block">
                    Key Technologies:
                  </span>
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
        </Container>
      </Section>

      {/* ================= EXPERIENCE PREVIEW ================= */}
      <Section id="experience">
        <Container size="lg" className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <Heading level={2} eyebrow="Track Record" gradient>
              Selected Experience
            </Heading>
            <Link href="/experience">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Full Timeline
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {EXPERIENCE_ITEMS.map((exp) => (
              <Card key={exp.id} className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800/60 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-100">{exp.role}</h3>
                    <p className="text-sm font-mono text-blue-400">{exp.company} — {exp.location}</p>
                  </div>
                  <Badge variant="outline" size="md">
                    {exp.startDate} - {exp.endDate}
                  </Badge>
                </div>

                <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-neutral-800/40">
                  {exp.technologies.map((t) => (
                    <Badge key={t} variant="ghost" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= CONTACT CTA BANNER ================= */}
      <Section id="contact-cta">
        <Container size="lg">
          <div className="relative rounded-3xl border border-blue-500/30 bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-8 sm:p-14 text-center overflow-hidden shadow-2xl backdrop-blur-xl space-y-8">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
                // Let&apos;s Build Together
              </span>
              <Heading level={2} gradient className="text-3xl sm:text-5xl">
                Ready to create an exceptional digital product?
              </Heading>
              <Text variant="lead">
                I am open to full-time engineering roles, high-impact contract projects, and product design collaborations.
              </Text>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start a Conversation
                </Button>
              </Link>
              <Link href="/experience">
                <Button size="lg" variant="outline">
                  Review Credentials
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
