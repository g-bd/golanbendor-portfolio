'use client';

import { useEffect, useRef } from 'react';
import CarIcon from './CarIcon';

// Vertical road beside the home page: seven stations, one car. The car follows
// native scroll (never captures wheel events); dragging the road scrubs the page.
// The car eases toward the scroll position each frame (a little lag, like a real
// vehicle), so driving, braking and idling come from its actual speed.
// Colors come from --car-accent: cyan neon in dark, pink in light (globals.css).
export default function RoadRail({ sections, labels, active, motion, rtl }: { sections: readonly string[]; labels: string[]; active: string; motion: boolean; rtl: boolean }) {
    const road = useRef<HTMLDivElement>(null), car = useRef<HTMLSpanElement>(null), dragging = useRef(false);
    useEffect(() => {
        let frame = 0, target = 0, current = 0, velocity = 0;
        let idle: ReturnType<typeof setTimeout> | undefined;
        const measure = () => {
            const points = sections.map(id => Math.max(0, (document.getElementById(id)?.getBoundingClientRect().top ?? 0) + window.scrollY - 105));
            const y = window.scrollY;
            let position = 0;
            for (let i = 0; i < points.length - 1; i++) {
                if (y >= points[i]) position = i + Math.min(1, (y - points[i]) / Math.max(1, points[i + 1] - points[i]));
            }
            target = (position / Math.max(1, sections.length - 1)) * 100;
        };
        const paint = (value: number) => road.current?.style.setProperty('--road-progress', `${value.toFixed(3)}%`);
        const tick = () => {
            frame = 0;
            const delta = target - current;
            if (!motion) { current = target; paint(current); return; }
            const step = delta * 0.14;
            const speed = Math.abs(step);
            const slowing = speed < Math.abs(velocity) * 0.9;
            velocity = step;
            current += step;
            paint(current);
            if (car.current) {
                if (Math.abs(delta) > 0.4) car.current.dataset.direction = delta < 0 ? 'reverse' : 'forward';
                car.current.dataset.state = speed > 0.05 && !slowing ? 'driving' : speed > 0.004 ? 'braking' : car.current.dataset.state === 'idle' ? 'idle' : 'braking';
            }
            if (Math.abs(delta) > 0.01) { frame = requestAnimationFrame(tick); return; }
            current = target; paint(current);
            clearTimeout(idle);
            idle = setTimeout(() => { if (car.current) car.current.dataset.state = 'idle'; }, 450);
        };
        const onScroll = () => { clearTimeout(idle); measure(); if (!frame) frame = requestAnimationFrame(tick); };
        measure(); current = target; paint(current);
        window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
        return () => { cancelAnimationFrame(frame); clearTimeout(idle); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, [sections, motion]);

    const scrub = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!road.current) return;
        const box = road.current.getBoundingClientRect();
        const position = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height)) * (sections.length - 1);
        const i = Math.min(sections.length - 2, Math.floor(position));
        const from = (document.getElementById(sections[i])?.getBoundingClientRect().top ?? 0) + window.scrollY;
        const to = (document.getElementById(sections[i + 1])?.getBoundingClientRect().top ?? 0) + window.scrollY;
        window.scrollTo({ top: Math.max(0, from + (to - from) * (position - i) - 105), behavior: 'instant' });
    };
    const activeIndex = sections.indexOf(active);

    return (
        <aside className="road-nav" aria-label={rtl ? 'המסע בעמוד' : 'Your journey through the page'}>
            <div ref={road} className="road-line" aria-hidden="true"
                onPointerDown={event => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); scrub(event); }}
                onPointerMove={event => { if (dragging.current) scrub(event); }}
                onPointerUp={() => { dragging.current = false; }}
                onPointerCancel={() => { dragging.current = false; }} onLostPointerCapture={() => { dragging.current = false; }}>
                {motion && (
                    <span ref={car} className="road-car" data-state="idle">
                        <CarIcon gradientId="car-beam-gradient" />
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
