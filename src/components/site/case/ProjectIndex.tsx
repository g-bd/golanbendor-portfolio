'use client';

import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { asset } from '@/lib/site';
import { markViewTransition } from '@/lib/viewTransition';
import { pageWords } from '@/data/siteContent';
import { projectOrder, projectAssets, ProjectCategory } from '@/data/siteLinks';
import Label from '@/components/site/Label';
import Breadcrumb from './Breadcrumb';

type Filter = 'all' | ProjectCategory;
const FILTERS: Filter[] = ['all', 'analytics', 'policy', 'simulation', 'ai'];
// `x-thumbnail.jpg` has an 800px `x-thumbnail-sm.jpg` sibling; other images have none.
const smallThumb = (image: string) => (image.endsWith('-thumbnail.jpg') ? image.replace('-thumbnail.jpg', '-thumbnail-sm.jpg') : image);

// Searchable, filterable index of every case study. Copy comes from translations.work_index.
export default function ProjectIndex() {
    const { langData: t, language } = useLanguage();
    const w = pageWords[language];
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
    const index = t.work_index;
    const q = query.trim().toLocaleLowerCase();

    const visible = projectOrder.filter(key => {
        const item = index.projects[key];
        const matchesFilter = filter === 'all' || projectAssets[key].category === filter;
        return matchesFilter && `${item.title} ${item.desc} ${item.tags.join(' ')}`.toLocaleLowerCase().includes(q);
    });

    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': language === 'en' ? 'Case Studies & Projects' : 'מקרי בוחן ופרויקטים',
        'description': index?.description,
        'url': `https://drbendor.com/${language}/work/`,
        'mainEntity': {
            '@type': 'ItemList',
            'itemListElement': [
                ...projectOrder.map((key, i) => ({ '@type': 'ListItem', 'position': i + 1, 'name': index?.projects?.[key]?.title, 'url': `https://drbendor.com/${language}/work/${key}/` })),
                { '@type': 'ListItem', 'position': projectOrder.length + 1, 'name': index?.projects?.ai_workflows?.title, 'url': `https://drbendor.com/${language}/#expertise` },
            ],
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': language === 'en' ? 'Home' : 'דף הבית', 'item': `https://drbendor.com/${language}/` },
            { '@type': 'ListItem', 'position': 2, 'name': language === 'en' ? 'Work' : 'פרויקטים', 'item': `https://drbendor.com/${language}/work/` },
        ],
    };

    return (
        <div className="project-directory shell">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Breadcrumb />
            <div className="directory-intro">
                <Label>{index.subtitle}</Label>
                <h1>{index.title}</h1>
                <p>{index.description}</p>
            </div>
            <div className="directory-controls">
                <div className="filter-buttons" role="group" aria-label={w.all}>
                    {FILTERS.map(key => (
                        <button key={key} className={filter === key ? 'active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>
                            {key === 'all' ? w.all : index.categories[key]}
                        </button>
                    ))}
                </div>
                <label className="project-search">
                    <Search size={17} />
                    <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={w.search} aria-label={w.search} />
                </label>
            </div>
            <div className="directory-results">
                <p role="status" aria-live="polite" aria-atomic="true">{visible.length} / {projectOrder.length} {w.results}</p>
                {visible.length > 0 && (query || filter !== 'all') && <button className="text-link" onClick={() => { setQuery(''); setFilter('all'); }}>{w.reset}</button>}
            </div>
            <div className="directory-grid">
                {visible.map(key => {
                    const item = index.projects[key];
                    return (
                        <a key={key} className={`directory-card accent-${projectAssets[key].color}`} href={`/${language}/work/${key}/`} onClick={markViewTransition}>
                            <div className="directory-image">
                                <img src={asset(smallThumb(projectAssets[key].image))} srcSet={`${asset(smallThumb(projectAssets[key].image))} 800w, ${asset(projectAssets[key].image)} 1400w`} sizes="(max-width: 760px) 100vw, 580px" alt="" loading="lazy" />
                                <span className="directory-status eyebrow">{item.status}</span>
                                <span className="directory-arrow"><ArrowUpRight /></span>
                            </div>
                            <p className="eyebrow">{item.tags.join(' / ')}</p>
                            <h2>{item.title}</h2>
                            <p>{item.desc}</p>
                            <span className="text-link">{w.read}<ArrowUpRight size={18} /></span>
                        </a>
                    );
                })}
            </div>
            {!visible.length && (
                <div className="empty-projects" role="status">
                    <p>{w.empty}</p>
                    <button className="text-link" onClick={() => { setQuery(''); setFilter('all'); }}>{w.reset}</button>
                </div>
            )}
            <a className="directory-ai" href={`/${language}/#expertise`}>
                <div>
                    <Label>AI / {index.projects.ai_workflows.status}</Label>
                    <h2>{index.projects.ai_workflows.title}</h2>
                    <p>{index.projects.ai_workflows.desc}</p>
                </div>
                <ArrowUpRight size={35} />
            </a>
        </div>
    );
}
