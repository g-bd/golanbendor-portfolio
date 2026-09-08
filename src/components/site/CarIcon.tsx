// Top-down car used by the desktop road rail and the phone header line.
// Front (headlights) is at the bottom; the parent rotates it to drive sideways.
export default function CarIcon({ gradientId }: { gradientId: string }) {
    return (
        <svg viewBox="0 0 26 50" aria-hidden="true">
            <defs>
                <linearGradient id={`${gradientId}-paint`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="var(--car-accent)" />
                    <stop offset=".35" stopColor="var(--car-body)" />
                    <stop offset=".6" stopColor="var(--car-edge)" />
                    <stop offset="1" stopColor="var(--car-accent)" />
                </linearGradient>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style={{ stopColor: 'var(--car-light)', stopOpacity: 0.75 }} />
                    <stop offset="1" style={{ stopColor: 'var(--car-light)', stopOpacity: 0 }} />
                </linearGradient>
            </defs>
            <path className="car-beam" style={{ fill: `url(#${gradientId})` }} d="M7 43 L3 65 L13 65 L10 43 Z M16 43 L13 65 L23 65 L19 43 Z" />
            <rect className="car-wheel" x="2" y="9" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="20" y="9" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="2" y="31" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="20" y="31" width="4" height="9" rx="1.5" />
            <path className="car-body" style={{ fill: `url(#${gradientId}-paint)` }} d="M9 2 Q13 1 17 2 Q21 3 21 9 L22 35 Q22 44 18 46 Q13 48 8 46 Q4 44 4 35 L5 9 Q5 3 9 2Z" />
            <path className="car-glass" d="M8 10 Q13 8 18 10 L19 17 Q13 15 7 17Z" />
            <path className="car-glass" d="M7 28 Q13 30 19 28 L18 35 Q13 38 8 35Z" />
            <path className="car-roof" d="M8 19 Q13 17 18 19 L18 26 Q13 28 8 26Z" />
            <path className="car-detail" d="M6 20V27 M20 20V27 M9 39Q13 41 17 39" />
            <path className="car-mirror" d="M4 29H2V32H5 M22 29H24V32H21" />
            <rect className="car-brake" x="7" y="3.6" width="4" height="2" rx="1" />
            <rect className="car-brake" x="15" y="3.6" width="4" height="2" rx="1" />
            <rect className="car-headlight" x="7" y="42.4" width="4" height="2.2" rx="1" />
            <rect className="car-headlight" x="15" y="42.4" width="4" height="2.2" rx="1" />
        </svg>
    );
}
