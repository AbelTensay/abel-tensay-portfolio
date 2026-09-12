import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "lead" | "body" | "small" | "muted" | "mono";
  as?: React.ElementType;
}

export function Text({
  variant = "body",
  as: Component = "p",
  className,
  children,
  ...props
}: TextProps) {
  const variants = {
    lead: "text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed",
    body: "text-base text-neutral-300 leading-relaxed",
    small: "text-sm text-neutral-400 leading-normal",
    muted: "text-xs sm:text-sm text-neutral-500 leading-normal",
    mono: "font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed",
  };

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
