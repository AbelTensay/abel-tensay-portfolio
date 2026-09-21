import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getExperiences } from "@/lib/data-access";

export const dynamic = "force-dynamic";

export default async function ExperienceTimelinePage() {
  const experiences = await getExperiences();

  return (
    <main className="relative z-10 py-12 sm:py-20 space-y-12">
      <Container size="lg" className="space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <Heading level={1} eyebrow="Career // History" gradient>
            Professional Experience & Track Record
          </Heading>
          <Text variant="lead">
            A chronological timeline of software engineering roles, full-stack application development, and technological projects.
          </Text>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
          {experiences.map((item, index) => (
            <div key={item.id} className="relative flex flex-col md:flex-row items-start group">
              {/* Timeline Node Icon */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 h-8 w-8 rounded-full border border-emerald-500/40 bg-white flex items-center justify-center text-emerald-700 z-10 shadow-md">
                <Briefcase className="h-4 w-4" />
              </div>

              {/* Card Placement */}
              <div className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:ml-auto md:pl-8"}`}>
                <Card className="p-6 md:p-8 space-y-4 hover:border-emerald-600/30 transition-all">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-wider block">
                      {item.startDate} — {item.endDate}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                    <p className="text-sm font-mono text-slate-600 flex items-center gap-1.5 justify-start md:justify-end font-semibold">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.company} ({item.location})</span>
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside text-left">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 justify-start md:justify-end">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="ghost" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="pt-8 text-center space-y-4 border-t border-slate-200">
          <Heading level={3}>Interested in collaborating?</Heading>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
