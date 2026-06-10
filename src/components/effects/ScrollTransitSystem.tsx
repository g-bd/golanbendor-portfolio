'use client';

import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useMotionValueEvent,
    useReducedMotion,
} from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollTransitSystem() {
    const { direction } = useLanguage(); // 'ltr' or 'rtl'
    const isRTL = direction === 'rtl';

    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Track scroll progress of the entire page
    const { scrollYProgress } = useScroll();

    // Smooth out the progress value for a fluid feel (like a heavy vehicle)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const carY = useTransform(smoothProgress, [0, 1], ['0vh', '100vh']);

    // Brake lights: flash red when the car rolls to a stop
    const velocity = useVelocity(smoothProgress);
    const [braking, setBraking] = useState(false);
    const wasMoving = useRef(false);
    const brakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useMotionValueEvent(velocity, 'change', (v) => {
        if (prefersReducedMotion) return;
        const moving = Math.abs(v) > 0.002;
        if (moving) {
            wasMoving.current = true;
            if (brakeTimer.current) clearTimeout(brakeTimer.current);
            setBraking(false);
        } else if (wasMoving.current) {
            // moving -> stopped: flash brakes
            wasMoving.current = false;
            setBraking(true);
            brakeTimer.current = setTimeout(() => setBraking(false), 900);
        }
    });

    useEffect(() => {
        return () => {
            if (brakeTimer.current) clearTimeout(brakeTimer.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 bottom-0 pointer-events-none z-50 hidden md:block"
            style={{
                left: isRTL ? '50px' : 'auto',
                right: isRTL ? 'auto' : '50px',
                width: '100px',
                height: '100vh',
            }}
        >
            {/* The Road */}
            <svg
                width="100"
                height="100%"
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {/* Road surface (glass-dark asphalt strip) */}
                <rect
                    x="40"
                    y="0"
                    width="20"
                    height="800"
                    fill="rgba(255,255,255,0.025)"
                />

                {/* Edge lines (faint neon road edges) */}
                <path
                    d="M 40 0 L 40 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(255,0,85,0.3))' }}
                />
                <path
                    d="M 60 0 L 60 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(255,0,85,0.3))' }}
                />

                {/* Center lane dashes */}
                <path
                    d="M 50 0 L 50 800"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeOpacity="0.12"
                    strokeDasharray="10 14"
                />

                {/* Active edges — the driven stretch lights up behind the car */}
                <motion.path
                    d="M 40 0 L 40 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="2.5"
                    style={{
                        pathLength: smoothProgress,
                        filter: 'drop-shadow(0 0 6px rgba(255,0,85,0.6))',
                    }}
                />
                <motion.path
                    d="M 60 0 L 60 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="2.5"
                    style={{
                        pathLength: smoothProgress,
                        filter: 'drop-shadow(0 0 6px rgba(255,0,85,0.6))',
                    }}
                />
            </svg>

            {/* The Car — top-down neon blip, driving down the page */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    x: '-50%',
                    y: carY,
                    width: '20px',
                    height: '60px',
                    marginTop: '-28px', // center the car body on the progress point
                    filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.7))',
                    zIndex: 10,
                }}
            >
                <svg width="20" height="60" viewBox="0 0 20 60" fill="none">
                    <defs>
                        <linearGradient id="sts-headlight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="sts-brakeglow" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#ff2244" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#ff2244" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Brake glow smear (above the rear, lit while braking) */}
                    <motion.rect
                        x="2"
                        y="0"
                        width="16"
                        height="9"
                        fill="url(#sts-brakeglow)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: braking ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                    />

                    {/* Headlight beams (front = bottom, car drives down) */}
                    <polygon points="3.5,47 7.5,47 9.5,60 1.5,60" fill="url(#sts-headlight)" />
                    <polygon points="12.5,47 16.5,47 18.5,60 10.5,60" fill="url(#sts-headlight)" />

                    {/* Car body — rounded silhouette, tapered nose at the bottom */}
                    <path
                        d="M 1 15
                           Q 1 9 10 9
                           Q 19 9 19 15
                           L 19 38
                           Q 19 44 14 46
                           Q 12 47 10 47
                           Q 8 47 6 46
                           Q 1 44 1 38
                           Z"
                        fill="var(--pop-cyan)"
                    />

                    {/* Rear window (upper third) */}
                    <rect x="4" y="13" width="12" height="5" rx="2" fill="rgba(10,10,18,0.6)" />

                    {/* Windshield (lower third — front of the car) */}
                    <rect x="3.5" y="33" width="13" height="7" rx="2.5" fill="rgba(10,10,18,0.6)" />

                    {/* Roof decal — single-stroke "G" mark */}
                    <path
                        d="M 13.2 23.2
                           A 4.2 4.2 0 1 0 14.2 25.5
                           L 10.5 25.5"
                        fill="none"
                        stroke="rgba(10,10,18,0.85)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Headlamp dots (front edge) */}
                    <circle cx="5.5" cy="45.5" r="1.2" fill="#ffffff" fillOpacity="0.9" />
                    <circle cx="14.5" cy="45.5" r="1.2" fill="#ffffff" fillOpacity="0.9" />

                    {/* Brake lights (rear edge) */}
                    <motion.rect
                        x="3"
                        y="9.5"
                        width="4"
                        height="2.5"
                        rx="1.2"
                        fill="#ff2244"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: braking ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ filter: 'drop-shadow(0 0 6px #ff2244)' }}
                    />
                    <motion.rect
                        x="13"
                        y="9.5"
                        width="4"
                        height="2.5"
                        rx="1.2"
                        fill="#ff2244"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: braking ? 1 : 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ filter: 'drop-shadow(0 0 6px #ff2244)' }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}
