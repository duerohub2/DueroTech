import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
}

export function Badge({
  children,
  color = '#FFD84D',
  textColor = '#1F1F1F',
  className = ''
}: BadgeProps) {
  return (
    <span
      style={{ backgroundColor: color, color: textColor }}
      className={`inline-flex items-center brutal-border px-2 py-1 text-[10px] font-black uppercase tracking-wide leading-none ${className}`}
    >
      {children}
    </span>
  );
}
