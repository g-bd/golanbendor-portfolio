'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Captions } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { archive } from '@/data/siteContent';
import { asset } from '@/lib/site';
import Label from './Label';
import PressDossier from './PressDossier';

// Broadcast stage + channel list. Hovering the stage scrubs through four frames of
// the video; hovering a row previews its poster; clicking a row (or the stage) plays
// the video INLINE in the same frame — no overlay, no new window.
export default function MediaStory() {
    const { language } = useLanguage();
    const { motion } = useMotion();
    const t = archive[language];
    const [featured, setFeatured] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [frame, setFrame] = useState(0); // 0 = poster, 1..4 = scrub frames
    const rows = useRef<(HTMLButtonElement | null)[]>([]);
    const player = useRef<HTMLVideoElement>(null);
    const scrub = useRef<ReturnType<typeof setInterval> | null>(null);
    const current = t.media[featured];
    const portrait = current.ratio < 1;

    useEffect(() => {
        if (playing) player.current?.play().catch(() => {});
    }, [playing, featured]);
    useEffect(() => () => { if (scrub.current) clearInterval(scrub.current); }, []);

    const stopScrub = () => { if (scrub.current) clearInterval(scrub.current); scrub.current = null; setFrame(0); };
    const startScrub = () => {
        if (!motion || scrub.current) return;
        let k = 0;
        scrub.current = setInterval(() => { k = (k % 4) + 1; setFrame(k); }, 750);
    };
    const play = (i: number) => { stopScrub(); setFeatured(i); setPlaying(true); };
    const preview = (i: number) => { if (i !== featured) { stopScrub(); setPlaying(false); setFeatured(i); } };
    function keySelect(event: React.KeyboardEvent, i: number) {
        const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, ArrowRight: language === 'he' ? -1 : 1, ArrowLeft: language === 'he' ? 1 : -1 };
        if (!(event.key in moves)) return;
        event.preventDefault();
        const next = (i + moves[event.key] + t.media.length) % t.media.length;
        preview(next); rows.current[next]?.focus();
    }
    const ratioStyle = { ['--source-ratio' as string]: current.ratio } as React.CSSProperties;

    return (
        <section id="media" className="media-story shell">
            <div className="section-heading reveal"><div><Label>{t.mediaLabel}</Label><h2>{t.mediaTitle[0]}<br /><span className="cyan-text">{t.mediaTitle[1]}</span></h2></div><p>{t.mediaDesc}</p></div>
            <div className="media-studio refined-studio reveal">
                <div className={portrait ? 'studio-feature portrait-feature' : 'studio-feature landscape-feature'}>
                    {playing ? (
                        <div className="studio-screen is-playing" style={ratioStyle}>
                            <video ref={player} key={current.video} src={asset(current.video)} poster={asset(current.poster)} controls playsInline preload="metadata" aria-label={current.title} onEnded={() => setPlaying(false)} />
                        </div>
                    ) : (
                        <button className="studio-screen" style={ratioStyle} onClick={() => play(featured)} onPointerEnter={startScrub} onPointerLeave={stopScrub} onFocus={startScrub} onBlur={stopScrub} aria-label={`${t.play}: ${current.title}`}>
                            <img src={asset(current.poster)} alt="" loading="lazy" />
                            <span className="studio-frames" aria-hidden="true">
                                {current.frames.map((f, k) => <img key={f} src={asset(f)} alt="" className={frame === k + 1 ? 'active' : ''} loading="lazy" />)}
                            </span>
                            <span className="studio-tag-chip">{current.tag}</span>
                            <span className="studio-poster-bar">
                                <span className="broadcast"><span className="status-dot" />{current.source}<span dir="ltr">· {current.duration}</span></span>
                                <span className="broadcast-cta">{t.play}<ArrowUpRight size={15} /></span>
                            </span>
                        </button>
                    )}
                    <div className="studio-caption">
                        {portrait && <><p className="eyebrow">{current.tag}</p><p className="portrait-duration" dir="ltr">{current.duration}</p></>}
                        <p>{current.desc}</p>
                        {portrait && !playing && <button className="text-link" onClick={() => play(featured)}>{t.play}<ArrowUpRight size={18} /></button>}
                        {playing && <small className="video-language"><Captions size={13} />{t.captionsNote}</small>}
                    </div>
                </div>
                <div className="studio-playlist" aria-label={t.chooseVideo}>
                    <p className="eyebrow playlist-label">{t.chooseVideo}<span dir="ltr">01—0{t.media.length}</span></p>
                    {t.media.map((item, i) => (
                        <button ref={node => { rows.current[i] = node; }} className={`playlist-item ${featured === i ? 'selected' : ''}`} key={item.video} aria-pressed={featured === i} aria-label={`${t.play}: ${item.title}`}
                            onPointerEnter={event => { if (event.pointerType === 'mouse' && !playing) preview(i); }} onFocus={() => { if (!playing) preview(i); }} onClick={() => play(i)} onKeyDown={event => keySelect(event, i)}>
                            <span className="playlist-index" aria-hidden="true">0{i + 1}</span>
                            <span className="playlist-thumb"><img src={asset(item.poster)} alt="" loading="lazy" /></span>
                            <span className="playlist-copy">
                                <span className="playlist-title">{item.title}</span>
                                <span className="playlist-desc">{item.desc}</span>
                                <span className="playlist-meta">
                                    <span>{item.source}</span><i /><span dir="ltr">{item.duration}</span>
                                    {featured === i && <><i /><span className="selected-label"><span className="equalizer" aria-hidden="true"><i /><i /><i /></span>{playing ? t.nowPlaying : t.selectedVideo}</span></>}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <PressDossier t={t} lang={language} />
        </section>
    );
}
