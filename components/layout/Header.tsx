import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-3 border-[var(--brutal-border-color)] bg-[var(--page-bg)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="brutal-border bg-brand-yellow text-brand-ink font-black uppercase px-3 py-2 text-sm"
          style={{ fontFamily: 'var(--font-archivo-black), sans-serif' }}
        >
          DUEROHUB
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
