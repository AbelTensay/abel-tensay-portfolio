import React from "react";
import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "lead" | "body" | "small" | "muted" | "mono";
  asSpan?: boolean;
}

export function Text({
  variant = "body",
  asSpan = false,
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

  const combinedClassName = cn(variants[variant], className);

  if (asSpan) {
    return (
      <span className={combinedClassName} {...props}>
        {children}
      </span>
    );
  }

  return (
    <p className={combinedClassName} {...props}>
      {children}
    </p>
  );
}
