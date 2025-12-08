# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Dr. Golan Ben-Dor, an urban mobility simulation scientist. The site is built as a **static Next.js application** configured for static export deployment. It showcases research work, publications, media appearances, and project demonstrations related to transport simulation and agent-based modeling (MATSim).

## Development Commands

```bash
# Start development server (runs on localhost:3000)
npm run dev

# Build static site for deployment (outputs to /out directory)
npm run build

# Start production server (for testing build locally)
npm start

# Run linter
npm run lint
```

## Architecture & Key Design Patterns

### Static Export Configuration
The site uses Next.js with `output: 'export'` in `next.config.ts`, which means:
- All pages are pre-rendered at build time
- No server-side rendering or API routes
- Images use `unoptimized: true` (required for static export)
- Build output goes to `/out` directory
- Suitable for static hosting (Vercel, Netlify, GitHub Pages, etc.)

### Single-Page Application Structure
The entire site is a single-page React application in `src/app/page.tsx`:
- Uses client-side rendering (`'use client'` directive)
- Navigation is handled via anchor links (`#about`, `#work`, etc.)
- All content sections are inline in one large component
- No routing beyond the single page

### Component Architecture

**Custom Interactive Components:**
- `VideoCard` - Interactive video containers with hover/tap sound controls, supports mobile detection
- `TrafficCanvas` - Animated HTML5 canvas background showing traffic flow simulation
- `ScrambleText` - Text animation effect for hero section
- `KeynoteCarousel` - Carousel for conference photos
- `PDFModal` - Modal for viewing PDF documents (resume, PhD thesis)

**Component Pattern:**
All custom components are client-side (`'use client'`) and use React hooks for state/effects. They're located in `src/components/`.

### SEO & Structured Data
The site heavily invests in SEO through:
- Comprehensive JSON-LD structured data (Person, ScholarlyArticle, VideoObject, FAQPage schemas)
- Rich metadata in `layout.tsx` with OpenGraph and Twitter cards
- Keywords targeting urban mobility, MATSim, transport simulation
- Sitemap generation via `src/app/sitemap.ts`

### Styling System & Design Language

**Foundation:**
- Uses **Tailwind CSS v4** via PostCSS for utility classes
- Extensive custom CSS in `src/app/globals.css` for animations and bespoke effects
- Multiple Google Fonts: Outfit (body), Space Grotesk (headings), Rajdhani (nav/labels), Fira Code (code/monospace)

**Color Palette - "POP" Theme:**
```css
--bg-color: #0a0a12           /* Deep navy/black background */
--bg-secondary: #11111f        /* Secondary dark background */
--text-primary: #ffffff        /* White text */
--text-secondary: #b0b0c0      /* Light gray for secondary text */

/* Accent Colors (High-contrast neon) */
--pop-pink: #ff0055           /* Vibrant pink for emphasis */
--pop-cyan: #00e5ff           /* Bright cyan for interactive elements */
--pop-lime: #ccff00           /* Electric lime for publications/success */

/* Glass-morphism */
--glass-bg: rgba(255, 255, 255, 0.03)
--glass-border: rgba(255, 255, 255, 0.08)
```

**Design Philosophy:**
- **Cyberpunk/Tech Aesthetic** - Inspired by transport simulation visualizations
- **Glass-morphism** - Semi-transparent cards with backdrop-filter blur effects
- **Neon Accents** - High-contrast accent colors for interactive elements
- **Grayscale-to-Color Transitions** - Most images/videos start grayscale and animate to color on hover
- **Geometric Clipping** - Angled corners using `clip-path` (buttons, profile image)

**Key Animations & Effects:**

1. **Traffic Canvas Background** (`TrafficCanvas.tsx`)
   - Animated HTML5 canvas with 150 moving "cars" (colored lines)
   - Cars move horizontally or vertically at varying speeds
   - Colors cycle through the POP palette
   - Fixed position, low opacity (0.4), behind all content

2. **Grid Overlay**
   - CSS-based grid pattern (40px squares)
   - Radial gradient mask for vignette effect
   - Subtle white lines at 3% opacity

