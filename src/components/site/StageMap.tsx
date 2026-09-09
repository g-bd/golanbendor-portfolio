'use client';

import { useMemo } from 'react';
import { CORDON_LINES, COUNT_POINTS, MODEL_BOUNDS, EzorKey } from '@/data/cordonMapData';

// The national cordon & screenline survey as a living map for the story stage.
// Everything is driven by one CSS custom property, `--draw` (0..1), set by the
// parent from the reader's scroll position: the survey lines draw themselves in
// north to south, the count stations light up, then traffic starts to flow along
// the lines. No per-frame React state: the parent writes the variable, CSS does
// the rest. The counter is filled by the parent (JS) or via the `count` prop.

const K = Math.cos((31.4 * Math.PI) / 180);
const PAD = 14;
const MAP_H = 900;
const SOUTH_LIMIT = 30.88; // crop the empty Negev so the populated network fills the frame

const BBOX = (() => {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    const visit = (lon: number, lat: number) => { if (lat < SOUTH_LIMIT) return; minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon); minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat); };
    CORDON_LINES.forEach(l => l.paths.forEach(p => p.forEach(c => visit(c[0], c[1]))));
    MODEL_BOUNDS.forEach(b => b.rings.forEach(r => r.forEach(c => visit(c[0], c[1]))));
    COUNT_POINTS.forEach(p => visit(p[0], p[1]));
    return { minLon, maxLon, minLat, maxLat };
})();
const SCALE = (MAP_H - 2 * PAD) / (BBOX.maxLat - BBOX.minLat);
const MAP_W = Math.ceil((BBOX.maxLon - BBOX.minLon) * K * SCALE + 2 * PAD);
const px = (lon: number) => (((lon - BBOX.minLon) * K * SCALE) + PAD).toFixed(1);
const py = (lat: number) => (((BBOX.maxLat - lat) * SCALE) + PAD).toFixed(1);
const toPath = (parts: number[][][], close = false) => parts.map(p => 'M' + p.map(c => `${px(c[0])} ${py(c[1])}`).join('L') + (close ? 'Z' : '')).join('');

const BOUNDS = MODEL_BOUNDS.map(b => ({ id: b.id, d: toPath(b.rings, true) }));
// Lines draw north → south: ordered by their northernmost point.
const LINES = CORDON_LINES
    .filter(line => line.paths.some(p => p.some(c => c[1] >= SOUTH_LIMIT)))
    .map(line => ({ id: line.id, ezor: line.ezor, type: line.type, d: toPath(line.paths), lat: Math.max(...line.paths.flat().map(c => c[1])) }))
    .sort((a, b) => b.lat - a.lat);
const EZOR_OF_LINE = new Map<number, EzorKey>(CORDON_LINES.map(l => [l.id, l.ezor]));
const BUCKETS = 14;
const POINTS = COUNT_POINTS
    .filter(p => p[1] >= SOUTH_LIMIT)
    .sort((a, b) => b[1] - a[1])
    .map((p, i, all) => ({ x: px(p[0]), y: py(p[1]), ezor: EZOR_OF_LINE.get(p[2]) ?? 'national', bucket: Math.floor((i / all.length) * BUCKETS) }));
const REGIONS: EzorKey[] = ['national', 'haifa', 'telaviv', 'jerusalem', 'beersheva'];

export default function StageMap({ labels, total, stationsLabel, count }: { labels: Record<EzorKey, string>; total: number; stationsLabel: string; count?: number }) {
    const byBucket = useMemo(() => Array.from({ length: BUCKETS }, (_, k) => POINTS.filter(p => p.bucket === k)), []);
    const vars = (i: number, n: number) => ({ '--i': i, '--n': n } as React.CSSProperties);
    return (
        <div className="stage-map" aria-hidden="true">
            <svg className="stage-map-svg" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid meet">
                <g className="stage-map-bounds">{BOUNDS.map(b => <path key={b.id} d={b.d} data-ezor={b.id} />)}</g>
                <g className="stage-map-lines">
                    {LINES.map((line, i) => <path key={line.id} d={line.d} data-ezor={line.ezor} data-type={line.type} pathLength={1} style={vars(i, LINES.length)} />)}
                </g>
                <g className="stage-map-flow">
                    {LINES.map((line, i) => <path key={line.id} d={line.d} style={vars(i, LINES.length)} />)}
                </g>
                <g className="stage-map-points">
                    {byBucket.map((points, k) => (
                        <g key={k} style={{ '--k': k, '--kn': BUCKETS } as React.CSSProperties}>
                            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={6} data-ezor={p.ezor} />)}
                        </g>
                    ))}
                </g>
            </svg>
            <div className="stage-map-readout">
                <p className="stage-map-total"><strong className="stage-map-counter" dir="ltr">{count === undefined ? 0 : count.toLocaleString('en-US')}</strong><span>{stationsLabel}</span></p>
                <ul className="stage-map-regions">
                    {REGIONS.map((key, i) => <li key={key} data-ezor={key} style={{ '--i': i } as React.CSSProperties}><i /><span>{labels[key]}</span></li>)}
                </ul>
                <span className="stage-map-total-hint eyebrow" dir="ltr">/ {total.toLocaleString('en-US')}</span>
            </div>
        </div>
    );
}
