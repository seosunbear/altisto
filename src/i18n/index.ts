import type { Metadata } from 'next';

import { ko, type Dictionary } from './dictionaries/ko';
import { en } from './dictionaries/en';
import { ja } from './dictionaries/ja';
import { languageAlternates, localePath, LOCALES, OG_LOCALE, type Locale } from './config';

export type { Dictionary, MottoLine } from './dictionaries/ko';
export * from './config';

const DICTIONARIES: Record<Locale, Dictionary> = { ko, en, ja };

/* 서버 컴포넌트에서만 부른다. 클라이언트 컴포넌트는 필요한 조각만
   props 로 받는다 — 세 언어 사전을 통째로 번들에 싣지 않으려고. */
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

/* ──────────────────────────────────────────────────────────
   페이지 메타데이터.

   Next 는 openGraph 를 레이아웃과 합치지 않고 통째로 갈아 끼운다.
   페이지가 openGraph 를 쓰는 순간 레이아웃의 이미지·locale·siteName 이
   빠지므로, 여기서 매번 같이 채운다. canonical 은 제 언어 주소,
   hreflang 은 세 언어 + x-default.
   ────────────────────────────────────────────────────────── */

export function pageMetadata(
  locale: Locale,
  path: string,
  opts: {
    title?: Metadata['title'];
    description: string;
    keywords?: string[];
    ogTitle: string;
    ogDescription: string;
    ogType?: 'website' | 'profile';
    ogImage?: { url: string; width: number; height: number; alt: string };
  },
): Metadata {
  const t = getDictionary(locale);
  const url = localePath(locale, path);

  return {
    ...(opts.title ? { title: opts.title } : {}),
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: opts.ogTitle,
      description: opts.ogDescription,
      url,
      type: opts.ogType ?? 'website',
      siteName: t.meta.siteName,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [opts.ogImage ?? { url: '/og.jpg', width: 1920, height: 1080, alt: t.meta.ogImageAlt }],
    },
  };
}
