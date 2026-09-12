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
            ? "border-neutral-800/90 bg-neutral-950/80 backdrop-blur-xl shadow-xl shadow-black/50"
            : "border-neutral-800/40 bg-neutral-950/40 backdrop-blur-md"
        )}
      >
        {/* Brand Mark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-mono font-bold text-white shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
            AT
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
            Abel Tensay
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800/80">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-neutral-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-lg bg-neutral-800/90 border border-neutral-700/60 -z-10"
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-2xl p-5 shadow-2xl space-y-4"
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
                        ? "bg-neutral-800/80 text-white font-semibold border border-neutral-700/60"
                        : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60"
                    )}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-neutral-800">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
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
