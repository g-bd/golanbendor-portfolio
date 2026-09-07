'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { ArchiveContent } from '@/data/siteContent';
import { asset } from '@/lib/site';
import Label from './Label';

// Event photo gallery: auto-advances every 5.5s while in view; pauses on hover,
// focus, hidden tab, reduced motion or the explicit pause control.
export default function Events({ t, rtl, motion, onWatchConference }: { t: ArchiveContent; rtl: boolean; motion: boolean; onWatchConference: () => void }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const [focused, setFocused] = useState(false);
    const gallery = useRef<HTMLDivElement>(null);
    const running = motion && !paused && !interacting && !focused;
    useEffect(() => {
        const node = gallery.current;
        if (!running || !node) return;
        let timer: ReturnType<typeof setInterval> | undefined;
        let visible = false;
        const sync = () => {
            clearInterval(timer);
            if (visible && !document.hidden) timer = setInterval(() => setIndex(value => (value + 1) % t.events.length), 5500);
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
        observer.observe(node);
        document.addEventListener('visibilitychange', sync);
        return () => { clearInterval(timer); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
    }, [running, t]);
    const selected = t.events[index];
    const change = (delta: number) => setIndex(value => (value + delta + t.events.length) % t.events.length);
    return (
        <div id="events" className="events-section" ref={gallery}
            onFocus={event => { const target = event.target as HTMLElement; if (target.matches(':focus-visible') && !target.closest('.gallery-toggle')) setFocused(true); }}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
            <div className="row-heading"><div><Label>{t.eventsLabel}</Label><h2>{t.eventsTitle}</h2></div><p>{t.eventsDesc}</p></div>
            <div className={`event-feature ${running ? 'gallery-running' : ''}`}>
                <div className="event-image" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}>
                    <img key={selected.image} src={asset(selected.image)} alt={`${selected.title} — ${selected.desc}`} loading="lazy" />
                </div>
                <div className="event-caption">
                    <p className="eyebrow">{selected.tag}</p>
                    <h3>{selected.title}</h3>
                    <p>{selected.desc}</p>
                    <div className="event-controls" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}>
                        <button className="round-control" onClick={() => change(-1)} aria-label={t.previous}>{rtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}</button>
                        <span className="eyebrow" dir="ltr">{String(index + 1).padStart(2, '0')} / {String(t.events.length).padStart(2, '0')}</span>
                        <button className="round-control" onClick={() => change(1)} aria-label={t.next}>{rtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</button>
                        <button className="icon-button gallery-toggle" disabled={!motion} onClick={() => { setPaused(value => !value); setFocused(false); }} aria-pressed={paused} aria-label={paused ? t.resumePhotos : t.pausePhotos}>
                            {paused || !motion ? <Play size={16} /> : <Pause size={16} />}
                        </button>
                    </div>
                    <button className="text-link conference-link" onClick={onWatchConference}>{t.watchConference}<ArrowUpRight size={17} /></button>
                </div>
            </div>
            <p className="gallery-status"><span className={running ? 'status-dot' : ''} />{running ? t.galleryRunning : t.galleryPaused}</p>
            <div className="event-filmstrip">
                {t.events.map((event, i) => (
                    <button className={index === i ? 'selected' : ''} aria-label={`${i + 1}. ${event.title}`} aria-pressed={index === i} key={event.image} onClick={() => setIndex(i)}>
                        <img src={asset(event.image)} alt="" loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