3. **Hero Title Animations**
   - Typing animation on `.hero-sub` using CSS `::before` pseudo-element
   - "URBAN MOBILITY SCIENTIST" types in with border cursor effect
   - ScrambleText component animates "THE FUTURE" with randomized characters

4. **Profile Image Hover Effect**
   - Hexagonal clip-path shape with angled corners
   - Starts grayscale, transitions to color on hover
   - Simultaneous transform: image moves up-left, border frame moves down-right
   - Creates parallax depth effect

5. **Video Cards**
   - All videos start muted, grayscale (100%), and 60% brightness
   - On hover: unmute, remove grayscale, full brightness
   - Mobile: tap to toggle sound
   - IntersectionObserver pauses videos when out of viewport

6. **Glassmorphism Cards**
   - Background: `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(20px)`
   - Subtle border glow on hover with box-shadow matching accent color
   - `translateY(-10px)` lift animation on hover

7. **Button Style**
   - Angled corners via `clip-path: polygon(...)`
   - Cyan background, transforms to white with glow on hover
   - Uppercase Rajdhani font with heavy letter-spacing

8. **Status Badges**
   - Monospace Fira Code font
   - Small pill shapes with matching border and background tint
   - Example: "LIVE" badge uses lime color

9. **Skill Tags**
   - Inline pills with glass background
   - Hover: flip colors (cyan bg, black text) + cyan glow
   - Monospace Fira Code font

10. **Trusted Logos Section**
    - Logos in white containers, start grayscale
    - Hover: lift + scale + lime border + lime shadow + remove grayscale
    - `mix-blend-mode: multiply` for logo integration

**Typography Hierarchy:**
- All headings: `text-transform: uppercase`, Space Grotesk font
- Body: Outfit (sans-serif)
- Technical elements: Fira Code (monospace) with cyan color
- Navigation: Rajdhani (condensed sans-serif) with cyan glow on hover
- Section titles prefixed with `//` in Fira Code + pink color

**Interaction Patterns:**
- Hover states always include color transition + glow (box-shadow or text-shadow)
- Moving elements use `transform: translateY()` for lift effect
- Smooth transitions (0.3s - 0.5s duration)
- Mobile-first responsive with extensive media queries at 900px breakpoint

### Path Aliasing
TypeScript configured with `@/*` alias mapping to `./src/*` for cleaner imports.

## Content & Assets

**Media Assets in /public:**
- Multiple video files for work demonstrations and media appearances
- PDF files: PhD thesis (`PhD_Final_new.pdf`), resume (`Golan_Resume.pdf`)
- Research paper thumbnails (`paper 1.png`, `paper 2.png`, `paper 3.png`)
- Conference keynote photos (`key note 1.jpg` through `key note 4.jpg`)
- Organization logos in `/public/logos/` (Ministry of Transport, Netivei Israel, etc.)

**External Links:**
- Links to scholarly publications (DOI links to Transportation Research journals)
- Google Scholar profile
- LinkedIn, GitHub profiles
- Calcalist news article

## Important Considerations

### When Making Content Changes:
- The main page content is all in `src/app/page.tsx` - no separate content files
- Structured data schemas should be updated if biographical details change
- Video files are directly referenced from /public (not optimized during build)

### When Adding Features:
- Remember this is a static export - no server-side code or API routes will work
- All components need `'use client'` directive if they use React hooks or browser APIs
- New media assets go in /public and are referenced with absolute paths like `/filename.ext`

### Performance Notes:
- Videos autoplay muted by default (for browser autoplay policies)
- IntersectionObserver used to pause off-screen videos
- Canvas animation runs continuously - consider performance for lower-end devices
- Images are unoptimized (static export requirement)

## Deployment

The site is configured for static hosting. After `npm run build`, deploy the `/out` directory to any static host. The build includes:
- Pre-rendered HTML pages
- All static assets (images, videos, PDFs)
- Optimized JavaScript bundles
- robots.txt for search engine crawling
