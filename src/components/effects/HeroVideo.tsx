'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed video background for the hero section.
 * - Sits behind the hero content only (absolute, first viewport height)
 * - Fades into the page background at the bottom so the transition is seamless
 * - Autoplays muted; pauses when scrolled out of view (battery/CPU)
 * - Respects prefers-reduced-motion (shows poster instead)
 * - On mobile the video is skipped entirely and the poster is shown
 */
export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isMobile = window.matchMedia('(max-width: 900px)');
        const update = () => setShowVideo(!reducedMotion.matches && !isMobile.matches);

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

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !showVideo) return;

        let intersecting = true;

        // Play only when the hero is in view AND the tab is visible. Never call
        // play() while the document is hidden — Chrome's power-saver pauses muted
        // background media and interrupts that play(), which logs "video-only
        // background media was paused to save power". We pause on hide / scroll-out
        // and resume on show / scroll-in instead of fighting it.
        const sync = () => {
            const shouldPlay = intersecting && !document.hidden;
            if (shouldPlay && video.paused) {
                video.play().catch(() => { /* autoplay blocked - poster stays */ });
            } else if (!shouldPlay && !video.paused) {
                video.pause();
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => { intersecting = entry.isIntersecting; });
                sync();
            },
            { threshold: 0.05 }
        );
        observer.observe(video);
        document.addEventListener('visibilitychange', sync);
        sync();

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', sync);
        };
    }, [showVideo]);

    return (
        <div className="hero-video-bg" aria-hidden="true">
            {showVideo ? (
                <video
                    ref={videoRef}
                    src="/hero-network-4k-web.mp4"
                    poster="/hero-network-poster.jpg"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/hero-network-poster.jpg" alt="" />
            )}
            <div className="hero-video-fade" />
        </div>
    );
}
