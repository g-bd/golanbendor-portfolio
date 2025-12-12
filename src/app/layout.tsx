import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Rajdhani, Fira_Code, Rubik } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://drbendor.com'),
  title: {
    default: "Dr. Golan Ben-Dor | Urban Mobility Scientist & Transport Simulation Expert",
    template: "%s | Dr. Golan Ben-Dor"
  },
  description: "Dr. Golan Ben-Dor specializes in urban mobility simulation, agent-based modeling (MATSim), and robust transport policy evaluation. PhD from Tel Aviv University. Strategic partner for Ministry of Transport, Netivei Israel, Netivei Ayalon, and CBS.",
  applicationName: "Dr. Golan Ben-Dor Portfolio",
  keywords: [
    "Golan Ben-Dor",
    "Dr. Golan Ben-Dor",
    "Golan Ben Dor",
    "Dr Ben-Dor",
    "Dr Ben Dor",
    "Doctor Golan Ben-Dor",
    "Golan Ben-Dor PhD",
    // Hebrew name variations
    "גולן בן דור",
    "גולן בן-דור",
    "ד\"ר גולן בן דור",
    "ד\"ר גולן בן-דור",
    "דוקטור גולן בן דור",
    "דוקטור גולן בן-דור",
    "דר' גולן בן דור",
    // Hebrew keywords
    "סימולציה תחבורתית",
    "מודל סוכנים",
    "ניידות עירונית",
    "מדעי התחבורה",
    "תכנון תחבורתי",
    "סימולציית תנועה",
    "מודלים תחבורתיים",
    "מדען ניידות עירונית",
    "אוניברסיטת תל אביב",
    "משרד התחבורה",
    "נתיבי ישראל",
    "נתיבי איילון",
    "תכנית אב לתחבורה ירושלים",
    "תמחור עומס",
    "תחבורה חכמה",
    "עיר חכמה",
    "ניתוח נתוני תחבורה",
    "תכנון עירוני",
    "מחקר תחבורה",
    "בינה מלאכותית בתחבורה",
    "מערכות ניטור תנועה",
    "אנליטיקה מרחבית",
    // English keywords
    "urban mobility",
    "transport simulation",
    "MATSim",
    "agent-based modeling",
    "traffic simulation",
    "Tel Aviv University",
    "transport policy",
    "congestion pricing",
    "Ministry of Transport Israel",
    "Netivei Israel",
    "Netivei Ayalon",
    "Jerusalem Transportation Master Plan",
    "urban planning",
    "simulation scientist",
    "transportation research",
    "smart cities",
    "data-driven urbanism",
    "AI transport planning",
    "artificial intelligence",
    "Google Maps analytics",
    "traffic monitoring system",
    "Israel transport infrastructure",
    "spatial analytics",
    "GIS",
    "big data",
    "mobility analytics",
    "autonomous vehicles",
    "shared mobility",
    "transportation engineering",
    "urban analytics"
  ],
  authors: [{ name: "Dr. Golan Ben-Dor" }],
  creator: "Dr. Golan Ben-Dor",
  publisher: "Dr. Golan Ben-Dor",
  category: 'Technology',
  classification: 'Transportation Research, Urban Planning, Data Science',
  alternates: {
    canonical: 'https://drbendor.com',
  },
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    url: 'https://drbendor.com',
    siteName: 'Dr. Golan Ben-Dor - Urban Mobility Scientist',
    title: 'Dr. Golan Ben-Dor | Urban Mobility Scientist & Transport Simulation Expert',
    description: 'Urban mobility simulation scientist specializing in MATSim, agent-based modeling, and transport policy evaluation. PhD from Tel Aviv University. Working with Ministry of Transport Israel, Google, and leading infrastructure companies on AI-driven traffic solutions.',
    images: [
      {
        url: '/profile1.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Golan Ben-Dor - Urban Mobility Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Golan Ben-Dor | Urban Mobility Scientist',
    description: 'Urban mobility simulation scientist specializing in MATSim and transport policy evaluation',
    images: ['/profile1.jpg'],
  },
  icons: {
    icon: '/chrome tab logo.png?v=2',
    shortcut: '/chrome tab logo.png?v=2',
    apple: '/chrome tab logo.png?v=2',
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
    <html lang="en">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${rajdhani.variable} ${firaCode.variable} ${rubik.variable}`}
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
