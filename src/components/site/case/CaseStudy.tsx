'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, ArrowDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { asset, external } from '@/lib/site';
import { markViewTransition } from '@/lib/viewTransition';
import { pageWords } from '@/data/siteContent';
import { projectOrder, projectAssets, ProjectSlug } from '@/data/siteLinks';
import Label from '@/components/site/Label';
import Breadcrumb from './Breadcrumb';
import Visual from './Visual';
import MethodStory from './MethodStory';
import ChapterNavigation from './ChapterNavigation';
import StageMap from '@/components/site/StageMap';

const ScientificMaps = dynamic(() => import('./ScientificMaps'), { ssr: false, loading: () => <LoadingNote /> });
const CountsMethodMap = dynamic(() => import('./CountsMethodMap'), { loading: () => <LoadingNote /> });

function LoadingNote() {
    const { language } = useLanguage();
    return <p className="map-loading">{pageWords[language].loading}</p>;
}

// Case-study article template. All copy lives in translations.ts under `<slug>_article`,
// `related_work` and `work_index`; assets and accent colors come from siteLinks.ts.
export default function CaseStudy({ slug }: { slug: ProjectSlug }) {
    const { langData: t, language } = useLanguage();
    const w = pageWords[language];
    const a = t[`${slug}_article`];
    const b = a.blog_section;
    const source = projectAssets[slug];
    const he = language === 'he';
    const title: string = t.related_work[`${slug}_title`];

    const stats: [string, string][] = a.stats
        ? Object.entries(a.stats as Record<string, string>).filter(([key]) => key.endsWith('_value')).map(([key, value]) => [value, a.stats[key.replace('_value', '_label')] as string])
        : slug === 'jerusalem'
            ? [['25%', he ? 'פחות הגעות ברכב בתרחיש המחקר' : 'fewer car arrivals in the study scenario'], ['€10', he ? 'אגרה יומית בקירוב' : 'approximate daily charge']]
            : [['BRT', 'Pink Line'], ['Replan', he ? 'סימולציה מבוססת סוכנים' : 'Agent-based simulation']];

    const paragraphs: string[] = Object.entries(b as Record<string, string>).filter(([key]) => /^(how|contribution)_p\d$/.test(key)).map(([, value]) => value);
    const next = projectOrder[(projectOrder.indexOf(slug) + 1) % projectOrder.length];
    const chapters = useMemo(() => (['overview', 'method', 'evidence', 'impact'] as const).map(id => ({ id, label: w[id] })), [w]);
    const isMap = slug === 'cordon' || slug === 'counts';
    const extras = (['ai', 'coordination', 'partner'] as const).filter(key => b[`${key}_text`]);
    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <article className={`case-study accent-${source.color}`}>
            <header className="case-hero shell">
                <Breadcrumb title={title} />
                <div className="case-hero-grid">
                    <div>
                        <Label>{a.subtitle}</Label>
                        <h1>{title}</h1>
                        <p>{a.hero_text}</p>
                        <a href="#overview" className="text-link">{w.scroll}<ArrowDown size={18} /></a>
                    </div>
                    <div className={`case-hero-media ${isMap ? 'map-cover' : ''}`}>
                        <Visual source={source} alt={a.title} />
                        <span className="case-image-label eyebrow">{w.chapter} / {pad(projectOrder.indexOf(slug) + 1)}</span>
                    </div>
                </div>
                <div className="case-stats">
                    {stats.map(([value, label]) => <div key={label}><strong dir="ltr">{value}</strong><span>{label}</span></div>)}
                </div>
            </header>

            <ChapterNavigation chapters={chapters} label={w.jump} />

            <div className="shell case-body">
                <section id="overview" className="case-overview">
                    <div><Label>{w.overview}</Label><h2>{b.title}</h2></div>
                    <div><p>{b.intro}</p>{a.study_highlight && <p>{a.study_highlight}</p>}</div>
                </section>

                <aside className="project-team">
                    <Label>{a.project_team || a.research_team}</Label>
                    <p>{a.project_team_desc || a.research_team_desc}</p>
                </aside>

                {a.highlights && (
                    <div className="case-highlights">
                        {[1, 2, 3].map(i => <div key={i}><Check size={22} /><h3>{a.highlights[`h${i}_title`]}</h3><p>{a.highlights[`h${i}_desc`]}</p></div>)}
                    </div>
                )}

                <MethodStory title={b.how_title || b.contribution_title} paragraphs={paragraphs} source={source} alt={a.title}
                    renderVisual={slug === 'cordon' ? (active, total) => (
                        <div className="method-map" style={{ '--draw': ((active + 1) / total).toFixed(3) } as React.CSSProperties}>
                            <StageMap labels={a.map.regions} total={355} stationsLabel={a.map.stations} count={Math.round(((active + 1) / total) * 355)} />
                        </div>
                    ) : slug === 'counts' ? active => <CountsMethodMap active={active} /> : undefined} />

                <section id="evidence" className="case-evidence">
                    <Label>{w.evidence}</Label>
                    <h2>{b.map_title || b.maps_title || b.video_title}</h2>
                    <p>{b.map_desc || b.maps_intro || (slug === 'brt' ? w.previewVideo : b.video_desc)}</p>
                    {isMap
                        ? <ScientificMaps kind={slug} article={a} />
                        : <div className="evidence-video"><Visual source={source} alt={b.video_title} controls /></div>}
                </section>

                {slug === 'counts' && (
                    <>
                        <section className="science-section">
                            <div><Label>{b.science_title}</Label><h2>{b.science_title}</h2><p>{b.science_p1}</p><p>{b.science_p2}</p></div>
                            <div><ScientificMaps kind="demo" article={a} /><small>{w.diagram}</small></div>
                            <div className="science-formula"><code dir="ltr">{b.science_formula}</code><p>{b.science_formula_explainer}</p></div>
                        </section>
                        <section className="poster-section">
                            <a href={asset('counts-poster.jpg')} {...external}><img src={asset('counts-poster-web.jpg')} alt={b.poster_title} loading="lazy" /></a>
                            <div>
                                <Label>ISTRC / 2026</Label>
                                <h2>{b.poster_title}</h2>
                                <p>{b.poster_desc}</p>
                                <p className="poster-authors">{b.poster_authors}</p>
                                <a className="text-link" href={asset('counts-poster.jpg')} {...external}>{b.poster_button}<ArrowUpRight size={18} /></a>
                            </div>
                        </section>
                    </>
                )}

                {extras.map(key => (
                    <section className="case-extra" key={key}>
                        <div><Label>{w.method}</Label><h2>{b[`${key}_title`]}</h2></div>
                        <div>
                            <p>{b[`${key}_text`]}</p>
                            {key === 'partner' && <a className="partner-link" href="https://replan.city" {...external}><img src={asset('replan.png')} alt="Replan" />{b.partner_link_label}<ArrowUpRight size={18} /></a>}
                        </div>
                    </section>
                ))}

                <section id="impact" className="case-impact">
                    <Label>{b.impact_title}</Label>
                    <h2>{w.result}</h2>
                    {a.study_finding && <p className="study-finding">{a.study_finding}</p>}
                    <p>{b.impact_text}</p>
                    {a.project_quote && <blockquote>{a.project_quote}</blockquote>}
                    <a className="button" href={a.cta_link || `mailto:golanbendor@gmail.com?subject=${encodeURIComponent(title)}`} {...(a.cta_link ? external : {})}>{a.cta_button}<ArrowUpRight size={18} /></a>
                </section>

                <section className="next-case">
                    <div>
                        <Label>{w.next}</Label>
                        <h2>{t.related_work[`${next}_title`]}</h2>
                        <p>{t.related_work[`${next}_desc`]}</p>
                        <a className="text-link" href={`/${language}/work/${next}/`}>{w.read}<ArrowUpRight size={19} /></a>
                        <a className="text-link secondary" href={`/${language}/work/`}>{w.projects}<ArrowUpRight size={17} /></a>
                    </div>
                    <a href={`/${language}/work/${next}/`} aria-label={t.related_work[`${next}_title`]} onClick={markViewTransition}><img src={asset(projectAssets[next].image)} alt="" loading="lazy" /></a>
                </section>
            </div>
        </article>
    );
}
