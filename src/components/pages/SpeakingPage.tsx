'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { archive } from '@/data/siteContent';
import { speakingCopy } from '@/data/pagesContent';
import { asset } from '@/lib/site';
import Label from '@/components/site/Label';
import TalkPreview from '@/components/site/TalkPreview';
import PageBreadcrumb from './PageBreadcrumb';

// /[lang]/speaking — talks, interviews, recognition and cities. All facts come from
// siteContent.archive; page framing from pagesContent.speakingCopy.
// Talk cards loop a silent local excerpt (TalkPreview); the youtube-nocookie iframe and the MP4
// players mount only after a click — nothing loads from YouTube on page load, and every video plays inline in its own frame.
export default function SpeakingPage() {
    const { language } = useLanguage();
    const { motion } = useMotion();
    const t = archive[language];
    const c = speakingCopy[language];
    const [talk, setTalk] = useState<number | null>(null);
    const [playing, setPlaying] = useState<number | null>(null);
    const player = useRef<HTMLVideoElement>(null);
    const cities = t.cities.split(' · ');
    const openTalk = (index: number) => { setPlaying(null); setTalk(index); };
    const openMedia = (index: number) => { setTalk(null); setPlaying(index); };

    useEffect(() => {
        if (playing !== null) player.current?.play().catch(() => {});
    }, [playing]);

    return (
        <article className="speaking-page shell">
            <PageBreadcrumb title={c.title} />
            <header className="speaking-header">
                <Label>{c.eyebrow}</Label>
                <h1>{c.title}</h1>
                <p>{c.intro}</p>
            </header>

            <section className="speaking-section" id="talks" aria-labelledby="speaking-talks">
                <div className="row-heading">
                    <div><Label>{c.talksLabel}</Label><h2 id="speaking-talks">{c.talksTitle}</h2></div>
                    <p>{c.talksDesc}</p>
                </div>
                {t.conferences.map((video, i) => {
                    const active = talk === i;
                    return (
                        <div key={video.youtubeId} className={`speaking-talk ${active ? 'is-playing' : ''}`}>
                            <div className="speaking-talk-frame">
                                {active ? (
                                    <iframe src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?start=${video.start}&autoplay=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                ) : (
                                    <TalkPreview className="speaking-talk-poster" video={video} image={video.poster} label={t.playSound} motion={motion} onPlay={() => openTalk(i)}>
                                        <span className="eyebrow" dir="ltr">{video.event} · YouTube</span>
                                    </TalkPreview>
                                )}
                            </div>
                            <div className="speaking-talk-copy">
                                <p className="eyebrow">{video.event}</p>
                                <h3>{video.title}</h3>
                                <p>{video.desc}</p>
                                <small>{c.talkHint}</small>
                                <button className="text-link" onClick={() => active ? setTalk(null) : openTalk(i)} aria-pressed={active}>
                                    {active ? t.close : t.playSound}{active ? <X size={15} /> : <ArrowUpRight size={17} />}
                                </button>
                            </div>
                        </div>
                    );
                })}
                <ul className="speaking-grid">
                    {t.events.map((event, i) => (
                        <li key={event.image}>
                            <figure className="speaking-figure">
                                <img src={asset(event.image)} alt={event.title} loading="lazy" />
                                <figcaption>
                                    <span className="eyebrow"><span dir="ltr">{String(i + 1).padStart(2, '0')}</span> · {event.tag}</span>
                                    <strong>{event.title}</strong>
                                    <span>{event.desc}</span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="speaking-section" id="interviews" aria-labelledby="speaking-media">
                <div className="row-heading">
                    <div><Label>{c.mediaLabel}</Label><h2 id="speaking-media">{c.mediaTitle}</h2></div>
                    <p>{c.mediaDesc}</p>
                </div>
                <ol className="speaking-media">
                    {t.media.map((item, i) => {
                        const active = playing === i;
                        return (
                            <li key={item.video} className={`speaking-media-item ${item.ratio < 1 ? 'is-portrait' : ''} ${active ? 'is-playing' : ''}`}>
                                <div className="speaking-media-frame">
                                    {active ? (
                                        <video ref={player} src={asset(item.video)} poster={asset(item.poster)} controls playsInline preload="metadata" aria-label={item.title} onEnded={() => setPlaying(null)} />
                                    ) : (
                                        <button className="speaking-media-poster" onClick={() => openMedia(i)} aria-label={`${c.play}: ${item.title}`}>
                                            <img src={asset(item.poster)} alt="" loading="lazy" />
                                            <span className="speaking-play" aria-hidden="true"><Play size={20} /></span>
                                        </button>
                                    )}
                                </div>
                                <div className="speaking-media-copy">
                                    <p className="eyebrow">{item.tag}</p>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <p className="speaking-media-meta"><span>{item.source}</span><i /><span dir="ltr">{item.duration}</span>{active && <><i /><span className="speaking-live"><span className="status-dot" />{c.nowPlaying}</span></>}</p>
                                    {active
                                        ? <button className="text-link" onClick={() => setPlaying(null)}>{t.close}<X size={15} /></button>
                                        : <button className="text-link" onClick={() => openMedia(i)}>{c.play}<ArrowUpRight size={17} /></button>}
                                </div>
                            </li>
                        );
                    })}
                </ol>
                <small className="speaking-note">{t.captionsNote}</small>
            </section>

            <section className="speaking-section" id="recognition" aria-labelledby="speaking-recognition">
                <div className="row-heading">
                    <div><Label>{c.recognitionLabel}</Label><h2 id="speaking-recognition">{c.recognitionTitle}</h2></div>
                    <p>{c.recognitionDesc}</p>
                </div>
                <ul className="speaking-awards">
                    {t.awards.map(([year, title, desc]) => (
                        <li key={title}>
                            <p className="eyebrow" dir="ltr">{year}</p>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="speaking-section" id="cities" aria-labelledby="speaking-cities">
                <div className="row-heading">
                    <div><Label>{c.citiesLabel}</Label><h2 id="speaking-cities">{c.citiesTitle}</h2></div>
                    <p>{c.citiesDesc}</p>
                </div>
                <div className="speaking-cities">
                    <p className="speaking-cities-stat"><strong>{cities.length}</strong><span>{t.globalStat}</span></p>
                    <ul>{cities.map(city => <li key={city}>{city}</li>)}</ul>
                </div>
            </section>

            <aside className="speaking-cta">
                <Label>{c.ctaLabel}</Label>
                <h2>{c.ctaTitle}</h2>
                <p>{c.ctaText}</p>
                <a className="button" href={`/${language}/#contact`}>{c.ctaButton}<ArrowUpRight size={17} /></a>
            </aside>
        </article>
    );
}
