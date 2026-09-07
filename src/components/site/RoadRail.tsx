'use client';

import { useEffect, useRef } from 'react';

// Vertical road beside the home page: seven stations, one car. The car follows
// native scroll (never captures wheel events); dragging the road scrubs the page.
// Colors come from --car-accent: cyan neon in dark, pink in light (globals.css).
export default function RoadRail({ sections, labels, active, motion, rtl }: { sections: readonly string[]; labels: string[]; active: string; motion: boolean; rtl: boolean }) {
    const road = useRef<HTMLDivElement>(null), car = useRef<HTMLSpanElement>(null), dragging = useRef(false);
    useEffect(() => {
        let frame = 0;
        let stop: ReturnType<typeof setTimeout> | undefined, idle: ReturnType<typeof setTimeout> | undefined;
        const update = () => {
            const points = sections.map(id => Math.max(0, (document.getElementById(id)?.offsetTop || 0) - 105));
            const y = window.scrollY;
            let position = 0;
            for (let i = 0; i < points.length - 1; i++) {
                if (y >= points[i]) position = i + Math.min(1, (y - points[i]) / Math.max(1, points[i + 1] - points[i]));
            }
            road.current?.style.setProperty('--road-progress', `${(position / (sections.length - 1)) * 100}%`);
        };
        const onScroll = () => {
            cancelAnimationFrame(frame); frame = requestAnimationFrame(update);
            if (!motion || !car.current) return;
            car.current.dataset.state = 'driving';
            clearTimeout(stop); clearTimeout(idle);
            stop = setTimeout(() => {
                if (car.current) car.current.dataset.state = 'braking';
                idle = setTimeout(() => { if (car.current) car.current.dataset.state = 'idle'; }, 700);
            }, 160);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', update);
        return () => { cancelAnimationFrame(frame); clearTimeout(stop); clearTimeout(idle); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', update); };
    }, [sections, motion]);

    const scrub = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!road.current) return;
        const box = road.current.getBoundingClientRect();
        const position = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height)) * (sections.length - 1);
        const i = Math.min(sections.length - 2, Math.floor(position));
        const from = document.getElementById(sections[i])?.offsetTop ?? 0;
        const to = document.getElementById(sections[i + 1])?.offsetTop ?? from;
        window.scrollTo({ top: Math.max(0, from + (to - from) * (position - i) - 105), behavior: 'instant' });
    };
    const activeIndex = sections.indexOf(active);

    return (
        <aside className="road-nav" aria-label={rtl ? 'המסע בעמוד' : 'Your journey through the page'}>
            <div ref={road} className="road-line" aria-hidden="true"
                onPointerDown={event => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); scrub(event); }}
                onPointerMove={event => { if (dragging.current) scrub(event); }}
                onPointerUp={() => { dragging.current = false; }}
                onPointerCancel={() => { dragging.current = false; }}>
                {motion && (
                    <span ref={car} className="road-car" data-state="idle">
                        <svg viewBox="0 0 26 50">
                            <defs>
                                <linearGradient id="car-beam-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" style={{ stopColor: 'var(--car-light)', stopOpacity: 0.75 }} />
                                    <stop offset="1" style={{ stopColor: 'var(--car-light)', stopOpacity: 0 }} />
                                </linearGradient>
                            </defs>
                            <path className="car-beam" d="M7 44 L0 74 L26 74 L19 44 Z" />
                            <rect className="car-wheel" x="2" y="9" width="4" height="9" rx="1.5" />
                            <rect className="car-wheel" x="20" y="9" width="4" height="9" rx="1.5" />
                            <rect className="car-wheel" x="2" y="31" width="4" height="9" rx="1.5" />
                            <rect className="car-wheel" x="20" y="31" width="4" height="9" rx="1.5" />
                            <rect className="car-body" x="5" y="2" width="16" height="44" rx="6.5" />
                            <path className="car-glass" d="M8 10.5h10l1.4 6.5H6.6z" />
                            <path className="car-glass" d="M6.6 28h12.8l-1.4 7.5H8z" />
                            <rect className="car-brake" x="7" y="3.6" width="4" height="2" rx="1" />
                            <rect className="car-brake" x="15" y="3.6" width="4" height="2" rx="1" />
                            <rect className="car-headlight" x="7" y="42.4" width="4" height="2.2" rx="1" />
                            <rect className="car-headlight" x="15" y="42.4" width="4" height="2.2" rx="1" />
                        </svg>
                    </span>
                )}
            </div>
            {sections.map((id, i) => (
                <a href={`#${id}`} key={id} aria-label={labels[i]} aria-current={active === id ? 'location' : undefined}
                    className={active === id ? 'active' : i < activeIndex ? 'passed' : ''}>
                    <span>{String(i).padStart(2, '0')}</span>
                    <span className="road-tooltip">{labels[i]}</span>
                </a>
            ))}
        </aside>
    );
}
