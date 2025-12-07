'use client';

import { useEffect, useRef, useCallback } from 'react';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
    const elementRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = useCallback(() => {
        const element = elementRef.current;
        if (!element) return;

        let iteration = 0;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            element.innerText = text
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iteration >= text.length) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }

            iteration += 1 / 3;
        }, 30);
    }, [text]);

    useEffect(() => {
        // Trigger once on load
        const timeout = setTimeout(() => {
            scramble();
        }, 500);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [scramble]);

    return (
        <span
            ref={elementRef}
            className={`scramble-text ${className}`}
            data-value={text}
            onMouseOver={scramble}
        >
            {text}
        </span>
    );
}
