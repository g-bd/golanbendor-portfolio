'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { content } from '@/data/siteContent';
import { external, GITHUB, LINKEDIN } from '@/lib/site';

export default function SiteFooter() {
    const { language } = useLanguage();
    const { motion, setMotion } = useMotion();
    const t = content[language];
    return (
        <footer className="footer shell">
            <Link className="brand" href={`/${language}/`}>
                <img className="theme-only-dark" src="/logo_recolored.png" alt="" width={31} height={31} />
                <img className="theme-only-light" src="/logo-light.png" alt="" width={31} height={31} />
                <span>{t.name}</span>
            </Link>
            <div className="footer-links">
                <Link href={`/${language}/work/`}>{t.allProjects}</Link>
                <Link href={`/${language}/privacy/`}>{t.privacy}</Link>
                <Link href={`/${language}/accessibility/`}>{t.accessibility}</Link>
                <a href={LINKEDIN} {...external}>LinkedIn<ArrowUpRight size={13} /></a>
                <a href={GITHUB} {...external}>GitHub<ArrowUpRight size={13} /></a>
                <button className="motion-control" aria-label={motion ? t.motionOn : t.motionOff} aria-pressed={!motion} onClick={() => setMotion(!motion)}>
                    {motion ? <Pause size={14} /> : <Play size={14} />}<span>{motion ? t.motionOn : t.motionOff}</span>
                </button>
                <a className="icon-button" href="#main" aria-label={t.back}><ArrowUp size={18} /></a>
            </div>
        </footer>
    );
}
