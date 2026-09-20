"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg shadow-emerald-700/20 border border-emerald-600/50",
      secondary:
        "bg-slate-900 text-white hover:bg-slate-800 border border-slate-800",
      outline:
        "border border-slate-300 text-slate-800 hover:border-emerald-600 hover:bg-emerald-50/60",
      ghost: "text-slate-600 hover:text-emerald-950 hover:bg-slate-100",
      glass:
        "bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 hover:border-emerald-500/40 hover:bg-white shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs rounded-md gap-1.5 font-medium",
      md: "h-11 px-5 text-sm rounded-lg gap-2 font-medium",
      lg: "h-13 px-7 text-base rounded-xl gap-2.5 font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.985 }}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
