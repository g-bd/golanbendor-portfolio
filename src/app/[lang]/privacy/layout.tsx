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
    ? "מדיניות פרטיות | ד״ר גולן בן-דור"
    : "Privacy Policy | Dr. Golan Ben-Dor";

  const description = isHebrew
    ? "מדיניות הפרטיות של אתר ד״ר גולן בן-דור. אתר זה אינו אוסף מידע אישי."
    : "Privacy policy for drbendor.com. This site collects no personal data.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://drbendor.com/${lang}/privacy`,
      languages: {
        'en': 'https://drbendor.com/en/privacy',
        'he': 'https://drbendor.com/he/privacy',
        'x-default': 'https://drbendor.com/he/privacy',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      url: `https://drbendor.com/${lang}/privacy`,
      title,
      description,
    },
  };
}

export default async function PrivacyLayout({ children }: Props) {
  return <>{children}</>;
}
