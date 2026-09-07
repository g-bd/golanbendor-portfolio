'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.google_article.
export default function GooglePage() {
    const { langData: t, language } = useLanguage();
    if (!t.google_article) return notFound();
    const a = t.google_article;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'Building a Digital Basemap of Israel\'s Road Network'
            : 'בניית מפת בסיס דיגיטלית של רשת הכבישים בישראל',
        'description': language === 'en'
            ? 'AI-native system that creates accurate digital basemaps of urban road networks for the Israeli Ministry of Transport travel-time measurement system.'
            : 'מערכת AI-Native שיוצרת מפות בסיס דיגיטליות מדויקות של רשתות כבישים עירוניות עבור מערכת מדידת זמני הנסיעה של משרד התחבורה.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com', 'jobTitle': 'Urban Mobility Scientist' },
        'datePublished': '2026-06-10',
        'dateModified': '2026-06-10',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/google/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/google-thumbnail.jpg', 'width': 1920, 'height': 1080 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
        'keywords': language === 'en'
            ? 'road network basemap, travel time measurement, Ministry of Transport, AI-native, GIS pipeline'
            : 'מפת בסיס, רשת כבישים, זמני נסיעה, משרד התחבורה, AI-Native',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'Digital Road Network Basemap' : 'מפת בסיס דיגיטלית', 'item': `https://drbendor.com/${language}/work/google/` },
        ],
    };

    const videoSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        'name': language === 'en' ? 'Road Network Basemap Walkthrough' : 'הדגמת יצירת מפת הבסיס',
        'description': language === 'en' ? a.blog_section.video_desc : a.blog_section.video_desc,
        'thumbnailUrl': 'https://drbendor.com/google-thumbnail.jpg',
        'uploadDate': '2026-06-10T00:00:00+03:00',
        'contentUrl': 'https://drbendor.com/google-web.mp4',
        'embedUrl': `https://drbendor.com/${language}/work/google/`,
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor' },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            <CaseStudy slug="google" />
        </>
    );
}
