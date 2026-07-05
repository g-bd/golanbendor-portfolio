'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMapZoom } from '@/hooks/useMapZoom';
import MapZoomControls from '@/components/MapZoomControls';
import { CORDON_LINES, COUNT_POINTS, MODEL_BOUNDS, EzorKey, CordonLine } from '@/data/cordonMapData';

export interface CordonMapLabels {
    regions: Record<EzorKey, string>;
    type_cordon: string;
    type_screenline: string;
    stations: string;
    km: string;
    lines: string;
    hint: string;
    select_prompt: string;
    total_label: string;
    points_note: string;
    aria: string;
    zoom_in: string;
    zoom_out: string;
    zoom_reset: string;
}

// Site POP palette + two harmonious neons for the five survey regions
const EZOR_COLORS: Record<EzorKey, string> = {
    national: '#00e5ff',   // --pop-cyan
    telaviv: '#ff0055',    // --pop-pink
    jerusalem: '#ccff00',  // --pop-lime
    haifa: '#b388ff',      // neon violet
    beersheva: '#ffb340',  // neon amber
};

const EZOR_ORDER: EzorKey[] = ['national', 'telaviv', 'haifa', 'jerusalem', 'beersheva'];

// ---- Projection (module-level, computed once) ----
// Simple equirectangular with latitude correction — Israel is small enough.
const K = Math.cos((31.4 * Math.PI) / 180);

function computeBBox() {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    const visit = (lon: number, lat: number) => {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
    };
    CORDON_LINES.forEach(l => l.paths.forEach(p => p.forEach(c => visit(c[0], c[1]))));
    MODEL_BOUNDS.forEach(b => b.rings.forEach(r => r.forEach(c => visit(c[0], c[1]))));
    COUNT_POINTS.forEach(p => visit(p[0], p[1]));
    return { minLon, maxLon, minLat, maxLat };
}

const BBOX = computeBBox();
const PAD = 16;
const MAP_H = 920;
const SCALE = (MAP_H - 2 * PAD) / (BBOX.maxLat - BBOX.minLat);
const MAP_W = Math.ceil((BBOX.maxLon - BBOX.minLon) * K * SCALE + 2 * PAD);

const px = (lon: number) => +(((lon - BBOX.minLon) * K * SCALE) + PAD).toFixed(1);
const py = (lat: number) => +(((BBOX.maxLat - lat) * SCALE) + PAD).toFixed(1);

const toPath = (parts: number[][][], close = false) =>
    parts.map(p => 'M' + p.map(c => `${px(c[0])} ${py(c[1])}`).join('L') + (close ? 'Z' : '')).join('');

const BOUND_PATHS = MODEL_BOUNDS.map(b => ({ id: b.id, d: toPath(b.rings, true) }));
const LINE_PATHS = CORDON_LINES.map(line => ({ line, d: toPath(line.paths) }));
const LINE_BY_ID = new Map<number, CordonLine>(CORDON_LINES.map(l => [l.id, l]));
const POINTS = COUNT_POINTS.map(p => ({
    x: px(p[0]),
    y: py(p[1]),
    ezor: (LINE_BY_ID.get(p[2])?.ezor ?? 'national') as EzorKey,
    haizId: p[2],
}));

