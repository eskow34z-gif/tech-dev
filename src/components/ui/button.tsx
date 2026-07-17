"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-[0_0_20px_var(--accent-glow)]",
  secondary:
    "bg-[var(--bg-surface)] text-foreground hover:bg-[var(--bg-surface-hover)] border border-border",
  ghost:
    "text-foreground-muted hover:text-foreground hover:bg-[var(--bg-surface)]",
  outline:
    "border border-border text-foreground hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-3",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] cursor-pointer",
          "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:opacity-40 disabled:pointer-events-none",
          "active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
