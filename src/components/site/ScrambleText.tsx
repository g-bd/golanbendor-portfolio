'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Headline decode effect. The sizer span keeps the layout stable while the live
// span scrambles; screen readers get the plain text via aria-label.
export default function ScrambleText({ text, enabled, rtl }: { text: string; enabled: boolean; rtl: boolean }) {
    const [display, setDisplay] = useState(text);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);
    const run = useCallback(() => {
        if (timer.current) clearInterval(timer.current);
        if (!enabled) { setDisplay(text); return; }
        const letters = rtl ? 'אבגדהוזחטיכלמנסעפצקרשת0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iteration = 0;
        timer.current = setInterval(() => {
            setDisplay(Array.from(text, (char, i) => (char === ' ' || i < iteration ? char : letters[Math.floor(Math.random() * letters.length)])).join(''));
            iteration += 0.5;
            if (iteration > text.length) { if (timer.current) clearInterval(timer.current); setDisplay(text); }
        }, 30);
    }, [text, enabled, rtl]);
    useEffect(() => {
        const delay = setTimeout(run, 180);
        return () => { clearTimeout(delay); if (timer.current) clearInterval(timer.current); };
    }, [run]);
    return (
        <span className="scramble" onPointerEnter={run} aria-label={text}>
            <span className="scramble-sizer" aria-hidden="true">{text}</span>
            <span className="scramble-live" aria-hidden="true">{display}</span>
        </span>
    );
}
