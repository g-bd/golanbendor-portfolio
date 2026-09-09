import type { Metadata } from "next";
import { speakingCopy } from '@/data/pagesContent';

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
  const copy = speakingCopy[isHebrew ? 'he' : 'en'];
  const title = copy.metaTitle;
  const description = copy.metaDescription;

  return {
    title,
    description,
    twitter: { card: 'summary_large_image', title, description, images: ['https://drbendor.com/og-image.jpg?v=2'] },
    alternates: {
      canonical: `https://drbendor.com/${lang}/speaking/`,
      languages: {
        'en': 'https://drbendor.com/en/speaking/',
        'he': 'https://drbendor.com/he/speaking/',
        'x-default': 'https://drbendor.com/he/speaking/',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      url: `https://drbendor.com/${lang}/speaking/`,
      title,
      description,
      images: [
        {
          url: 'https://drbendor.com/og-image.jpg?v=2',
          width: 1200,
          height: 1200,
          alt: isHebrew ? 'ד״ר גולן בן-דור - הרצאות ותקשורת' : 'Dr. Golan Ben-Dor - Speaking & Media',
        },
      ],
    },
  };
}

export default async function SpeakingLayout({ children }: Props) {
  return <>{children}</>;
}
