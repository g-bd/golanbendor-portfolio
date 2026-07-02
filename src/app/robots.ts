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
      // Anthropic Claude - user-initiated fetches from Claude.ai
      {
        userAgent: 'Claude-User',
        allow: '/',
      },
      // Anthropic Claude - search result crawler
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      // OpenAI - user-initiated browsing from ChatGPT
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Perplexity AI - user-initiated fetches
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      // DuckDuckGo AI assist
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
      },
      // Google AI (Gemini training)
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Common Crawl (used by many AI systems)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Apple Intelligence
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      // Bytedance/TikTok AI
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // Amazon Alexa
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // X.AI Grok
      {
        userAgent: 'Grok',
        allow: '/',
      },
      // Mistral AI
      {
        userAgent: 'MistralBot',
        allow: '/',
      },
      // You.com AI
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // AI2 (Allen Institute for AI)
      {
        userAgent: 'AI2Bot',
        allow: '/',
      },
      // Neeva AI (now part of Snowflake)
      {
        userAgent: 'NeevaBot',
        allow: '/',
      },
    ],
    sitemap: 'https://drbendor.com/sitemap.xml',
  }
}
