'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronUp, Maximize2, X } from 'lucide-react';
import { ArchiveContent, NewsItem } from '@/data/siteContent';
import { Language } from '@/data/translations';
import { asset, external } from '@/lib/site';
import Label from './Label';

const publisher = (color: string) => ({ ['--publisher' as string]: color } as React.CSSProperties);
const formatDate = (iso: string | undefined, lang: Language) => {
    if (!iso) return null;
    const d = new Date(iso + 'T00:00:00Z');
    return d.toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};

function ClippingDialog({ item, t, onClose }: { item: NewsItem | null; t: ArchiveContent; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (item && !element.open) element.showModal();
        if (!item && element.open) element.close();
    }, [item]);
    return (
        <dialog ref={ref} className="clipping-dialog" onClose={onClose} onClick={event => { if (event.target === ref.current) onClose(); }} aria-labelledby="clipping-title">
            {item && (
                <>
                    <div className="clipping-dialog-heading" style={publisher(item.color)}>
                        <div><p className="publisher-name">{item.source}</p><h2 id="clipping-title">{item.title}</h2></div>
                        <button className="icon-button" onClick={onClose} aria-label={t.closeClipping}><X /></button>
                    </div>
                    <div className="clipping-scroll"><img src={asset(item.image)} alt={`${item.source}: ${item.title}`} /></div>
                    <div className="clipping-dialog-foot"><span>{t.clippingNote}</span><a className="text-link" href={item.link} {...external}>{t.readArticle}<ArrowUpRight size={15} /></a></div>
                </>
            )}
        </dialog>
    );
}

// Press coverage as a front page: one lead story (swappable) presented like a
// newspaper front, the others as typographic briefs. Any clipping opens full-size.
export default function PressDossier({ t, lang = 'en' }: { t: ArchiveContent; lang?: Language }) {
    const [featured, setFeatured] = useState(0);
    const [open, setOpen] = useState<number | null>(null);
    const lead = t.news[featured];
    const briefs = t.news.map((item, i) => ({ item, i })).filter(({ i }) => i !== featured);
    return (
        <div id="press" className="news-section reveal">
            <div className="row-heading"><div><Label>{t.newsLabel}</Label><h2>{t.newsTitle}</h2></div><p>{t.pressNote}</p></div>
            <div className="press-dossier">
                <article className="coverage-lead" key={lead.link} style={publisher(lead.color)}>
                    <div className="coverage-copy">
                        <div className="publisher-row"><p className="publisher-name">{lead.source}</p>{lead.date && <span className="dateline">{formatDate(lead.date, lang)}</span>}</div>
                        <h3 className="pull-quote">{lead.title}</h3>
                        <p className="coverage-summary">{lead.summary}</p>
                        <a className="text-link" href={lead.link} {...external}>{t.readArticle}<ArrowUpRight size={17} /></a>
                        <div className="coverage-dots" role="tablist" aria-label={t.newsLabel}>
                            {t.news.map((item, i) => <button key={item.link} role="tab" aria-selected={i === featured} aria-label={item.source} className={i === featured ? 'active' : ''} style={publisher(item.color)} onClick={() => setFeatured(i)} />)}
                        </div>
                    </div>
                    <button className="paper-card" onClick={() => setOpen(featured)} aria-label={`${t.enlarge}: ${lead.source}`}>
                        <img src={asset(lead.image)} alt="" loading="lazy" /><span><Maximize2 size={15} /></span>
                    </button>
                </article>
                {briefs.map(({ item, i }) => (
                    <article className="coverage-brief" key={item.link} style={publisher(item.color)}>
                        <div className="coverage-copy">
                            <p className="publisher-name">{item.source}</p>
                            {item.date && <span className="dateline">{formatDate(item.date, lang)}</span>}
                            <h3>{item.title}</h3>
                            <p className="coverage-summary">{item.summary}</p>
                            <div className="brief-actions">
                                <a className="text-link" href={item.link} {...external}>{t.readArticle}<ArrowUpRight size={15} /></a>
                                <button className="promote" onClick={() => setFeatured(i)}>{t.featureArticle}<ChevronUp size={13} /></button>
                            </div>
                        </div>
                        <button className="paper-card" onClick={() => setOpen(i)} aria-label={`${t.enlarge}: ${item.source}`}>
                            <img src={asset(item.image)} alt="" loading="lazy" /><span><Maximize2 size={13} /></span>
                        </button>
                    </article>
                ))}
            </div>
            <ClippingDialog item={open === null ? null : t.news[open]} t={t} onClose={() => setOpen(null)} />
        </div>
    );
}
