export function previewLink(page = '', lang = 'en', theme = 'dark', anchor = '') {
  const query = new URLSearchParams({ lang, theme });
  if (page) query.set('page', page);
  return `/?${query}${anchor ? `#${anchor}` : ''}`;
}

export const projectOrder = ['cordon', 'counts', 'jerusalem', 'google', 'beersheva', 'brt'];
export const projectAssets = {
  cordon: { image: 'cordon-thumbnail.jpg', color: 'cyan', category: 'analytics' },
  counts: { image: 'counts-thumbnail.jpg', color: 'pink', category: 'analytics' },
  jerusalem: { image: 'sim video high res thumbnail.jpg', video: 'sim video high res.mp4', color: 'pink', category: 'policy' },
  google: { image: 'google-thumbnail.jpg', video: 'google-web.mp4', color: 'cyan', category: 'ai' },
  beersheva: { image: 'beer-sheva-thumbnail.jpg', video: 'beer-sheva-web.mp4', color: 'lime', category: 'ai' },
  brt: { image: 'brt-thumbnail.jpg', video: 'brt-web.mp4', color: 'pink', category: 'simulation' },
};
