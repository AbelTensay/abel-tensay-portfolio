import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Layers, Layout, Terminal } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <main className="relative z-10 py-12 sm:py-20 space-y-16">
      <Container size="lg" className="space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Heading level={1} eyebrow="Biography // Background" gradient>
            About Abel Tensay
          </Heading>
          <Text variant="lead">
            Software engineer focused on full-stack web development, resilient systems, and interactive UI/UX product design.
          </Text>
        </div>

        {/* Narrative & Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8 text-neutral-300 leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-neutral-100">Engineering Philosophy</h2>
              <p>
                I believe software engineering is fundamentally about building functional, reliable products that deliver real value. Rather than treating code as abstract syntax, I focus on the end-to-end user experience—from database transaction consistency down to pixel-perfect UI micro-interactions.
              </p>
              <p>
                My background spans full-stack web architecture with Next.js, TypeScript, and PostgreSQL, as well as specialized computer vision feed processing in Python. Having worked across early-stage SaaS ideas, real-time video stream pipelines, and community FinTech platforms, I enjoy tackling complex technical problems and refining them into clean, intuitive products.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <h2 className="text-2xl font-bold text-neutral-100">Development & Design Approach</h2>
              <p>
                Great digital identity requires equal respect for backend integrity and frontend aesthetics. I don&apos;t settle for default templates or generic UI blocks.
              </p>
              <ul className="space-y-3 font-mono text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">01.</span>
                  <span><strong>Full-Stack Rigor:</strong> Clean database schemas, typed Server Actions, and strict input validation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">02.</span>
                  <span><strong>User-Centric UI/UX:</strong> Editorial typography, dark glass depth, and fluid animations using Framer Motion & Tailwind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">03.</span>
                  <span><strong>Performance & Accessibility:</strong> Optimized Core Web Vitals, zero unnecessary JS bloat, and WCAG accessibility standards.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Let&apos;s Work Together
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar Highlight Box */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-950/80 border-neutral-800">
              <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-blue-400" />
                <span>Quick Snapshot</span>
              </h3>

              <div className="space-y-4 text-xs font-mono text-neutral-300">
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Name</span>
                  <span className="text-neutral-100">Abel Tensay</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Role</span>
                  <span className="text-neutral-100">Software Engineer</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Location</span>
                  <span className="text-neutral-100">Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Core Stack</span>
                  <span className="text-blue-400">Next.js · TS · Py · Postgres</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-500">Focus</span>
                  <span className="text-emerald-400">Full-Stack & UI/UX</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[11px] uppercase text-neutral-500 block mb-2">Connect</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-blue-400 hover:underline transition"
                  >
                    Email
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
