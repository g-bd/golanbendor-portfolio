'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/site';

// Muted, looping background video that only plays while in view, while the tab is
// visible and while motion is enabled. Never uses `autoPlay` (Chrome power-pauses
// background media and logs "play() interrupted" otherwise).
export default function AmbientVideo({ name, mobileName, poster, enabled, className = '', priority = false }: { name: string; mobileName?: string; poster: string; enabled: boolean; className?: string; priority?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        let visible = false, frame = 0;
        const file = mobileName && window.matchMedia('(max-width: 760px)').matches ? mobileName : name;
        const sync = () => {
            cancelAnimationFrame(frame);
            if (enabled && visible && !document.hidden) {
                frame = requestAnimationFrame(() => {
                    if (video.getAttribute('src') !== asset(file)) video.src = asset(file);
                    video.play().catch(() => {});
                });
            } else video.pause();
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
        observer.observe(video); document.addEventListener('visibilitychange', sync);
        if (!enabled) video.pause();
        return () => { cancelAnimationFrame(frame); observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', sync); };
    }, [enabled, name, mobileName]);
    return (
        <div className={`ambient-media ${className}`.trim()} aria-hidden="true">
            <img src={asset(poster)} alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
            <video ref={ref} poster={asset(poster)} muted loop playsInline preload="none" tabIndex={-1} />
        </div>
    );
}
