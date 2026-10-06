'use client';

import { formatDate } from '@/lib/utils/format';
import { KeyBadge } from '@/components/script/KeyBadge';
import type { ScriptWithGame } from '@/types';

interface ScriptTileProps {
  script: ScriptWithGame;
  onClick: (script: ScriptWithGame) => void;
}

export function ScriptTile({ script, onClick }: ScriptTileProps) {
  const gameName = script.game?.name ?? 'Unknown Game';
  const accent = script.game?.accent_color ?? '#FFD84D';

  return (
    <button
      type="button"
      onClick={() => onClick(script)}
      className="brutal-card p-0 overflow-hidden flex flex-col text-left hover:translate-x-1 hover:-translate-y-1 transition-transform w-full"
    >
      <div className="w-full aspect-[16/10] border-b-3 border-[var(--brutal-border-color)] overflow-hidden relative">
        {script.thumbnail_url ? (
          <img
            src={script.thumbnail_url}
            alt={script.title}
            className="w-full h-full object-cover block"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-3"
            style={{ backgroundColor: accent }}
          >
            <p className="font-black uppercase text-center text-[#1F1F1F] text-sm leading-tight line-clamp-3">
              {gameName}
            </p>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 w-full">
        <div className="mb-2">
          <KeyBadge status={script.key_status} />
        </div>

        <h3 className="font-black uppercase text-sm leading-tight mb-2 line-clamp-2">
          {script.title}
        </h3>

        <p className="text-[10px] font-black uppercase opacity-70 mb-2 line-clamp-1">
          GAME : {gameName}
        </p>

        <div className="border-l-4 border-brand-lavender pl-2 mb-3">
          <p className="text-[10px] font-black uppercase opacity-70 line-clamp-1">
            {script.author_name}
          </p>
        </div>

        <p className="text-[9px] font-black uppercase opacity-60 tracking-wider mt-auto pt-2 border-t-3 border-dashed border-[var(--brutal-border-color)]">
          UPLOAD SCRIPT : {formatDate(script.created_at)}
        </p>
      </div>
    </button>
  );
}
