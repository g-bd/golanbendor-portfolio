'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.brt_article.
export default function BrtPage() {
    const { langData: t, language } = useLanguage();
    if (!t.brt_article) return notFound();

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'BRT Corridor Analysis — Pink Line, Powered by Replan'
            : 'ניתוח פרוזדור BRT — הקו הוורוד, מבוסס Replan',
        'description': language === 'en'
            ? 'Agent-based simulation of the Pink Line BRT corridor with Replan and Netivei Ayalon — corridor-level demand and modal shift analysis before any infrastructure decision.'
            : 'סימולציה מבוססת סוכנים של פרוזדור ה-BRT של הקו הוורוד בשיתוף Replan ונתיבי איילון — ניתוח ביקושים ומעבר בין אמצעי תחבורה לפני כל החלטת תשתית.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'datePublished': '2026-07-03',
        'dateModified': '2026-07-03',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/brt/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/brt-thumbnail.jpg', 'width': 1224, 'height': 832 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'BRT Corridor Analysis' : 'ניתוח פרוזדור BRT', 'item': `https://drbendor.com/${language}/work/brt/` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <CaseStudy slug="brt" />
        </>
    );
}
