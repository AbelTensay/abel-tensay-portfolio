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
        "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20 border border-blue-500/50",
      secondary:
        "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-neutral-700/60",
      outline:
        "border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800/40",
      ghost: "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/40",
      glass:
        "bg-neutral-900/60 backdrop-blur-md text-neutral-100 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80 shadow-md",
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
          "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
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
