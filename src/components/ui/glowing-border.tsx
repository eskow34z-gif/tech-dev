'use client';

import { cn } from '@/lib/utils';

type GlowingBorderProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

export function GlowingBorder({
  children,
  className,
  glowColor,
}: GlowingBorderProps) {
  const color = glowColor || 'var(--accent)';

  return (
    <div className={cn('relative group rounded-[var(--radius-lg)]', className)}>
      <div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] animate-[glow-border-spin_3s_linear_infinite]"
        style={{
          background: `conic-gradient(from var(--glow-angle, 0deg), transparent 0%, ${color} 10%, transparent 20%, transparent 40%, ${color} 50%, transparent 60%, transparent 80%, ${color} 90%, transparent 100%)`,
        }}
      />
      <div className="relative rounded-[inherit] overflow-hidden bg-[var(--bg-surface)]">
        {children}
      </div>
    </div>
  );
}
