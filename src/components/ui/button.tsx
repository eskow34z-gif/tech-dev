import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "type"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

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

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] cursor-pointer",
      "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      "disabled:opacity-40 disabled:pointer-events-none",
      "active:scale-[0.97]",
      variants[variant],
      sizes[size],
      className
    );

    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
