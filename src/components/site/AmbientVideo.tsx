'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/site';

// Muted, looping background video that only plays while in view, while the tab is
// visible and while motion is enabled. Never uses `autoPlay` (Chrome power-pauses
// background media and logs "play() interrupted" otherwise).
export default function AmbientVideo({ name, poster, enabled, className = '' }: { name: string; poster: string; enabled: boolean; className?: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        let visible = false;
        const sync = () => { if (enabled && visible && !document.hidden) video.play().catch(() => {}); else video.pause(); };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
        observer.observe(video); document.addEventListener('visibilitychange', sync);
        if (!enabled) video.pause();
        return () => { observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', sync); };
    }, [enabled]);
    return (
        <div className={`ambient-media ${className}`.trim()} aria-hidden="true">
            <img src={asset(poster)} alt="" />
            <video ref={ref} src={asset(name)} poster={asset(poster)} muted loop playsInline preload="metadata" tabIndex={-1} />
        </div>
    );
}
