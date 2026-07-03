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
    ? "ניתוח פרוזדור BRT — הקו הוורוד | מבוסס Replan"
    : "BRT Corridor Analysis — Pink Line | Powered by Replan";

  const description = isHebrew
    ? "סימולציה מבוססת סוכנים של פרוזדור ה-BRT של הקו הוורוד בשיתוף Replan ונתיבי איילון. ניתוח ביקושים ומעבר בין אמצעי תחבורה ברמת הפרוזדור — לפני כל החלטת תשתית."
    : "Agent-based simulation of the Pink Line BRT corridor with Replan and Netivei Ayalon. Corridor-level demand and modal shift analysis, run in-house — before any infrastructure decision is made.";

  const keywords = isHebrew
    ? ["BRT", "הקו הוורוד", "סימולציה מבוססת סוכנים", "נתיבי איילון", "Replan", "גולן בן-דור", "מעבר בין אמצעי תחבורה", "תחבורה ציבורית"]
    : ["BRT", "Pink Line", "agent-based simulation", "Netivei Ayalon", "Replan", "Golan Ben-Dor", "modal shift", "corridor analysis", "public transport"];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" }],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/brt/`,
      languages: {
        'en': 'https://drbendor.com/en/work/brt/',
        'he': 'https://drbendor.com/he/work/brt/',
        'x-default': 'https://drbendor.com/he/work/brt/',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/brt/`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'ניתוח פרוזדור BRT — הקו הוורוד | ד״ר גולן בן-דור'
        : 'BRT Corridor Analysis — Pink Line | Dr. Golan Ben-Dor',
      description,
      images: [
        {
          url: 'https://drbendor.com/brt-thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'סימולציית פרוזדור BRT — הקו הוורוד'
            : 'BRT corridor simulation — Pink Line',
        },
      ],
      publishedTime: '2026-07-03T00:00:00.000Z',
      modifiedTime: '2026-07-03T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['BRT', 'הקו הוורוד', 'סימולציה', 'נתיבי איילון', 'Replan']
        : ['BRT', 'Pink Line', 'simulation', 'Netivei Ayalon', 'Replan'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew ? 'ניתוח פרוזדור BRT — הקו הוורוד' : 'BRT Corridor Analysis — Pink Line',
      description: isHebrew
        ? 'סימולציה מבוססת סוכנים של פרוזדור ה-BRT של הקו הוורוד, מבוססת Replan'
        : 'Agent-based simulation of the Pink Line BRT corridor, powered by Replan',
    },
  };
}

export default function BrtLayout({ children }: Props) {
  return <>{children}</>;
}