export default function CordonMap({ labels }: { labels: CordonMapLabels }) {
    const { language, direction } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const [activeEzor, setActiveEzor] = useState<EzorKey | null>(null);
    const [activeLineId, setActiveLineId] = useState<number | null>(null);
    const { containerRef, containerHandlers, svgStyle, zoomIn, zoomOut, reset, canZoomIn, canZoomOut } = useMapZoom();

    const activeLine = activeLineId != null ? LINE_BY_ID.get(activeLineId) : undefined;

    const regionStats = useMemo(() => {
        const stats = {} as Record<EzorKey, { stations: number; lines: number }>;
        EZOR_ORDER.forEach(k => { stats[k] = { stations: 0, lines: 0 }; });
        CORDON_LINES.forEach(l => {
            stats[l.ezor].stations += l.stations;
            stats[l.ezor].lines += 1;
        });
        return stats;
    }, []);

    const totalKm = useMemo(
        () => Math.round(CORDON_LINES.reduce((s, l) => s + l.lengthKm, 0)),
        [],
    );

    const isDim = (ezor: EzorKey) => activeEzor !== null && activeEzor !== ezor;
    const lineName = (l: CordonLine) => (language === 'en' ? l.nameEn : l.nameHe);

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
                <svg
                    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                    role="img"
                    aria-label={labels.aria}
                    className="h-[62vh] md:h-[74vh] w-auto max-w-full select-none"
                    style={{ filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.06))', ...svgStyle }}
                >
                    <defs>
                        <filter id="cordon-glow" x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="2.4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Model boundaries — faint dashed context */}
                    <g>
                        {BOUND_PATHS.map(b => (
                            <path
                                key={b.id}
                                d={b.d}
                                fill="rgba(255,255,255,0.02)"
                                stroke={isDim(b.id) ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.16)'}
                                strokeWidth={1}
                                strokeDasharray="5 5"
                                vectorEffect="non-scaling-stroke"
                                style={{ transition: 'stroke 0.3s' }}
                            />
                        ))}
                    </g>

                    {/* Count stations */}
                    <g pointerEvents="none">
                        {POINTS.map((p, i) => (
                            <circle
                                key={i}
                                cx={p.x}
                                cy={p.y}
                                r={2.4}
                                fill={EZOR_COLORS[p.ezor]}
                                opacity={isDim(p.ezor) ? 0.06 : (activeLineId === p.haizId ? 1 : 0.65)}
                                style={{ transition: 'opacity 0.3s' }}
                            />
                        ))}
                    </g>

                    {/* Cordon / screenline corridors */}
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {LINE_PATHS.map(({ line, d }) => {
                            const color = EZOR_COLORS[line.ezor];
                            const isActive = activeLineId === line.id;
                            const dim = isDim(line.ezor);
                            return (
                                <g
                                    key={line.id}
                                    opacity={dim ? 0.08 : 1}
                                    pointerEvents={dim ? 'none' : 'auto'}
                                    style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}
                                    onMouseEnter={() => setActiveLineId(line.id)}
                                    onClick={() => setActiveLineId(line.id)}
                                >
                                    <motion.path
                                        d={d}
                                        stroke={color}
                                        strokeWidth={isActive ? 3.2 : 1.9}
                                        vectorEffect="non-scaling-stroke"
                                        filter="url(#cordon-glow)"
                                        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 1.6, ease: 'easeInOut' }}
                                        style={{ transition: 'stroke-width 0.2s' }}
                                    />
                                    {/* invisible wide hit area */}
                                    <path d={d} stroke="transparent" strokeWidth={16} vectorEffect="non-scaling-stroke" pointerEvents="visibleStroke" />
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>

            {/* Side panel: legend + details + totals */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 shrink-0">
                {/* Region legend / filter */}
                <div className="flex flex-wrap lg:flex-col gap-2">
                    {EZOR_ORDER.map(key => {
                        const selected = activeEzor === key;
                        const color = EZOR_COLORS[key];
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => { setActiveEzor(selected ? null : key); setActiveLineId(null); }}
                                aria-pressed={selected}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border font-mono text-xs md:text-sm tracking-wider transition-all duration-300"
                                style={{
                                    borderColor: selected ? color : 'rgba(255,255,255,0.1)',
                                    background: selected ? `${color}18` : 'rgba(255,255,255,0.03)',
                                    color: selected ? color : 'var(--text-secondary)',
                                    boxShadow: selected ? `0 0 18px ${color}30` : 'none',
                                }}
                            >
                                <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                                />
                                <span className="uppercase">{labels.regions[key]}</span>
                                <span className="ms-auto opacity-60">
                                    {regionStats[key].lines} {labels.lines} · {regionStats[key].stations}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Active corridor details */}
                <div
                    className="glass-card rounded-2xl min-h-[8.5rem] flex flex-col justify-center"
                    style={{ padding: '1.25rem 1.5rem', borderColor: activeLine ? `${EZOR_COLORS[activeLine.ezor]}40` : undefined }}
                >
                    {activeLine ? (
                        <>
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono uppercase tracking-widest"
                                    style={{
                                        color: EZOR_COLORS[activeLine.ezor],
                                        border: `1px solid ${EZOR_COLORS[activeLine.ezor]}50`,
                                        background: `${EZOR_COLORS[activeLine.ezor]}12`,
                                    }}
                                >
                                    {activeLine.type === 'cordon' ? labels.type_cordon : labels.type_screenline}
                                </span>
                                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-white/40">
                                    {labels.regions[activeLine.ezor]}
                                </span>
                            </div>
                            <p className="text-white font-semibold text-base md:text-lg leading-snug mb-2">
                                {lineName(activeLine)}
                            </p>
                            <p className="text-sm font-mono text-[var(--text-secondary)]">
                                {activeLine.lengthKm} {labels.km} · {activeLine.stations} {labels.stations}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-[var(--text-secondary)] font-mono">{labels.select_prompt}</p>
                    )}
                </div>

                {/* Totals */}
                <div className="glass-card rounded-2xl" style={{ padding: '1.25rem 1.5rem' }}>
                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">
                        {labels.total_label}
                    </p>
                    <div className="flex items-baseline gap-6">
                        <div>
                            <span className="text-2xl font-bold text-[var(--pop-cyan)]">28</span>
                            <span className="text-xs font-mono text-[var(--text-secondary)] ms-2">{labels.lines}</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-[var(--pop-pink)]">355</span>
                            <span className="text-xs font-mono text-[var(--text-secondary)] ms-2">{labels.stations}</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-[var(--pop-lime)]">{totalKm.toLocaleString()}</span>
                            <span className="text-xs font-mono text-[var(--text-secondary)] ms-2">{labels.km}</span>
                        </div>
                    </div>
                    <p className="text-[0.7rem] font-mono text-white/30 mt-3">{labels.points_note}</p>
                </div>

                <p className="text-xs font-mono text-white/30 text-center lg:text-start">{labels.hint}</p>
            </div>
        </div>
    );
}
