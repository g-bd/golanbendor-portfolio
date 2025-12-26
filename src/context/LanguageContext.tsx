'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { translations, Language, Direction } from '../data/translations';

interface LanguageContextType {
    language: Language;
    direction: Direction;
    t: (key: string) => string; // Simple key based lookup
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    langData: any; // The whole object for easy destructuring
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    initialLang?: Language;
}

export const LanguageProvider = ({ children, initialLang }: LanguageProviderProps) => {
    const router = useRouter();
    const pathname = usePathname();

    // Determine language from URL path or prop
    const getLangFromPath = (): Language => {
        if (initialLang) return initialLang;
        if (pathname?.startsWith('/he')) return 'he';
        return 'en';
    };

    const [language, setLanguageState] = useState<Language>(getLangFromPath());
    const [direction, setDirection] = useState<Direction>(language === 'he' ? 'rtl' : 'ltr');

    // Sync language with URL on mount and path changes
    useEffect(() => {
        const langFromPath = getLangFromPath();
        if (langFromPath !== language) {
            setLanguageState(langFromPath);
        }
    }, [pathname, initialLang]);

    useEffect(() => {
        // Update direction when language changes
        const newDir = language === 'he' ? 'rtl' : 'ltr';
        setDirection(newDir);
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
        // Navigate to the new language route
        const newPath = `/${lang}`;
        router.push(newPath);
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'he' : 'en';
        setLanguage(newLang);
    };

    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj) || path;
    };

    const t = (key: string) => {
        return getNestedValue(translations[language], key);
    };

    return (
        <LanguageContext.Provider value={{
            language,
            direction,
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
