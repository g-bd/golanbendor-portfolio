'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { archive } from '@/data/siteContent';
import { asset } from '@/lib/site';
import Label from './Label';
import VideoDialog, { DialogMedia } from './VideoDialog';
import PressDossier from './PressDossier';

// Featured stage + selectable playlist. Hovering a row previews it on the stage,
// clicking plays it in the in-page dialog. Arrow keys move through the playlist.
export default function MediaStory() {
    const { language } = useLanguage();
    const t = archive[language];
    const [selected, setSelected] = useState<DialogMedia | null>(null);
    const [featured, setFeatured] = useState(0);
    const rows = useRef<(HTMLButtonElement | null)[]>([]);
    const current = t.media[featured];
    const portrait = current.ratio < 1;
    const play = (i: number) => { setFeatured(i); setSelected({ kind: 'file', item: t.media[i] }); };
    function keySelect(event: React.KeyboardEvent, i: number) {
        const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, ArrowRight: language === 'he' ? -1 : 1, ArrowLeft: language === 'he' ? 1 : -1 };
        if (!(event.key in moves)) return;
        event.preventDefault();
        const next = (i + moves[event.key] + t.media.length) % t.media.length;
        setFeatured(next); rows.current[next]?.focus();
    }
    return (
        <section id="media" className="media-story shell">
            <div className="section-heading reveal"><div><Label>{t.mediaLabel}</Label><h2>{t.mediaTitle[0]}<br /><span className="cyan-text">{t.mediaTitle[1]}</span></h2></div><p>{t.mediaDesc}</p></div>
            <div className="media-studio refined-studio reveal">
                <div className={portrait ? 'studio-feature portrait-feature' : 'studio-feature landscape-feature'}>
                    <button className="studio-screen" style={{ ['--source-ratio' as string]: current.ratio } as React.CSSProperties} onClick={() => play(featured)} aria-label={`${t.play}: ${current.title}`}>
                        <img src={asset(current.poster)} alt="" loading="lazy" />
                        <span className="play-orb"><Play size={26} fill="currentColor" /></span>
                        <span className="studio-poster-bar"><span>{current.tag}</span><span dir="ltr">{current.duration}</span></span>
                    </button>
                    <div className="studio-caption">
                        {portrait && <><p className="eyebrow">{current.tag}</p><p className="portrait-duration" dir="ltr">{current.duration}</p></>}
                        <p>{current.desc}</p>
                        {portrait && <button className="text-link" onClick={() => play(featured)}>{t.play}<ArrowUpRight size={18} /></button>}
                    </div>
                </div>
                <div className="studio-playlist" aria-label={t.chooseVideo}>
                    <p className="eyebrow playlist-label">{t.chooseVideo}<span dir="ltr">01—0{t.media.length}</span></p>
                    {t.media.map((item, i) => (
                        <button ref={node => { rows.current[i] = node; }} className={`playlist-item ${featured === i ? 'selected' : ''}`} key={item.video} aria-pressed={featured === i} aria-label={`${t.play}: ${item.title}`}
                            onPointerEnter={event => { if (event.pointerType === 'mouse' && selected === null) setFeatured(i); }} onFocus={() => setFeatured(i)} onClick={() => play(i)} onKeyDown={event => keySelect(event, i)}>
                            <span className="playlist-thumb"><img src={asset(item.poster)} alt="" loading="lazy" /><span className="thumb-index" aria-hidden="true">0{i + 1}</span><span className="thumb-duration" dir="ltr">{item.duration}</span></span>
                            <span className="playlist-copy">
                                <span className="eyebrow">{item.tag}</span>
                                <span className="playlist-title">{item.title}</span>
                                {featured === i && <span className="selected-label"><span className="equalizer" aria-hidden="true"><i /><i /><i /></span>{t.selectedVideo}</span>}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <PressDossier t={t} />
            <VideoDialog media={selected} t={t} onClose={() => setSelected(null)} />
        </section>
    );
}
