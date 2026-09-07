'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { external } from '@/lib/site';
import { pageWords } from '@/data/siteContent';
import Label from '@/components/site/Label';

const SECTIONS = {
    privacy: ['overview', 'data', 'cookies', 'hosting', 'links', 'contact'],
    accessibility: ['commitment', 'done', 'exceptions', 'coordinator'],
} as const;

// Privacy policy and accessibility statement. All text comes from translations.ts
// (`privacy` / `accessibility` keys) — edit there, in both languages.
export default function InformationPage({ page }: { page: keyof typeof SECTIONS }) {
    const { langData, language } = useLanguage();
    const w = pageWords[language];
    const t = langData[page];
    const keys = SECTIONS[page];
    return (
        <article className="information-page shell">
            <Link className="text-link" href={`/${language}/`}>{language === 'he' ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}{t.back_home}</Link>
            <header>
                <Label>{page === 'privacy' ? t.overview_label : t.commitment_label}</Label>
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
                <small>{t.last_updated}</small>
            </header>
            <div className="information-layout">
                <nav aria-label={w.jump}>
                    {keys.map((key, i) => <a href={`#${key}`} key={key}><span>0{i + 1}</span>{t[`${key}_title`]}</a>)}
                </nav>
                <div>
                    {keys.map(key => (
                        <section key={key} id={key}>
                            <Label>{t[`${key}_label`]}</Label>
                            <h2>{t[`${key}_title`]}</h2>
                            {t[`${key}_text`] && <p>{t[`${key}_text`]}</p>}
                            {t[`${key}_items`] && <ul>{(t[`${key}_items`] as string[]).map(item => <li key={item}>{item}</li>)}</ul>}
                            {key === 'hosting' && <a className="text-link" href={t.hosting_link_url} {...external}>{t.hosting_link_text}</a>}
                            {(key === 'coordinator' || key === 'contact') && (
                                <div className="legal-contact">
                                    {key === 'coordinator' && t.coordinator_name && <strong>{t.coordinator_name}</strong>}
                                    <a href="mailto:golanbendor@gmail.com">golanbendor@gmail.com</a>
                                    <a href="https://wa.me/972522937463" dir="ltr" {...external}>+972-52-293-7463</a>
                                    {key === 'coordinator' && t.coordinator_response && <small>{t.coordinator_response}</small>}
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
}
