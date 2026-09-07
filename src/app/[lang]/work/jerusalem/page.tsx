'use client';

import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudy from '@/components/site/case/CaseStudy';

// Case-study route: JSON-LD carried over from the classic site; the article itself is the
// shared CaseStudy template driven by translations.jerusalem_article.
export default function JerusalemPage() {
    const { langData: t, language } = useLanguage();
    if (!t.jerusalem_article) return notFound();

    const scholarlyArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        'headline': language === 'en'
            ? 'Simulation-based policy evaluation of financial incentives to reduce private car use in Jerusalem'
            : 'הערכת מדיניות מבוססת סימולציה של תמריצים כספיים להפחתת השימוש ברכב פרטי בירושלים',
        'description': language === 'en'
            ? 'Research evaluating congestion pricing and shared autonomous vehicles impact on urban mobility in Jerusalem using MATSim agent-based simulation.'
            : 'מחקר המעריך את השפעת אגרת גודש ורכבים אוטונומיים משותפים על ניידות עירונית בירושלים באמצעות סימולציית MATSim.',
        'author': [
            { '@type': 'Person', 'name': 'Golan Ben-Dor', 'url': 'https://drbendor.com' },
            { '@type': 'Person', 'name': 'Ido Klein' },
            { '@type': 'Person', 'name': 'Aleksey Ogulenko' },
            { '@type': 'Person', 'name': 'Eran Ben-Elia' },
            { '@type': 'Person', 'name': 'Itzhak Benenson' }
        ],
        'datePublished': '2024-05-01',
        'publisher': {
            '@type': 'Organization',
            'name': 'Transportation Research Part A: Policy and Practice',
            'url': 'https://www.sciencedirect.com/journal/transportation-research-part-a-policy-and-practice'
        },
        'url': `https://drbendor.com/${language}/work/jerusalem/`,
        'mainEntityOfPage': `https://drbendor.com/${language}/work/jerusalem/`,
        'image': 'https://drbendor.com/sim video high res thumbnail.jpg',
        'keywords': language === 'en'
            ? ['congestion pricing', 'Jerusalem', 'MATSim', 'agent-based modeling', 'transport simulation', 'shared autonomous vehicles']
            : ['אגרת גודש', 'ירושלים', 'MATSim', 'מודלים מבוססי סוכנים', 'סימולציה תחבורתית', 'רכבים אוטונומיים משותפים'],
        'about': {
            '@type': 'Thing',
            'name': 'Urban Mobility Policy',
            'description': 'Evaluation of financial incentives for sustainable urban transportation'
        },
        'citation': {
            '@type': 'ScholarlyArticle',
            'name': 'Transportation Research Part A: Policy and Practice',
            'url': 'https://doi.org/10.1016/j.tra.2024.104061'
        }
    };

    // BreadcrumbList Schema for navigation
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': language === 'en' ? 'Home' : 'דף הבית',
                'item': `https://drbendor.com/${language}/`
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': language === 'en' ? 'Work' : 'פרויקטים',
                'item': `https://drbendor.com/${language}#work`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': language === 'en' ? 'Jerusalem Transportation Study' : 'מחקר תחבורה ירושלים',
                'item': `https://drbendor.com/${language}/work/jerusalem/`
            }
        ]
    };

    // Article Schema for blog-style presentation
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': language === 'en'
            ? 'Jerusalem Transportation Master Plan: Carrot and Stick Policy Evaluation'
            : 'תכנית אב לתחבורה ירושלים: הערכת מדיניות גזר ומקל',
        'alternativeHeadline': language === 'en'
            ? 'How €10 Daily Congestion Charge Could Reduce Jerusalem Traffic by 25%'
            : 'כיצד אגרת גודש יומית של 10 אירו יכולה להפחית את התנועה בירושלים ב-25%',
        'description': language === 'en'
            ? 'A deep dive into agent-based simulation research evaluating congestion pricing and shared autonomous vehicles for Jerusalem urban mobility.'
            : 'צלילה עמוקה למחקר סימולציה מבוססת סוכנים המעריך אגרת גודש ורכבים אוטונומיים משותפים לניידות עירונית בירושלים.',
        'author': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor',
            'url': 'https://drbendor.com',
            'jobTitle': 'Urban Mobility Scientist'
        },
        'datePublished': '2024-05-01',
        'dateModified': '2024-12-01',
        'publisher': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor',
            'url': 'https://drbendor.com'
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://drbendor.com/${language}/work/jerusalem/`
        },
        'image': {
            '@type': 'ImageObject',
            'url': 'https://drbendor.com/sim video high res thumbnail.jpg',
            'width': 1920,
            'height': 1080
        },
        'articleSection': language === 'en' ? 'Research' : 'מחקר',
        'wordCount': 1500,
        'inLanguage': language === 'en' ? 'en-US' : 'he-IL',
        'keywords': language === 'en'
            ? 'congestion pricing, Jerusalem, MATSim, transport simulation, urban mobility, shared autonomous vehicles'
            : 'אגרת גודש, ירושלים, MATSim, סימולציה תחבורתית, ניידות עירונית, רכבים אוטונומיים משותפים',
        'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['h1', 'h2', '.study-finding']
        }
    };

    // VideoObject Schema for the simulation video
    const videoSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        'name': language === 'en'
            ? 'Jerusalem MATSim Traffic Simulation Visualization'
            : 'הדמיית סימולציית תנועה MATSim ירושלים',
        'description': language === 'en'
            ? 'High-resolution visualization of agent-based traffic simulation showing congestion patterns and policy impacts in Jerusalem metropolitan area.'
            : 'הדמיה ברזולוציה גבוהה של סימולציית תנועה מבוססת סוכנים המציגה דפוסי עומס והשפעות מדיניות באזור המטרופוליני של ירושלים.',
        'thumbnailUrl': 'https://drbendor.com/sim video high res thumbnail.jpg',
        'uploadDate': '2024-05-01T00:00:00+03:00',
        'duration': 'PT2M30S',
        'contentUrl': 'https://drbendor.com/sim video high res.mp4',
        'embedUrl': `https://drbendor.com/${language}/work/jerusalem/`,
        'author': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor'
        },
        'publisher': {
            '@type': 'Person',
            'name': 'Dr. Golan Ben-Dor'
        },
        'inLanguage': language === 'en' ? 'en' : 'he',
        'keywords': language === 'en'
            ? ['MATSim', 'traffic simulation', 'Jerusalem', 'agent-based modeling', 'urban mobility']
            : ['MATSim', 'סימולציית תנועה', 'ירושלים', 'מודלים מבוססי סוכנים', 'ניידות עירונית']
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            <CaseStudy slug="jerusalem" />
        </>
    );
}
