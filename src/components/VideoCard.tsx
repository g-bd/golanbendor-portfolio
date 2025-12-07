'use client';

import { useEffect, useRef } from 'react';

interface VideoCardProps {
    src: string;
    poster?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function VideoCard({ src, poster, children, className = '', style }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const card = cardRef.current;
        if (!video || !card) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Force load and attempt autoplay
        video.load();
        video.play().catch(e => {
            console.log("Autoplay blocked:", e);
        });

        // IntersectionObserver for pause when out of view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log("Play prevented:", e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        // Desktop: Sound on hover
        const handleMouseEnter = () => {
            if (video.paused) {
                video.play().catch(e => console.log("Play on hover prevented:", e));
            }
            video.muted = false;
            video.volume = 0.5;
        };

        const handleMouseLeave = () => {
            video.muted = true;
        };

        // Mobile: Toggle sound on tap
        let soundEnabled = false;
        const handleTouchStart = () => {
            if (video.paused) {
                video.play().catch(e => console.log("Play on tap prevented:", e));
            }
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
            if (!isMobile) {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            } else {
                card.removeEventListener('touchstart', handleTouchStart);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`bento-card ${className}`} style={{ padding: 0, border: 'none', cursor: 'pointer', ...style }}>
            <video
                ref={videoRef}
                className="video-bg hover-sound"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={poster}
            >
                <source src={src} type="video/mp4" />
            </video>
            {children}
        </div>
    );
}
