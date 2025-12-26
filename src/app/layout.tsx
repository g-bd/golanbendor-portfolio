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
    // Name variations (both languages)
    "Golan Ben-Dor", "Dr. Golan Ben-Dor", "Golan Ben Dor",
    "גולן בן דור", "גולן בן-דור", "ד\"ר גולן בן דור", "ד\"ר גולן בן-דור",
    // Core expertise (both languages)
    "urban mobility", "transport simulation", "MATSim", "agent-based modeling",
    "סימולציה תחבורתית", "ניידות עירונית", "מדען ניידות עירונית",
    // Organizations
    "Ministry of Transport Israel", "משרד התחבורה", "Netivei Israel", "נתיבי ישראל",
  ],
  authors: [{ name: "Dr. Golan Ben-Dor" }],
  creator: "Dr. Golan Ben-Dor",
  publisher: "Dr. Golan Ben-Dor",
  category: 'Technology',
  other: {
    'geo.region': 'IL',
    'geo.placename': 'Tel Aviv',
    'geo.position': '32.0853;34.7818',
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
