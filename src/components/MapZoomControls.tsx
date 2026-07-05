'use client';

import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export interface MapZoomLabels {
    zoom_in: string;
    zoom_out: string;
    zoom_reset: string;
}

export default function MapZoomControls({
    labels,
    zoomIn,
    zoomOut,
    reset,
    canZoomIn,
    canZoomOut,
}: {
    labels: MapZoomLabels;
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
    canZoomIn: boolean;
    canZoomOut: boolean;
}) {
    return (
        <div
            className="map-zoom-controls absolute top-3 flex flex-col gap-1.5 z-10"
            style={{ insetInlineEnd: '0.75rem' }}
            // Keep button interactions off the map's drag handler: a pointerdown
            // that bubbles to the container calls setPointerCapture there, and
            // Chrome then retargets the click to the container, so the button's
            // onClick would never fire once the map is zoomed in.
            onPointerDown={e => e.stopPropagation()}
        >
            <button
                type="button"
                onClick={zoomIn}
                disabled={!canZoomIn}
                aria-label={labels.zoom_in}
                title={labels.zoom_in}
                className="map-zoom-btn"
            >
                <ZoomIn size={16} />
            </button>
            <button
                type="button"
                onClick={zoomOut}
                disabled={!canZoomOut}
                aria-label={labels.zoom_out}
                title={labels.zoom_out}
                className="map-zoom-btn"
            >
                <ZoomOut size={16} />
            </button>
            <button
                type="button"
                onClick={reset}
                disabled={!canZoomOut}
                aria-label={labels.zoom_reset}
                title={labels.zoom_reset}
                className="map-zoom-btn"
            >
                <RotateCcw size={14} />
            </button>
        </div>
    );
}
