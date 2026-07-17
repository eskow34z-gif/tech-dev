import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-[var(--radius-full)] tracking-wide uppercase",
        variant === "default" &&
          "bg-[var(--bg-surface)] text-foreground-muted border border-border",
        variant === "accent" &&
          "bg-[var(--accent-glow)] text-accent border border-accent/20",
        variant === "outline" &&
          "border border-border text-foreground-muted",
        className
      )}
      {...props}
    />
  );
}
