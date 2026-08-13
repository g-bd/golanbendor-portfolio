This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Saved UI component prompts (for future reuse)

Two third-party component integration prompts, kept here so they can be reused/re-adapted later.
Both were originally written for a shadcn + Tailwind config-file setup; **this repo is NOT shadcn**
(components live in `src/components/`, Tailwind v4 via CSS `@import "tailwindcss"`, no `cn()` util),
so in this codebase they were adapted as:

- `src/components/Marquee.tsx` + `.marquee*` styles in `globals.css` (used by the Trusted-By logos strip and the Recognition/Awards strip)
- `src/components/AwardBadge.tsx` + `.award-*` styles in `globals.css` (3D cursor tilt + shine, restyled to the POP glass/neon palette, RTL-aware)

### Prompt 1 — Infinite logo marquee

`````text
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:

```tsx
marquee.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: "left" | "right"
  speed?: number
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden sm:mt-24 mt-10 z-10",
        className
      )}
      {...props}
    >
      <div className="relative flex max-w-[90vw] overflow-hidden py-5">
        <div
          className={cn(
            "flex w-max animate-marquee",
            pauseOnHover && "hover:[animation-play-state:paused]",
            direction === "right" && "animate-marquee-reverse"
          )}
          style={{ "--duration": `${speed}s` } as React.CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  )
}
```

demo.tsx: renders `<Marquee>` with an array of SVG logos (Tailwind CSS, Motion/Framer, Next.js, AWS),
each wrapped in `<div className="relative h-full w-fit mx-[4rem] flex items-center justify-start">`.

Extend existing tailwind.config.js with this code:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: 'marquee var(--duration, 30s) linear infinite'
      },
      keyframes: {
        marquee: {
          to: { transform: 'translateX(-50%)' }
        }
      }
    },
  },
};
```

Extend existing globals.css with this code:

```css
:root {
  --sky-400: #38bdf8;
  --sky-500: #0ea5e9;
}

.dark {
  --sky-400: #38bdf8;
  --sky-500: #0ea5e9;
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
`````

### Prompt 2 — Product Hunt style AwardBadge (3D tilt + shine)

`````text
You are given a task to integrate an existing React component in the codebase

(Same shadcn/Tailwind/TypeScript preamble and Implementation Guidelines / Steps to integrate
as Prompt 1 above.)

Copy-paste this component to /components/ui folder:

```tsx
award-badge.tsx
import React, { MouseEvent, useEffect, useRef, useState } from "react";

type AwardBadgeType = "golden-kitty" | "product-of-the-day" | "product-of-the-month" | "product-of-the-week";

interface AwardBadgeProps {
  type: AwardBadgeType;
  place?: number;
  link?: string;
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

const backgroundColor = ["#f3e3ac", "#ddd", "#f1cfa6"];

const title = {
  "golden-kitty": "Golden Kitty Awards",
  "product-of-the-day": "Product of the Day",
  "product-of-the-month": "Product of the Month",
  "product-of-the-week": "Product of the Week",
};

export const AwardBadge = ({ type, place, link }: AwardBadgeProps) => {
  // Full implementation summary (original is ~450 lines):
  // - ref on the <a> badge; getBoundingClientRect() for dimensions
  // - getMatrix(clientX, clientY): builds a matrix3d string from cursor position —
  //   scale interpolated between minScale/maxScale by distance from center,
  //   rotate components interpolated between minRotate/maxRotate by cursor x/y
  // - getOppositeMatrix(matrix, clientY, onMouseEnter?): inverts/weakens the matrix
  //   (weakening 0.7 on enter, 4 on leave; multiplier -1 on enter) for a spring-back feel
  // - onMouseEnter: clears leave timeouts, computes opposite matrix, animates overlay
  //   rotation (firstOverlayPosition from cursor distance to center), 200ms timeout gate
  // - onMouseMove: updates firstOverlayPosition (150ms delayed) and, after the gate,
  //   sets the live matrix from getMatrix
  // - onMouseLeave: applies opposite matrix then identity after 200ms; staged timeouts
  //   (150/300/500ms) ease the overlay back and re-enable the idle animation
  // - Renders: <a> wrapping a div with transform: perspective(700px) matrix3d(...),
  //   transition 200ms ease-out; inside an SVG badge (260x54, rounded rect,
  //   gold/silver/bronze backgroundColor by `place`, "PRODUCT HUNT" + title text,
  //   kitty logo path) topped by 10 rotating blurred polygon overlays
  //   (mix-blend-mode: overlay, hsl rainbow fills, keyframes overlayAnimation1..10
  //   generated inline, 5s infinite, willChange: transform)
};
```

demo.tsx usage:

```tsx
import { AwardBadge } from "@/components/ui/award-badge";

const demoLink = "https://www.producthunt.com/golden-kitty-awards/hall-of-fame?year=2024#bootstrapped-small-teams-2";

<AwardBadge type="golden-kitty" link={demoLink} />
<AwardBadge type="product-of-the-day" place={1} link={demoLink} />
<AwardBadge type="product-of-the-month" place={2} link={demoLink} />
<AwardBadge type="product-of-the-week" place={3} link={demoLink} />
```
`````

**Adaptation notes for this repo:** the kept ideas are the cursor-driven 3D tilt
(`perspective + rotateX/rotateY`, simplified from the matrix3d math), the cursor-following
shine overlay, and an idle glint sweep. Dropped: Product Hunt branding/SVG text (breaks RTL
and Hebrew fonts), the gold/silver/bronze palette (replaced with POP pink/cyan/lime glass
variants), and the 10-layer rainbow overlay (replaced with one radial shine + one glint,
disabled under `prefers-reduced-motion`).


