'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="brutal-border brutal-shadow-sm h-10 px-3 font-black text-[10px] uppercase bg-brand-sand dark:bg-[#262626] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
    >
      {mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Dark'}
    </button>
  );
}
