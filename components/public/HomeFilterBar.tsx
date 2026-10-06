'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Game } from '@/types';

export function HomeFilterBar({ games }: { games: Game[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentGame = searchParams.get('game') ?? '';

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === '') params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : '/', { scroll: false });
  }

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const trimmed = q.trim();
      const current = searchParams.get('q') ?? '';
      if (trimmed !== current) updateParams({ q: trimmed || null });
    }, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="grid grid-cols-[1fr_1.5fr] gap-2 md:gap-3 mb-4">
      <select
        value={currentGame}
        onChange={(e) => updateParams({ game: e.target.value })}
        className="brutal-input text-[11px] font-black uppercase"
      >
        <option value="">ALL GAMES</option>
        {games.map((g) => (
          <option key={g.id} value={g.slug}>
            {g.name}
          </option>
        ))}
      </select>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="> SEARCH SCRIPT..."
        className="brutal-input text-[11px] font-black uppercase"
      />
    </div>
  );
}
