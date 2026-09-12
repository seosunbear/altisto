import RootShell, { rootMetadata } from '@/views/RootShell';

/* 한국어 루트 레이아웃 — 접두사 없는 기존 주소(/, /services …)를 받는다.
   영어·일본어는 app/[lang]/layout.tsx. 둘 다 RootShell 을 쓴다. */
export const metadata = rootMetadata('ko');

export default function KoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="ko">{children}</RootShell>;
}
