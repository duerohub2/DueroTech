import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  hint?: string;
  action?: ReactNode;
}

export function EmptyState({ message, hint, action }: EmptyStateProps) {
  return (
    <div className="brutal-border border-dashed p-10 flex flex-col items-center justify-center text-center gap-3">
      <div className="w-14 h-14 brutal-border flex items-center justify-center bg-brand-sand dark:bg-[#262626]">
        <span className="font-black text-[10px] uppercase">Empty</span>
      </div>
      <p className="font-black uppercase text-sm">{message}</p>
      {hint ? (
        <p className="text-xs font-bold opacity-60 max-w-sm">{hint}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
