import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "ghost" | "success";
  size?: "sm" | "md";
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-800 border border-slate-200",
    accent: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    outline: "border border-slate-300 text-slate-700 bg-transparent",
    ghost: "bg-slate-100 text-slate-600 hover:text-emerald-900",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs font-mono rounded",
    md: "px-2.5 py-1 text-xs font-mono rounded-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
