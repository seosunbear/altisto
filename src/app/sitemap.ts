import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'
import { languageAlternates, LOCALES, localePath } from '@/i18n/config'

const BASE_URL = SITE_URL

type Page = Omit<MetadataRoute.Sitemap[number], 'url' | 'lastModified' | 'alternates'> & {
  path: string
}

const PAGES: Page[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/career', changeFrequency: 'weekly', priority: 0.7 },
  {
    /* 마스코트 페이지 — 캐릭터 이름으로 들어오는 유입 경로라
       비중을 서비스 다음으로 둔다. 이미지 색인용으로 일러스트도 싣는다. */
    path: '/merry',
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [
      `${BASE_URL}/merry-portrait.webp`,
      `${BASE_URL}/merry-full.webp`,
    ],
  },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
]

/* 페이지마다 세 언어 주소를 한 줄씩 싣고, 각 줄에 서로의 hreflang 을 건다.
   구글은 이 묶음을 보고 같은 문서의 언어판으로 이해한다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const absolute = (path: string) => `${BASE_URL}${path === '/' ? '' : path}`

  return PAGES.flatMap(({ path, ...rest }) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absolute(href)]),
    )

    return LOCALES.map((locale) => ({
      url: absolute(localePath(locale, path)),
      lastModified,
      ...rest,
      alternates: { languages },
    }))
  })
}
