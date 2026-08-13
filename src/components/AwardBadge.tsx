'use client';

import React, { useRef, useState } from 'react';
import { Globe2, GraduationCap, Landmark, Medal, Trophy, Building2 } from 'lucide-react';

const ICONS = {
    globe: Globe2,
    grad: GraduationCap,
    landmark: Landmark,
    medal: Medal,
    trophy: Trophy,
    city: Building2,
} as const;

export type AwardIcon = keyof typeof ICONS;
export type AwardAccent = 'cyan' | 'pink' | 'lime';

interface AwardBadgeProps {
    year: string;
    title: string;
    desc: string;
    icon?: AwardIcon;
    accent?: AwardAccent;
    dir?: 'ltr' | 'rtl';
}

/**
 * Recognition badge in the site's glass/neon style, with a cursor-following
 * 3D tilt + shine (adapted from the Product Hunt award-badge pattern).
 * Tilt is hover-only, so it is inert on touch and irrelevant to reduced
 * motion; the idle glint sweep is CSS and disabled by prefers-reduced-motion.
 */
export default function AwardBadge({ year, title, desc, icon = 'trophy', accent = 'cyan', dir = 'ltr' }: AwardBadgeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = Number(((0.5 - py) * 8).toFixed(2));
        const ry = Number(((px - 0.5) * 8).toFixed(2));
        setStyle({
            transform: `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`,
            '--shine-x': `${Number((px * 100).toFixed(1))}%`,
            '--shine-y': `${Number((py * 100).toFixed(1))}%`,
        } as React.CSSProperties);
    };

    const Icon = ICONS[icon];

    return (
        <div
            ref={ref}
            className={`award-badge award-${accent}`}
            style={style}
            dir={dir}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setStyle({})}
        >
            <div className="award-shine" aria-hidden />
            <div className="award-icon">
                <Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="award-text">
                <span className="award-year">{year}</span>
                <span className="award-title">{title}</span>
                <span className="award-desc">{desc}</span>
            </div>
        </div>
    );
}
