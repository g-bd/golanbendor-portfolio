'use client';

import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

/* ---------------------------------------------------------------------------
 * Betweenness centrality demo — a toy network of two clusters joined by one
 * bridge. Shortest routes between random zone pairs light up continuously;
 * the bridge accumulates most of them. Edge color/width = betweenness share,
 * using the same cyan -> violet -> pink ramp as the metro maps.
 * ------------------------------------------------------------------------- */

const RAMP: [number, number, number][] = [
    [0x00, 0xe5, 0xff],
    [0x7a, 0x5c, 0xff],
    [0xff, 0x00, 0x55],
];

function rampColor(t: number): string {
    const pos = Math.min(Math.max(t, 0), 1) * (RAMP.length - 1);
    const i = Math.min(Math.floor(pos), RAMP.length - 2);
    const f = pos - i;
    const [r1, g1, b1] = RAMP[i];
    const [r2, g2, b2] = RAMP[i + 1];
    return `rgb(${Math.round(r1 + (r2 - r1) * f)},${Math.round(g1 + (g2 - g1) * f)},${Math.round(b1 + (b2 - b1) * f)})`;
}

// Toy network: left cluster (a-e), bridge (e-f), right cluster (f-i)
const NODES: Record<string, [number, number]> = {
    a: [55, 55], b: [35, 130], c: [85, 195], d: [130, 60], e: [150, 135],
    f: [270, 105], g: [330, 45], h: [385, 120], i: [330, 195],
};
const EDGES: [string, string][] = [
    ['a', 'b'], ['b', 'c'], ['a', 'd'], ['d', 'e'], ['c', 'e'], ['b', 'e'],
    ['e', 'f'],
    ['f', 'g'], ['g', 'h'], ['h', 'i'], ['f', 'i'],
];

const NODE_IDS = Object.keys(NODES);
const edgeKey = (u: string, v: string) => (u < v ? `${u}|${v}` : `${v}|${u}`);

function bfsPath(from: string, to: string): string[] {
    const adj = new Map<string, string[]>();
    NODE_IDS.forEach(n => adj.set(n, []));
    EDGES.forEach(([u, v]) => { adj.get(u)!.push(v); adj.get(v)!.push(u); });
    const prev = new Map<string, string>();
    const seen = new Set<string>([from]);
    const queue = [from];
    while (queue.length) {
        const cur = queue.shift()!;
        if (cur === to) break;
        for (const nb of adj.get(cur)!) {
            if (!seen.has(nb)) {
                seen.add(nb);
                prev.set(nb, cur);
                queue.push(nb);
            }
        }
    }
    const path = [to];
    while (path[0] !== from) path.unshift(prev.get(path[0])!);
    return path;
}

// all-pairs shortest paths + per-edge usage counts (module level, tiny graph)
const ALL_PAIRS: { pair: [string, string]; path: string[] }[] = [];
const EDGE_COUNTS = new Map<string, number>();
EDGES.forEach(([u, v]) => EDGE_COUNTS.set(edgeKey(u, v), 0));
for (let i = 0; i < NODE_IDS.length; i++) {
    for (let j = i + 1; j < NODE_IDS.length; j++) {
        const path = bfsPath(NODE_IDS[i], NODE_IDS[j]);
        ALL_PAIRS.push({ pair: [NODE_IDS[i], NODE_IDS[j]], path });
        for (let k = 0; k < path.length - 1; k++) {
            const key = edgeKey(path[k], path[k + 1]);
            EDGE_COUNTS.set(key, (EDGE_COUNTS.get(key) ?? 0) + 1);
        }
    }
}
const TOTAL_ROUTES = ALL_PAIRS.length;
const MAX_COUNT = Math.max(...EDGE_COUNTS.values());

// stable shuffled order for the route animation
const PAIR_ORDER = ALL_PAIRS
    .map((p, i) => ({ p, s: Math.sin(i * 12.9898) * 43758.5453 % 1 }))
    .sort((x, y) => x.s - y.s)
    .map(x => x.p);

export interface BetweennessDemoLabels {
    caption: string;
    share_suffix: string;
    hint: string;
}

