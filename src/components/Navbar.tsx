'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NavbarProps {
    /** If true, nav links point to /${language}#section. If false, just #section */
    isSubpage?: boolean;
}

export default function Navbar({ isSubpage = false }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { langData, toggleLanguage, language, direction } = useLanguage();
    const t = langData;

    // Transparent at the top (hero shows through); solid glass once scrolled
    // so nav text stays readable over page content (no text-on-text).
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Generate link href based on whether we're on a subpage or home
    const getHref = (anchor: string) => {
        return isSubpage ? `/${language}#${anchor}` : `#${anchor}`;
    };

    const navItems = [
        { key: 'about', label: t.nav.about },
        { key: 'skills', label: t.nav.skills },
        { key: 'work', label: t.nav.work },
        { key: 'knowledge', label: t.nav.knowledge },
        { key: 'publications', label: t.nav.publications },
        { key: 'contact', label: t.nav.contact },
    ];

    return (
        <>
            {/* Navbar Container - sticky positioning handled by CSS */}
            <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`} dir={direction}>
                <nav>
                    <Link href={isSubpage ? `/${language}` : '#'} className="brand">
                        <Image
                            src="/logo_recolored.png"
                            alt="Dr. Golan Ben-Dor Logo"
                            width={100}
                            height={100}
                        />
                        <span className="brand-text">{t.nav.brand_name}</span>
                    </Link>

                    <div className="nav-links">
                        {navItems.map((item) => (
                            <Link key={item.key} href={getHref(item.key)}>
                                {item.label}
                            </Link>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 hover:border-[var(--pop-cyan)] transition-all group"
                            aria-label="Toggle Language"
                        >
                            <Globe size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--pop-cyan)]" />
                            <span className="text-[0.9rem] font-bold text-[var(--text-secondary)] group-hover:text-[var(--pop-cyan)]">
                                {language === 'en' ? 'HE' : 'EN'}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay - OUTSIDE navbar-wrapper for proper z-index */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} dir={direction}>
                {navItems.map((item) => (
                    <Link
                        key={item.key}
                        href={getHref(item.key)}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}

                <button
                    onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                    className="mobile-lang-btn"
                    aria-label="Toggle Language"
                >
                    <Globe size={20} />
                    <span>{language === 'en' ? 'עברית' : 'English'}</span>
                </button>
            </div>
        </>
    );
}
