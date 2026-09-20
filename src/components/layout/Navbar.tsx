"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl border transition-all duration-300 px-4 py-3 sm:px-6 flex items-center justify-between",
          isScrolled
            ? "border-emerald-900/15 bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-950/5"
            : "border-slate-200/80 bg-white/70 backdrop-blur-md"
        )}
      >
        {/* Brand Mark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-md p-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-xs font-mono font-bold text-white shadow-sm shadow-emerald-700/30 group-hover:scale-105 transition-transform">
            AT
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-800 font-bold group-hover:text-emerald-700 transition-colors">
            Abel Tensay
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600",
                  isActive ? "text-emerald-950 font-bold" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-lg bg-emerald-600/15 border border-emerald-600/30 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-2xl p-5 shadow-2xl space-y-4"
          >
            <nav className="flex flex-col space-y-1">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-slate-200">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
