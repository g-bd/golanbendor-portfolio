'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMapZoom } from '@/hooks/useMapZoom';
import MapZoomControls from '@/components/MapZoomControls';
import { COUNTS_METROS, MetroKey, CountLink } from '@/data/countsMapData';

export interface CountsMapLabels {
    metros: Record<MetroKey, string>;
    links_label: string;
    eligible_label: string;
    selected_label: string;
    road_label: string;
    centrality_label: string;
    length_label: string;
    unnamed: string;
    select_prompt: string;
    hint: string;
    legend_low: string;
    legend_high: string;
    aria: string;
    zoom_in: string;
    zoom_out: string;
    zoom_reset: string;
}

const METRO_ORDER: MetroKey[] = ['telaviv', 'jerusalem', 'haifa', 'beersheva'];

// Eligible strategic links per metro (source: four-metro application summary table)
const METRO_ELIGIBLE: Record<MetroKey, number> = {
    telaviv: 1526,
    jerusalem: 674,
    haifa: 838,
    beersheva: 410,
};

// Neon centrality ramp — same stops as the rendered PNGs: cyan -> violet -> pink
const RAMP: [number, number, number][] = [
    [0x00, 0xe5, 0xff],
    [0x7a, 0x5c, 0xff],
    [0xff, 0x00, 0x55],
];

function centColor(t: number): string {
    const pos = Math.min(Math.max(t, 0), 1) * (RAMP.length - 1);
    const i = Math.min(Math.floor(pos), RAMP.length - 2);
    const f = pos - i;
    const [r1, g1, b1] = RAMP[i];
    const [r2, g2, b2] = RAMP[i + 1];
    const r = Math.round(r1 + (r2 - r1) * f);
    const g = Math.round(g1 + (g2 - g1) * f);
    const b = Math.round(b1 + (b2 - b1) * f);
    return `rgb(${r},${g},${b})`;
}

const MAP_H = 860;
const PAD = 14;

interface ProjectedLink {
    link: CountLink;
    d: string;
    color: string;
    norm: number;
}

function buildMetro(key: MetroKey) {
    const data = COUNTS_METROS[key];

    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    const visit = (c: number[]) => {
        if (c[0] < minLon) minLon = c[0];
        if (c[0] > maxLon) maxLon = c[0];
        if (c[1] < minLat) minLat = c[1];
        if (c[1] > maxLat) maxLat = c[1];
    };
    data.links.forEach(l => l.p.forEach(path => path.forEach(visit)));
    data.zones.forEach(ring => ring.forEach(visit));

    const K = Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180));
    const scale = (MAP_H - 2 * PAD) / (maxLat - minLat);
    const width = Math.ceil((maxLon - minLon) * K * scale + 2 * PAD);

    const px = (lon: number) => +(((lon - minLon) * K * scale) + PAD).toFixed(1);
    const py = (lat: number) => +(((maxLat - lat) * scale) + PAD).toFixed(1);
    const toPath = (parts: number[][][], close = false) =>
        parts.map(p => 'M' + p.map(c => `${px(c[0])} ${py(c[1])}`).join('L') + (close ? 'Z' : '')).join('');

    const zonePaths = data.zones.map(ring => toPath([ring], true));

    // log-normalized centrality within the metro (same as the static renders)
    const logs = data.links.map(l => Math.log10(l.c + 1));
    const lo = Math.min(...logs);
    const hi = Math.max(...logs);
    const span = hi - lo || 1;

    const links: ProjectedLink[] = data.links.map((link, i) => {
        // round to avoid server/client floating-point hydration mismatches
        const norm = +((logs[i] - lo) / span).toFixed(3);
        return { link, d: toPath(link.p), color: centColor(norm), norm };
    });

    return { width, zonePaths, links };
}

