import type { Metadata, Viewport } from 'next';
import { Inter_Tight, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { HIDE_FROM_SEARCH, LINKS, SITE_URL } from '@/lib/site';

const sans = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-serif', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const TITLE = "The Tech | Trust, it's the tech.";
const DESC = 'One mechanical NQ futures strategy (ICT, IFVG), the indicator that shows it on your chart, and mentors beside you every session. Mentorship from $200/month.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  applicationName: 'The Tech',
  alternates: { canonical: '/' },
  robots: HIDE_FROM_SEARCH
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  openGraph: { type: 'website', siteName: 'The Tech', url: '/', locale: 'en_AU', title: TITLE, description: DESC },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'The Tech', slogan: "Trust, it's the tech.",
  url: `${SITE_URL}/`, email: LINKS.email, sameAs: [LINKS.instagram],
  founder: { '@type': 'Person', name: 'Juni', jobTitle: 'NQ futures mentor' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
