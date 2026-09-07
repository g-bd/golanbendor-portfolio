'use client';

import { useEffect, useRef } from 'react';

// The classic site's traffic motif, reduced to a quiet fixed ambient layer.
// Rebuilds the random scene only when the WIDTH changes: mobile browsers fire
// resize on every address-bar show/hide, and re-randomizing on each one makes
// the background visibly flicker while swiping.
export default function TrafficCanvas({ enabled }: { enabled: boolean }) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas || !enabled) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        type Car = { x: number; y: number; speed: number; length: number; horizontal: boolean; color: string };
        let frame = 0, width = 0, height = 0, cars: Car[] = [];
        const build = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            cars = Array.from({ length: width < 700 ? 12 : 35 }, () => ({
                x: Math.random() * width, y: Math.random() * height,
                speed: 0.3 + Math.random() * 0.5, length: 7 + Math.random() * 20,
                horizontal: Math.random() > 0.5, color: Math.random() > 0.25 ? '#00e5ff' : '#ff0055',
            }));
        };
        const resize = () => {
            if (window.innerWidth === width) { height = canvas.height = window.innerHeight; return; }
            build();
        };
        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            for (const car of cars) {
                if (car.horizontal) car.x = (car.x + car.speed) % width; else car.y = (car.y + car.speed) % height;
                ctx.beginPath(); ctx.strokeStyle = car.color; ctx.lineWidth = 1;
                ctx.moveTo(car.x, car.y);
                ctx.lineTo(car.x - (car.horizontal ? car.length : 0), car.y - (car.horizontal ? 0 : car.length));
                ctx.stroke();
            }
            frame = requestAnimationFrame(draw);
        };
        const visibility = () => { cancelAnimationFrame(frame); if (!document.hidden) frame = requestAnimationFrame(draw); };
        build(); frame = requestAnimationFrame(draw);
        window.addEventListener('resize', resize); document.addEventListener('visibilitychange', visibility);
        return () => {
            cancelAnimationFrame(frame); ctx.clearRect(0, 0, width, height);
            window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility);
        };
    }, [enabled]);
    return <canvas ref={ref} className="traffic-canvas" aria-hidden="true" />;
}
