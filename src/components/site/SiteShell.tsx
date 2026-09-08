'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { content } from '@/data/siteContent';
import TrafficCanvas from './TrafficCanvas';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

// Chrome shared by every page: skip link, ambient background, header, main, footer.
// Also publishes --scroll-progress (0..1) for the header's reading-progress line.
export default function SiteShell({ children }: { children: React.ReactNode }) {
    const { language, direction } = useLanguage();
    const { motion } = useMotion();
    const t = content[language];
    // After a language switch, return to the same section/offset the reader was at.
    useEffect(() => {
        let raw: string | null = null;
        try { raw = sessionStorage.getItem('lang-switch-anchor'); if (raw) sessionStorage.removeItem('lang-switch-anchor'); } catch { /* ignore */ }
        if (!raw) return;
        const restore = () => {
            try {
                const p = JSON.parse(raw as string) as { id?: string; frac?: number; y?: number };
                const el = p.id ? document.getElementById(p.id) : null;
                const y = el ? el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4 + (p.frac ?? 0) * el.offsetHeight : (p.y ?? 0);
                const html = document.documentElement; const prev = html.style.scrollBehavior; html.style.scrollBehavior = 'auto';
                window.scrollTo(0, Math.max(0, y)); html.style.scrollBehavior = prev;
            } catch { /* ignore */ }
        };
        restore();
        const t1 = setTimeout(restore, 120), t2 = setTimeout(restore, 600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);
    useEffect(() => {
        let frame = 0;
        let previousY = window.scrollY;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            document.documentElement.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
            if (Math.abs(window.scrollY - previousY) > 2) document.documentElement.dataset.driveDirection = window.scrollY < previousY ? 'reverse' : 'forward';
            previousY = window.scrollY;
        };
        let stop: ReturnType<typeof setTimeout> | undefined, idle: ReturnType<typeof setTimeout> | undefined;
        const html = document.documentElement;
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
            html.dataset.drive = 'driving';
            clearTimeout(stop); clearTimeout(idle);
            stop = setTimeout(() => { html.dataset.drive = 'braking'; idle = setTimeout(() => { html.dataset.drive = 'idle'; }, 700); }, 160);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(frame); clearTimeout(stop); clearTimeout(idle); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, []);
    return (
        <div className="portfolio" dir={direction}>
            <a className="skip-link" href="#main">{t.skip}</a>
            <div className="grid-overlay" aria-hidden="true" />
            <TrafficCanvas enabled={motion} />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
        </div>
    );
}
