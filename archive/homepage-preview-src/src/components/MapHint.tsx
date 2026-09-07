'use client';

import { MousePointerClick } from 'lucide-react';

/**
 * Small glass chip overlaid on an interactive map to advertise that it can be
 * zoomed/panned/tapped. Sits at the bottom-start of the map and fades out once
 * the user has actually interacted (passed via `hidden`).
 */
export default function MapHint({ text, hidden }: { text: string; hidden: boolean }) {
    return (
        <div
            className="map-hint-chip absolute bottom-3 z-10 max-w-[calc(100%-1.5rem)] pointer-events-none"
            style={{ insetInlineStart: '0.75rem', opacity: hidden ? 0 : 0.92 }}
        >
            <MousePointerClick size={13} className="map-hint-icon" />
            <span className="truncate">{text}</span>
        </div>
    );
}
