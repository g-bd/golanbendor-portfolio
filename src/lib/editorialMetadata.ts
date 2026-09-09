import type { Metadata } from 'next';

export function editorialMetadata(lang: string, path: string, title: string, description: string): Metadata {
  const url = `https://drbendor.com/${lang}/${path}/`;
  return {
    title, description,
    alternates: { canonical: url, languages: { en: `https://drbendor.com/en/${path}/`, he: `https://drbendor.com/he/${path}/`, 'x-default': `https://drbendor.com/he/${path}/` } },
    openGraph: { title, description, type: 'article', url, locale: lang === 'he' ? 'he_IL' : 'en_US', images: ['https://drbendor.com/og-image.jpg?v=2'] },
    twitter: { card: 'summary_large_image', title, description, images: ['https://drbendor.com/og-image.jpg?v=2'] },
  };
}
