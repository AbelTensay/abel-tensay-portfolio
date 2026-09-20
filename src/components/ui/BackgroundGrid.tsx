"use client";

import React from "react";

interface BackgroundGridProps {
  className?: string;
  pattern?: "grid" | "dots";
}

export function BackgroundGrid({ className = "", pattern = "grid" }: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Pattern Overlay */}
      <div
        className={`absolute inset-0 ${
          pattern === "grid" ? "bg-grid-pattern" : "bg-dot-pattern"
        } opacity-70`}
      />

      {/* Forest Green & Emerald Radial Glow Highlights */}
      <div className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 -z-10 h-[400px] w-[400px] rounded-full bg-teal-600/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-green-600/10 blur-[110px] pointer-events-none" />
    </div>
  );
}
