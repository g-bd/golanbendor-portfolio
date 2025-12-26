"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function KeynoteCarousel() {
    const { langData, direction } = useLanguage();
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const slides = langData.carousel;

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 900);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000); // Slightly longer duration to give time to see video
        return () => clearInterval(interval);
    }, [isPaused, slides.length]); // Removed isVideoSlide dependency to allow auto-advance

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Handle Mute/Unmute on Pause/Hover for YouTube videos
    useEffect(() => {
        if (iframeRef.current && slides[current].youtubeId) {
            // Check if backend contentWindow exists
            const iframe = iframeRef.current;
            try {
                if (isPaused) {
                    // Hovering -> Unmute
                    iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                } else {
                    // Not Hovering -> Mute
                    iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
                }
            } catch (e) {
                console.error("Failed to post message to iframe", e);
            }
        }
    }, [isPaused, current, slides]);

    // Handle Mute/Unmute on Pause/Hover for local MP4 videos
    useEffect(() => {
        if (videoRef.current && slides[current].videoFile) {
            const video = videoRef.current;
            if (isPaused) {
                // Hovering -> Unmute
                video.muted = false;
            } else {
                // Not Hovering -> Mute
                video.muted = true;
            }
        }
    }, [isPaused, current, slides]);

    // Ensure video plays when slide becomes current
    useEffect(() => {
        if (videoRef.current && slides[current].videoFile) {
            const video = videoRef.current;
            video.play().catch(err => {
                console.error('Error playing video:', err);
                // Retry play after a short delay
                setTimeout(() => {
                    video.play().catch(e => console.error('Retry failed:', e));
                }, 100);
            });
        }
    }, [current, slides]);

    return (
        <div
            className="keynote-carousel relative w-full h-full overflow-hidden rounded-[15px] min-h-[350px] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            dir={direction}
        >
            {slides.map((slide: any, index: number) => (
                <div
                    key={index}
                    className={`carousel-slide absolute top-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    style={{
                        backgroundImage: !slide.youtubeId && !slide.videoFile ? `url('${slide.image}')` : 'none',
                        backgroundPosition: isMobile && slide.mobileBgPosition ? slide.mobileBgPosition : (slide.bgPosition || 'center'),
                        insetInlineStart: 0,
                        backgroundColor: '#000'
                    }}
                >
                    {slide.youtubeId && index === current ? (
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                            <iframe
                                ref={iframeRef}
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${slide.youtubeId}?start=${slide.startTime || 0}&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&enablejsapi=1&playlist=${slide.youtubeId}&loop=1`}
                                title={slide.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-1/2 left-1/2 w-full h-full md:w-[150%] md:h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                                style={{ border: 'none' }}
                            />
                        </div>
                    ) : null}

                    {slide.videoFile && index === current ? (
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                            <video
                                ref={videoRef}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                                style={{
                                    border: 'none',
                                    objectPosition: slide.videoPosition || 'center'
                                }}
                                onLoadedData={(e) => {
                                    console.log('Video loaded successfully:', slide.videoFile);
                                    const video = e.currentTarget;
                                    video.play().catch(err => console.error('Play error:', err));
                                }}
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLVideoElement;
                                    console.error('Video loading failed:', {
                                        src: slide.videoFile,
                                        error: target.error,
                                        networkState: target.networkState,
                                        readyState: target.readyState
                                    });
                                }}
                                onLoadStart={() => console.log('Loading video:', slide.videoFile)}
                            >
                                <source src={slide.videoFile} type="video/mp4" />
                            </video>
                        </div>
                    ) : null}

                    {/* Content Overlay */}
                    <div className="carousel-content absolute bottom-0 w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent z-[20] transition-opacity duration-300 pointer-events-none"
                        style={{
                            paddingTop: '60px',
                            paddingBottom: '40px',
                            paddingInlineStart: '50px',
                            paddingInlineEnd: '40px',
                            insetInlineStart: 0
                        }}>
                        <div className="flex items-center gap-4 mb-2">
                            {(slide.youtubeId || slide.videoFile) && (
                                <div className={`w-[50px] h-[50px] bg-[rgba(255,0,85,0.2)] border border-[var(--pop-pink)] rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${isPaused && index === current ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                                    <Play style={{ fill: 'var(--pop-pink)', stroke: 'none' }} size={20} />
                                </div>
                            )}
                            <span className="media-tag inline-block px-2 py-1 bg-black/50 backdrop-blur-sm rounded border border-white/20 text-xs font-mono text-white">
                                {slide.tag}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-md mb-1">
                            {slide.title}
                        </h3>
                        <p className="text-gray-300 text-sm drop-shadow-sm">{slide.desc}</p>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/60 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label="Previous Slide"
                style={{ insetInlineStart: '10px' }}
            >
                {direction === 'rtl' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/60 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label="Next Slide"
                style={{ insetInlineEnd: '10px' }}
            >
                {direction === 'rtl' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </div>
    );
}
