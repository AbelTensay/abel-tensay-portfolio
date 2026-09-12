import React from "react";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Code2,
  FolderKanban,
  Mail,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Projects", value: "4", change: "100% Published", icon: FolderKanban, color: "text-blue-400" },
    { label: "Published Projects", value: "4", change: "Live on Site", icon: CheckCircle2, color: "text-emerald-400" },
    { label: "Draft Projects", value: "0", change: "Up to Date", icon: Clock, color: "text-amber-400" },
    { label: "Work History", value: "3", change: "Roles Logged", icon: Briefcase, color: "text-purple-400" },
    { label: "Unread Messages", value: "2", change: "Needs Response", icon: Mail, color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      {/* Admin Navigation Sidebar */}
      <AdminSidebar />

      {/* Main Dashboard Area */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="Dashboard // System Overview">
              Portfolio Control Console
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Manage portfolio projects, case studies, experience timeline, inbox messages, and media.
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/projects/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} hoverEffect={false} className="p-5 space-y-3 bg-neutral-900/40 border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-neutral-100">{item.value}</div>
                <span className="text-[10px] font-mono text-neutral-400">{item.change}</span>
              </Card>
            );
          })}
        </div>

        {/* Action Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Management Shortcuts */}
          <div className="lg:col-span-7 space-y-6">
            <Card hoverEffect={false} className="p-6 space-y-4 bg-neutral-900/40 border-neutral-800">
              <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Quick CMS Operations</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/admin/projects"
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition space-y-1 block"
                >
                  <span className="font-bold text-sm text-neutral-200 block">Manage Projects</span>
                  <span className="text-xs text-neutral-400">Edit, publish, feature & reorder case studies</span>
                </Link>

                <Link
                  href="/admin/experience"
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition space-y-1 block"
                >
                  <span className="font-bold text-sm text-neutral-200 block">Work Experience</span>
                  <span className="text-xs text-neutral-400">Update timeline roles, positions & achievements</span>
                </Link>

                <Link
                  href="/admin/skills"
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition space-y-1 block"
                >
                  <span className="font-bold text-sm text-neutral-200 block">Skill Categories</span>
                  <span className="text-xs text-neutral-400">Categorize tech stack items & order</span>
                </Link>

                <Link
                  href="/admin/messages"
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition space-y-1 block"
                >
                  <span className="font-bold text-sm text-neutral-200 block">Inbox & Messages</span>
                  <span className="text-xs text-neutral-400">Review contact submissions & respond</span>
                </Link>
              </div>
            </Card>
          </div>

          {/* Recent Activity Stream */}
          <div className="lg:col-span-5 space-y-6">
            <Card hoverEffect={false} className="p-6 space-y-4 bg-neutral-950/80 border-neutral-800">
              <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Recent System Activity</span>
              </h2>

              <div className="space-y-3 font-mono text-xs text-neutral-400">
                <div className="flex items-start gap-2.5 pb-2.5 border-b border-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1" />
                  <div>
                    <p className="text-neutral-200">Digital Ekub project case study updated</p>
                    <span className="text-[10px] text-neutral-500">Today at 02:45 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2.5 border-b border-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
                  <div>
                    <p className="text-neutral-200">New message received from visitor</p>
                    <span className="text-[10px] text-neutral-500">Yesterday at 04:12 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500 mt-1" />
                  <div>
                    <p className="text-neutral-200">System database schema synchronized</p>
                    <span className="text-[10px] text-neutral-500">2 days ago</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
