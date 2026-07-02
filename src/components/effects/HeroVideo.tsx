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

        // Pause when the hero scrolls out of the viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // only start it if it isn't already playing — avoids the
                        // play()/pause() race that logs "video-only background media
                        // was paused to save power"
                        if (video.paused) {
                            video.play().catch(() => { /* autoplay blocked - poster stays */ });
                        }
                    } else if (!video.paused) {
                        video.pause();
                    }
                });
            },
            { threshold: 0.05 }
        );
        observer.observe(video);

        return () => observer.disconnect();
    }, [showVideo]);

    return (
        <div className="hero-video-bg" aria-hidden="true">
            {showVideo ? (
                <video
                    ref={videoRef}
                    src="/hero-network-web.mp4"
                    poster="/hero-network-poster.jpg"
                    autoPlay
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
