// Case-study routing table shared by the home page, the work index and the case-study template.
export type ProjectSlug = 'cordon' | 'counts' | 'jerusalem' | 'google' | 'beersheva' | 'brt';
export type Accent = 'cyan' | 'pink' | 'lime';
export type ProjectCategory = 'analytics' | 'policy' | 'simulation' | 'ai';

export const projectOrder: ProjectSlug[] = ['cordon', 'counts', 'jerusalem', 'google', 'beersheva', 'brt'];

export const projectAssets: Record<ProjectSlug, { image: string; video?: string; color: Accent; category: ProjectCategory }> = {
  cordon: { image: 'cordon-thumbnail.jpg', color: 'cyan', category: 'analytics' },
  counts: { image: 'counts-thumbnail.jpg', color: 'pink', category: 'analytics' },
  jerusalem: { image: 'sim video high res thumbnail.jpg', video: 'sim video high res.mp4', color: 'pink', category: 'policy' },
  google: { image: 'google-thumbnail.jpg', video: 'google-web.mp4', color: 'cyan', category: 'ai' },
  beersheva: { image: 'beer-sheva-thumbnail.jpg', video: 'beer-sheva-web.mp4', color: 'lime', category: 'ai' },
  brt: { image: 'brt-thumbnail.jpg', video: 'brt-web.mp4', color: 'pink', category: 'simulation' },
};
