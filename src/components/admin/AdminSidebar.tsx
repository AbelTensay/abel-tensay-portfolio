"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  FolderKanban,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { name: "Overview", path: "/admin", icon: LayoutDashboard },
  { name: "Projects", path: "/admin/projects", icon: FolderKanban },
  { name: "Experience", path: "/admin/experience", icon: Briefcase },
  { name: "Skills", path: "/admin/skills", icon: Code2 },
  { name: "Messages", path: "/admin/messages", icon: Mail },
  { name: "Media Assets", path: "/admin/media", icon: Image },
  { name: "Site Settings", path: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Perform admin sign out redirect
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 border-r border-neutral-800/80 bg-neutral-950 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="px-3 py-2 border-b border-neutral-800/80 pb-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-mono text-xs font-bold text-white">
              AT
            </span>
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-100">
                Admin Console
              </h2>
              <p className="text-[10px] font-mono text-neutral-500">Abel Tensay Portfolio</p>
            </div>
          </Link>
        </div>

        {/* Admin Nav Items */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-colors",
                  isActive
                    ? "bg-blue-600/10 text-blue-400 font-semibold border border-blue-500/20"
                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout & View Live Site */}
      <div className="space-y-2 pt-4 border-t border-neutral-800/80">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-neutral-900/60 transition"
        >
          <span>View Public Website</span>
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
