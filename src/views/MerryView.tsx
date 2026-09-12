import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import MerryBoard from '@/components/merry/MerryBoard';
import MerryName from '@/components/merry/MerryName';
import MerryProfileNote from '@/components/merry/MerryProfileNote';
import Magnetic from '@/components/merry/Magnetic';
import { profileRows } from '@/components/merry/data';
import PageSchema from '@/components/PageSchema';
import { ARTI_ID, MERI_ID } from '@/lib/site';
import { getDictionary, localePath, pageMetadata, type Locale } from '@/i18n';

/* ──────────────────────────────────────────────────────────
   마스코트 메리 소개 페이지

   확정 정보(바꿀 일이 생기면 i18n/dictionaries 의 merry.profile 세 벌을 고친다)
     이름 메리 · 키 163cm · 몸무게 비공개 · MBTI ENFJ · 생일 2월 21일

   조판 — 캐릭터 소개 카드 한 장.
     넓은 화면은 16:9 카드(MerryCard), 좁은 화면은 같은 요소를 세로로
     쌓은 판(MerryStacked). 카드 아래에는 알티로 보내는 버튼만 둔다.

   서체 — 큰 이름·라벨 Fredoka / 손글씨 Dancing Script /
          한글 본문 Gothic A1 · 한글 제목 Jua.
   변수 정의는 globals.css 의 .merry-fonts / .merry-page,
   실제 폰트는 아래 <link>.
   ────────────────────────────────────────────────────────── */

/* 언어마다 필요한 글꼴만 받는다. 한글 Jua·Gothic A1 은 일본어 가나가
   없어서, 일본어판은 둥근 고딕 Zen Maru Gothic 을 대신 쓴다(굵기는 Jua 와
   무게가 비슷한 700 하나). 영어판은 둥근 서체도 Fredoka 로 통일한다.
   변수 매핑은 globals.css 의 .merry-fonts:lang(..) */
const LATIN_FONTS = 'family=Dancing+Script:wght@500..700&family=Fredoka:wght@400..600';
const FONT_CSS: Record<Locale, string> = {
  ko: `https://fonts.googleapis.com/css2?${LATIN_FONTS}&family=Gothic+A1:wght@400;500;700;800&family=Jua&display=swap`,
  en: `https://fonts.googleapis.com/css2?${LATIN_FONTS}&display=swap`,
  ja: `https://fonts.googleapis.com/css2?${LATIN_FONTS}&family=Zen+Maru+Gothic:wght@700&display=swap`,
};

export function merryMetadata(locale: Locale): Metadata {
  const m = getDictionary(locale).merry.meta;
  const ogImage = { url: '/merry-portrait.webp', width: 900, height: 900, alt: m.ogImageAlt };

  return {
    ...pageMetadata(locale, '/merry', {
      /* 레이아웃 템플릿이 '%s | 알티스토'를 붙이므로, 제목에 회사명을
         직접 넣을 때는 absolute 로 템플릿을 끈다. 안 그러면 접미사가 겹친다. */
      title: { absolute: m.title },
      description: m.description,
      keywords: m.keywords,
      ogTitle: m.title,
      ogDescription: m.ogDescription,
      ogType: 'profile',
      ogImage,
    }),
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.twitterDescription,
      images: [ogImage.url],
    },
  };
}

export default function MerryView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const mr = t.merry;
  const profile = profileRows(mr.profile);

  return (
    <main className="merry-page merry-fonts flex-1 break-keep bg-[var(--k-paper)] text-[var(--k-ink)]">
      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        locale={locale}
        path="/merry"
        name={mr.meta.title}
        description={mr.meta.schemaDescription}
        crumbs={[
          { name: t.homeCrumb, path: '/' },
          { name: mr.meta.crumb, path: '/merry' },
        ]}
        /* 이 문서의 주인공은 캐릭터 자신이다 */
        mainEntity={MERI_ID}
        mentions={[ARTI_ID]}
      />

      {/* 폰트 — React 19 가 <head> 로 올려준다 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" precedence="default" href={FONT_CSS[locale]} />

      {/* 검색엔진과 보조기술을 위한 제목 — 화면에는 카드가 대신 선다 */}
      <h1 className="sr-only">{mr.h1}</h1>
      <ul className="sr-only">
        {profile.map((row) => (
          <li key={row.label}>{`${row.label}: ${row.value}`}</li>
        ))}
      </ul>

      {/* ━━━━━━━━ 보드 + 프로필 반반 ━━━━━━━━ */}
      <section className="px-5 pb-10 pt-[calc(68px+1.5rem)] md:px-8 lg:px-10">
        {/* 좁은 화면에서는 이름이 보드보다 위, 맨 꼭대기에 선다.
            넓은 화면에서는 오른쪽 쪽지가 제 머리에 이름을 들고 있다. */}
        <MerryName name={mr.name} sub={mr.nameSub} className="mx-auto mb-7 w-full max-w-[620px] px-6 lg:hidden" />

        {/* 반반이 아니라 1.3 : 1 — 캐릭터 보드를 넓게, 프로필 쪽지를 좁게.
            items-stretch(그리드 기본)라 오른쪽 쪽지가 왼쪽 보드 높이를 따라간다 */}
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <MerryBoard illustrationAlt={mr.illustrationAlt} />
          <MerryProfileNote name={mr.name} nameSub={mr.nameSub} profile={profile} />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ 알티로 ━━━━━━━━━━━━━━━━━━ */}
      <section className="px-5 pb-16 pt-6 md:px-8 lg:px-10 lg:pb-24">
        {/* 위 두 카드와 같은 상자 규칙 — 좁은 화면은 px-6 안쪽, 넓은 화면은
            가운데로 모은다. 문구와 버튼을 한 장에 담아 가운데 정렬한다. */}
        <div className="mx-auto w-full max-w-[620px] px-6 lg:max-w-[760px] lg:px-0">
          <div className="merry-grid-m relative rounded-2xl border-2 border-dashed border-[var(--k-edge)] bg-white/80 px-[clamp(1.25rem,6vw,2.5rem)] py-10 text-center lg:py-12">
            {/* 마스킹 테이프 한 조각 — 프로필 쪽지와 같은 언어 */}
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-[var(--k-cream)]/70 sm:-top-3 sm:h-6 sm:w-24"
            />

            <p className="font-[family-name:var(--font-round)] [font-weight:var(--font-round-weight)] text-[clamp(1.05rem,4.6vw,1.6rem)] leading-[1.45] text-[var(--k-ink)]">
              {mr.invite}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href="https://rti-eight.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--k-pink-d)] px-7 py-3.5
                           font-[family-name:var(--font-kr)] text-[clamp(0.8rem,3.4vw,0.875rem)] font-bold text-white transition-colors
                           duration-200 hover:bg-[var(--k-ink)] focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-[var(--k-pink-d)] focus-visible:ring-offset-2
                           focus-visible:ring-offset-[var(--k-paper)]"
              >
                {mr.toArti}
                <ArrowRight
                  size={16}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href={localePath(locale, '/services')}
                className="inline-flex items-center rounded-full border-2 border-[var(--k-edge)] px-7 py-3.5
                           font-[family-name:var(--font-kr)] text-[clamp(0.8rem,3.4vw,0.875rem)] font-bold text-[var(--k-ink)]/75
                           transition-colors duration-200 hover:border-[var(--k-pink-d)] hover:text-[var(--k-pink-d)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--k-pink-d)]
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--k-paper)]"
              >
                {mr.toServices}
              </Link>
            </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
