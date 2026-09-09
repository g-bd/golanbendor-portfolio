'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.beersheva_article.
export default function BeershevaPage() {
    const { langData: t, language } = useLanguage();
    if (!t.beersheva_article) return notFound();

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'Beer Sheva Model Validation System — AI-Native Transport QA'
            : 'מערכת אימות מודל באר שבע — בקרת איכות AI-Native',
        'description': language === 'en'
            ? 'AI-native system for reconstructing and validating Beer Sheva transport model outputs, packaged as a production tool for Netivei Ayalon.'
            : 'מערכת AI-Native לשחזור ואימות פלטי מודל התחבורה של באר שבע, ארוזה כלי ייצור עבור נתיבי איילון.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'datePublished': '2026-06-10',
        'dateModified': '2026-06-10',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/beersheva/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/beer-sheva-thumbnail.jpg', 'width': 1400, 'height': 515 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}/work/` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'Beer Sheva Model Validation' : 'אימות מודל באר שבע', 'item': `https://drbendor.com/${language}/work/beersheva/` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <CaseStudy slug="beersheva" />
        </>
    );
}
