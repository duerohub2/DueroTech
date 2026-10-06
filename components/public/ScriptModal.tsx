'use client';

import { useEffect } from 'react';
import { CopyButton } from './CopyButton';
import { KeyBadge } from '@/components/script/KeyBadge';
import { formatDate } from '@/lib/utils/format';
import type { ScriptWithGame } from '@/types';

interface ScriptModalProps {
  script: ScriptWithGame;
  onClose: () => void;
}

export function ScriptModal({ script, onClose }: ScriptModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center modal-fade-in"
      style={{ backgroundColor: 'rgba(253, 248, 232, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="brutal-card w-full md:max-w-2xl max-h-[92vh] overflow-y-auto m-2 md:m-4 modal-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b-3 border-[var(--brutal-border-color)] sticky top-0 bg-[var(--card-bg)] z-10">
          <div className="min-w-0 flex-1">
            <h2 className="font-black uppercase text-sm leading-tight truncate">
              {script.title}
            </h2>
            <div className="mt-1">
              <KeyBadge status={script.key_status} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="brutal-border brutal-shadow-sm w-10 h-10 font-black text-sm shrink-0 bg-brand-salmon text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            X
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase opacity-60">
                AUTHOR
              </p>
              <p className="font-black uppercase text-sm truncate">
                {script.author_name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase opacity-60">
                UPLOAD SCRIPT
              </p>
              <p className="font-black uppercase text-sm">
                {formatDate(script.created_at)}
              </p>
            </div>
          </div>

          {script.game ? (
            <div className="brutal-border px-3 py-2 bg-brand-sand dark:bg-[#262626]">
              <p className="text-[10px] font-black uppercase opacity-60">
                GAME
              </p>
              <p className="font-black uppercase text-sm">
                {script.game.name}
              </p>
            </div>
          ) : null}

          <div>
            <p className="text-[10px] font-black uppercase opacity-60 mb-2">
              SCRIPT CODE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
              <pre className="brutal-border bg-brand-ink text-brand-lime p-3 text-[11px] font-mono whitespace-pre-wrap break-all max-h-72 overflow-y-auto code-scroll">
                {script.code}
              </pre>
              <div className="md:w-32 md:h-auto">
                <CopyButton code={script.code} scriptId={script.id} />
              </div>
            </div>
          </div>

          {script.summary ? (
            <div>
              <p className="text-[10px] font-black uppercase opacity-60 mb-2">
                SUMMARY
              </p>
              <p className="text-xs font-bold">{script.summary}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
