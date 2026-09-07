'use client';

import React from 'react';

interface MarqueeProps {
    children: React.ReactNode;
    /** Reverse scroll direction (used to keep motion in reading direction for RTL) */
    reverse?: boolean;
    /** Seconds per full loop */
    speed?: number;
    /** How many times the children repeat inside each half (fills wide screens) */
    repeat?: number;
    className?: string;
}

/**
 * Infinite horizontal marquee. Pauses on hover; under prefers-reduced-motion
 * the CSS drops the animation, hides the duplicate groups, and wraps the
 * first group into a static centered grid so no content is clipped. The track
 * holds an even number of identical groups and animates translateX(-50%) for
 * a seamless loop; the wrapper is forced LTR so the transform math is
 * direction-agnostic — RTL pages just pass `reverse` to flip the visual flow.
 */
export default function Marquee({ children, reverse = false, speed = 30, repeat = 2, className = '' }: MarqueeProps) {
    const groups = Array.from({ length: repeat * 2 }, (_, i) => (
        <div className="marquee-group" key={i} aria-hidden={i > 0 || undefined}>
            {children}
        </div>
    ));

    return (
        <div className={`marquee ${className}`.trim()} dir="ltr">
            <div
                className={`marquee-track${reverse ? ' marquee-reverse' : ''}`}
                style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
            >
                {groups}
            </div>
        </div>
    );
}
