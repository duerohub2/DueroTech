import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Archivo_Black } from 'next/font/google';
import './globals.css';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo-black',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Curated Roblox Scripts`,
    template: `%s - ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD84D'
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${archivoBlack.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-body antialiased min-h-screen">{children}</body>
    </html>
  );
}
