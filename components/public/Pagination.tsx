import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export function Pagination({
  currentPage,
  totalPages,
  searchParams
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v && k !== 'page') params.set(k, v);
    }
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

  const start = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
  const end = Math.min(totalPages, start + 2);
  const visible: number[] = [];
  for (let i = start; i <= end; i++) visible.push(i);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="brutal-border brutal-shadow-sm px-3 py-2 font-black text-sm bg-[var(--card-bg)]"
        >
          Prev
        </Link>
      ) : (
        <span className="brutal-border px-3 py-2 font-black text-sm opacity-40 bg-[var(--card-bg)]">
          Prev
        </span>
      )}

      {visible.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`brutal-border px-3 py-2 font-black text-sm ${
            p === currentPage
              ? 'bg-brand-yellow text-brand-ink brutal-shadow-sm'
              : 'bg-[var(--card-bg)]'
          }`}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="brutal-border brutal-shadow-sm px-3 py-2 font-black text-sm bg-[var(--card-bg)]"
        >
          Next
        </Link>
      ) : (
        <span className="brutal-border px-3 py-2 font-black text-sm opacity-40 bg-[var(--card-bg)]">
          Next
        </span>
      )}
    </nav>
  );
}