export function BetweennessDemo({ labels }: { labels: BetweennessDemoLabels }) {
    const { direction } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const [step, setStep] = useState(0);
    const [hoverEdge, setHoverEdge] = useState<string | null>(null);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const id = setInterval(() => setStep(s => (s + 1) % PAIR_ORDER.length), 1700);
        return () => clearInterval(id);
    }, [prefersReducedMotion]);

    const activePath = prefersReducedMotion ? null : PAIR_ORDER[step].path;
    const activeEdges = useMemo(() => {
        if (!activePath) return new Set<string>();
        const s = new Set<string>();
        for (let k = 0; k < activePath.length - 1; k++) s.add(edgeKey(activePath[k], activePath[k + 1]));
        return s;
    }, [activePath]);

    const routeD = activePath
        ? 'M' + activePath.map(n => `${NODES[n][0]} ${NODES[n][1]}`).join('L')
        : '';

    const hoverCount = hoverEdge ? EDGE_COUNTS.get(hoverEdge) ?? 0 : null;

    return (
        <div className="w-full" dir={direction}>
            <div className="rounded-2xl border border-white/10 bg-[var(--bg-color)]/60 p-4 md:p-5">
                <svg viewBox="0 0 420 240" className="w-full select-none" role="img" aria-hidden="true">
                    <defs>
                        <filter id="science-glow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="2.2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* edges — colored by betweenness share */}
                    <g fill="none" strokeLinecap="round">
                        {EDGES.map(([u, v]) => {
                            const key = edgeKey(u, v);
                            const count = EDGE_COUNTS.get(key) ?? 0;
                            const t = count / MAX_COUNT;
                            const onRoute = activeEdges.has(key);
                            const isHover = hoverEdge === key;
                            return (
                                <g
                                    key={key}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => setHoverEdge(key)}
                                    onMouseLeave={() => setHoverEdge(null)}
                                >
                                    <line
                                        x1={NODES[u][0]} y1={NODES[u][1]}
                                        x2={NODES[v][0]} y2={NODES[v][1]}
                                        stroke={rampColor(t)}
                                        strokeWidth={isHover ? 6 : 2 + t * 4}
                                        opacity={onRoute ? 1 : 0.75}
                                        filter="url(#science-glow)"
                                        style={{ transition: 'stroke-width 0.2s' }}
                                    />
                                    {/* wide invisible hit area */}
                                    <line
                                        x1={NODES[u][0]} y1={NODES[u][1]}
                                        x2={NODES[v][0]} y2={NODES[v][1]}
                                        stroke="transparent" strokeWidth={16}
                                    />
                                </g>
                            );
                        })}
                    </g>

                    {/* active route overlay */}
                    {routeD && (
                        <g key={step} pointerEvents="none">
                            <path
                                d={routeD}
                                fill="none"
                                stroke="#ccff00"
                                strokeWidth={2.2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity={0.85}
                                strokeDasharray="6 7"
                            >
                                <animate attributeName="stroke-dashoffset" from="52" to="0" dur="1.2s" fill="freeze" />
                            </path>
                            <circle r={4.2} fill="#ccff00" style={{ filter: 'drop-shadow(0 0 6px #ccff00)' }}>
                                <animateMotion dur="1.2s" fill="freeze" path={routeD} />
                            </circle>
                        </g>
                    )}

                    {/* nodes (zones) */}
                    <g pointerEvents="none">
                        {NODE_IDS.map(n => {
                            const onRoute = activePath?.includes(n);
                            const isEndpoint = activePath && (n === activePath[0] || n === activePath[activePath.length - 1]);
                            return (
                                <g key={n}>
                                    <circle
                                        cx={NODES[n][0]} cy={NODES[n][1]} r={isEndpoint ? 8 : 5.5}
                                        fill="var(--bg-color)"
                                        stroke={isEndpoint ? '#ccff00' : onRoute ? 'rgba(204,255,0,0.6)' : 'rgba(255,255,255,0.45)'}
                                        strokeWidth={isEndpoint ? 2.4 : 1.4}
                                        style={{ transition: 'all 0.3s' }}
                                    />
                                </g>
                            );
                        })}
                    </g>

                    {/* persistent share label on the bridge */}
                    <g pointerEvents="none" fontFamily="monospace">
                        <text x={210} y={100} textAnchor="middle" fontSize={11} fill="#ff0055" fontWeight="bold">
                            {Math.round(((EDGE_COUNTS.get(edgeKey('e', 'f')) ?? 0) / TOTAL_ROUTES) * 100)}%
                        </text>
                    </g>
                </svg>

                {/* live caption */}
                <p className="mt-3 text-xs md:text-sm font-mono min-h-[2.5em]" style={{ color: hoverEdge ? rampColor((hoverCount ?? 0) / MAX_COUNT) : 'rgba(255,255,255,0.35)' }}>
                    {hoverEdge
                        ? `${hoverCount} / ${TOTAL_ROUTES} — ${labels.share_suffix}`
                        : labels.hint}
                </p>
            </div>
            <p className="mt-4 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">{labels.caption}</p>
        </div>
    );
}

