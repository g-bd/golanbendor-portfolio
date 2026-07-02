'use client';

import { useEffect, useRef, useState } from 'react';
import SchematicGrid from '@/components/effects/SchematicGrid';
import { BACKGROUND_VARIANT, type BackgroundVariant } from '@/data/backgroundConfig';

/**
 * Fixed site-wide background layer. Renders one of two variants
 * (see src/data/backgroundConfig.ts), overridable via ?bg= query param
 * for side-by-side comparison without a rebuild.
 */
export default function SiteBackground() {
    const [variant, setVariant] = useState<BackgroundVariant>(BACKGROUND_VARIANT);
    const [videoAllowed, setVideoAllowed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isMobile = window.matchMedia('(max-width: 900px)');

        const update = () => {
            const param = new URLSearchParams(window.location.search).get('bg');
            if (param === 'video' || param === 'schematic') setVariant(param);
            setVideoAllowed(!reducedMotion.matches && !isMobile.matches);
        };

        // deferred to avoid synchronous setState inside the effect body
        const raf = requestAnimationFrame(update);
        reducedMotion.addEventListener('change', update);
        isMobile.addEventListener('change', update);

        return () => {
            cancelAnimationFrame(raf);
            reducedMotion.removeEventListener('change', update);
            isMobile.removeEventListener('change', update);
        };
    }, []);

    // Save CPU: pause the background video while the tab is hidden
    useEffect(() => {
        const handleVisibility = () => {
            const video = videoRef.current;
            if (!video) return;
            if (document.hidden) video.pause();
            else video.play().catch(() => { /* ignore */ });
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    if (variant === 'video') {
        return (
            <div className="bg-video-layer" aria-hidden="true">
                {videoAllowed ? (
                    <video
                        ref={videoRef}
                        src="/grid-bg-web.mp4"
                        poster="/grid-bg-poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/grid-bg-poster.jpg" alt="" />
                )}
            </div>
        );
    }

    return <SchematicGrid />;
}
