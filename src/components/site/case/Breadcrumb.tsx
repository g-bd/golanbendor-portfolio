'use client';

import { useLanguage } from '@/context/LanguageContext';
import { pageWords } from '@/data/siteContent';

export default function Breadcrumb({ title }: { title?: string }) {
    const { language } = useLanguage();
    const w = pageWords[language];
    return (
        <nav className="breadcrumbs" aria-label={language === 'he' ? 'מיקום באתר' : 'Breadcrumb'}>
            <a href={`/${language}/`}>{w.home}</a>
            <span>/</span>
            <a href={`/${language}/work/`}>{w.projects}</a>
            {title && <><span>/</span><span aria-current="page">{title}</span></>}
        </nav>
    );
}
