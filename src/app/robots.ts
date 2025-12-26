import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers full access
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Google - allow /_next/ for JS/CSS rendering
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/'],
        disallow: ['/api/'],
      },
      // Bing - allow /_next/ for JS/CSS rendering
      {
        userAgent: 'Bingbot',
        allow: ['/', '/_next/'],
        disallow: ['/api/'],
      },
      // OpenAI SearchBot - powers ChatGPT search results
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      // OpenAI GPTBot - for AI training (allow if you want to appear in ChatGPT knowledge)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // Anthropic Claude - AI assistant crawler
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Anthropic Claude Web - powers Claude.ai web search
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: 'https://drbendor.com/sitemap.xml',
  }
}
