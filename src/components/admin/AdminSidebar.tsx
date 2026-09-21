"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code2,
  FolderKanban,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* ================= MOBILE TOP HEADER BAR (Mobile Only) ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-slate-950 text-white px-4 py-3 border-b border-slate-800 shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 font-mono text-xs font-bold text-white shadow-sm">
            AT
          </span>
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Admin Console
            </h2>
            <p className="text-[10px] font-mono text-emerald-400">Abel Tensay Portfolio</p>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition focus:outline-none"
          aria-label="Toggle navigation sidebar"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ================= MOBILE DRAWER OVERLAY ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between overflow-y-auto shadow-2xl text-white"
            >
              <div className="space-y-6">
                <nav className="space-y-1">
                  {ADMIN_NAV.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-mono transition-colors",
                          isActive
                            ? "bg-emerald-700 text-white font-bold shadow-md shadow-emerald-700/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-900"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-900 transition"
                >
                  <span>View Public Website</span>
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR (Desktop Only) ================= */}
      <aside
        className={cn(
          "hidden lg:flex flex-col justify-between shrink-0 min-h-screen bg-slate-950 border-r border-slate-800 text-white p-4 transition-all duration-300 relative z-20",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="space-y-6">
          {/* Header & Toggle Button */}
          <div className="flex items-center justify-between px-2 py-2 border-b border-slate-800 pb-4">
            <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-700 font-mono text-xs font-bold text-white shadow-sm">
                AT
              </span>
              {!collapsed && (
                <div className="truncate">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white truncate">
                    Admin Console
                  </h2>
                  <p className="text-[10px] font-mono text-emerald-400 truncate">Portfolio CMS</p>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition focus:outline-none"
              title={collapsed ? "Expand sidebar" : "Minimize sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  title={collapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-colors",
                    isActive
                      ? "bg-emerald-700 text-white font-bold shadow-md shadow-emerald-700/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            title={collapsed ? "View Public Website" : undefined}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {!collapsed && <span className="truncate">Public Website</span>}
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title={collapsed ? "Sign Out" : undefined}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Spacer div for mobile layout padding */}
      <div className="lg:hidden h-14 w-full" />
    </>
  );
}
