import type { Metadata } from "next";
import { researchCopy } from '@/data/pagesContent';

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
  const copy = researchCopy[isHebrew ? 'he' : 'en'];
  const title = copy.metaTitle;
  const description = copy.metaDescription;

  return {
    title,
    description,
    twitter: { card: 'summary_large_image', title, description, images: ['https://drbendor.com/og-image.jpg?v=2'] },
    alternates: {
      canonical: `https://drbendor.com/${lang}/research/`,
      languages: {
        'en': 'https://drbendor.com/en/research/',
        'he': 'https://drbendor.com/he/research/',
        'x-default': 'https://drbendor.com/he/research/',
      },
    },
    openGraph: {
      type: 'website',
      locale: isHebrew ? 'he_IL' : 'en_US',
      url: `https://drbendor.com/${lang}/research/`,
      title,
      description,
      images: [
        {
          url: 'https://drbendor.com/og-image.jpg?v=2',
          width: 1200,
          height: 1200,
          alt: isHebrew ? 'ד״ר גולן בן-דור - מחקר ופרסומים' : 'Dr. Golan Ben-Dor - Research & Publications',
        },
      ],
    },
  };
}

export default async function ResearchLayout({ children }: Props) {
  return <>{children}</>;
}
