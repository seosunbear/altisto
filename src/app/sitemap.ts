import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      /* 마스코트 페이지 — 캐릭터 이름으로 들어오는 유입 경로라
         비중을 서비스 다음으로 둔다. 이미지 색인용으로 일러스트도 싣는다. */
      url: `${BASE_URL}/merry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        `${BASE_URL}/merry-portrait.webp`,
        `${BASE_URL}/merry-full.webp`,
      ],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
