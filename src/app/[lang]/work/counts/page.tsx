'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.counts_article.
export default function CountsPage() {
    const { langData: t, language } = useLanguage();
    if (!t.counts_article) return notFound();

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': language === 'en'
            ? 'Centrality-Based Sampling Design for Traffic Counts in Strategic Transport Model Validation'
            : 'תכנון מדגם ספירות תנועה מבוסס מרכזיות לאימות מודלים תחבורתיים אסטרטגיים',
        'description': language === 'en'
            ? 'A network-science methodology for selecting traffic count locations to validate strategic transport models, presented at ISTRC 2026.'
            : 'מתודולוגיה מבוססת מדע רשתות לבחירת מיקומי ספירות תנועה לאימות מודלים תחבורתיים אסטרטגיים, הוצגה בכנס ISTRC 2026.',
        'author': [
            { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
            { '@type': 'Person', 'name': 'Marcus Szeinuk' },
            { '@type': 'Person', 'name': 'Ido Klein' },
            { '@type': 'Person', 'name': 'Shlomo Bekhor' },
        ],
        'datePublished': '2026-07-03',
        'dateModified': '2026-07-03',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/counts/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/counts-thumbnail.jpg', 'width': 1200, 'height': 630 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'Traffic Count Sampling Design' : 'תכנון מדגם ספירות תנועה', 'item': `https://drbendor.com/${language}/work/counts/` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <CaseStudy slug="counts" />
        </>
    );
}