export default function CountsMap({ labels }: { labels: CountsMapLabels }) {
    const { direction } = useLanguage();
    const [metro, setMetro] = useState<MetroKey>('telaviv');
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const { containerRef, containerHandlers, svgStyle, zoomIn, zoomOut, reset, canZoomIn, canZoomOut } = useMapZoom();

    const view = useMemo(() => buildMetro(metro), [metro]);
    const active = activeIdx != null ? view.links[activeIdx] : undefined;

    const switchMetro = (key: MetroKey) => {
        setMetro(key);
        setActiveIdx(null);
        reset();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-stretch" dir={direction}>
            {/* Map */}
            <div
                ref={containerRef}
                className="relative flex-1 flex justify-center min-w-0 overflow-hidden"
                {...containerHandlers}
            >
                <MapZoomControls
                    labels={labels}
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    reset={reset}
                    canZoomIn={canZoomIn}
                    canZoomOut={canZoomOut}
                />
                <motion.svg
                    key={metro}
                    viewBox={`0 0 ${view.width} ${MAP_H}`}
                    role="img"
                    aria-label={labels.aria}
                    className="h-[62vh] md:h-[72vh] w-auto max-w-full select-none"
                    style={{ filter: 'drop-shadow(0 0 40px rgba(255,0,85,0.05))', ...svgStyle }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <defs>
                        <filter id="counts-glow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="2.6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Traffic analysis zones — faint context */}
                    <g>
                        {view.zonePaths.map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                fill="rgba(255,255,255,0.015)"
                                stroke="rgba(140,190,240,0.10)"
                                strokeWidth={1}
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                    </g>

                    {/* Sampled links, colored by centrality */}
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {view.links.map((pl, i) => {
                            const isActive = activeIdx === i;
                            const dimmed = activeIdx !== null && !isActive;
                            return (
                                <g
                                    key={i}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onClick={() => setActiveIdx(i)}
                                >
                                    <path
                                        d={pl.d}
                                        stroke={pl.color}
                                        strokeWidth={isActive ? 4 : +(1.6 + pl.norm * 1.6).toFixed(2)}
                                        opacity={dimmed ? 0.28 : 1}
                                        vectorEffect="non-scaling-stroke"
                                        filter="url(#counts-glow)"
                                        style={{ transition: 'stroke-width 0.2s, opacity 0.3s' }}
                                    />
                                    {/* invisible wide hit area */}
                                    <path d={pl.d} stroke="transparent" strokeWidth={14} vectorEffect="non-scaling-stroke" pointerEvents="visibleStroke" />
                                </g>
                            );
                        })}
                    </g>
                </motion.svg>
            </div>

            {/* Side panel */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 shrink-0">
                {/* Metro tabs */}
                <div className="flex flex-wrap lg:flex-col gap-2">
                    {METRO_ORDER.map(key => {
                        const selected = metro === key;
                        const count = COUNTS_METROS[key].links.length;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => switchMetro(key)}
                                aria-pressed={selected}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border font-mono text-xs md:text-sm tracking-wider transition-all duration-300"
                                style={{
                                    borderColor: selected ? 'var(--pop-pink)' : 'rgba(255,255,255,0.1)',
                                    background: selected ? 'rgba(255,0,85,0.10)' : 'rgba(255,255,255,0.03)',
                                    color: selected ? 'var(--pop-pink)' : 'var(--text-secondary)',
                                    boxShadow: selected ? '0 0 18px rgba(255,0,85,0.20)' : 'none',
                                }}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{
                                        background: selected ? 'var(--pop-pink)' : 'rgba(255,255,255,0.25)',
                                        boxShadow: selected ? '0 0 8px var(--pop-pink)' : 'none',
                                    }}
                                />
                                <span className="uppercase">{labels.metros[key]}</span>
                                <span className="ms-auto opacity-60">{count} {labels.links_label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Active link details */}
                <div
                    className="glass-card rounded-2xl min-h-[9rem] flex flex-col justify-center"
                    style={{ padding: '1.25rem 1.5rem', borderColor: active ? `${active.color.replace('rgb', 'rgba').replace(')', ',0.4)')}` : undefined }}
                >
                    {active ? (
                        <>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                {active.link.r && (
                                    <span
                                        className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono uppercase tracking-widest"
                                        style={{
                                            color: active.color,
                                            border: `1px solid ${active.color}`,
                                            background: 'rgba(255,255,255,0.04)',
                                        }}
                                    >
                                        {labels.road_label} {active.link.r}
                                    </span>
                                )}
                                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-white/40">
                                    {labels.metros[metro]}
                                </span>
                            </div>
                            <p className="text-white font-semibold text-base md:text-lg leading-snug mb-3">
                                {active.link.n ?? labels.unnamed}
                            </p>
                            <div className="flex items-baseline gap-5 font-mono text-sm text-[var(--text-secondary)] mb-3">
                                <span>
                                    {labels.centrality_label}:{' '}
                                    <span className="font-bold" style={{ color: active.color }}>
                                        {Math.round(active.norm * 100)}%
                                    </span>
                                </span>
                                <span>
                                    {labels.length_label}: {(active.link.l / 1000).toFixed(1)} {'km'}
                                </span>
                            </div>
                            {/* centrality position bar — fills from the reading-start side */}
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${Math.max(active.norm * 100, 4)}%`,
                                        background: `linear-gradient(${direction === 'rtl' ? 'to left' : 'to right'}, #00e5ff, ${active.color})`,
                                        boxShadow: `0 0 8px ${active.color}`,
                                        transition: 'width 0.3s',
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-[var(--text-secondary)] font-mono mb-4">{labels.select_prompt}</p>
                            <p className="text-xs font-mono text-white/40">
                                <span className="text-[var(--pop-cyan)] font-bold">{METRO_ELIGIBLE[metro].toLocaleString()}</span>{' '}
                                {labels.eligible_label}
                                {' · '}
                                <span className="text-[var(--pop-lime)] font-bold">{view.links.length}</span>{' '}
                                {labels.selected_label}{' '}
                                ({Math.round((view.links.length / METRO_ELIGIBLE[metro]) * 100)}%)
                            </p>
                        </>
                    )}
                </div>

                {/* Legend — ramp follows reading direction so "low" sits at the cyan end */}
                <div className="glass-card rounded-2xl" style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="flex items-center gap-3 font-mono text-[0.65rem] text-white/50">
                        <span>{labels.legend_low}</span>
                        <div
                            className="h-1.5 flex-1 rounded-full"
                            style={{ background: `linear-gradient(${direction === 'rtl' ? 'to left' : 'to right'}, #00e5ff, #7a5cff, #ff0055)` }}
                        />
                        <span>{labels.legend_high}</span>
                    </div>
                </div>

                <p className="text-xs font-mono text-white/30 text-center lg:text-start">{labels.hint}</p>
            </div>
        </div>
    );
}
