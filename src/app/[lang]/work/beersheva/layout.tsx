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
    ? "מערכת אימות מודל באר שבע | בקרת איכות AI-Native"
    : "Beer Sheva Model Validation System | AI-Native QA Tool";

  const description = isHebrew
    ? "מערכת AI-Native לשחזור ואימות פלטי מודל תחבורה — מסופקת כלי מוכן לשימוש ללקוח. נבנתה עבור נתיבי איילון."
    : "AI-native system for reconstructing and validating transport model outputs — packaged as a production tool for the customer. Built for Netivei Ayalon.";

  const keywords = isHebrew
    ? ["אימות מודל", "באר שבע", "מודל תחבורה", "נתיבי איילון", "גולן בן-דור", "AI", "Streamlit", "בקרת איכות"]
    : ["model validation", "Beer Sheva", "transport model", "Netivei Ayalon", "Golan Ben-Dor", "AI-native", "Streamlit", "quality assurance"];

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Dr. Golan Ben-Dor", url: "https://drbendor.com" }],
    alternates: {
      canonical: `https://drbendor.com/${lang}/work/beersheva/`,
      languages: {
        'en': 'https://drbendor.com/en/work/beersheva/',
        'he': 'https://drbendor.com/he/work/beersheva/',
        'x-default': 'https://drbendor.com/he/work/beersheva/',
      },
    },
    openGraph: {
      type: 'article',
      locale: isHebrew ? 'he_IL' : 'en_US',
      alternateLocale: isHebrew ? ['en_US'] : ['he_IL'],
      url: `https://drbendor.com/${lang}/work/beersheva/`,
      siteName: isHebrew ? 'ד״ר גולן בן-דור' : 'Dr. Golan Ben-Dor',
      title: isHebrew
        ? 'מערכת אימות מודל באר שבע | ד״ר גולן בן-דור'
        : 'Beer Sheva Model Validation System | Dr. Golan Ben-Dor',
      description,
      images: [
        {
          url: 'https://drbendor.com/beer-sheva-thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: isHebrew
            ? 'מערכת אימות מודל תחבורה — באר שבע'
            : 'Transport model validation system — Beer Sheva',
        },
      ],
      publishedTime: '2026-06-10T00:00:00.000Z',
      modifiedTime: '2026-06-10T00:00:00.000Z',
      authors: ['Dr. Golan Ben-Dor'],
      tags: isHebrew
        ? ['אימות מודל', 'באר שבע', 'תחבורה', 'AI', 'Streamlit']
        : ['model validation', 'Beer Sheva', 'transport', 'AI-native', 'Streamlit'],
    },
    twitter: {
      card: 'summary_large_image',
      title: isHebrew ? 'מערכת אימות מודל באר שבע' : 'Beer Sheva Model Validation System',
      description: isHebrew
        ? 'מערכת AI-Native לשחזור ואימות פלטי מודל תחבורה'
        : 'AI-native system for reconstructing and validating transport model outputs',
    },
  };
}

export default function BeerShevaLayout({ children }: Props) {
  return <>{children}</>;
}
