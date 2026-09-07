'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { pageWords } from '@/data/siteContent';

export default function Breadcrumb({ title }: { title?: string }) {
    const { language } = useLanguage();
    const w = pageWords[language];
    return (
        <nav className="breadcrumbs" aria-label={language === 'he' ? 'מיקום באתר' : 'Breadcrumb'}>
            <Link href={`/${language}/`}>{w.home}</Link>
            <span>/</span>
            <Link href={`/${language}/work/`}>{w.projects}</Link>
            {title && <><span>/</span><span aria-current="page">{title}</span></>}
        </nav>
    );
}
