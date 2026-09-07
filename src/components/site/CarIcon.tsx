// Top-down car used by the desktop road rail and the phone header line.
// Front (headlights) is at the bottom; the parent rotates it to drive sideways.
export default function CarIcon({ gradientId }: { gradientId: string }) {
    return (
        <svg viewBox="0 0 26 50" aria-hidden="true">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style={{ stopColor: 'var(--car-light)', stopOpacity: 0.75 }} />
                    <stop offset="1" style={{ stopColor: 'var(--car-light)', stopOpacity: 0 }} />
                </linearGradient>
            </defs>
            <path className="car-beam" style={{ fill: `url(#${gradientId})` }} d="M7 44 L0 74 L26 74 L19 44 Z" />
            <rect className="car-wheel" x="2" y="9" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="20" y="9" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="2" y="31" width="4" height="9" rx="1.5" />
            <rect className="car-wheel" x="20" y="31" width="4" height="9" rx="1.5" />
            <rect className="car-body" x="5" y="2" width="16" height="44" rx="6.5" />
            <path className="car-glass" d="M8 10.5h10l1.4 6.5H6.6z" />
            <path className="car-glass" d="M6.6 28h12.8l-1.4 7.5H8z" />
            <rect className="car-brake" x="7" y="3.6" width="4" height="2" rx="1" />
            <rect className="car-brake" x="15" y="3.6" width="4" height="2" rx="1" />
            <rect className="car-headlight" x="7" y="42.4" width="4" height="2.2" rx="1" />
            <rect className="car-headlight" x="15" y="42.4" width="4" height="2.2" rx="1" />
        </svg>
    );
}
