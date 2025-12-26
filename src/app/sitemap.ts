import { MetadataRoute } from 'next'

// Static sitemap for SEO - Bilingual site with separate URLs
// /en - English version
// /he - Hebrew version
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drbendor.com'
  const lastModified = new Date()

  return [
    // English version
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          he: `${baseUrl}/he`,
        },
      },
    },
    // Hebrew version
    {
      url: `${baseUrl}/he`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          he: `${baseUrl}/he`,
        },
      },
    },
  ]
}
