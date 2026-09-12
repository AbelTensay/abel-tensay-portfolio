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
    default: "bg-neutral-900 text-neutral-300 border border-neutral-800",
    accent: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    outline: "border border-neutral-700/80 text-neutral-300 bg-transparent",
    ghost: "bg-neutral-800/40 text-neutral-400 hover:text-neutral-200",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs font-mono rounded",
    md: "px-2.5 py-1 text-xs font-mono rounded-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
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
