'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;
const WHEEL_SENSITIVITY = 0.0018;
const DRAG_THRESHOLD = 4;

const clampZoom = (z: number) => +Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z)).toFixed(2);

/**
 * Scroll-wheel + drag zoom/pan for an SVG map, scaled via CSS transform
 * (not viewBox) so hit-testing/coordinates inside the SVG stay untouched.
 */
export function useMapZoom() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragging = useRef(false);
    const dragDistance = useRef(0);
    const lastPoint = useRef({ x: 0, y: 0 });
    const didDragRef = useRef(false);

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
    // default for wheel/touch listeners), so e.preventDefault() there is a no-op
    // and the page scrolls underneath the zoom. A native { passive: false }
    // listener is the only way to actually stop that default scroll.
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
        if (zoom <= MIN_ZOOM) return;
        dragging.current = true;
        dragDistance.current = 0;
        lastPoint.current = { x: e.clientX, y: e.clientY };
        setIsDragging(true);
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    }, [zoom]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastPoint.current.x;
        const dy = e.clientY - lastPoint.current.y;
        lastPoint.current = { x: e.clientX, y: e.clientY };
        dragDistance.current += Math.abs(dx) + Math.abs(dy);
        if (dragDistance.current > DRAG_THRESHOLD) didDragRef.current = true;
        setPan(p => clampPan({ x: p.x + dx, y: p.y + dy }, zoom));
    }, [zoom, clampPan]);

    const endDrag = useCallback(() => { dragging.current = false; setIsDragging(false); }, []);

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
            onPointerUp: endDrag,
            onPointerLeave: endDrag,
            onPointerCancel: endDrag,
            onClickCapture,
        },
        svgStyle: {
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            cursor: zoom > MIN_ZOOM ? (isDragging ? 'grabbing' : 'grab') : undefined,
            touchAction: 'none' as const,
        },
    };
}
