import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // AI 검색/답변 엔진 크롤러 명시적 허용
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'Bytespider',
          'Yeti', // 네이버
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://altisto.me/sitemap.xml',
  }
}
