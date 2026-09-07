'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Dim video background for the contact ("Let's Connect") section.
 * - Absolute within .contact-box, behind the content (z-index 0)
 * - preload="none": costs nothing until scrolled near; play() triggers the load
 * - Same visibility rules as HeroVideo: play only in-viewport AND tab visible,
 *   never call play() while document.hidden (Chrome power-saver interruption)
 * - Respects prefers-reduced-motion (shows poster instead)
 */
export default function ConnectVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setShowVideo(!reducedMotion.matches);

        // deferred to avoid synchronous setState inside the effect body
        const raf = requestAnimationFrame(update);
        reducedMotion.addEventListener('change', update);

        return () => {
            cancelAnimationFrame(raf);
            reducedMotion.removeEventListener('change', update);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !showVideo) return;

        let intersecting = false;

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
        <div className="connect-video-bg" aria-hidden="true">
            {showVideo ? (
                <video
                    ref={videoRef}
                    src="/connect-bg-web.mp4"
                    poster="/connect-bg-poster.jpg"
                    muted
                    loop
                    playsInline
                    preload="none"
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/connect-bg-poster.jpg" alt="" />
            )}
            <div className="connect-video-fade" />
        </div>
    );
}
