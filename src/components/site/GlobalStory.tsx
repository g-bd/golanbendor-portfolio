'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { archive } from '@/data/siteContent';
import { speakingCopy } from '@/data/pagesContent';
import Label from './Label';
import Headline from './Headline';
import Globe from './Globe';
import Events from './Events';
import CountUp from './CountUp';

// Section 04: globe of conference cities, selected recognition, event gallery
// (the ISTRC talk plays inline inside the gallery frame).
export default function GlobalStory() {
    const { language, theme } = useLanguage();
    const { motion } = useMotion();
    const t = archive[language];
    const [moreOpen, setMoreOpen] = useState(false);
    return (
        <section id="global" className="global-story shell section-pad">
            <div className="global-grid reveal">
                <div className="global-copy">
                    <Label>{t.globalLabel}</Label>
                    <Headline lines={t.globalTitle} accent={[1]} />
                    <p>{t.globalDesc}</p>
                    <div className="global-stat"><strong dir="ltr"><CountUp value="15" /><span>+</span></strong><span>{t.globalStat}</span></div>
                    <p className="city-list">{t.cities}</p>
                </div>
                <Globe t={t} motion={motion} theme={theme} />
            </div>
            <div className="awards-block reveal">
                <Label>{t.recognitionLabel}</Label>
                <div className="awards">{t.awards.slice(0, 3).map(([year, title, desc]) => <article key={title}><p className="eyebrow">{year}</p><h3>{title}</h3><p>{desc}</p></article>)}</div>
                <details className="more-awards" onToggle={event => setMoreOpen(event.currentTarget.open)}>
                    <summary>{t.recognitionMore}<span aria-hidden="true">+</span></summary>
                    <div className="awards">{moreOpen && t.awards.slice(3).map(([year, title, desc]) => <article key={title}><p className="eyebrow">{year}</p><h3>{title}</h3><p>{desc}</p></article>)}</div>
                </details>
            </div>
            <Events t={t} rtl={language === 'he'} motion={motion} />
            <a className="text-link archive-link" href={`/${language}/speaking/`}>{speakingCopy[language].title}<ArrowUpRight size={17} /></a>
        </section>
    );
}
