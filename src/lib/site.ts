// Shared helpers for the editorial site components.
// Encodes each path segment (spaces in file names) but keeps folder slashes.
export const asset = (name: string) => '/' + name.split('/').map(encodeURIComponent).join('/');
export const logo = (name: string) => `/logos/${name}`;
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
export const HOME_SECTIONS = ['intro', 'work', 'expertise', 'about', 'global', 'media', 'contact'] as const;
export const EMAIL = 'golanbendor@gmail.com';
export const WHATSAPP = 'https://wa.me/972522937463';
export const SCHOLAR = 'https://scholar.google.com/citations?user=jsVfMncAAAAJ';
export const LINKEDIN = 'https://linkedin.com/in/golan-ben-dor';
export const GITHUB = 'https://github.com/g-bd';
