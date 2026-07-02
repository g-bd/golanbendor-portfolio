/**
 * Site-wide background variant (behind all content, below the hero video).
 *
 *  'schematic' — canvas-drawn transit diagram (crisp at any resolution, ~0 KB)
 *  'video'     — looping grid-bg-web.mp4 video background
 *
 * You can also override at runtime for quick comparison without rebuilding:
 *   https://localhost:3000/he?bg=video
 *   https://localhost:3000/he?bg=schematic
 */
export type BackgroundVariant = 'schematic' | 'video';

export const BACKGROUND_VARIANT: BackgroundVariant = 'schematic';
