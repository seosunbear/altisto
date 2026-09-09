import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import MerryBoard from '@/components/merry/MerryBoard';
import MerryName from '@/components/merry/MerryName';
import MerryProfileNote from '@/components/merry/MerryProfileNote';
import Magnetic from '@/components/merry/Magnetic';
import { PROFILE } from '@/components/merry/data';

/* ──────────────────────────────────────────────────────────
   마스코트 메리 소개 페이지

   확정 정보(바꿀 일이 생기면 data.ts 만 고치면 된다)
     이름 메리 · 키 163cm · 몸무게 비공개 · MBTI ENFJ · 생일 2월 21일

   조판 — 캐릭터 소개 카드 한 장.
     넓은 화면은 16:9 카드(MerryCard), 좁은 화면은 같은 요소를 세로로
     쌓은 판(MerryStacked). 카드 아래에는 알티로 보내는 버튼만 둔다.

   서체 — 큰 이름·라벨 Fredoka / 손글씨 Dancing Script /
          한글 본문 Gothic A1 · 한글 제목 Jua.
   변수 정의는 globals.css 의 .merry-fonts / .merry-page,
   실제 폰트는 아래 <link>.
   ────────────────────────────────────────────────────────── */

const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500..700&family=Fredoka:wght@400..600&family=Gothic+A1:wght@400;500;700;800&family=Jua&display=swap';

export const metadata: Metadata = {
  title: '메리',
  description:
    '알티스토의 마스코트 메리를 소개합니다. 키 163cm, MBTI ENFJ, 생일 2월 21일. 알티에서 여러분을 맞이하는 인사 담당이에요.',
  alternates: { canonical: '/merry' },
  openGraph: {
    title: '메리 | 알티스토 마스코트',
    description: '안녕! 나는 알티스토의 마스코트 메리야.',
    url: '/merry',
    images: [{ url: '/merry-portrait.webp', width: 900, height: 900, alt: '알티스토 마스코트 메리' }],
  },
};

export default function MerryPage() {
  return (
    <main className="merry-page merry-fonts flex-1 break-keep bg-[var(--k-paper)] text-[var(--k-ink)]">
      {/* 폰트 — React 19 가 <head> 로 올려준다 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" precedence="default" href={FONT_CSS} />

      {/* 검색엔진과 보조기술을 위한 제목 — 화면에는 카드가 대신 선다 */}
      <h1 className="sr-only">알티스토 마스코트 메리</h1>
      <ul className="sr-only">
        {PROFILE.map((row) => (
          <li key={row.label}>{`${row.label}: ${row.value}`}</li>
        ))}
      </ul>

      {/* ━━━━━━━━ 보드 + 프로필 반반 ━━━━━━━━ */}
      <section className="px-5 pb-10 pt-[calc(68px+1.5rem)] md:px-8 lg:px-10">
        {/* 좁은 화면에서는 이름이 보드보다 위, 맨 꼭대기에 선다.
            넓은 화면에서는 오른쪽 쪽지가 제 머리에 이름을 들고 있다. */}
        <MerryName className="mx-auto mb-7 w-full max-w-[620px] px-6 lg:hidden" />

        {/* 반반이 아니라 1.3 : 1 — 캐릭터 보드를 넓게, 프로필 쪽지를 좁게.
            items-stretch(그리드 기본)라 오른쪽 쪽지가 왼쪽 보드 높이를 따라간다 */}
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <MerryBoard />
          <MerryProfileNote />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 알티로 ━━━━━━━━━━━━━━━━━━ */}
      <section className="px-5 pb-16 pt-6 md:px-8 lg:px-10 lg:pb-24">
        {/* 위 두 카드와 같은 상자 규칙 — 좁은 화면은 px-6 안쪽, 넓은 화면은
            가운데로 모은다. 문구와 버튼을 한 장에 담아 가운데 정렬한다. */}
        <div className="mx-auto w-full max-w-[620px] px-6 lg:max-w-[760px] lg:px-0">
          <div className="merry-grid-m relative rounded-2xl border-2 border-dashed border-[var(--k-edge)] bg-white/80 px-6 py-10 text-center sm:px-10 lg:py-12">
            {/* 마스킹 테이프 한 조각 — 프로필 쪽지와 같은 언어 */}
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-[var(--k-cream)]/70"
            />

            <p className="font-[family-name:var(--font-round)] text-[clamp(1.25rem,2.6vw,1.6rem)] leading-[1.45] text-[var(--k-ink)]">
              메리가 기다리는 곳으로 놀러 올래?
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href="https://rti-eight.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--k-pink-d)] px-7 py-3.5
                           font-[family-name:var(--font-kr)] text-[14px] font-bold text-white transition-colors
                           duration-200 hover:bg-[var(--k-ink)] focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-[var(--k-pink-d)] focus-visible:ring-offset-2
                           focus-visible:ring-offset-[var(--k-paper)]"
              >
                알티 보러 가기
                <ArrowRight
                  size={16}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border-2 border-[var(--k-edge)] px-7 py-3.5
                           font-[family-name:var(--font-kr)] text-[14px] font-bold text-[var(--k-ink)]/75
                           transition-colors duration-200 hover:border-[var(--k-pink-d)] hover:text-[var(--k-pink-d)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--k-pink-d)]
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--k-paper)]"
              >
                알티스토 서비스
              </Link>
            </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
