'use client';

import { useLanguage } from '@/context/LanguageContext';
import { pageWords } from '@/data/siteContent';

// Two-level breadcrumb (Home / current page) for the standalone pages. Same markup and
// `.breadcrumbs` styling as case/Breadcrumb, without the "All projects" crumb that only
// makes sense under /work.
export default function PageBreadcrumb({ title }: { title: string }) {
    const { language } = useLanguage();
    return (
        <nav className="breadcrumbs" aria-label={language === 'he' ? 'מיקום באתר' : 'Breadcrumb'}>
            <a href={`/${language}/`}>{pageWords[language].home}</a>
            <span>/</span>
            <span aria-current="page">{title}</span>
        </nav>
    );
}
