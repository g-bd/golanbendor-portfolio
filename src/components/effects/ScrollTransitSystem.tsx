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

    // Car state: idle at rest, driving while scrolling, braking when rolling to a stop
    const velocity = useVelocity(smoothProgress);
    const [carState, setCarState] = useState<'idle' | 'drive' | 'brake'>('idle');
    const braking = carState === 'brake';
    const wasMoving = useRef(false);
    const brakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useMotionValueEvent(velocity, 'change', (v) => {
        if (prefersReducedMotion) return;
        const moving = Math.abs(v) > 0.002;
        if (moving) {
            wasMoving.current = true;
            if (brakeTimer.current) clearTimeout(brakeTimer.current);
            setCarState('drive');
        } else if (wasMoving.current) {
            // moving -> stopped: flash brakes, then settle back to idle
            wasMoving.current = false;
            setCarState('brake');
            brakeTimer.current = setTimeout(() => setCarState('idle'), 900);
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
                    x="26"
                    y="0"
                    width="48"
                    height="800"
                    fill="rgba(255,255,255,0.025)"
                />

                {/* Edge lines (faint neon road edges) */}
                <path
                    d="M 26 0 L 26 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(255,0,85,0.3))' }}
                />
                <path
                    d="M 74 0 L 74 800"
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
                    d="M 26 0 L 26 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="2.5"
                    style={{
                        pathLength: smoothProgress,
                        filter: 'drop-shadow(0 0 6px rgba(255,0,85,0.6))',
                    }}
                />
                <motion.path
                    d="M 74 0 L 74 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="2.5"
                    style={{
                        pathLength: smoothProgress,
                        filter: 'drop-shadow(0 0 6px rgba(255,0,85,0.6))',
                    }}
                />
            </svg>

            {/* The Car — top-down PNG, driving down the page */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    x: '-50%',
                    y: carY,
                    width: '40px',
                    height: '80px',
                    marginTop: '-40px', // center the car body on the progress point
                    filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.5))',
                    zIndex: 10,
                }}
            >
                {/* Red tail glow smear (behind the rear, lit while braking) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: braking ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        position: 'absolute',
                        top: '-14px',
                        left: '4px',
                        right: '4px',
                        height: '18px',
                        background: 'linear-gradient(to top, rgba(255,34,68,0.35), rgba(255,34,68,0))',
                        filter: 'blur(2px)',
                    }}
                />

                {/* Car state images — cross-fade between idle / drive / brake */}
                {([
                    ['idle', '/aligned_car_pngs/car_idle_aligned.png'],
                    ['drive', '/aligned_car_pngs/car_drive_headlights_aligned.png'],
                    ['brake', '/aligned_car_pngs/car_brake_headlights_aligned.png'],
                ] as const).map(([state, src]) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        key={state}
                        src={src}
                        alt=""
                        width={40}
                        height={80}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            opacity: carState === state ? 1 : 0,
                            transition: 'opacity 0.15s ease',
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
