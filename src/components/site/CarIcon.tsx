// Top-down car used by the desktop road rail and the phone header line.
// Front (headlights) is at the bottom; the parent rotates it to drive sideways.
// Motion comes from two CSS vars on the parent (set by driveCar): --car-speed (0..1)
// stretches the beams and light trails, --car-pitch (-1..1) shifts the body over its
// wheels (squat on acceleration, nose-dip on braking) and springs back when it stops.
export default function CarIcon({ gradientId }: { gradientId: string }) {
    const id = (name: string) => `${gradientId}-${name}`;
    const url = (name: string) => `url(#${id(name)})`;
    const wheels = [[2.2, 7.5], [19.8, 7.5], [2.2, 32], [19.8, 32]];
    return (
        <svg viewBox="0 0 26 50" aria-hidden="true">
            <defs>
                <linearGradient id={id('paint')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="var(--car-shade)" />
                    <stop offset=".22" stopColor="var(--car-body)" />
                    <stop offset=".44" stopColor="var(--car-highlight)" />
                    <stop offset=".62" stopColor="var(--car-body)" />
                    <stop offset="1" stopColor="var(--car-shade)" />
                </linearGradient>
                <linearGradient id={id('depth')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity=".28" />
                    <stop offset=".3" stopColor="#000" stopOpacity="0" />
                    <stop offset=".72" stopColor="#fff" stopOpacity=".08" />
                    <stop offset="1" stopColor="#000" stopOpacity=".22" />
                </linearGradient>
                <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#8fb4c6" />
                    <stop offset=".4" stopColor="#23445a" />
                    <stop offset="1" stopColor="#060e17" />
                </linearGradient>
                <linearGradient id={id('roof')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="var(--car-shade)" />
                    <stop offset=".4" stopColor="var(--car-highlight)" />
                    <stop offset="1" stopColor="var(--car-body)" />
                </linearGradient>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style={{ stopColor: 'var(--car-light)', stopOpacity: 0.8 }} />
                    <stop offset="1" style={{ stopColor: 'var(--car-light)', stopOpacity: 0 }} />
                </linearGradient>
                <linearGradient id={id('trail')} x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0" style={{ stopColor: 'var(--car-trail)', stopOpacity: 0.85 }} />
                    <stop offset="1" style={{ stopColor: 'var(--car-trail)', stopOpacity: 0 }} />
                </linearGradient>
                <clipPath id={id('glass-clip')}>
                    <path d="M7.4 11.5 Q13 9.6 18.6 11.5 L19.3 17.6 Q13 16 6.7 17.6Z M6.6 28.4 Q13 30.2 19.4 28.4 L18.5 35.6 Q13 38.2 7.5 35.6Z" />
                </clipPath>
            </defs>

            {/* Ground layer: stays put while the body pitches over it. */}
            <rect className="car-ground" x="2.5" y="3" width="21" height="45" rx="9" />
            <path className="car-trail" style={{ fill: url('trail') }} d="M6.4 3 H10.6 V-26 H6.4Z M15.4 3 H19.6 V-26 H15.4Z" />
            <path className="car-beam" style={{ fill: `url(#${gradientId})` }} d="M6.5 46 L1 72 L12.5 72 L10.5 46 Z M15.5 46 L13.5 72 L25 72 L19.5 46 Z" />
            {wheels.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                    <rect className="car-wheel" x={x} y={y} width="4" height="10" rx="1.6" />
                    <line className="car-tread" x1={x + 2} y1={y + 0.6} x2={x + 2} y2={y + 9.4} />
                </g>
            ))}

            <g className="car-chassis">
                <path className="car-body" style={{ fill: url('paint') }}
                    d="M13 1.4 C18 1.4 20.9 2.8 21.4 6.6 L22.6 12 C23.2 14.5 23.1 17.5 22.2 20 L22 29 C22.9 31 23.1 34.5 22.6 37.5 L21.7 43.4 C21 47.2 18 48.8 13 48.8 C8 48.8 5 47.2 4.3 43.4 L3.4 37.5 C2.9 34.5 3.1 31 4 29 L3.8 20 C2.9 17.5 2.8 14.5 3.4 12 L4.6 6.6 C5.1 2.8 8 1.4 13 1.4Z" />
                <path className="car-depth" style={{ fill: url('depth') }}
                    d="M13 1.4 C18 1.4 20.9 2.8 21.4 6.6 L22.6 12 C23.2 14.5 23.1 17.5 22.2 20 L22 29 C22.9 31 23.1 34.5 22.6 37.5 L21.7 43.4 C21 47.2 18 48.8 13 48.8 C8 48.8 5 47.2 4.3 43.4 L3.4 37.5 C2.9 34.5 3.1 31 4 29 L3.8 20 C2.9 17.5 2.8 14.5 3.4 12 L4.6 6.6 C5.1 2.8 8 1.4 13 1.4Z" />
                <path className="car-crease" d="M9.2 37.5 Q8.6 42 9.6 46.2 M16.8 37.5 Q17.4 42 16.4 46.2 M9.6 9.5 Q13 8.4 16.4 9.5" />
                <path className="car-glass" style={{ fill: url('glass') }} d="M7.4 11.5 Q13 9.6 18.6 11.5 L19.3 17.6 Q13 16 6.7 17.6Z" />
                <path className="car-glass" style={{ fill: url('glass') }} d="M6.6 28.4 Q13 30.2 19.4 28.4 L18.5 35.6 Q13 38.2 7.5 35.6Z" />
                <g clipPath={url('glass-clip')}>
                    <path className="car-glint" d="M4 40 L11 8 L13.5 8 L6.5 40Z" />
                </g>
                <path className="car-side-glass" d="M5.6 19 L5.8 27.2 M20.4 19 L20.2 27.2" />
                <path className="car-roof" style={{ fill: url('roof') }} d="M6.9 18.4 Q13 16.8 19.1 18.4 L19 27.6 Q13 29.2 7 27.6Z" />
                <path className="car-reflection" d="M8.4 19.6 Q9.6 23 8.6 26.4 M8 12.6 L7.6 16" />
                <path className="car-mirror" d="M4.2 28.6 L1.6 29.4 L1.8 31.2 L4.4 30.8Z M21.8 28.6 L24.4 29.4 L24.2 31.2 L21.6 30.8Z" />
                <path className="car-brake" d="M6.2 3.6 Q13 2.2 19.8 3.6 L19.6 4.9 Q13 3.7 6.4 4.9Z" />
                <path className="car-headlight" d="M5.4 43.2 L10.4 45.6 L10.2 46.8 L5.8 45Z M20.6 43.2 L15.6 45.6 L15.8 46.8 L20.2 45Z" />
            </g>
        </svg>
    );
}

// Speed is normalised so a steady wheel scroll reads ~0.3 and a fling reads 1.
// Pitch is the change in speed: positive while slowing (nose dips toward the front).
export function driveCar(element: HTMLElement | null, step: number, previous: number) {
    if (!element) return;
    const speed = Math.min(1, Math.abs(step) / 0.6);
    const before = Math.min(1, Math.abs(previous) / 0.6);
    const pitch = Math.max(-1, Math.min(1, (before - speed) * 6));
    element.style.setProperty('--car-speed', speed.toFixed(3));
    element.style.setProperty('--car-pitch', pitch.toFixed(3));
}

// A U-turn swings out of the lane while the parent's CSS rotates the car, so it
// reads as a turn rather than a spin in place. `x`/`y` is the swing in screen pixels.
export function turnCar(element: Element | null | undefined, x: number, y: number) {
    const svg = element?.querySelector('svg');
    if (!svg?.animate) return;
    svg.animate([{ translate: '0 0' }, { translate: `${x}px ${y}px`, offset: 0.45 }, { translate: '0 0' }], { duration: 550, easing: 'ease-in-out' });
}
