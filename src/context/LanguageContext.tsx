'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [direction, setDirection] = useState<Direction>('ltr');

    useEffect(() => {
        // Auto-detect language
        if (typeof window !== "undefined" && navigator.language) {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'he') {
                setLanguage('he');
            }
        }
    }, []);

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

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'he' : 'en');
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
