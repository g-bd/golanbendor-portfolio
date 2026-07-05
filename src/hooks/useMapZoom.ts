'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;
const WHEEL_SENSITIVITY = 0.0018;
const DRAG_THRESHOLD = 4;

const clampZoom = (z: number) => +Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z)).toFixed(2);
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

/**
 * Scroll-wheel + button + drag-pan + two-finger pinch zoom for an SVG map,
 * scaled via CSS transform (not viewBox) so hit-testing/coordinates inside
 * the SVG stay untouched. The transform is exposed as `svgStyle` and must be
 * applied to a PLAIN element — never to a framer-motion `motion.*` element,
 * which overrides a raw `transform` string with its own transform system.
 */
export function useMapZoom() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    // Every active pointer (mouse or touch) so we can tell a one-finger pan
    // from a two-finger pinch.
    const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
    const dragging = useRef(false);
    const dragDistance = useRef(0);
    const lastPoint = useRef({ x: 0, y: 0 });
    const didDragRef = useRef(false);
    const pinch = useRef<{ startDist: number; startZoom: number } | null>(null);

    const clampPan = useCallback((p: { x: number; y: number }, z: number) => {
        const el = containerRef.current;
        if (!el) return p;
        const rect = el.getBoundingClientRect();
        const maxX = Math.max(0, (rect.width * (z - 1)) / 2);
        const maxY = Math.max(0, (rect.height * (z - 1)) / 2);
        return {
            x: Math.min(maxX, Math.max(-maxX, p.x)),
            y: Math.min(maxY, Math.max(-maxY, p.y)),
        };
    }, []);

    // Set an absolute zoom (used by pinch), re-clamping the pan to the new scale.
    const setZoomTo = useCallback((nz: number) => {
        const cz = clampZoom(nz);
        setZoom(cz);
        setPan(p => (cz === MIN_ZOOM ? { x: 0, y: 0 } : clampPan(p, cz)));
    }, [clampPan]);

    const applyZoom = useCallback((updater: (z: number) => number) => {
        setZoom(z => {
            const nz = clampZoom(updater(z));
            setPan(p => (nz === MIN_ZOOM ? { x: 0, y: 0 } : clampPan(p, nz)));
            return nz;
        });
    }, [clampPan]);

    const zoomIn = useCallback(() => applyZoom(z => z + ZOOM_STEP), [applyZoom]);
    const zoomOut = useCallback(() => applyZoom(z => z - ZOOM_STEP), [applyZoom]);
    const reset = useCallback(() => { setZoom(MIN_ZOOM); setPan({ x: 0, y: 0 }); }, []);

    // React's synthetic onWheel is attached passively (matching the DOM spec's
    // default for wheel listeners), so e.preventDefault() there is a no-op and
    // the page scrolls underneath the zoom. A native { passive: false } listener
    // is the only way to actually stop that default scroll.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            applyZoom(z => z - e.deltaY * WHEEL_SENSITIVITY);
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [applyZoom]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointers.current.size === 2) {
            // Second finger down → start a pinch, cancel any single-finger pan.
            const [a, b] = [...pointers.current.values()];
            pinch.current = { startDist: dist(a, b) || 1, startZoom: zoom };
            dragging.current = false;
            setIsActive(true);
            return;
        }

        // Single pointer: only pan when already zoomed in.
        if (zoom <= MIN_ZOOM) return;
        dragging.current = true;
        dragDistance.current = 0;
        lastPoint.current = { x: e.clientX, y: e.clientY };
        setIsActive(true);
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    }, [zoom]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (pointers.current.has(e.pointerId)) {
            pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }

        if (pinch.current && pointers.current.size >= 2) {
            const [a, b] = [...pointers.current.values()];
            setZoomTo(pinch.current.startZoom * (dist(a, b) / pinch.current.startDist));
            return;
        }

        if (!dragging.current) return;
        const dx = e.clientX - lastPoint.current.x;
        const dy = e.clientY - lastPoint.current.y;
        lastPoint.current = { x: e.clientX, y: e.clientY };
        dragDistance.current += Math.abs(dx) + Math.abs(dy);
        if (dragDistance.current > DRAG_THRESHOLD) didDragRef.current = true;
        setPan(p => clampPan({ x: p.x + dx, y: p.y + dy }, zoom));
    }, [zoom, clampPan, setZoomTo]);

    const removePointer = useCallback((e: React.PointerEvent) => {
        pointers.current.delete(e.pointerId);
        if (pointers.current.size < 2) pinch.current = null;
        if (pointers.current.size === 0) {
            dragging.current = false;
            setIsActive(false);
        }
    }, []);

    // Swallow the click that follows a real drag so panning never selects
    // whatever line/region happened to be under the pointer on release.
    const onClickCapture = useCallback((e: React.MouseEvent) => {
        if (didDragRef.current) {
            e.stopPropagation();
            didDragRef.current = false;
        }
    }, []);

    return {
        containerRef,
        zoom,
        canZoomIn: zoom < MAX_ZOOM,
        canZoomOut: zoom > MIN_ZOOM,
        isZoomed: zoom > MIN_ZOOM,
        zoomIn,
        zoomOut,
        reset,
        containerHandlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp: removePointer,
            onPointerLeave: removePointer,
            onPointerCancel: removePointer,
            onClickCapture,
        },
        // touch-action:none stops the browser's own pinch/pan so our gesture
        // handlers actually receive the moves. Must sit on the element that
        // takes the touches (the container).
        containerStyle: { touchAction: 'none' as const },
        svgStyle: {
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isActive ? 'none' : 'transform 0.2s ease-out',
            cursor: zoom > MIN_ZOOM ? (isActive ? 'grabbing' : 'grab') : undefined,
        },
    };
}
