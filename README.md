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

### Prompt 3 — Magic UI Globe (cobe)

Adapted in this repo as `src/components/Globe.tsx` + `.globe-*` styles in `globals.css`
("Global Reach" section: cyan landmass dots, pink markers on real conference cities from
the CV, horizon crop, drag-to-spin, RTL + reduced-motion aware).

> **CRITICAL — cobe is pinned to `0.6.5` (exact).** The published `cobe@2.0.1` build is
> broken: it renders NO landmass dots (the land texture never appears) and has no
> animation loop (globe doesn't spin) — verified empirically in both headless and real
> Chrome on 2026-08-14 (even with cobe's own README config; only the official demo site
> works, apparently running unpublished code). Do NOT upgrade cobe without visually
> re-testing the globe. v2-only features (arcs, per-marker `color`) are therefore
> unavailable.

`````text
You are given a task to integrate an existing React component in the codebase

(Same shadcn/Tailwind/TypeScript preamble and Implementation Guidelines / Steps to integrate
as Prompt 1 above.)

Copy-paste this component to /components/ui folder:

```tsx
globe.tsx
"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    return () => globe.destroy()
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}


demo.tsx
import { Globe } from "@/components/ui/globe"

export function GlobeDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  )
}
```

Install NPM dependencies:
```bash
cobe
```
`````

**Dark-theme cobe recipe that actually works (0.6.5):** `dark: 1, diffuse: 1.2,
mapBrightness: 8, baseColor: [0.35, 0.65, 0.75]` (cyan dots), `markerColor: [1, 0, 0.33]`
(POP pink), `glowColor: [0.09, 0.19, 0.24]`. Start rotation facing a longitude with
`phi = PI - (lonRad - PI/2)` (≈4.36 for ~20°E / Europe-Israel).


