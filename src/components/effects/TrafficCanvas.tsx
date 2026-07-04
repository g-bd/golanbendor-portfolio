'use client';

import { useEffect, useRef } from 'react';

const colors = ['#ff0055', '#00e5ff', '#ccff00', '#ffffff'];

interface Car {
    x: number;
    y: number;
    speed: number;
    length: number;
    width: number;
    color: string;
    opacity: number;
    horizontal: boolean;
}

export default function TrafficCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const carsRef = useRef<Car[]>([]);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // WCAG 2.1 SC 2.3.3 — respect user's motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const createCar = (): Car => {
            const width = dimensionsRef.current.width || window.innerWidth;
            const height = dimensionsRef.current.height || window.innerHeight;

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                speed: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
                length: Math.random() * 50 + 20,
                width: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.1,
                horizontal: Math.random() > 0.5,
            };
        };

        const init = () => {
            dimensionsRef.current.width = canvas.width = window.innerWidth;
            dimensionsRef.current.height = canvas.height = window.innerHeight;

            carsRef.current = [];
            for (let i = 0; i < 150; i++) {
                carsRef.current.push(createCar());
            }
        };

        let animationId: number;

        const animate = () => {
            const { width, height } = dimensionsRef.current;
            ctx.clearRect(0, 0, width, height);

            carsRef.current.forEach(car => {
                if (car.horizontal) {
                    car.x += car.speed;
                    if (car.x > width + 100) car.x = -100;
                    if (car.x < -100) car.x = width + 100;
                } else {
                    car.y += car.speed;
                    if (car.y > height + 100) car.y = -100;
                    if (car.y < -100) car.y = height + 100;
                }

                ctx.beginPath();
                ctx.strokeStyle = car.color;
                ctx.lineWidth = car.width;
                ctx.globalAlpha = car.opacity;

                if (car.horizontal) {
                    ctx.moveTo(car.x, car.y);
                    ctx.lineTo(car.x - car.length * Math.sign(car.speed), car.y);
                } else {
                    ctx.moveTo(car.x, car.y);
                    ctx.lineTo(car.x, car.y - car.length * Math.sign(car.speed));
                }

                ctx.stroke();
                ctx.globalAlpha = 1;
            });

            animationId = requestAnimationFrame(animate);
        };

        init();
        animate();

        // Only re-init on a real WIDTH change (e.g. orientation change). Mobile
        // browsers fire `resize` constantly during touch — the address bar and
        // elastic scroll change innerHeight on every swipe — and re-init here
        // re-randomizes all the cars, so the background visibly "regenerates"
        // when you swipe. Skip height-only churn to keep it stable.
        const handleResize = () => {
            if (window.innerWidth === dimensionsRef.current.width) return;
            init();
        };
        window.addEventListener('resize', handleResize);

        // Pause animation when tab is hidden to save CPU/battery
        const handleVisibility = () => {
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

    return <canvas ref={canvasRef} id="traffic-canvas" />;
}
