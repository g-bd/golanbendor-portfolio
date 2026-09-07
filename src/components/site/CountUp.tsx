'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/context/MotionContext';

// Counts a numeric stat up from zero the first time it scrolls into view.
// Non-numeric values (e.g. "MATSim") render unchanged.
export default function CountUp({ value, className = '' }: { value: string; className?: string }) {
    const { motion } = useMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState<number | null>(null);
    const match = /^(\d[\d,]*)(\+?)$/.exec(value.trim());
    const target = match ? Number(match[1].replace(/,/g, '')) : NaN;
    const suffix = match ? match[2] : '';
    useEffect(() => {
        const el = ref.current;
        if (!el || !motion || Number.isNaN(target)) return;
        let raf = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now(), duration = 1300;
            const tick = (now: number) => {
                const p = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - p, 3);
                setShown(Math.round(target * eased));
                if (p < 1) raf = requestAnimationFrame(tick); else setShown(null);
            };
            raf = requestAnimationFrame(tick);
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => { observer.disconnect(); cancelAnimationFrame(raf); };
    }, [motion, target]);
    const text = shown === null ? value : `${shown.toLocaleString('en-US')}${suffix}`;
    return <span ref={ref} className={`count-up ${className}`.trim()}>{text}</span>;
}
