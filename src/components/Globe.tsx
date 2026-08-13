'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

// NOTE: cobe is pinned to 0.6.5 — the published 2.0.1 build renders no landmass
// dots and has no animation loop (verified empirically 2026-08-14). Do not upgrade
// without visually re-testing the globe.

// Conference / research cities from the detailed CV ([lat, lon]).
// Tel Aviv (home base) gets a larger marker.
const MARKERS: { location: [number, number]; size: number }[] = [
    { location: [32.08, 34.78], size: 0.09 },   // Tel Aviv
    { location: [31.77, 35.22], size: 0.05 },   // Jerusalem
    { location: [41.88, -87.63], size: 0.05 },  // Chicago (Pritzker Forum)
    { location: [1.35, 103.82], size: 0.05 },   // Singapore (GYSS)
    { location: [48.14, 11.58], size: 0.05 },   // Munich (Smart City Workshop)
    { location: [45.76, 4.84], size: 0.05 },    // Lyon (ERSA)
    { location: [59.33, 18.07], size: 0.05 },   // Stockholm (CIT19)
    { location: [52.23, 21.01], size: 0.05 },   // Warsaw (ABMTRANS)
    { location: [41.15, -8.61], size: 0.05 },   // Porto (ANT)
    { location: [50.88, 4.7], size: 0.05 },     // Leuven (ANT/ABMTRANS)
    { location: [51.51, -0.13], size: 0.05 },   // London (Data for Policy)
    { location: [53.48, -2.24], size: 0.05 },   // Manchester (ECTQG)
    { location: [54.69, 25.28], size: 0.05 },   // Vilnius (AGILE)
    { location: [34.71, 33.02], size: 0.05 },   // Limassol (AGILE)
    { location: [28.54, -81.38], size: 0.05 },  // Orlando (AVS)
    { location: [52.52, 13.4], size: 0.05 },    // Berlin (TU Berlin / MATSim)
];

// start facing the Israel/Europe marker cluster (cobe: phi = PI - (lonRad - PI/2), lon ~20°E)
const INITIAL_PHI = 4.36;

interface GlobeProps {
    ariaLabel: string;
    className?: string;
}

/**
 * Interactive WebGL globe (cobe) plotting conference cities in the site's POP
 * palette: dim cyan landmass dots, glowing pink markers. Auto-rotates slowly
 * (disabled under prefers-reduced-motion), drag horizontally to spin; vertical
 * touch scroll stays free (touch-action: pan-y in CSS).
 */
export default function Globe({ ariaLabel, className = '' }: GlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerStart = useRef<number | null>(null);
    const pointerDelta = useRef(0);
    const phiRef = useRef(INITIAL_PHI);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let width = canvas.offsetWidth;
        const onResize = () => {
            width = canvas.offsetWidth;
        };
        window.addEventListener('resize', onResize);

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const globe = createGlobe(canvas, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: INITIAL_PHI,
            theta: 0.32,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 20000,
            mapBrightness: 8,
            baseColor: [0.35, 0.65, 0.75],   // cyan landmass dots
            markerColor: [1, 0, 0.33],       // --pop-pink #ff0055
            glowColor: [0.09, 0.19, 0.24],   // cyan halo that melts into the bg
            markers: MARKERS,
            onRender: (state) => {
                if (!reducedMotion && pointerStart.current === null) {
                    phiRef.current += 0.005;
                }
                state.phi = phiRef.current + pointerDelta.current;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        // fade in once the first frame exists
        requestAnimationFrame(() => {
            canvas.style.opacity = '1';
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const endDrag = () => {
        // bake the drag offset into the base rotation so the next drag starts clean
        phiRef.current += pointerDelta.current;
        pointerDelta.current = 0;
        pointerStart.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    };

    return (
        <div className={`globe-wrap ${className}`.trim()} role="img" aria-label={ariaLabel}>
            <canvas
                ref={canvasRef}
                className="globe-canvas"
                onPointerDown={(e) => {
                    pointerStart.current = e.clientX;
                    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
                }}
                onPointerMove={(e) => {
                    if (pointerStart.current !== null) {
                        pointerDelta.current = (e.clientX - pointerStart.current) / 100;
                    }
                }}
                onPointerUp={endDrag}
                onPointerOut={endDrag}
            />
            <div className="globe-fade" aria-hidden />
        </div>
    );
}
