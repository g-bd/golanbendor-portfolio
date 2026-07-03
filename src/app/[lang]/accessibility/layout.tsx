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
    ? "הצהרת נגישות"
    : "Accessibility Statement";

  const description = isHebrew
    ? "הצהרת הנגישות של אתר ד״ר גולן בן-דור — מחויבות לנגישות דיגיטלית בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקן WCAG 2.0."
    : "Accessibility statement for drbendor.com — commitment to digital accessibility under Israeli law and WCAG 2.0 AA standard.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://drbendor.com/${lang}/accessibility/`,
      languages: {
        'en': 'https://drbendor.com/en/accessibility/',
        'he': 'https://drbendor.com/he/accessibility/',
        'x-default': 'https://drbendor.com/he/accessibility/',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      url: `https://drbendor.com/${lang}/accessibility/`,
      title,
      description,
    },
  };
}

export default async function AccessibilityLayout({ children }: Props) {
  return <>{children}</>;
}
