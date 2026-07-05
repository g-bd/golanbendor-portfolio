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
    const btnClass =
        'w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed';
    const btnStyle = {
        background: 'rgba(10,10,18,0.65)',
        borderColor: 'rgba(255,255,255,0.12)',
        color: 'var(--pop-cyan)',
        backdropFilter: 'blur(8px)',
    };

    return (
        <div
            className="absolute top-3 flex flex-col gap-1.5 z-10"
            style={{ insetInlineEnd: '0.75rem' }}
        >
            <button
                type="button"
                onClick={zoomIn}
                disabled={!canZoomIn}
                aria-label={labels.zoom_in}
                className={btnClass}
                style={btnStyle}
            >
                <ZoomIn size={16} />
            </button>
            <button
                type="button"
                onClick={zoomOut}
                disabled={!canZoomOut}
                aria-label={labels.zoom_out}
                className={btnClass}
                style={btnStyle}
            >
                <ZoomOut size={16} />
            </button>
            <button
                type="button"
                onClick={reset}
                disabled={!canZoomOut}
                aria-label={labels.zoom_reset}
                className={btnClass}
                style={btnStyle}
            >
                <RotateCcw size={14} />
            </button>
        </div>
    );
}
