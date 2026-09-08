'use client';

import { useEffect, useRef, useState } from 'react';

export interface Chapter { id: string; label: string; }

// Follow native scrolling without taking over the reader's wheel or keyboard.
export default function ChapterNavigation({ chapters, label }: { chapters: Chapter[]; label: string }) {
    const nav = useRef<HTMLElement>(null);
    const [active, setActive] = useState('');

    useEffect(() => {
        let frame = 0;
        const sections = chapters.map(chapter => document.getElementById(chapter.id));
        const update = () => {
            frame = 0;
            const readingLine = (nav.current?.getBoundingClientRect().bottom ?? 140) + 64;
            let current = '';
            sections.forEach((section, i) => {
                if (section && section.getBoundingClientRect().top <= readingLine) current = chapters[i].id;
            });
            setActive(current);
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [chapters]);

    return (
        <nav ref={nav} className="chapter-navigation" aria-label={label}>
            <div className="shell">
                {chapters.map(({ id, label: chapterLabel }, i) => (
                    <a href={`#${id}`} key={id} aria-current={active === id ? 'location' : undefined}>
                        <span>0{i + 1}</span>{chapterLabel}
                    </a>
                ))}
            </div>
        </nav>
    );
}
