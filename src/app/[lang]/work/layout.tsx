import type { Metadata } from "next";

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
    ? "מקרי בוחן ופרויקטים"
    : "Case Studies & Projects";

  const description = isHebrew
    ? "גלו מקרי בוחן מפורטים מעבודתי עם סוכנויות התחבורה המובילות בישראל - סימולציה מבוססת סוכנים, MATSim, ואנליטיקת תנועה."
    : "Explore detailed case studies from urban mobility simulation work with Israel's leading transport agencies - agent-based modeling, MATSim, and traffic analytics.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/`,
      languages: {
        'en': 'https://drbendor.com/en/work/',
        'he': 'https://drbendor.com/he/work/',
        'x-default': 'https://drbendor.com/he/work/',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      url: `https://drbendor.com/${lang}/work/`,
      title,
      description,
      images: [
        {
          url: 'https://drbendor.com/og-image.jpg?v=2',
          width: 1200,
          height: 1200,
          alt: isHebrew
            ? 'ד״ר גולן בן-דור - מקרי בוחן ופרויקטים'
            : 'Dr. Golan Ben-Dor - Case Studies & Projects',
        },
      ],
    },
  };
}

export default async function WorkLayout({ children }: Props) {
  return <>{children}</>;
}
