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
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            document.documentElement.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
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
