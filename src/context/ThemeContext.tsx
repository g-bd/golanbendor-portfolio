'use client';

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();
const readTheme = (): Theme => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const serverTheme = (): Theme => 'light';

export function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* private mode */ }
    listeners.forEach(cb => cb());
}

interface ThemeContextType { theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: () => {}, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // The inline script in app/layout.tsx sets data-theme before paint; this store mirrors it.
    const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
    const setTheme = useCallback((t: Theme) => applyTheme(t), []);
    const toggleTheme = useCallback(() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark'), []);
    return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
