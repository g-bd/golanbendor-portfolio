'use client';

import { createElement } from 'react';

// Editorial headline whose lines rise out of a clip mask, one after another, the
// first time it scrolls into view. The reveal observer in HomePage adds
// `will-reveal` (JS is present) and `in-view`; without JS the text simply shows.
// `accent` marks which lines take the accent colour (matches the old `<span>` pattern).
export default function Headline({ as = 'h2', lines, accent = [], className = '', id }: { as?: 'h1' | 'h2' | 'h3'; lines: string[]; accent?: number[]; className?: string; id?: string }) {
    return createElement(
        as,
        { className: `headline ${className}`.trim(), id },
        lines.map((line, i) => (
            <span className="headline-mask" key={i}>
                <span className={`headline-line ${accent.includes(i) ? 'headline-accent' : ''}`.trim()} style={{ '--i': i } as React.CSSProperties}>{line}</span>
            </span>
        )),
    );
}
