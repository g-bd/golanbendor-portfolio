import { MetadataRoute } from 'next'

// Static sitemap for SEO - Bilingual site (English/Hebrew)
// Note: Single-page site with client-side language toggle
// Anchor fragments removed as they're not canonical URLs
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drbendor.com'
  const lastModified = new Date()

  return [
    // Main page - bilingual portfolio (English/Hebrew with client-side toggle)
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]
}
