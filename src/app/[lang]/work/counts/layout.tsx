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
    ? "תכנון מדגם ספירות תנועה | מתודולוגיה מבוססת מרכזיות"
    : "Traffic Count Sampling Design | Centrality-Based Methodology";

  const description = isHebrew
    ? "מתודולוגיה מבוססת מדע רשתות שבוחרת היכן למקם ספירות תנועה לאימות מודלים תחבורתיים אסטרטגיים. פותחה במשרד התחבורה והוצגה בכנס ISTRC 2026."
    : "A network-science methodology for selecting traffic count locations to validate strategic transport models. Developed at the Ministry of Transport and presented at ISTRC 2026.";

  const keywords = isHebrew
    ? ["ספירות תנועה", "אימות מודל", "תכנון מדגם", "מרכזיות ביניים", "משרד התחבורה", "גולן בן-דור", "מודל תחבורה", "ISTRC"]
    : ["traffic counts", "model validation", "sampling design", "betweenness centrality", "Ministry of Transport", "Golan Ben-Dor", "strategic transport model", "ISTRC"];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" }],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/counts/`,
      languages: {
        'en': 'https://drbendor.com/en/work/counts/',
        'he': 'https://drbendor.com/he/work/counts/',
        'x-default': 'https://drbendor.com/he/work/counts/',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/counts/`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'תכנון מדגם ספירות תנועה | ד״ר גולן בן-דור'
        : 'Traffic Count Sampling Design | Dr. Golan Ben-Dor',
      description,
      images: [
        {
          url: 'https://drbendor.com/counts-thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'מפת נקודות ספירת תנועה — מטרופולין תל אביב'
            : 'Traffic count locations map — Tel Aviv metropolitan area',
        },
      ],
      publishedTime: '2026-07-03T00:00:00.000Z',
      modifiedTime: '2026-07-03T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['ספירות תנועה', 'אימות מודל', 'מדע רשתות', 'משרד התחבורה']
        : ['traffic counts', 'model validation', 'network science', 'Ministry of Transport'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew ? 'תכנון מדגם ספירות תנועה' : 'Traffic Count Sampling Design',
      description: isHebrew
        ? 'מתודולוגיה מבוססת מרכזיות לבחירת מיקומי ספירות תנועה — הוצגה בכנס ISTRC 2026'
        : 'Centrality-based methodology for selecting traffic count locations — presented at ISTRC 2026',
    },
  };
}

export default function CountsLayout({ children }: Props) {
  return <>{children}</>;
}
