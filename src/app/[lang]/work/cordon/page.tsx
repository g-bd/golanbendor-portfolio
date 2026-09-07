'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.cordon_article.
export default function CordonPage() {
    const { langData: t, language } = useLanguage();
    if (!t.cordon_article) return notFound();

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? "Israel's 2026 National Cordon & Screenline Survey — Methodology & Coordination"
            : 'סקר ספירות חיץ וחגורה הארצי 2026 — מתודולוגיה ותיאום',
        'description': language === 'en'
            ? "Orchestrating the first full-national cordon & screenline traffic count survey for the joint validation of Israel's five strategic transport models — 28 lines, 355 stations, coordinated across Netivei Israel, Netivei Ayalon and JTMT."
            : 'הובלת סקר ספירות החיץ והחגורה הארצי הראשון לתיקוף המשותף של חמשת המודלים האסטרטגיים בישראל — 28 קווים, 355 תחנות, בתיאום בין נתיבי ישראל, נתיבי איילון וצוות תכנית אב לתחבורה.',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'datePublished': '2026-07-03',
        'dateModified': '2026-07-03',
        'publisher': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': 'https://drbendor.com' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': `https://drbendor.com/${language}/work/cordon/` },
        'image': { '@type': 'ImageObject', 'url': 'https://drbendor.com/cordon-thumbnail.jpg', 'width': 1600, 'height': 900 },
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}#work` },
            { '@type': 'ListItem', 'position': 3, 'name': language === 'en' ? 'National Cordon & Screenline Survey' : 'סקר חיץ וחגורה ארצי', 'item': `https://drbendor.com/${language}/work/cordon/` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <CaseStudy slug="cordon" />
        </>
    );
}
