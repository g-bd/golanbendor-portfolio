import type { Metadata } from "next";
import { translations } from "@/data/translations";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

// Generate static params for both languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }];
}

// Dynamic metadata based on language
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isHebrew = lang === 'he';

  const title = isHebrew
    ? "ד״ר גולן בן-דור | מדען ניידות עירונית ומומחה סימולציית תחבורה"
    : "Dr. Golan Ben-Dor | Urban Mobility Scientist & Transport Simulation Expert";

  const description = isHebrew
    ? "ד״ר גולן בן-דור - מדען ניידות עירונית המתמחה ב-MATSim, מודלים מבוססי סוכנים ומדיניות תחבורה. דוקטורט מאוניברסיטת תל אביב. משרד התחבורה, נתיבי ישראל, נתיבי איילון."
    : "Dr. Golan Ben-Dor - Urban mobility simulation scientist specializing in MATSim, agent-based modeling, and transport policy. PhD Tel Aviv University. Ministry of Transport, Netivei Israel, Netivei Ayalon.";

  const ogDescription = isHebrew
    ? "מדען ניידות עירונית | Urban mobility simulation scientist - MATSim, מודלים מבוססי סוכנים, מדיניות תחבורה. דוקטורט מאוניברסיטת תל אביב."
    : "Urban mobility simulation scientist | מדען ניידות עירונית - MATSim, agent-based modeling, transport policy. PhD Tel Aviv University.";

  return {
    title: {
      default: title,
      template: isHebrew ? "%s | ד״ר גולן בן-דור" : "%s | Dr. Golan Ben-Dor"
    },
    description,
    alternates: {
      canonical: `https://drbendor.com/${lang}`,
      languages: {
        'en': 'https://drbendor.com/en',
        'he': 'https://drbendor.com/he',
        'x-default': 'https://drbendor.com/he',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew ? 'ד״ר גולן בן-דור | מדען ניידות עירונית' : 'Dr. Golan Ben-Dor | Urban Mobility Scientist',
      description: ogDescription,
      images: [
        {
          url: '/profile1.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'ד״ר גולן בן-דור - מדען ניידות עירונית'
            : 'Dr. Golan Ben-Dor - Urban Mobility Scientist',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      description: isHebrew
        ? 'מדען ניידות עירונית - MATSim, סימולציה תחבורתית, מדיניות תחבורה'
        : 'Urban mobility simulation scientist - MATSim, transport policy, transport simulation',
      images: ['/profile1.jpg'],
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  // hreflang tags are handled via generateMetadata -> alternates.languages
  return <>{children}</>;
}
