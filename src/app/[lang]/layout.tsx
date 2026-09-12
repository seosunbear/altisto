import { notFound } from 'next/navigation';

import RootShell, { rootMetadata } from '@/views/RootShell';
import { isPrefixedLocale, PREFIXED_LOCALES } from '@/i18n';

/* 영어·일본어 루트 레이아웃 — /en/…, /ja/… 를 받는다.
   한국어는 접두사 없이 app/(ko) 가 받으므로 여기서는 en·ja 만 만든다.
   목록 밖의 값(/ko, /xx …)은 dynamicParams = false 로 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return rootMetadata(lang);
}

export default async function LangLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <RootShell locale={lang}>{children}</RootShell>;
}
