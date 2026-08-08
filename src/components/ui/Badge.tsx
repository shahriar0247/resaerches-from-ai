import { HTMLAttributes } from "react";

type BadgeVariant = "accent" | "cyan" | "ink" | "success" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  accent: "bg-accent/10 text-accent border-accent/20",
  cyan: "bg-cyan/10 text-cyan border-cyan/20",
  ink: "bg-ink/10 text-ink border-ink/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-error/10 text-error border-error/20",
};

export function Badge({
  className = "",
  variant = "accent",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
