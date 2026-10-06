'use client';

import { useState } from 'react';
import { ScriptTile } from './ScriptTile';
import { ScriptModal } from './ScriptModal';
import type { ScriptWithGame } from '@/types';

interface ScriptGridProps {
  scripts: ScriptWithGame[];
}

export function ScriptGrid({ scripts }: ScriptGridProps) {
  const [selected, setSelected] = useState<ScriptWithGame | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {scripts.map((script) => (
          <ScriptTile
            key={script.id}
            script={script}
            onClick={(s) => setSelected(s)}
          />
        ))}
      </div>

      {selected ? (
        <ScriptModal script={selected} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
