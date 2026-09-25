'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X } from 'lucide-react';
import { ArchiveContent } from '@/data/siteContent';
import { asset } from '@/lib/site';
import Label from './Label';
import Headline from './Headline';
import TalkPreview, { talkEmbed } from './TalkPreview';

// 320px filmstrip variant of a photo ("key note 7.jpeg" -> "key note 7-sm.jpg"); the feature frame uses the full file.
const small = (image: string) => image.replace(/\.jpe?g$/i, '-sm.jpg');

// Event photo gallery: auto-advances while in view (5.5s per photo; a talk slide holds for
// its silent excerpt); pauses on hover, focus, hidden tab, reduced motion, the explicit
// pause control or while a talk plays. Talk slides (`conferences[].slide`) loop their
// silent local excerpt; a click swaps in the YouTube player with sound, inline in the frame
// (privacy-enhanced domain, mounted only on that click).
export default function Events({ t, rtl, motion }: { t: ArchiveContent; rtl: boolean; motion: boolean }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const [focused, setFocused] = useState(false);
    const [playing, setPlaying] = useState(false);
    const gallery = useRef<HTMLDivElement>(null);
    const frame = useRef<HTMLDivElement>(null);
    const running = motion && !paused && !interacting && !focused && !playing;
    const video = t.conferences.find(talk => talk.slide === index) ?? null;
    const delay = video?.preview ? video.preview.seconds * 1000 : 5500;
    useEffect(() => {
        const node = gallery.current;
        if (!running || !node) return;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let visible = false;
        const sync = () => {
            clearTimeout(timer);
            if (visible && !document.hidden) timer = setTimeout(() => setIndex(value => (value + 1) % t.events.length), delay);
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
        observer.observe(node);
        document.addEventListener('visibilitychange', sync);
        return () => { clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
    }, [running, t, index, delay]);
    const selected = t.events[index];
    // Mouse only: a tap fires pointerenter without a matching leave, which would stop the rotation for good on phones.
    const hover = (event: React.PointerEvent) => { if (event.pointerType === 'mouse') setInteracting(true); };
    const show = (i: number, play = false) => { setIndex(i); setPlaying(play); };
    // On phones the filmstrip sits below the frame, so a thumbnail tap would change a photo that is off screen.
    const pick = (i: number) => {
        show(i);
        const box = frame.current?.getBoundingClientRect();
        const header = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        if (box && box.top < header) frame.current?.scrollIntoView({ block: 'start', behavior: motion ? 'smooth' : 'instant' });
    };
    const change = (delta: number) => show((index + delta + t.events.length) % t.events.length);
    const firstTalk = t.conferences[0];
    return (
        <div id="events" className="events-section" ref={gallery}
            onFocus={event => { const target = event.target as HTMLElement; if (target.matches(':focus-visible') && !target.closest('.gallery-toggle')) setFocused(true); }}
            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
            <div className="row-heading"><div><Label>{t.eventsLabel}</Label><Headline lines={[t.eventsTitle]} /></div><p>{t.eventsDesc}</p></div>
            <div className={`event-feature ${running ? 'gallery-running' : ''}`}>
                <div ref={frame} className="event-image" onPointerEnter={hover} onPointerLeave={() => setInteracting(false)}>
                    {video && playing ? (
                        <>
                            <iframe key={video.youtubeId} src={talkEmbed(video)} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            <button className="talk-close" onClick={() => setPlaying(false)}><X size={13} />{t.close}</button>
                        </>
                    ) : video ? (
                        <TalkPreview key={video.youtubeId} video={video} image={selected.image} label={t.playSound} motion={motion} onPlay={() => setPlaying(true)} />
                    ) : (
                        <img key={selected.image} src={asset(selected.image)} alt={`${selected.title} — ${selected.desc}`} loading="lazy" />
                    )}
                </div>
                <div className="event-caption">
                    <p className="eyebrow">{video ? video.event : selected.tag}</p>
                    <h3>{video ? video.title : selected.title}</h3>
                    <p>{video ? video.desc : selected.desc}</p>
                    <div className="event-controls" onPointerEnter={hover} onPointerLeave={() => setInteracting(false)}>
                        <button className="round-control" onClick={() => change(-1)} aria-label={t.previous}>{rtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}</button>
                        <span className="eyebrow" dir="ltr">{String(index + 1).padStart(2, '0')} / {String(t.events.length).padStart(2, '0')}</span>
                        <button className="round-control" onClick={() => change(1)} aria-label={t.next}>{rtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}</button>
                        <button className="icon-button gallery-toggle" disabled={!motion} onClick={() => { setPaused(value => !value); setFocused(false); }} aria-pressed={paused} aria-label={paused ? t.resumePhotos : t.pausePhotos}>
                            {paused || !motion ? <Play size={16} /> : <Pause size={16} />}
                        </button>
                    </div>
                    {playing
                        ? <button className="text-link conference-link" onClick={() => setPlaying(false)}>{t.close}<X size={15} /></button>
                        : video
                            ? <button className="text-link conference-link" onClick={() => setPlaying(true)}>{t.playSound}<ArrowUpRight size={17} /></button>
                            : firstTalk && <button className="text-link conference-link" onClick={() => show(firstTalk.slide, true)}>{t.watchConference}<ArrowUpRight size={17} /></button>}
                </div>
            </div>
            <p className="sr-only">{running ? t.galleryRunning : t.galleryPaused}</p>
            <div className="event-filmstrip">
                {t.events.map((event, i) => {
                    const talk = t.conferences.find(item => item.slide === i);
                    return (
                        <button className={index === i ? 'selected' : ''} aria-label={`${i + 1}. ${talk ? talk.title : event.title}`} aria-pressed={index === i} key={event.image} onClick={() => pick(i)}>
                            <img src={asset(small(event.image))} alt="" loading="lazy" />
                            {talk && <span className="filmstrip-talk" aria-hidden="true"><Play size={10} /></span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
