"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, ChevronRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { FEATURED_PROJECTS } from "@/data/projects";

const CATEGORIES = [
  "All",
  "FinTech / Full-Stack",
  "Computer Vision / Systems",
  "SaaS / Business Automation",
  "Web Application / Dashboard",
];

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function WorkListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative z-10 py-12 sm:py-20 space-y-12">
      <Container size="lg" className="space-y-8">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <Heading level={1} eyebrow="Portfolio // Case Studies" gradient>
            Selected Engineering Work
          </Heading>
          <Text variant="lead">
            Detailed case studies of production-grade software applications, full-stack systems, computer vision pipelines, and digital products.
          </Text>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-b border-neutral-800/80 py-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-neutral-900/60 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-1.5 pl-9 pr-3 text-xs text-neutral-100 placeholder-neutral-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-3 rounded-2xl border border-neutral-800/60 bg-neutral-900/20"
            >
              <p className="text-lg font-semibold text-neutral-300">No projects found</p>
              <p className="text-sm text-neutral-500">
                Try adjusting your search query or selected filter category.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-neutral-100 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-blue-400" />
                      </h2>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1">
                      <Text variant="body" className="text-neutral-300">
                        {project.shortDescription}
                      </Text>

                      <div className="rounded-lg bg-neutral-950/60 p-3.5 border border-neutral-800/60 space-y-1.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-medium block">
                          Role:
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
                        <span>Read Full Case Study</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                            <span>Code</span>
                          </a>
                        )}
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
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
