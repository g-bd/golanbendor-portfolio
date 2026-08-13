'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GradientTracingProps {
    /** viewBox width — the SVG scales to its container, this is just the coordinate space */
    width?: number;
    height?: number;
    /** custom path; defaults to a straight horizontal line */
    path?: string;
    baseColor?: string;
    /** [fade-in, core, fade-out] — the travelling pulse */
    gradientColors?: [string, string, string];
    strokeWidth?: number;
    /** seconds per pass */
    duration?: number;
    /** travel right-to-left (used to follow reading direction in RTL) */
    reverse?: boolean;
    className?: string;
}

/**
 * A dim line with a neon pulse travelling along it — the site's "flow" motif.
 * Under prefers-reduced-motion only the static base line renders.
 */
export default function GradientTracing({
    width = 600,
    height = 2,
    path,
    baseColor = 'rgba(0, 229, 255, 0.18)',
    gradientColors = ['rgba(0,229,255,0)', '#00e5ff', 'rgba(255,0,85,0)'],
    strokeWidth = 2,
    duration = 3,
    reverse = false,
    className = '',
}: GradientTracingProps) {
    const gradientId = useId();
    const prefersReducedMotion = useReducedMotion();
    const d = path ?? `M0,${height / 2} L${width},${height / 2}`;

    return (
        <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            preserveAspectRatio="none"
            className={className}
            aria-hidden
        >
            <path d={d} stroke={baseColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            {!prefersReducedMotion && (
                <>
                    <path
                        d={d}
                        stroke={`url(#${gradientId})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                    <defs>
                        <motion.linearGradient
                            id={gradientId}
                            gradientUnits="userSpaceOnUse"
                            animate={
                                reverse
                                    ? { x1: [width, -width], x2: [width * 2, 0] }
                                    : { x1: [-width, width], x2: [0, width * 2] }
                            }
                            transition={{ duration, repeat: Infinity, ease: 'linear' }}
                        >
                            <stop stopColor={gradientColors[0]} stopOpacity="0" />
                            <stop stopColor={gradientColors[1]} />
                            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
                        </motion.linearGradient>
                    </defs>
                </>
            )}
        </svg>
    );
}
