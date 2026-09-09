import { archive, content } from '@/data/siteContent';
import { publicationByDoi, researchCopy } from '@/data/pagesContent';
import type { Language } from '@/data/translations';
import { asset } from '@/lib/site';
import ResearchPage from '@/components/pages/ResearchPage';

// Research route. JSON-LD: CollectionPage → ItemList of ScholarlyArticle, built from the Crossref
// facts in pagesContent.publications (headline, authors, year, journal, DOI).
export default async function ResearchRoute({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const language: Language = lang === 'he' ? 'he' : 'en';
    const home = content[language];
    const t = archive[language];
    const c = researchCopy[language];
    const base = 'https://drbendor.com';
    const url = `${base}/${language}/research/`;

    const articles = home.papers.map(paper => {
        const pub = publicationByDoi(paper.doi);
        const doiUrl = `https://doi.org/${paper.doi}`;
        return {
            '@type': 'ScholarlyArticle',
            'headline': pub?.title ?? paper.title,
            'alternativeHeadline': pub && pub.title !== paper.title ? paper.title : undefined,
            'description': paper.desc,
            'author': (pub?.authors ?? ['Golan Ben-Dor']).map(name => ({ '@type': 'Person', 'name': name, ...(name === 'Golan Ben-Dor' ? { 'url': base } : {}) })),
            'datePublished': String(pub?.year ?? paper.year),
            'isPartOf': { '@type': 'Periodical', 'name': pub?.journal ?? paper.journal },
            'sameAs': doiUrl,
            'url': doiUrl,
            'image': pub ? `${base}${asset(pub.cover)}` : undefined,
            'inLanguage': 'en',
        };
    });
    const theses = t.theses.map(([kind, title, file]) => ({
        '@type': 'Thesis',
        'name': title,
        'description': kind,
        'author': { '@type': 'Person', 'name': 'Golan Ben-Dor', 'url': base },
        'url': `${base}${asset(file)}`,
        'encodingFormat': 'application/pdf',
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
            'itemListElement': [...articles, ...theses].map((item, i) => ({ '@type': 'ListItem', 'position': i + 1, 'item': item })),
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
            <ResearchPage />
        </>
    );
}
