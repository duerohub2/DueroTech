import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="brutal-card p-8 max-w-md w-full text-center">
        <div
          className="inline-block bg-brand-salmon text-white px-4 py-2 brutal-border font-black text-4xl mb-6"
          style={{ fontFamily: 'var(--font-archivo-black), sans-serif' }}
        >
          404
        </div>
        <h1 className="text-2xl uppercase mb-3">Page not found</h1>
        <p className="font-bold opacity-70 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="brutal-btn bg-brand-yellow px-6 py-3 inline-flex"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
