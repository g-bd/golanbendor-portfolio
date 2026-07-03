import type { Metadata } from 'next';
import Link from 'next/link';

// The root URL (drbendor.com/) is what people actually type and share, so it
// MUST carry OpenGraph/Twitter tags — otherwise link-preview crawlers (WhatsApp,
// Facebook, LinkedIn) that don't run JS see nothing and show an empty preview.
// We therefore emit full metadata here and redirect with <meta refresh> (which
// browsers honor but crawlers ignore) instead of next/navigation's JS redirect,
// which produced a tagless error shell. Defaults to Hebrew (primary audience).
export const metadata: Metadata = {
  title: 'ד״ר גולן בן-דור | מדען ניידות עירונית ומומחה סימולציית תחבורה',
  description:
    'ד״ר גולן בן-דור - מדען ניידות עירונית המתמחה ב-MATSim, מודלים מבוססי סוכנים ומדיניות תחבורה. דוקטורט מאוניברסיטת תל אביב. משרד התחבורה, נתיבי ישראל, נתיבי איילון.',
  alternates: {
    canonical: 'https://drbendor.com/he/',
    languages: {
      en: 'https://drbendor.com/en/',
      he: 'https://drbendor.com/he/',
      'x-default': 'https://drbendor.com/he/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    url: 'https://drbendor.com/',
    siteName: 'ד״ר גולן בן-דור',
    title: 'ד״ר גולן בן-דור | מדען ניידות עירונית',
    description:
      'מדען ניידות עירונית | Urban mobility simulation scientist - MATSim, מודלים מבוססי סוכנים, מדיניות תחבורה. דוקטורט מאוניברסיטת תל אביב.',
    images: [
      {
        url: 'https://drbendor.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ד״ר גולן בן-דור - מדען ניידות עירונית',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ד״ר גולן בן-דור',
    description: 'מדען ניידות עירונית - MATSim, סימולציה תחבורתית, מדיניות תחבורה',
    images: ['https://drbendor.com/og-image.jpg'],
  },
};

// Root page redirects to Hebrew by default (primary audience is Israeli).
// The meta-refresh + script handle real browsers; crawlers read the tags above.
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/he/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/he/');",
        }}
      />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a12',
          color: '#b0b0c0',
          fontFamily: 'sans-serif',
        }}
      >
        <p>
          {'מעביר אותך לאתר… '}
          <Link href="/he/" style={{ color: '#00e5ff' }}>
            drbendor.com
          </Link>
        </p>
      </div>
    </>
  );
}
