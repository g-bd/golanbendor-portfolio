import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Rajdhani, Fira_Code, Rubik, Heebo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
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
    { media: '(prefers-color-scheme: light)', color: '#0a0a12' },
  ],
  colorScheme: 'dark',
};

import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to YouTube for embedded videos */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://scholar.google.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        {/* Inline script to set lang/dir before React hydration for SEO */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var isHebrew = path.startsWith('/he');
                document.documentElement.lang = isHebrew ? 'he' : 'en';
                document.documentElement.dir = isHebrew ? 'rtl' : 'ltr';
                if (isHebrew) document.body?.classList.add('font-hebrew');
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${rajdhani.variable} ${firaCode.variable} ${rubik.variable} ${heebo.variable}`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
        suppressHydrationWarning
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
