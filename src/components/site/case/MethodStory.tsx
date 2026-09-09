'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { pageWords } from '@/data/siteContent';
import Label from '@/components/site/Label';
import Visual, { VisualSource } from './Visual';

interface MethodStoryProps {
    title: string;
    paragraphs: string[];
    source: VisualSource;
    alt: string;
    // Optional live visual that follows the active step (e.g. the survey map drawing itself in).
    renderVisual?: (active: number, total: number) => React.ReactNode;
}

// Sticky visual + native-scroll steps. The active step follows the viewport.
export default function MethodStory({ title, paragraphs, source, alt, renderVisual }: MethodStoryProps) {
    const { language } = useLanguage();
    const w = pageWords[language];
    const [active, setActive] = useState(0);
    const steps = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = steps.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>('.method-step'));
        let frame = 0;
        const update = () => {
            frame = 0;
            const navBottom = document.querySelector('.chapter-navigation')?.getBoundingClientRect().bottom ?? 120;
            const readingLine = Math.max(navBottom + 32, window.innerHeight * .45);
            let current = 0;
            items.forEach((item, i) => { if (item.getBoundingClientRect().top <= readingLine) current = i; });
            setActive(current);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
    }, [paragraphs]);
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        <section id="method" className="method-story">
            <div className="method-stage-wrap">
                <div className="method-stage">
                    <Label>{title}</Label>
                    <h2>{w.steps[Math.min(active, w.steps.length - 1)]}</h2>
                    <div className="method-visual" data-step={active}>{renderVisual ? renderVisual(active, paragraphs.length) : <Visual source={source} alt={alt} />}</div>
                    <div className="method-progress">
                        <span className="eyebrow" dir="ltr">{pad(active + 1)} / {pad(paragraphs.length)}</span>
                        <div>{paragraphs.map((_, i) => <a key={i} href={`#method-${i}`} className={active === i ? 'active' : ''} aria-label={`${w.method} ${i + 1}`} aria-current={active === i ? 'step' : undefined} />)}</div>
                    </div>
                </div>
            </div>
            <div className="method-steps" ref={steps}>
                {paragraphs.map((paragraph, i) => (
                    <article className={`method-step ${active === i ? 'active' : ''}`} data-index={i} id={`method-${i}`} key={i}>
                        <span className="method-number" aria-hidden="true">0{i + 1}</span>
                        <p className="eyebrow">{w.method} / 0{i + 1}</p>
                        <p>{paragraph}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
