'use client';

import { useEffect, useRef } from 'react';

interface VideoCardProps {
    src: string;
    poster?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    enableSoundOnHover?: boolean;
}

export default function VideoCard({ src, poster, children, className = '', style, enableSoundOnHover = true }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const card = cardRef.current;
        if (!video || !card) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Safe play helper — prevents concurrent play() calls that produce AbortError
        // (browser pauses video-only media to save power, then a second play() fires mid-pause)
        let playPending = false;
        const safePlay = () => {
            if (playPending || !video.paused) return;
            playPending = true;
            video.play().then(() => {
                playPending = false;
            }).catch(e => {
                playPending = false;
                if (e.name !== 'AbortError') console.log('Play prevented:', e);
            });
        };

        safePlay();

        // IntersectionObserver for pause when out of view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    safePlay();
                } else {
                    if (!video.paused) video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        // Resume after tab becomes visible (browser may have paused to save power)
        const handleVisibility = () => {
            if (!document.hidden) safePlay();
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Desktop: Sound on hover
        const handleMouseEnter = () => {
            safePlay();
            if (enableSoundOnHover) {
                video.muted = false;
                video.volume = 0.5;
            }
        };

        const handleMouseLeave = () => {
            if (enableSoundOnHover) {
                video.muted = true;
            }
        };

        // Mobile: Toggle sound on tap
        let soundEnabled = false;
        const handleTouchStart = () => {
            safePlay();
            soundEnabled = !soundEnabled;
            video.muted = !soundEnabled;
            video.volume = soundEnabled ? 0.5 : 0;
        };

        if (!isMobile) {
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        } else {
            card.addEventListener('touchstart', handleTouchStart);
        }

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
            if (!isMobile) {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            } else {
                card.removeEventListener('touchstart', handleTouchStart);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`bento-card ${className}`} style={{ padding: 0, cursor: 'pointer', ...style }}>
            <video
                ref={videoRef}
                className="video-bg hover-sound"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={poster}
            >
                <source src={src} type="video/mp4" />
            </video>
            {children}
        </div>
    );
}
