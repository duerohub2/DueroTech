import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { ScriptGrid } from '@/components/public/ScriptGrid';
import { HomeFilterBar } from '@/components/public/HomeFilterBar';
import { Pagination } from '@/components/public/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Game, ScriptWithGame } from '@/types';

export const revalidate = 60;

const PAGE_SIZE = 12;

interface HomePageProps {
  searchParams: {
    q?: string;
    game?: string;
    page?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const supabase = createClient();
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: gamesData } = await supabase
    .from('games')
    .select('*')
    .order('name', { ascending: true });
  const games = (gamesData as Game[] | null) ?? [];
  const gameBySlug = new Map(games.map((g) => [g.slug, g]));

  let query = supabase
    .from('scripts')
    .select('*, game:games(id, name, slug, accent_color)', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  const q = (searchParams.q ?? '').trim();
  if (q) {
    const escaped = q.replace(/[%_,]/g, '');
    query = query.or(
      `title.ilike.%${escaped}%,summary.ilike.%${escaped}%,author_name.ilike.%${escaped}%`
    );
  }

  if (searchParams.game) {
    const game = gameBySlug.get(searchParams.game);
    if (game) query = query.eq('game_id', game.id);
  }

  const { data, count } = await query;
  const scripts = (data as ScriptWithGame[] | null) ?? [];
  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto w-full px-4 py-4 flex flex-col flex-1">
        <div className="brutal-card p-6 md:p-8 text-center bg-brand-ink text-brand-cream mb-4">
          <h1
            className="text-3xl md:text-5xl uppercase leading-none tracking-tight mb-3 text-brand-lime"
            style={{ fontFamily: 'var(--font-archivo-black), sans-serif' }}
          >
            List Script
          </h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-sand opacity-90">
            Script Database
          </p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <span className="brutal-border px-3 py-1 text-[10px] font-black uppercase bg-brand-lime text-brand-ink">
              {totalCount} {totalCount === 1 ? 'Script' : 'Scripts'}
            </span>
            <span className="brutal-border px-3 py-1 text-[10px] font-black uppercase bg-brand-sand text-brand-ink">
              {games.length} Games
            </span>
          </div>
        </div>

        <HomeFilterBar games={games} />

        {scripts.length === 0 ? (
          <EmptyState
            message="No scripts found."
            hint="Try changing the filter or search keyword."
          />
        ) : (
          <ScriptGrid scripts={scripts} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={{
            q: searchParams.q,
            game: searchParams.game
          }}
        />
      </main>

      <footer className="border-t-3 border-[var(--brutal-border-color)] mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-[10px] font-black uppercase opacity-60 text-center">
          DUEROHUB - Curated Roblox Scripts
        </div>
      </footer>
    </div>
  );
}
