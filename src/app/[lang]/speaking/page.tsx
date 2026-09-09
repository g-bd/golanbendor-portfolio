import { archive } from '@/data/siteContent';
import { speakingCopy } from '@/data/pagesContent';
import type { Language } from '@/data/translations';
import { asset } from '@/lib/site';
import SpeakingPage from '@/components/pages/SpeakingPage';

// Speaking & media route. JSON-LD is built on the server from the same data the client
// component renders (events, media, awards from siteContent.archive). Only facts we hold are
// emitted: no event dates, no video upload dates.
export default async function SpeakingRoute({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language: Language = lang === 'he' ? 'he' : 'en';
    const t = archive[language];
    const c = speakingCopy[language];
    const base = 'https://drbendor.com';
    const url = `${base}/${language}/speaking/`;

    const events = t.events.map(event => ({
        '@type': 'Event',
        'name': `${event.title} — ${event.tag}`,
        'description': event.desc,
        'image': `${base}${asset(event.image)}`,
        'performer': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': base },
    }));
    const videos = t.media.map(item => ({
        '@type': 'VideoObject',
        'name': item.title,
        'description': item.desc,
        'thumbnailUrl': `${base}${asset(item.poster)}`,
        'contentUrl': `${base}${asset(item.video)}`,
        'inLanguage': 'he',
        'author': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': base },
    }));
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': c.metaTitle,
        'description': c.metaDescription,
        'url': url,
        'inLanguage': language === 'he' ? 'he-IL' : 'en-US',
        'about': { '@type': 'Person', 'name': 'Dr. Golan Ben-Dor', 'url': base },
        'mainEntity': {
            '@type': 'ItemList',
            'itemListElement': [...events, ...videos].map((item, i) => ({ '@type': 'ListItem', 'position': i + 1, 'item': item })),
        },
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'he' ? 'דף הבית' : 'Home', 'item': `${base}/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': c.title, 'item': url },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SpeakingPage />
        </>
    );
}
