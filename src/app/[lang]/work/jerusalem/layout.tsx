import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

// Generate static params for both languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }];
}

// Dynamic metadata for Jerusalem article
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isHebrew = lang === 'he';

  const title = isHebrew
    ? "מחקר אגרת גודש בירושלים | הערכת מדיניות תחבורתית"
    : "Jerusalem Congestion Pricing Study | Transport Policy Evaluation";

  const description = isHebrew
    ? "מחקר מבוסס סימולציה על תמריצים כספיים להפחתת השימוש ברכב פרטי בירושלים. ממצא מרכזי: אגרה יומית של כ-10 אירו יכולה להפחית כניסת רכבים ב-25%. פורסם ב-Transportation Research Part A."
    : "Simulation-based research evaluating financial incentives to reduce private car usage in Jerusalem. Key finding: A €10 daily charge could reduce car arrivals by 25%. Published in Transportation Research Part A.";

  const keywords = isHebrew
    ? ["אגרת גודש", "ירושלים", "סימולציה תחבורתית", "MATSim", "מדיניות תחבורה", "גולן בן-דור", "רכב אוטונומי משותף", "תחבורה ציבורית"]
    : ["congestion pricing", "Jerusalem", "transport simulation", "MATSim", "transport policy", "Golan Ben-Dor", "shared autonomous vehicles", "public transport"];

  return {
    title,
    description,
    keywords,
    authors: [
      { name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" },
      { name: "Dr. Ido Klein" },
      { name: "Dr. Aleksey Ogulenko" },
      { name: "Prof. Eran Ben-Elia" },
      { name: "Prof. Itzhak Benenson" },
    ],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/jerusalem/`,
      languages: {
        'en': 'https://drbendor.com/en/work/jerusalem/',
        'he': 'https://drbendor.com/he/work/jerusalem/',
        'x-default': 'https://drbendor.com/he/work/jerusalem/',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/jerusalem/`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'מחקר אגרת גודש בירושלים | ד״ר גולן בן-דור'
        : 'Jerusalem Congestion Pricing Study | Dr. Golan Ben-Dor',
      description,
      images: [
        {
          url: 'https://drbendor.com/sim%20video%20high%20res%20thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'סימולציית תחבורה בירושלים - מודל MATSim'
            : 'Jerusalem Transport Simulation - MATSim Model',
        },
      ],
      publishedTime: '2024-05-01T00:00:00.000Z',
      modifiedTime: '2024-12-01T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['אגרת גודש', 'ירושלים', 'סימולציה', 'MATSim', 'תחבורה']
        : ['congestion pricing', 'Jerusalem', 'simulation', 'MATSim', 'transport'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew
        ? 'מחקר אגרת גודש בירושלים'
        : 'Jerusalem Congestion Pricing Study',
      description: isHebrew
        ? 'אגרה יומית של כ-10 אירו יכולה להפחית כניסת רכבים ב-25%'
        : 'A €10 daily charge could reduce car arrivals by 25%',
    },
  };
}

export default function JerusalemLayout({ children }: Props) {
  return <>{children}</>;
}
