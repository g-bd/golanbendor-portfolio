import { MetadataRoute } from 'next'

// Static sitemap for SEO - Bilingual site with separate URLs
// /en - English version
// /he - Hebrew version
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drbendor.com'
  const lastModified = new Date()

  return [
    // English version - Home
    {
      url: `${baseUrl}/en/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          he: `${baseUrl}/he/`,
          'x-default': `${baseUrl}/he/`,
        },
      },
    },
    // Hebrew version - Home
    {
      url: `${baseUrl}/he/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en/`,
          he: `${baseUrl}/he/`,
          'x-default': `${baseUrl}/he/`,
        },
      },
    },
    // Work Index - English
    {
      url: `${baseUrl}/en/work/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/work/`,
          he: `${baseUrl}/he/work/`,
          'x-default': `${baseUrl}/he/work/`,
        },
      },
    },
    // Work Index - Hebrew
    {
      url: `${baseUrl}/he/work/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/work/`,
          he: `${baseUrl}/he/work/`,
          'x-default': `${baseUrl}/he/work/`,
        },
      },
    },
    // Jerusalem Article - English
    {
      url: `${baseUrl}/en/work/jerusalem/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/work/jerusalem/`,
          he: `${baseUrl}/he/work/jerusalem/`,
          'x-default': `${baseUrl}/he/work/jerusalem/`,
        },
      },
    },
    // Jerusalem Article - Hebrew
    {
      url: `${baseUrl}/he/work/jerusalem/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/work/jerusalem/`,
          he: `${baseUrl}/he/work/jerusalem/`,
          'x-default': `${baseUrl}/he/work/jerusalem/`,
        },
      },
    },
    // Accessibility Statement - English
    {
      url: `${baseUrl}/en/accessibility/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/accessibility/`,
          he: `${baseUrl}/he/accessibility/`,
          'x-default': `${baseUrl}/he/accessibility/`,
        },
      },
    },
    // Accessibility Statement - Hebrew
    {
      url: `${baseUrl}/he/accessibility/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/accessibility/`,
          he: `${baseUrl}/he/accessibility/`,
          'x-default': `${baseUrl}/he/accessibility/`,
        },
      },
    },
    // Privacy Policy - English
    {
      url: `${baseUrl}/en/privacy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy/`,
          he: `${baseUrl}/he/privacy/`,
          'x-default': `${baseUrl}/he/privacy/`,
        },
      },
    },
    // Privacy Policy - Hebrew
    {
      url: `${baseUrl}/he/privacy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy/`,
          he: `${baseUrl}/he/privacy/`,
          'x-default': `${baseUrl}/he/privacy/`,
        },
      },
    },
  ]
}
