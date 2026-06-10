import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drbendor.com'

  return [
    {
      url: `${baseUrl}/en/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: { en: `${baseUrl}/en/`, he: `${baseUrl}/he/`, 'x-default': `${baseUrl}/he/` } },
    },
    {
      url: `${baseUrl}/he/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages: { en: `${baseUrl}/en/`, he: `${baseUrl}/he/`, 'x-default': `${baseUrl}/he/` } },
    },
    {
      url: `${baseUrl}/en/work/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${baseUrl}/en/work/`, he: `${baseUrl}/he/work/`, 'x-default': `${baseUrl}/he/work/` } },
    },
    {
      url: `${baseUrl}/he/work/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${baseUrl}/en/work/`, he: `${baseUrl}/he/work/`, 'x-default': `${baseUrl}/he/work/` } },
    },
    {
      url: `${baseUrl}/en/work/jerusalem/`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/jerusalem/`, he: `${baseUrl}/he/work/jerusalem/`, 'x-default': `${baseUrl}/he/work/jerusalem/` } },
    },
    {
      url: `${baseUrl}/he/work/jerusalem/`,
      lastModified: new Date('2024-12-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/jerusalem/`, he: `${baseUrl}/he/work/jerusalem/`, 'x-default': `${baseUrl}/he/work/jerusalem/` } },
    },
    {
      url: `${baseUrl}/en/work/google/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/google/`, he: `${baseUrl}/he/work/google/`, 'x-default': `${baseUrl}/he/work/google/` } },
    },
    {
      url: `${baseUrl}/he/work/google/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/google/`, he: `${baseUrl}/he/work/google/`, 'x-default': `${baseUrl}/he/work/google/` } },
    },
    {
      url: `${baseUrl}/en/work/beersheva/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/beersheva/`, he: `${baseUrl}/he/work/beersheva/`, 'x-default': `${baseUrl}/he/work/beersheva/` } },
    },
    {
      url: `${baseUrl}/he/work/beersheva/`,
      lastModified: new Date('2026-06-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/work/beersheva/`, he: `${baseUrl}/he/work/beersheva/`, 'x-default': `${baseUrl}/he/work/beersheva/` } },
    },
    {
      url: `${baseUrl}/en/accessibility/`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { en: `${baseUrl}/en/accessibility/`, he: `${baseUrl}/he/accessibility/`, 'x-default': `${baseUrl}/he/accessibility/` } },
    },
    {
      url: `${baseUrl}/he/accessibility/`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { en: `${baseUrl}/en/accessibility/`, he: `${baseUrl}/he/accessibility/`, 'x-default': `${baseUrl}/he/accessibility/` } },
    },
    {
      url: `${baseUrl}/en/privacy/`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { en: `${baseUrl}/en/privacy/`, he: `${baseUrl}/he/privacy/`, 'x-default': `${baseUrl}/he/privacy/` } },
    },
    {
      url: `${baseUrl}/he/privacy/`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { en: `${baseUrl}/en/privacy/`, he: `${baseUrl}/he/privacy/`, 'x-default': `${baseUrl}/he/privacy/` } },
    },
  ]
}
