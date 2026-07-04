'use client';

import { useEffect, useRef } from 'react';

/**
 * Schematic "transit diagram" background.
 * Draws orthogonal circuit-style traces with rounded corners, blinking nodes
 * and light pulses that travel along the traces — the calm, near-black
 * replacement for the previous random traffic streaks.
 *
 * Fixed, z-index -1, drawn behind all content. Respects
 * prefers-reduced-motion (static traces only) and pauses when tab is hidden.
 */

const TRACE_COLORS = ['#00e5ff', '#ff0055', '#ccff00'];
const GRID = 40; // snap traces to the same 40px rhythm as .grid-overlay

interface Point { x: number; y: number }

interface Trace {
    points: Point[];   // orthogonal polyline vertices
    color: string;
    baseAlpha: number;
    length: number;    // cached polyline length
    pulseT: number;    // 0..1 position of the travelling pulse
    pulseSpeed: number;
    hasPulse: boolean;
}

interface Node {
    x: number;
    y: number;
    r: number;
    color: string;
    phase: number;  // blink offset
    speed: number;  // blink speed
}

interface Dash {
    x: number;
    y: number;
    len: number;
    color: string;
    alpha: number;
    horizontal: boolean;
}

function snap(v: number) {
    return Math.round(v / GRID) * GRID;
}

function polylineLength(pts: Point[]) {
    let l = 0;
    for (let i = 1; i < pts.length; i++) {
        l += Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
    }
    return l;
}

/** Point at distance d along an orthogonal polyline */
function pointAt(pts: Point[], d: number): Point {
    let rem = d;
    for (let i = 1; i < pts.length; i++) {
        const seg = Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
        if (rem <= seg && seg > 0) {
            const t = rem / seg;
            return {
                x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
                y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
            };
        }
        rem -= seg;
    }
    return pts[pts.length - 1];
}

