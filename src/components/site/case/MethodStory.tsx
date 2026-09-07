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
}

// Sticky visual + native-scroll steps. The active step follows the viewport.
export default function MethodStory({ title, paragraphs, source, alt }: MethodStoryProps) {
    const { language } = useLanguage();
    const w = pageWords[language];
    const [active, setActive] = useState(0);
    const steps = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = steps.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll<HTMLElement>('.method-step'));
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index)); });
        }, { rootMargin: '-25% 0px -40% 0px', threshold: 0 });
        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, [paragraphs]);
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        <section id="method" className="method-story">
            <div className="method-stage-wrap">
                <div className="method-stage">
                    <Label>{title}</Label>
                    <h2>{w.steps[Math.min(active, w.steps.length - 1)]}</h2>
                    <div className="method-visual"><Visual source={source} alt={alt} /></div>
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
