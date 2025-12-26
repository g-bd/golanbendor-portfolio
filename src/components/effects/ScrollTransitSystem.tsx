'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function ScrollTransitSystem() {
    const { direction } = useLanguage(); // 'ltr' or 'rtl'
    const isRTL = direction === 'rtl';

    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the entire page
    const { scrollYProgress } = useScroll();

    // Smooth out the progress value for a fluid feel (like a heavy train)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate path based on direction
    // We'll use a simple but elegant line that runs down the side of the content
    // In RTL, it runs on the right; in LTR, on the left (or vice versa depending on design preference).
    // Let's put it on the "far" side to frame the content.
    // Actually, a central line or a side line works. Let's try a side line that weaves slightly.

    return (
        <div
            ref={containerRef}
            className="fixed top-0 bottom-0 pointer-events-none z-0 hidden md:block" // Hidden on mobile initially to be safe
            style={{
                [isRTL ? 'left' : 'right']: '5%', // Position on the side opposite to the main text flow? Or same?
                // Let's try positioning it on the *outer* edge. 
                // If RTL (text is right), maybe put line on left?
                // If LTR (text is left), maybe put line on right?
                left: isRTL ? '50px' : 'auto',
                right: isRTL ? 'auto' : '50px',
                width: '100px',
                height: '100vh',
            }}
        >
            <svg
                width="100"
                height="100%"
                viewBox="0 0 100 800" // abstract viewbox, we will map height
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {/* The Track (faint background line) */}
                <motion.path
                    d="M 50 0 L 50 800"
                    fill="none"
                    stroke="var(--pop-pink)" // Use theme color
                    strokeWidth="2"
                    strokeOpacity="0.1"
                />

                {/* The Active Line (fills up as you scroll) */}
                <motion.path
                    d="M 50 0 L 50 800"
                    fill="none"
                    stroke="var(--pop-pink)"
                    strokeWidth="3"
                    style={{
                        pathLength: smoothProgress
                    }}
                />

                {/* The Transit Pod (The "Train") */}
                {/* We use motion value to interpret the y position along the line */}
                {/* Since it's a straight line for V1, we can just translate Y */}
            </svg>

            {/* The Pod - Moving Element */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%', // Centered on the SVG line
                    x: '-50%',
                    y: useTransform(smoothProgress, [0, 1], ['0vh', '100vh']), // Map scroll 0-1 to 0-100vh
                    width: '12px',
                    height: '24px',
                    backgroundColor: 'var(--pop-cyan)',
                    borderRadius: '4px',
                    boxShadow: '0 0 15px 2px var(--pop-cyan)',
                    zIndex: 10
                }}
            >
                {/* Inner detail to make it look techy */}
                <div style={{ width: '100%', height: '20%', background: 'rgba(255,255,255,0.8)', marginTop: '2px' }} />
            </motion.div>
        </div>
    );
}
