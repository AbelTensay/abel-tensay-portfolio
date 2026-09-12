import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  eyebrow?: string;
  gradient?: boolean;
}

export function Heading({
  level = 2,
  eyebrow,
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const sizes = {
    1: "text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]",
    2: "text-2xl sm:text-4xl font-bold tracking-tight leading-snug",
    3: "text-xl sm:text-2xl font-semibold tracking-normal leading-tight",
    4: "text-lg font-semibold tracking-normal leading-tight",
  };

  const combinedClassName = cn(
    sizes[level],
    gradient
      ? "bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent"
      : "text-neutral-100",
    className
  );

  return (
    <div className="space-y-2">
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-widest text-blue-400/90 font-medium block">
          // {eyebrow}
        </span>
      )}
      {level === 1 && <h1 className={combinedClassName} {...props}>{children}</h1>}
      {level === 2 && <h2 className={combinedClassName} {...props}>{children}</h2>}
      {level === 3 && <h3 className={combinedClassName} {...props}>{children}</h3>}
      {level === 4 && <h4 className={combinedClassName} {...props}>{children}</h4>}
    </div>
  );
}
