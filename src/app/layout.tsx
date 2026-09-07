import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Fira_Code, Rubik } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Base metadata - language-specific metadata is in [lang]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://drbendor.com'),
  applicationName: "Dr. Golan Ben-Dor Portfolio",
  keywords: [
    // Name variations - English
    "Golan Ben-Dor", "Dr. Golan Ben-Dor", "Golan Ben Dor", "Dr. Golan Ben Dor",
    "Dr. Ben-Dor", "Dr Ben-Dor", "Doctor Ben-Dor", "Doctor Golan Ben-Dor",
    "Ben-Dor", "Golan Ben-Dor PhD", "Dr. Golan Ben-Dor PhD", "Golan Bendor",
    // Name variations - Hebrew (both quote styles)
    "גולן בן דור", "גולן בן-דור", "בן דור גולן", "בן-דור",
    "ד\"ר גולן בן דור", "ד\"ר גולן בן-דור", "ד״ר גולן בן דור", "ד״ר גולן בן-דור",
    "ד\"ר בן-דור", "ד\"ר בן דור", "ד״ר בן-דור", "ד״ר בן דור",
    "דוקטור גולן בן דור", "דוקטור גולן בן-דור", "דוקטור בן-דור", "דר' גולן בן דור",
    // Core expertise (both languages)
    "urban mobility", "transport simulation", "MATSim", "agent-based modeling",
    "traffic simulation", "congestion pricing", "transport policy",
    "סימולציה תחבורתית", "ניידות עירונית", "מדען ניידות עירונית",
    "מודלים מבוססי סוכנים", "אגרת גודש", "תכנון תחבורה", "סימולציית תנועה",
    // AI consulting & lecturing (both languages)
    "AI workflow consultant", "AI lecturer Israel", "AI corporate training",
    "AI-native development", "prompt engineering training",
    "יועץ בינה מלאכותית", "מרצה בינה מלאכותית", "הרצאות AI",
    "סדנאות בינה מלאכותית", "הדרכת AI לארגונים",
    // Organizations
    "Ministry of Transport Israel", "משרד התחבורה", "Netivei Israel", "נתיבי ישראל",
    "Netivei Ayalon", "נתיבי איילון", "Tel Aviv University", "אוניברסיטת תל אביב",
  ],
  authors: [{ name: "Dr. Golan Ben-Dor" }],
  creator: "Dr. Golan Ben-Dor",
  publisher: "Dr. Golan Ben-Dor",
  category: 'Technology',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'IL',
    'geo.placename': 'Tel Aviv',
    'geo.position': '32.0853;34.7818',
    'ICBM': '32.0853, 34.7818',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ULtcbnw-SGW4pnuz9fj7nQ7Lr3tJhsjTuMmt0MMyfpk',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://drbendor.com/feed.xml',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
    { media: '(prefers-color-scheme: light)', color: '#f1f8fa' },
  ],
  colorScheme: 'light dark',
};

import ClientProviders from "@/components/ClientProviders";

// Runs before first paint: sets lang/dir from the URL and the theme from
// localStorage -> ?theme= -> system preference -> light. Keeps the static
// export flash-free and lets crawlers see the corrected attributes.
const bootScript = `(function(){var d=document.documentElement,p=location.pathname,h=p.indexOf('/he')===0;d.lang=h?'he':'en';d.dir=h?'rtl':'ltr';var t=null;try{t=localStorage.getItem('theme')}catch(e){}var q=new URLSearchParams(location.search).get('theme');if(q==='dark'||q==='light'){t=q;try{localStorage.setItem('theme',q)}catch(e){}}if(t!=='dark'&&t!=='light'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" data-theme="light" className={`${outfit.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${rubik.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://scholar.google.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
