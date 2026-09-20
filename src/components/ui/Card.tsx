"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export function Card({
  hoverEffect = true,
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative rounded-xl border border-slate-200/90 bg-white/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-white shadow-sm shadow-emerald-950/5 hover:shadow-md hover:shadow-emerald-900/10 overflow-hidden",
        glow && "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-emerald-500/10 before:to-teal-500/10 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-4 border-t border-slate-200/80 mt-4", className)} {...props}>
      {children}
    </div>
  );
}
