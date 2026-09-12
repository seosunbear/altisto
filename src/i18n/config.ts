/* ──────────────────────────────────────────────────────────
   다국어 설정.

   한국어는 접두사 없이 기존 주소 그대로(/services), 영어·일본어만
   /en·/ja 를 앞에 붙인다. 한국어 주소를 바꾸면 쌓아 온 색인과
   canonical 이 다 흔들리므로 기본 언어는 건드리지 않는다.

   라우팅은 app/(ko) 와 app/[lang] 두 갈래다. 루트 레이아웃이 둘이라
   <html lang> 이 언어마다 제대로 찍힌다(일본어 한자가 한국어 글꼴로
   그려지거나 크롬이 '한국어 번역' 을 띄우는 일을 막는다).
   ────────────────────────────────────────────────────────── */

export const LOCALES = ['ko', 'en', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

/** 주소 앞에 접두사가 붙는 언어 — app/[lang] 이 받는다 */
export const PREFIXED_LOCALES = ['en', 'ja'] as const;
export type PrefixedLocale = (typeof PREFIXED_LOCALES)[number];

export const isPrefixedLocale = (v: string): v is PrefixedLocale =>
  (PREFIXED_LOCALES as readonly string[]).includes(v);

/** 언어별 주소. localePath('en', '/services') → '/en/services' */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** 현재 주소에서 언어 접두사를 뗀 경로 — 언어 전환 링크가 같은 페이지를 가리키게 */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(en|ja)(?=\/|$)/);
  if (!m) return pathname;
  return pathname.slice(m[0].length) || '/';
}

/** hreflang 묶음. x-default 는 세 언어 어디에도 안 맞는 방문자용이라 영어로 보낸다 */
export function languageAlternates(path: string) {
  return {
    ko: localePath('ko', path),
    en: localePath('en', path),
    ja: localePath('ja', path),
    'x-default': localePath('en', path),
  };
}

/** 구조화 데이터 inLanguage */
export const SCHEMA_LANG: Record<Locale, string> = { ko: 'ko-KR', en: 'en', ja: 'ja' };

/** og:locale */
export const OG_LOCALE: Record<Locale, string> = { ko: 'ko_KR', en: 'en_US', ja: 'ja_JP' };

/** 언어 전환 표시 — 짧은 코드와 그 언어로 쓴 이름 */
export const LOCALE_LABEL: Record<Locale, { short: string; native: string }> = {
  ko: { short: 'KO', native: '한국어' },
  en: { short: 'EN', native: 'English' },
  ja: { short: 'JA', native: '日本語' },
};
