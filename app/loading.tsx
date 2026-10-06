export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b-3 border-[var(--brutal-border-color)] bg-[var(--page-bg)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="brutal-border bg-brand-yellow text-brand-ink font-black uppercase px-3 py-2 text-sm">
            DUEROHUB
          </div>
          <div className="brutal-skeleton w-16 h-10" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 py-4 flex flex-col gap-4">
        <div className="brutal-skeleton h-32" />
        <div className="grid grid-cols-[1fr_1.5fr] gap-2 md:gap-3">
          <div className="brutal-skeleton h-12" />
          <div className="brutal-skeleton h-12" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="brutal-skeleton aspect-[3/4]" />
          ))}
        </div>
      </main>
    </div>
  );
}
