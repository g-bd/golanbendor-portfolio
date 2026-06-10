import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isHebrew = lang === 'he';

  const title = isHebrew
    ? "מפת בסיס דיגיטלית לרשת הכבישים | פרויקט משרד התחבורה"
    : "Digital Road Network Basemap | Ministry of Transport Project";

  const description = isHebrew
    ? "צינור AI-Native שיוצר מפות בסיס דיגיטליות מדויקות של רשתות כבישים — התשתית למדידת זמני נסיעה בערים הגדולות בישראל."
    : "AI-native pipeline that creates accurate digital basemaps of urban road networks — the foundation for measuring real travel times across Israel's major cities.";

  const keywords = isHebrew
    ? ["מפת בסיס", "רשת כבישים", "זמני נסיעה", "משרד התחבורה", "גולן בן-דור", "AI", "אוטומציה", "ניתוח תחבורה"]
    : ["road network basemap", "travel time measurement", "Ministry of Transport", "Golan Ben-Dor", "AI-native development", "transport analytics", "GIS pipeline"];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" }],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/google`,
      languages: {
        'en': 'https://drbendor.com/en/work/google',
        'he': 'https://drbendor.com/he/work/google',
        'x-default': 'https://drbendor.com/he/work/google',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/google`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'מפת בסיס דיגיטלית לרשת הכבישים | ד״ר גולן בן-דור'
        : 'Digital Road Network Basemap | Dr. Golan Ben-Dor',
      description,
      images: [
        {
          url: 'https://drbendor.com/google-thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'מפת בסיס דיגיטלית של רשת הכבישים — פרויקט משרד התחבורה'
            : 'Digital road network basemap — Ministry of Transport project',
        },
      ],
      publishedTime: '2026-06-10T00:00:00.000Z',
      modifiedTime: '2026-06-10T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['מפת בסיס', 'רשת כבישים', 'משרד התחבורה', 'AI', 'תחבורה']
        : ['road network', 'basemap', 'Ministry of Transport', 'AI-native', 'transport'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew
        ? 'מפת בסיס דיגיטלית לרשת הכבישים'
        : 'Digital Road Network Basemap',
      description: isHebrew
        ? 'צינור AI-Native למדידת זמני נסיעה בארבעה מטרופולינים בישראל'
        : 'AI-native pipeline for travel-time measurement across four Israeli metros',
    },
  };
}

export default function GoogleLayout({ children }: Props) {
  return <>{children}</>;
}
