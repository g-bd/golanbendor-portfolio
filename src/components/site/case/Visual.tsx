'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/site';
import { useMotion } from '@/context/MotionContext';
import { useTheme } from '@/context/ThemeContext';

export interface VisualSource { image: string; imageDark?: string; video?: string; videoDark?: string; }

// Image, or a muted looping video that only plays while on screen (and only when motion is
// enabled). With `controls` it becomes a normal user-driven player. Sources with a dark
// variant follow the theme (the element is keyed on the file so a swap reloads it cleanly).
export default function Visual({ source, alt, controls = false }: { source: VisualSource; alt: string; controls?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);
    const { motion } = useMotion();
    const { theme } = useTheme();
    const dark = theme === 'dark';
    const image = (dark && source.imageDark) || source.image;
    const video = (dark && source.videoDark) || source.video;
    useEffect(() => {
        if (!video || controls) return;
        const el = ref.current;
        if (!el) return;
        let visible = false;
        const sync = () => { if (visible && motion && !document.hidden) el.play().catch(() => {}); else el.pause(); };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
        observer.observe(el);
        document.addEventListener('visibilitychange', sync);
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); el.pause(); };
    }, [video, controls, motion]);
    if (!video) return <img src={asset(image)} alt={alt} loading="lazy" />;
    return (
        <video
            key={video}
            ref={ref}
            src={asset(video)}
            poster={asset(image)}
            muted={!controls}
            loop={!controls}
            controls={controls}
            playsInline
            preload={controls ? 'none' : 'metadata'}
            aria-label={alt}
        />
    );
}
