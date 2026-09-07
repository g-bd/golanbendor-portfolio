'use client';

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

// Motion preference: system "reduce motion" OR the footer pause button. Videos, the globe,
// the road car and reveal animations all read this single flag.
const listeners = new Set<() => void>();
let override: boolean | null = null; // null = follow system
const media = () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null);
const read = () => { if (override !== null) return override; const m = media(); return m ? !m.matches : true; };
const subscribe = (cb: () => void) => {
    listeners.add(cb);
    const m = media(); const onChange = () => cb();
    m?.addEventListener('change', onChange);
    return () => { listeners.delete(cb); m?.removeEventListener('change', onChange); };
};
const notify = () => listeners.forEach(cb => cb());

interface MotionContextType { motion: boolean; setMotion: (on: boolean) => void; }
const MotionContext = createContext<MotionContextType>({ motion: true, setMotion: () => {} });

export function MotionProvider({ children }: { children: React.ReactNode }) {
    const motion = useSyncExternalStore(subscribe, read, () => true);
    const setMotion = useCallback((on: boolean) => { override = on; notify(); }, []);
    useEffect(() => { document.documentElement.classList.toggle('reduce-motion', !motion); }, [motion]);
    return <MotionContext.Provider value={{ motion, setMotion }}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);
