"use client";

import React, { useState } from "react";
import { Save, User, Globe, Mail, CheckCircle2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Abel Tensay");
  const [headline, setHeadline] = useState("Software Engineer · Full-Stack Developer · UI/UX Designer");
  const [email, setEmail] = useState("abeltensay2@gmail.com");
  const [github, setGithub] = useState("https://github.com/AbelTensay");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/abel-tensay");
  const [bio, setBio] = useState("Engineering production-grade software products with full-stack architecture, resilient backend code, and distinctive UI/UX design.");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="System // Configuration">
              Site Settings & Profile
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Update Abel Tensay&apos;s personal bio, headline, primary contact email, and social handles.
            </Text>
          </div>

          <Button
            onClick={handleSave}
            variant="primary"
            size="sm"
            isLoading={isLoading}
            leftIcon={isSaved ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
          >
            {isSaved ? "Saved!" : "Save Changes"}
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3">
              Profile & Headline
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">Primary Contact Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-300">Short Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </Card>

          <Card hoverEffect={false} className="p-6 space-y-6 bg-neutral-900/40 border-neutral-800">
            <h2 className="text-lg font-bold text-neutral-100 border-b border-neutral-800 pb-3">
              Social Handles & Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">GitHub Profile URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-neutral-300">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
}
