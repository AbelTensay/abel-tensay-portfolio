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
    lead: "text-lg sm:text-xl text-slate-700 font-normal leading-relaxed",
    body: "text-base text-slate-700 leading-relaxed",
    small: "text-sm text-slate-600 leading-normal",
    muted: "text-xs sm:text-sm text-slate-500 leading-normal",
    mono: "font-mono text-xs sm:text-sm text-slate-600 leading-relaxed",
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
