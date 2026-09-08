'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronUp, Maximize2, X } from 'lucide-react';
import { useMotion } from '@/context/MotionContext';
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

const EASE = 'cubic-bezier(.2,.7,.2,1)';

// The clipping "lifts off the desk": the dialog grows out of the card that was
// clicked (FLIP animation from the card's rectangle) and shrinks back on close.
function ClippingDialog({ items, index, origin, t, rtl, onIndex, onClose }: { items: NewsItem[]; index: number | null; origin: DOMRect | null; t: ArchiveContent; rtl: boolean; onIndex: (i: number) => void; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    const clipping = useRef<HTMLDivElement>(null);
    const { motion } = useMotion();
    const item = index === null ? null : items[index];
    const closing = useRef(false);

    const flip = useCallback((element: HTMLDialogElement, reverse: boolean) => {
        if (!motion || !origin) return null;
        const to = element.getBoundingClientRect();
        const scale = Math.max(0.15, Math.min(origin.width / to.width, origin.height / to.height));
        const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
        const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
        const from = { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scale.toFixed(3)}) rotate(${rtl ? -2 : 2}deg)`, opacity: 0.4, boxShadow: '0 4px 12px #0000' };
        const rest = { transform: 'none', opacity: 1, boxShadow: '0 40px 90px #00000066' };
        return element.animate(reverse ? [rest, from] : [from, rest], { duration: reverse ? 320 : 480, easing: EASE, fill: 'both' });
    }, [motion, origin, rtl]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (item && !element.open) { closing.current = false; element.showModal(); flip(element, false); }
        if (!item && element.open) element.close();
    }, [item, flip]);

    useEffect(() => { if (clipping.current) clipping.current.scrollTop = 0; }, [index]);

    const requestClose = () => {
        const element = ref.current;
        if (!element || closing.current) return;
        closing.current = true;
        const animation = flip(element, true);
        if (animation) animation.onfinish = () => { onClose(); };
        else onClose();
    };
    const step = (delta: number) => { if (index === null) return; onIndex((index + delta + items.length) % items.length); };

    return (
        <dialog ref={ref} className="clipping-dialog" onCancel={event => { event.preventDefault(); requestClose(); }} onClose={onClose}
            onClick={event => { if (event.target === ref.current) requestClose(); }}
            onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step((event.key === 'ArrowRight') !== rtl ? 1 : -1); } }}
            aria-labelledby="clipping-title">
            {item && (
                <div className="clipping-inner" style={publisher(item.color)}>
                    <div className="clipping-dialog-heading">
                        <div><p className="publisher-name">{item.source}</p><h2 id="clipping-title">{item.title}</h2></div>
                        <div className="clipping-nav">
                            <button className="round-control" onClick={() => step(-1)} aria-label={t.previousClipping}>{rtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}</button>
                            <span className="eyebrow" dir="ltr">{String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                            <button className="round-control" onClick={() => step(1)} aria-label={t.nextClipping}>{rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</button>
                            <button className="icon-button" onClick={requestClose} aria-label={t.closeClipping}><X /></button>
                        </div>
                    </div>
                    <div ref={clipping} className="clipping-scroll"><img key={item.image} src={asset(item.image)} alt={`${item.source}: ${item.title}`} /></div>
                    <div className="clipping-dialog-foot"><span>{t.clippingNote}</span><a className="text-link" href={item.link} {...external}>{t.readArticle}<ArrowUpRight size={15} /></a></div>
                </div>
            )}
        </dialog>
    );
}

// Press coverage as a front page: one lead story (swappable) presented like a
// newspaper front, the others as smaller front pages. Any clipping opens full-size.
export default function PressDossier({ t, lang = 'en' }: { t: ArchiveContent; lang?: Language }) {
    const [featured, setFeatured] = useState(0);
    const [open, setOpen] = useState<number | null>(null);
    const [origin, setOrigin] = useState<DOMRect | null>(null);
    const rtl = lang === 'he';
    const lead = t.news[featured];
    const briefs = t.news.map((item, i) => ({ item, i })).filter(({ i }) => i !== featured);
    const openClipping = (i: number, event: React.MouseEvent<HTMLButtonElement>) => { setOrigin(event.currentTarget.getBoundingClientRect()); setOpen(i); };
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
                        <div className="coverage-dots publisher-tabs" role="group" aria-label={t.newsLabel}>
                            {t.news.map((item, i) => <button key={item.link} aria-pressed={i === featured} className={i === featured ? 'active' : ''} style={publisher(item.color)} onClick={() => setFeatured(i)}>{item.source}</button>)}
                        </div>
                    </div>
                    <button className="paper-card" data-long={lead.long || undefined} onClick={event => openClipping(featured, event)} aria-label={`${t.enlarge}: ${lead.source}`}>
                        <img src={asset(lead.image)} alt="" loading="lazy" /><span><Maximize2 size={15} /></span>
                        {lead.long && <small className="paper-preview-note">{t.longClipping}</small>}
                    </button>
                </article>
                {briefs.map(({ item, i }) => (
                    <article className="coverage-brief" key={item.link} style={publisher(item.color)}>
                        <div className="coverage-copy">
                            <div className="publisher-row"><p className="publisher-name">{item.source}</p>{item.date && <span className="dateline">{formatDate(item.date, lang)}</span>}</div>
                            <h3>{item.title}</h3>
                            <p className="coverage-summary">{item.summary}</p>
                            <div className="brief-actions">
                                <a className="text-link" href={item.link} {...external}>{t.readArticle}<ArrowUpRight size={15} /></a>
                                <button className="promote" onClick={() => setFeatured(i)}><ChevronUp size={13} />{t.featureArticle}</button>
                            </div>
                        </div>
                        <button className="paper-card" data-long={item.long || undefined} onClick={event => openClipping(i, event)} aria-label={`${t.enlarge}: ${item.source}`}>
                            <img src={asset(item.image)} alt="" loading="lazy" /><span><Maximize2 size={14} /></span>
                            {item.long && <small className="paper-preview-note">{t.longClipping}</small>}
                        </button>
                    </article>
                ))}
            </div>
            <ClippingDialog items={t.news} index={open} origin={origin} t={t} rtl={rtl} onIndex={setOpen} onClose={() => setOpen(null)} />
        </div>
    );
}
