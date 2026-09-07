'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';
import { HomeContent, StoryProject } from '@/data/siteContent';
import { asset } from '@/lib/site';

// "Inside the project" summary for the three story chapters, linking to the full case study.
export default function CaseDialog({ project, t, language, onClose }: { project: StoryProject | null; t: HomeContent; language: string; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (project && !element.open) element.showModal();
        if (!project && element.open) element.close();
    }, [project]);
    return (
        <dialog ref={ref} className="case-dialog" onClose={onClose} onClick={event => { if (event.target === ref.current) onClose(); }} aria-labelledby="case-title">
            {project && (
                <div className={`case-dialog-inner accent-${project.color}`}>
                    <button className="icon-button modal-close" onClick={onClose} aria-label={t.close}><X /></button>
                    <img className="case-dialog-image" src={asset(project.image)} alt={project.alt} />
                    <div className="case-dialog-copy">
                        <p className="eyebrow">{project.tag}</p>
                        <h2 id="case-title">{project.name}</h2>
                        <p>{project.text}</p>
                        <h3 className="eyebrow">{t.caseOverview}</h3><p>{project.detail}</p>
                        <h3 className="eyebrow">{t.caseResult}</h3><p>{project.result}</p>
                        <Link className="button" href={`/${language}/work/${project.path}/`}>{t.fullCase}<ArrowUpRight size={17} /></Link>
                    </div>
                </div>
            )}
        </dialog>
    );
}
