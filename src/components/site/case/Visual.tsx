'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/site';
import { useMotion } from '@/context/MotionContext';

export interface VisualSource { image: string; video?: string; }

// Image, or a muted looping video that only plays while on screen (and only when motion is
// enabled). With `controls` it becomes a normal user-driven player.
export default function Visual({ source, alt, controls = false }: { source: VisualSource; alt: string; controls?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);
    const { motion } = useMotion();
    useEffect(() => {
        if (!source.video || controls) return;
        const video = ref.current;
        if (!video) return;
        let visible = false;
        const sync = () => { if (visible && motion && !document.hidden) video.play().catch(() => {}); else video.pause(); };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
        observer.observe(video);
        document.addEventListener('visibilitychange', sync);
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.pause(); };
    }, [source.video, controls, motion]);
    if (!source.video) return <img src={asset(source.image)} alt={alt} loading="lazy" />;
    return (
        <video
            ref={ref}
            src={asset(source.video)}
            poster={asset(source.image)}
            muted={!controls}
            loop={!controls}
            controls={controls}
            playsInline
            preload={controls ? 'none' : 'metadata'}
            aria-label={alt}
        />
    );
}
