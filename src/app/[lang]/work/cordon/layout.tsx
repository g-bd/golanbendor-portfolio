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
    ? "סקר ספירות חיץ וחגורה הארצי 2026 | תיקוף מודלים משותף"
    : "Israel's 2026 National Cordon & Screenline Survey | Joint Model Validation";

  const description = isHebrew
    ? "הובלת המתודולוגיה ותיאום מיקום תחנות הספירה בסקר החיץ והחגורה הארצי הראשון — 28 קווים, 355 תחנות, בתיאום בין נתיבי ישראל, נתיבי איילון וצוות תכנית אב לתחבורה ירושלים."
    : "Orchestrating the methodology and station placement of Israel's first full-national cordon & screenline traffic count survey — 28 lines, 355 stations, coordinated across Netivei Israel, Netivei Ayalon and JTMT.";

  const keywords = isHebrew
    ? ["ספירות חיץ וחגורה", "ספירות תנועה", "תיקוף מודלים", "משרד התחבורה", "נתיבי ישראל", "נתיבי איילון", "גולן בן-דור", "GIS"]
    : ["cordon counts", "screenline counts", "traffic counts", "model validation", "Ministry of Transport", "Netivei Israel", "Netivei Ayalon", "JTMT", "Golan Ben-Dor", "GIS"];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" }],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/cordon/`,
      languages: {
        'en': 'https://drbendor.com/en/work/cordon/',
        'he': 'https://drbendor.com/he/work/cordon/',
        'x-default': 'https://drbendor.com/he/work/cordon/',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/cordon/`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'סקר ספירות חיץ וחגורה הארצי 2026 | ד״ר גולן בן-דור'
        : "Israel's 2026 National Cordon & Screenline Survey | Dr. Golan Ben-Dor",
      description,
      images: [
        {
          url: 'https://drbendor.com/cordon-thumbnail.jpg',
          width: 1600,
          height: 900,
          alt: isHebrew
            ? 'מפת סקר ספירות חיץ וחגורה ארצי 2026'
            : 'Map of the 2026 national cordon & screenline survey',
        },
      ],
      publishedTime: '2026-07-03T00:00:00.000Z',
      modifiedTime: '2026-07-03T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['ספירות תנועה', 'תיקוף מודלים', 'GIS', 'תחבורה']
        : ['traffic counts', 'model validation', 'GIS', 'transport'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew ? 'סקר ספירות חיץ וחגורה הארצי 2026' : "Israel's 2026 National Cordon & Screenline Survey",
      description: isHebrew
        ? 'סקר ספירות התנועה הראשון בכיסוי ארצי מלא לתיקוף המודלים האסטרטגיים'
        : "The first full-national traffic count survey for validating Israel's strategic transport models",
    },
  };
}

export default function CordonLayout({ children }: Props) {
  return <>{children}</>;
}
