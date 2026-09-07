'use client';

import { ArrowUpRight, FileText } from 'lucide-react';
import { archive } from '@/data/siteContent';
import { Language } from '@/data/translations';
import { asset, external } from '@/lib/site';
import Label from './Label';

const TOOLS = ['MATSim / Java', 'Python / Pandas', 'Spatial SQL', 'ArcGIS Pro', 'QGIS', 'AI workflows', 'Git'];

export function Career({ lang }: { lang: Language }) {
    const t = archive[lang];
    return (
        <div className="career-block reveal">
            <div className="career-intro"><Label>{t.careerLabel}</Label><h3>{t.careerTitle}</h3></div>
            <div className="career-list">
                {t.career.map(([year, role, org]) => (
                    <article className="career-role" key={role}><span className="eyebrow">{year}</span><div><h4>{role}</h4><p>{org}</p></div></article>
                ))}
            </div>
            <div className="toolkit"><p className="eyebrow">{t.toolkit}</p><div>{TOOLS.map(tool => <span key={tool} dir="ltr">{tool}</span>)}</div></div>
        </div>
    );
}

export function Academic({ lang }: { lang: Language }) {
    const t = archive[lang];
    return (
        <div className="academic-block reveal">
            <Label>{t.thesisLabel}</Label>
            <div className="theses">
                {t.theses.map(([type, title, file]) => (
                    <a href={asset(file)} key={file} className="thesis" {...external}>
                        <FileText size={24} strokeWidth={1.4} />
                        <div><p className="eyebrow">{type}</p><h3>{title}</h3><span className="text-link">{t.thesisRead}<ArrowUpRight size={17} /></span></div>
                    </a>
                ))}
            </div>
        </div>
    );
}
