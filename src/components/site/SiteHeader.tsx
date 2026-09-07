'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';
import { content } from '@/data/siteContent';
import { HOME_SECTIONS } from '@/lib/site';
import CarIcon from './CarIcon';

export const isHomePath = (pathname: string | null) => /^\/(en|he)\/?$/.test(pathname || '');

// Fixed header: transparent over the hero, glass strip once scrolled. Section
// links are anchors on the home page and `/lang/#section` from subpages.
export default function SiteHeader() {
    const { language, direction, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { motion } = useMotion();
    const pathname = usePathname();
    const isHome = isHomePath(pathname);
    const t = content[language];
    const rtl = direction === 'rtl';
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('intro');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > 35);
            if (!isHome) return;
            let current = 'intro';
            for (const id of HOME_SECTIONS) {
                const top = document.getElementById(id)?.getBoundingClientRect().top;
                if (top !== undefined && top <= window.innerHeight * 0.4) current = id;
            }
            setActive(current);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, [isHome]);

    useEffect(() => {
        const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
        document.addEventListener('keydown', escape);
        return () => document.removeEventListener('keydown', escape);
    }, []);

    const home = (id: string) => (isHome ? `#${id}` : `/${language}/#${id}`);
    const close = () => setMenuOpen(false);

    return (
        <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
            <div className="nav-wrap">
                <Link href={`/${language}/`} className="brand" onClick={close} aria-label={t.fullName}>
                    <img className="theme-only-dark" src="/logo_recolored.png" alt="" width={47} height={47} />
                    <img className="theme-only-light" src="/logo-light.png" alt="" width={47} height={47} />
                    <span>{t.name}</span>
                </Link>
                <nav id="main-nav" className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label={t.mainNav}>
                    {HOME_SECTIONS.slice(1).map((id, i) =>
                        id === 'work' && !isHome
                            ? <Link href={`/${language}/work/`} key={id} onClick={close}>{t.nav[i]}</Link>
                            : <a href={home(id)} key={id} className={isHome && active === id ? 'active' : ''} onClick={close}>{t.nav[i]}</a>
                    )}
                </nav>
                <div className="nav-tools">
                    <button className="theme-toggle icon-button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark} title={t.themeTitle}>
                        <Sun className="theme-only-dark" size={18} />
                        <Moon className="theme-only-light" size={18} />
                    </button>
                    <button className="language-toggle" aria-label={t.langSwitch} onClick={() => { close(); toggleLanguage(); }}>
                        <span className={!rtl ? 'selected' : ''}>EN</span>
                        <span className="language-divider">/</span>
                        <span className={rtl ? 'selected' : ''}>HE</span>
                    </button>
                    <button className="menu-toggle icon-button" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} aria-controls="main-nav">
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
            {motion && <span className="header-car" aria-hidden="true"><CarIcon gradientId="header-car-beam" /></span>}
        </header>
    );
}
