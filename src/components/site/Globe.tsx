'use client';

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ArchiveContent } from '@/data/siteContent';

// cobe is pinned to 0.6.5 (2.x renders no landmass). Conference/research cities.
const markers = [[32.08, 34.78], [31.77, 35.22], [41.88, -87.63], [1.35, 103.82], [48.14, 11.58], [45.76, 4.84], [59.33, 18.07], [52.23, 21.01], [41.15, -8.61], [50.88, 4.7], [51.51, -0.13], [53.48, -2.24], [54.69, 25.28], [34.71, 33.02], [28.54, -81.38], [52.52, 13.4]]
    .map((location, i) => ({ location: location as [number, number], size: i ? 0.05 : 0.09 }));

export default function Globe({ t, motion, theme }: { t: ArchiveContent; motion: boolean; theme: 'light' | 'dark' }) {
    const canvas = useRef<HTMLCanvasElement>(null), angle = useRef(4.36), pointer = useRef<number | null>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const element = canvas.current;
        if (!element) return;
        let globe: ReturnType<typeof createGlobe> | null = null, visible = false;
        const stop = () => { globe?.destroy(); globe = null; };
        const light = theme === 'light';
        const sync = () => {
            if (!visible || document.hidden) { stop(); return; }
            if (globe) return;
            try {
                globe = createGlobe(element, {
                    devicePixelRatio: 2, width: element.offsetWidth * 2, height: element.offsetWidth * 2,
                    phi: angle.current, theta: 0.32, dark: light ? 0 : 1, diffuse: 1.2, mapSamples: 20000, mapBrightness: light ? 2 : 8,
                    baseColor: light ? [0.18, 0.45, 0.59] : [0.35, 0.65, 0.75], markerColor: [0.88, 0.04, 0.28], glowColor: light ? [0.945, 0.973, 0.98] : [0.09, 0.19, 0.24], markers,
                    onRender(state) {
                        if (motion && pointer.current === null) angle.current += 0.0025;
                        state.phi = angle.current;
                        state.width = element.offsetWidth * 2; state.height = element.offsetWidth * 2;
                    },
                });
            } catch { setFailed(true); }
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { rootMargin: '100px' });
        observer.observe(element); document.addEventListener('visibilitychange', sync);
        return () => { stop(); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
    }, [motion, theme]);
    return (
        <div className="world-visual">
            <div className="globe-orbit" aria-hidden="true" />
            <canvas ref={canvas} aria-label={t.globeLabel} role="img" className="world-canvas"
                onPointerDown={event => { pointer.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
                onPointerMove={event => { if (pointer.current !== null) { angle.current += (event.clientX - pointer.current) / 120; pointer.current = event.clientX; } }}
                onPointerUp={() => { pointer.current = null; }} onPointerCancel={() => { pointer.current = null; }} onLostPointerCapture={() => { pointer.current = null; }} />
            {failed && <p className="globe-fallback">{t.cities}</p>}
            <div className="globe-controls">
                <button className="icon-button" aria-label={t.rotateLeft} onClick={() => { angle.current -= 0.5; }}><ArrowLeft size={16} /></button>
                <span className="eyebrow">{t.globeHint}</span>
                <button className="icon-button" aria-label={t.rotateRight} onClick={() => { angle.current += 0.5; }}><ArrowRight size={16} /></button>
            </div>
        </div>
    );
}
