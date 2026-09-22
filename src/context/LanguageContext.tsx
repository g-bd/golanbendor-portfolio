'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { translations, Language, Direction } from '../data/translations';
import { useTheme, Theme } from './ThemeContext';

interface LanguageContextType {
    language: Language;
    direction: Direction;
    theme: Theme; // mirrored from ThemeContext so map components can restyle per theme
    t: (key: string) => string; // Simple key based lookup
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    langData: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    initialLang?: Language;
}

export const LanguageProvider = ({ children, initialLang }: LanguageProviderProps) => {
    const pathname = usePathname();
    const { theme } = useTheme();

    const language: Language = pathname?.startsWith('/he') ? 'he' : pathname?.startsWith('/en') ? 'en' : initialLang ?? 'en';
    const direction: Direction = language === 'he' ? 'rtl' : 'ltr';

    useEffect(() => {
        // Update direction when language changes
        const newDir = language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.dir = newDir;
        document.documentElement.lang = language;

        // Apply Hebrew font class to body if Hebrew
        if (language === 'he') {
            document.body.classList.add('font-hebrew');
        } else {
            document.body.classList.remove('font-hebrew');
        }
    }, [language]);

    const setLanguage = (lang: Language) => {
        // Navigate to the new language route while preserving the current path
        // Replace /en or /he at the start of the path with the new language
        let newPath = `/${lang}/`;

        if (pathname) {
            // Remove the current language prefix and add the new one
            const pathWithoutLang = pathname.replace(/^\/(en|he)/, '');
            newPath = `/${lang}${pathWithoutLang}`;
        }

        // Use a full-page navigation instead of the Next.js client router.
        // This is a static export (output: 'export'); the App Router's
        // soft-navigation tries to fetch RSC segment data (e.g.
        // /en/__next.$d$lang.__PAGE__.txt) which does not exist on a static
        // host, so router.push() fails intermittently. A hard navigation
        // always loads the correct pre-rendered page with the right
        // lang/dir/metadata.
        if (typeof window !== 'undefined') {
            // Remember where the reader is (nearest section + offset inside it) so the
            // other-language page restores the same place instead of jumping to the top.
            try {
                let anchor: HTMLElement | null = null;
                document.querySelectorAll<HTMLElement>('main [id]').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.height > 80 && rect.top <= window.innerHeight * 0.4) anchor = el;
                });
                const payload = anchor
                    ? { id: (anchor as HTMLElement).id, frac: (window.innerHeight * 0.4 - (anchor as HTMLElement).getBoundingClientRect().top) / (anchor as HTMLElement).offsetHeight }
                    : { y: window.scrollY };
                sessionStorage.setItem('lang-switch-anchor', JSON.stringify(payload));
            } catch { /* private mode */ }
            window.location.assign(newPath);
        }
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'he' : 'en';
        setLanguage(newLang);
    };

    const getNestedValue = (obj: unknown, path: string): string => {
        const value = path.split('.').reduce<unknown>((prev, curr) => prev && typeof prev === 'object' ? (prev as Record<string, unknown>)[curr] : undefined, obj);
        return typeof value === 'string' ? value : path;
    };

    const t = (key: string) => {
        return getNestedValue(translations[language], key);
    };

    return (
        <LanguageContext.Provider value={{
            language,
            direction,
            theme,
            t,
            toggleLanguage,
            setLanguage,
            langData: translations[language]
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
