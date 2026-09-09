'use client';

import { editorialWords, researchStories } from '@/data/editorialContent';
import { ArrowUpRight, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { archive, content } from '@/data/siteContent';
import { publicationByDoi, researchCopy } from '@/data/pagesContent';
import { asset, external, SCHOLAR } from '@/lib/site';
import Label from '@/components/site/Label';
import PageBreadcrumb from './PageBreadcrumb';

// /[lang]/research — the three journal articles (Crossref facts from pagesContent.publications,
// localized title/description from siteContent.papers), the two theses and the Scholar link.
// Abstracts are English-only; on the Hebrew page they render LTR with a short note.
export default function ResearchPage() {
    const { language } = useLanguage();
    const home = content[language];
    const t = archive[language];
    const c = researchCopy[language];
    const rtl = language === 'he';

    return (
        <article className="research-page shell">
            <PageBreadcrumb title={c.title} />
            <header className="research-header">
                <Label>{c.eyebrow}</Label>
                <h1>{c.title}</h1>
                <p>{c.intro}</p>
                <ul className="research-proof">{home.proof.map(item => <li key={item}>{item}</li>)}</ul>
            </header>

            <section className="research-section" id="publications" aria-labelledby="research-papers">
                <div className="row-heading">
                    <div><Label>{c.papersLabel}</Label><h2 id="research-papers">{c.papersTitle}</h2></div>
                    <p>{c.papersDesc}</p>
                </div>
                <div className="research-papers">
                    {home.papers.map(paper => {
                        const pub = publicationByDoi(paper.doi);
                        const overview = researchStories.find(item => item.doi === paper.doi);
                        const url = `https://doi.org/${paper.doi}`;
                        return (
                            <article className="research-paper" key={paper.doi}>
                                <a className="research-cover" href={url} {...external} tabIndex={-1} aria-hidden="true">
                                    <img src={asset(pub?.cover ?? 'paper 1.webp')} alt="" loading="lazy" />
                                </a>
                                <div className="research-paper-copy">
                                    <p className="eyebrow research-year" dir="ltr">{paper.year} · {paper.journal}</p>
                                    {pub ? (
                                        <>
                                            <h3 lang="en" dir="ltr">{pub.title}</h3>
                                            {pub.title !== paper.title && <p className="research-subtitle">{paper.title}</p>}
                                        </>
                                    ) : (
                                        <h3>{paper.title}</h3>
                                    )}
                                    <p className="research-desc">{paper.desc}</p>
                                    {pub && (
                                        <dl className="research-meta">
                                            <div><dt>{c.authors}</dt><dd lang="en" dir="ltr">{pub.authors.join(', ')}</dd></div>
                                            <div><dt>{c.publishedIn}</dt><dd lang="en" dir="ltr">{pub.journal} · {c.volume} {pub.volume} · {c.article} {pub.article}</dd></div>
                                        </dl>
                                    )}
                                    {pub?.abstract && (
                                        <div className="research-abstract">
                                            <p className="eyebrow">{c.abstractLabel}{rtl && c.abstractNote ? ` · ${c.abstractNote}` : ''}</p>
                                            <div dir="ltr" lang="en"><p>{pub.abstract}</p></div>
                                        </div>
                                    )}
                                    {overview && <a className="text-link research-overview" href={`/${language}/research/${overview.slug}/`}>{editorialWords[language].read}<ArrowUpRight size={17} /></a>}
                                    <a className="text-link" href={url} {...external}>{c.readOn}<ArrowUpRight size={17} /></a>
                                    <small className="research-doi" dir="ltr">doi:{paper.doi}</small>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="research-section" id="theses" aria-labelledby="research-theses">
                <div className="row-heading">
                    <div><Label>{c.thesesLabel}</Label><h2 id="research-theses">{c.thesesTitle}</h2></div>
                    <p>{c.thesesDesc}</p>
                </div>
                <div className="research-theses">
                    {t.theses.map(([kind, title, file]) => (
                        <article className="research-thesis" key={file}>
                            <FileText size={22} aria-hidden="true" />
                            <div>
                                <p className="eyebrow">{kind}</p>
                                <h3>{title}</h3>
                                <a className="text-link" href={asset(file)} {...external}>{t.thesisRead}<ArrowUpRight size={15} /></a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="research-scholar" aria-labelledby="research-scholar">
                <div>
                    <Label>{c.scholarLabel}</Label>
                    <h2 id="research-scholar">{c.scholarTitle}</h2>
                    <p>{c.scholarText}</p>
                </div>
                <a className="button" href={SCHOLAR} {...external}>{c.scholarCta}<ArrowUpRight size={17} /></a>
            </section>

            <aside className="research-cta">
                <Label>{c.ctaLabel}</Label>
                <h2>{c.ctaTitle}</h2>
                <p>{c.ctaText}</p>
                <a className="text-link" href={`/${language}/#contact`}>{c.ctaButton}<ArrowUpRight size={17} /></a>
            </aside>
        </article>
    );
}
