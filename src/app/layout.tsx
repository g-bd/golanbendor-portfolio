import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Rajdhani, Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://golanbendor.com'),
  title: "Dr. Golan Ben-Dor | Urban Mobility Scientist & Transport Simulation Expert",
  description: "Dr. Golan Ben-Dor specializes in urban mobility simulation, agent-based modeling (MATSim), and robust transport policy evaluation. PhD from Tel Aviv University. Strategic partner for Ministry of Transport, Netivei Israel, Netivei Ayalon, and CBS.",
  keywords: [
    "Golan Ben-Dor",
    "Dr. Golan Ben-Dor",
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
    canonical: 'https://golanbendor.com',
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
    url: 'https://golanbendor.com',
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
    google: 'Z6AZVOsWQ7fIhWpRkn9RHMN67YhfR1d66zy7ozjWoUw',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${rajdhani.variable} ${firaCode.variable}`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