export default function SchematicGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let traces: Trace[] = [];
        let nodes: Node[] = [];
        let dashes: Dash[] = [];
        let width = 0;
        let height = 0;

        const buildScene = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            traces = [];
            nodes = [];
            dashes = [];

            // --- orthogonal traces with 2-4 corners each ---
            const traceCount = Math.max(8, Math.round(width / 160));
            for (let i = 0; i < traceCount; i++) {
                const pts: Point[] = [];
                let x = snap(Math.random() * width);
                let y = snap(Math.random() * height);
                pts.push({ x, y });

                let horizontal = Math.random() > 0.5;
                const corners = 2 + Math.floor(Math.random() * 3);
                for (let c = 0; c <= corners; c++) {
                    const dist = snap(80 + Math.random() * 320) * (Math.random() > 0.5 ? 1 : -1);
                    if (horizontal) x += dist; else y += dist;
                    pts.push({ x, y });
                    horizontal = !horizontal;
                }

                const color = TRACE_COLORS[Math.floor(Math.random() * TRACE_COLORS.length)];
                traces.push({
                    points: pts,
                    color,
                    baseAlpha: 0.10 + Math.random() * 0.10,
                    length: polylineLength(pts),
                    pulseT: Math.random(),
                    pulseSpeed: 0.0008 + Math.random() * 0.0015,
                    hasPulse: Math.random() > 0.35,
                });

                // node circles at some corners
                for (let p = 1; p < pts.length - 1; p++) {
                    if (Math.random() > 0.55) {
                        nodes.push({
                            x: pts[p].x,
                            y: pts[p].y,
                            r: 3 + Math.random() * 3,
                            color,
                            phase: Math.random() * Math.PI * 2,
                            speed: 0.3 + Math.random() * 0.8,
                        });
                    }
                }
            }

            // --- scattered static dashes ---
            const dashCount = Math.round(width / 45);
            for (let i = 0; i < dashCount; i++) {
                dashes.push({
                    x: snap(Math.random() * width),
                    y: snap(Math.random() * height),
                    len: 10 + Math.random() * 40,
                    color: TRACE_COLORS[Math.floor(Math.random() * TRACE_COLORS.length)],
                    alpha: 0.08 + Math.random() * 0.22,
                    horizontal: Math.random() > 0.3,
                });
            }
        };

        const drawStatic = () => {
            // traces
            traces.forEach((tr) => {
                ctx.beginPath();
                ctx.strokeStyle = tr.color;
                ctx.lineWidth = 1.2;
                ctx.globalAlpha = tr.baseAlpha;
                const pts = tr.points;
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length - 1; i++) {
                    // rounded corners via arcTo
                    ctx.arcTo(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, 14);
                }
                ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
                ctx.stroke();
            });

            // dashes
            dashes.forEach((d) => {
                ctx.beginPath();
                ctx.strokeStyle = d.color;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = d.alpha;
                ctx.moveTo(d.x, d.y);
                if (d.horizontal) ctx.lineTo(d.x + d.len, d.y);
                else ctx.lineTo(d.x, d.y + d.len);
                ctx.stroke();
            });

            ctx.globalAlpha = 1;
        };

        let animationId = 0;

        const animate = (time: number) => {
            ctx.clearRect(0, 0, width, height);
            drawStatic();

            // blinking nodes
            nodes.forEach((n) => {
                const blink = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(n.phase + (time / 1000) * n.speed * Math.PI));
                ctx.beginPath();
                ctx.strokeStyle = n.color;
                ctx.lineWidth = 1.2;
                ctx.globalAlpha = blink * 0.7;
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.stroke();
            });

            // travelling pulses with a short glowing tail
            traces.forEach((tr) => {
                if (!tr.hasPulse) return;
                tr.pulseT += tr.pulseSpeed;
                if (tr.pulseT > 1) tr.pulseT = 0;

                const head = tr.pulseT * tr.length;
                const tail = Math.max(0, head - 60);
                const steps = 6;
                for (let s = 0; s < steps; s++) {
                    const d0 = tail + ((head - tail) * s) / steps;
                    const d1 = tail + ((head - tail) * (s + 1)) / steps;
                    const p0 = pointAt(tr.points, d0);
                    const p1 = pointAt(tr.points, d1);
                    ctx.beginPath();
                    ctx.strokeStyle = tr.color;
                    ctx.lineWidth = 1.6;
                    ctx.globalAlpha = 0.65 * ((s + 1) / steps);
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p1.x, p1.y);
                    ctx.stroke();
                }

                const hp = pointAt(tr.points, head);
                ctx.beginPath();
                ctx.fillStyle = tr.color;
                ctx.globalAlpha = 0.9;
                ctx.shadowColor = tr.color;
                ctx.shadowBlur = 8;
                ctx.arc(hp.x, hp.y, 1.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        };

        buildScene();

        if (reducedMotion) {
            // static render only — no animation loop
            drawStatic();
            nodes.forEach((n) => {
                ctx.beginPath();
                ctx.strokeStyle = n.color;
                ctx.lineWidth = 1.2;
                ctx.globalAlpha = 0.4;
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.globalAlpha = 1;
        } else {
            animationId = requestAnimationFrame(animate);
        }

        // Only rebuild on a real WIDTH change (e.g. orientation change). Mobile
        // browsers fire `resize` constantly during touch — the address bar and
        // elastic scroll change innerHeight on every swipe — and rebuilding here
        // re-randomizes the whole scene, so the background visibly "regenerates"
        // when you swipe. `width` holds the last built width; skip height-only churn.
        const handleResize = () => {
            if (window.innerWidth === width) return;
            buildScene();
            if (reducedMotion) drawStatic();
        };
        window.addEventListener('resize', handleResize);

        const handleVisibility = () => {
            if (reducedMotion) return;
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animationId = requestAnimationFrame(animate);
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} id="schematic-grid-canvas" />;
}
