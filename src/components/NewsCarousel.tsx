"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsCarouselProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function NewsCarousel({ className, style }: NewsCarouselProps) {
    const { langData, direction } = useLanguage();
    const news = langData.knowledge.news;
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;

        const currentItem = news[current];
        const duration = currentItem.duration || (currentItem.isLong ? 35000 : 8000);

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % news.length);
        }, duration);

        return () => clearInterval(interval);
    }, [isPaused, news, current]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % news.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + news.length) % news.length);

    return (
        <div
            className={`news-carousel relative block overflow-hidden group ${className}`}
            style={{ ...style, cursor: 'pointer' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            dir={direction}
        >
            {news.map((item: any, index: number) => {
                const isActive = index === current;

                return (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out block ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                        style={{ textDecoration: 'none', color: 'inherit', position: 'absolute' }}
                    >
                        {/* Image Container - Handles Auto Scroll */}
                        <div
                            className={`absolute top-0 left-0 w-full h-full overflow-hidden`}
                            style={{
                                // On hover, allow manual scroll
                                overflowY: isPaused && item.isLong ? 'auto' : 'hidden',
                                // Smooth scroll behavior
                                scrollBehavior: 'smooth'
                            }}
                        >
                            {/* Standard img to allow natural height (auto) scaling */}
                            <div
                                className={`relative w-full ${item.isLong && !isPaused && isActive
                                    ? (item.disableMobileScroll ? 'animate-scroll-long-desktop' : 'animate-scroll-long')
                                    : ''
                                    } ${item.disableMobileScroll ? 'h-full md:h-auto' : ''}`}
                                // Allow height to be determined by image naturally
                                style={{
                                    width: '100%',
                                    '--scroll-target': item.scrollDepth || '-50%',
                                    animationDuration: `${item.scrollDuration || item.duration || (item.isLong ? 35000 : 8000)}ms`, // scrollDuration for animation, duration for slide timing
                                    animationFillMode: 'forwards', // Stay at bottom
                                    animationIterationCount: 1     // Run once
                                } as React.CSSProperties}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full block ${item.mobileImageClassName || 'h-auto object-cover'}`}
                                    style={{
                                        maxWidth: '100%',
                                        display: 'block'
                                    }}
                                />
                                {/* Highlight Box - Positioned relative to the SCROLLING content */}
                                {item.highlight && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: item.highlight.top,
                                            left: item.highlight.left,
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 5,
                                            width: 'auto',
                                            height: 'auto',
                                            // Only visible on hover
                                            opacity: isPaused ? 1 : 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                    >
                                        <span className="highlight-name" style={{
                                            fontSize: '0.4rem', fontWeight: 700, padding: '4px 36px', border: '2px solid transparent', transition: 'all 0.3s', display: 'inline-block', textShadow: '0 2px 4px black',
                                            // Apply hover styles immediately since parent is hovered
                                            borderColor: 'var(--pop-pink)',
                                            color: 'var(--pop-pink)',
                                            boxShadow: '0 0 15px rgba(255, 0, 85, 0.5)'
                                        }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dark Overlay Gradient - Fixed Position (doesn't scroll with image) */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'space-between',
                            background: item.overlayGradient || 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
                            position: 'relative',
                            zIndex: 2,
                            pointerEvents: 'none',
                            paddingInlineStart: direction === 'rtl' ? '20px' : '25px'
                        }}
                            className="p-3 pt-12 md:p-[35px] md:pt-16"
                        >
                            <span className="media-tag" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>{item.tag}</span>

                            <div style={{ marginBottom: '10px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', textShadow: '0 2px 4px black' }}>
                                    <span className="md:hidden block">{item.mobileTitle || item.title}</span>
                                    <span className="hidden md:block">{item.title}</span>
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#ccc' }}>{item.source}</p>
                            </div>
                            <div className="absolute bottom-2 end-2 md:bottom-[25px] md:end-[25px] text-white">
                                <ExternalLink size={20} />
                            </div>
                        </div>
                    </a>
                )
            })}

            {/* Navigation Arrows - Keynote Style (RTL Aware) */}
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSlide(); }}
                className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label="Previous News"
                style={{ insetInlineStart: '10px' }}
            >
                {direction === 'rtl' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSlide(); }}
                className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                aria-label="Next News"
                style={{ insetInlineEnd: '10px' }}
            >
                {direction === 'rtl' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </div>
    );
}
