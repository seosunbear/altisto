import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight } from 'lucide-react';

import GsapReveal from '@/components/GsapReveal';
import StarTrail from '@/components/StarTrail';
import WordReveal from '@/components/WordReveal';
import AltiMockup from '@/components/AltiMockup';
import LeafChatMockup from '@/components/LeafChatMockup';
import OurSchoolMockup from '@/components/OurSchoolMockup';
import PhoneFrame from '@/components/PhoneFrame';
import MockupScaler from '@/components/MockupScaler';
import PageSchema from '@/components/PageSchema';
import { ARTI_ID, LEAFCHAT_ID, OURSCHOOL_ID } from '@/lib/site';
import Lines from '@/i18n/Lines';
import { getDictionary, localePath, pageMetadata, type Locale } from '@/i18n';

export function servicesMetadata(locale: Locale): Metadata {
  const m = getDictionary(locale).services.meta;
  return pageMetadata(locale, '/services', {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    ogTitle: m.ogTitle,
    ogDescription: m.ogDescription,
  });
}


export default function ServicesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const sv = t.services;

  return (
    <main className="flex-1 pt-[68px] bg-white">
      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        locale={locale}
        path="/services"
        name={sv.meta.schemaName}
        description={sv.meta.schemaDescription}
        crumbs={[
          { name: t.homeCrumb, path: '/' },
          { name: sv.title, path: '/services' },
        ]}
        mentions={[ARTI_ID, OURSCHOOL_ID, LEAFCHAT_ID]}
      />


      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#181818] border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-12 md:py-16 lg:py-24 flex items-center">

        {/* 유성우 장식 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <StarTrail />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-2 font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-[1.25rem] md:text-[clamp(1.6rem,3vw,2.4rem)]">
              {sv.title}
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[11px] md:text-[12px] leading-[1.9] text-[#9ca3af]">
              <Lines text={sv.intro} />
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ 알티 ━━━━━━━━━━━━━━ */}
      <section id="arti" className="scroll-mt-[70px] px-[8vw] pt-10 pb-24 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-14 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">01</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">{sv.arti.name}</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">{sv.arti.category}</span>
            </div>
          </GsapReveal>

          <div className="mb-16 flex flex-col items-start gap-6">
            <GsapReveal type="fade-up" delay={0.05}>
              {/* h5 → h3: h2 바로 아래 단계로 헤딩 위계 교정 */}
              <h3 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.22]">
                <Lines text={sv.arti.heading} />
              </h3>
              <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                <Lines text={sv.arti.body} />
              </p>
            </GsapReveal>

            <div>
              <GsapReveal type="fade-up" delay={0.1}>
                <a href="https://rti-eight.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                  <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#f472b6] group-hover:text-[#f472b6]">
                    {sv.arti.cta}
                  </span>
                  <ArrowRight size={16} strokeWidth={2}
                    className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#f472b6]" />
                </a>
              </GsapReveal>
            </div>
          </div>

          {/* 목업 — 전체 폭 */}
          <GsapReveal type="fade-up" delay={0.1}>
            <div className="relative mx-auto max-w-4xl">

              {/* 장식 — 목업 높이만큼 양쪽 벽에 붙어 위로 흐르는 ARTIST 텍스트 (데스크톱 전용) */}
              {(['left-[calc(50%_-_50vw_+_2.5vw)]', 'right-[calc(50%_-_50vw_+_2.5vw)]'] as const).map(pos => {
                const isRight = pos.startsWith('right');
                return (
                  <div key={pos} aria-hidden data-nosnippet
                    className={`pointer-events-none absolute inset-y-0 ${pos} hidden w-[clamp(160px,15vw,270px)] translate-y-8 overflow-hidden lg:block [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_86%,transparent)]`}>
                    <div
                      className="flex flex-col items-center will-change-transform [mask-image:linear-gradient(to_right,transparent_10%,rgba(0,0,0,0.7)_45%,rgba(0,0,0,0.7)_55%,transparent_90%)]"
                      style={{ animation: `deco-rise 44s linear infinite${isRight ? ' reverse' : ''}` }}
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i}
                          className={`py-16 text-[clamp(150px,14vw,250px)] font-extrabold uppercase tracking-[0.02em] [writing-mode:vertical-rl] ${isRight ? 'rotate-180 text-[rgba(249,168,212,0.5)]' : 'text-[rgba(147,197,253,0.5)]'}`}>
                          artist
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              <MockupScaler designWidth={560}>
                <AltiMockup />
              </MockupScaler>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 우리학교 ━━━━━━━━━━━━━━ */}
      <section id="ourschool" className="scroll-mt-[70px] px-[8vw] pt-24 pb-24 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-14 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">02</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">{sv.ourschool.name}</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">{sv.ourschool.category}</span>
            </div>
          </GsapReveal>

          {/* 왼쪽 텍스트 + 오른쪽 기울인 폰. 텍스트는 섹션 헤더에 이어지도록 위쪽 정렬 */}
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex w-full min-w-0 flex-col items-start gap-6">
              <GsapReveal type="fade-up" delay={0.05}>
                {/* h5 → h3: 헤딩 위계 교정 */}
                <h3 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.45]">
                  <Lines text={sv.ourschool.heading} />
                </h3>
                <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                  <Lines text={sv.ourschool.body} />
                </p>
              </GsapReveal>

              <div>
                <GsapReveal type="fade-up" delay={0.1}>
                  <Link href={localePath(locale, '/contact')}
                    className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                    <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#3b82f6] group-hover:text-[#3b82f6]">
                      {sv.ourschool.cta}
                    </span>
                    <ArrowRight size={16} strokeWidth={2}
                      className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#3b82f6]" />
                  </Link>
                </GsapReveal>
              </div>
            </div>

            <GsapReveal type="fade-up" delay={0.15}>
              {/* PC: 왼쪽 아래 모서리를 축으로 기울인 폰 + 발밑 바닥 그림자 */}
              <div className="relative z-10 mx-auto w-full max-w-[320px] md:mx-0 md:ml-[calc(2.76vw+8px)] lg:ml-[calc(5.58vw+2px)] xl:ml-[min(calc(8.03vw+24px),148px)]">
                {/* 바닥 그림자 — 회전과 분리해 폰 발밑 바닥(오른쪽 치우침)에 깔린다 */}
                <div aria-hidden className="absolute -bottom-1 left-2 -right-24 hidden h-3 rounded-[50%] bg-[#0d1117]/35 blur-md md:block" />
                <div className="transition-transform duration-300 md:origin-bottom-left md:-rotate-[6deg] lg:-rotate-[17deg] xl:-rotate-[21deg]">
                  <PhoneFrame shadow={false}>
                    <OurSchoolMockup />
                  </PhoneFrame>
                </div>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 리프챗 ━━━━━━━━━━━━━━ */}
      <section id="leafchat" className="scroll-mt-[70px] px-[8vw] pt-24 pb-10">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-14 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">03</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">{sv.leafchat.name}</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">{sv.leafchat.category}</span>
            </div>
          </GsapReveal>

          <div className="grid items-start gap-14 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
            <GsapReveal type="fade-up" delay={0.15} className="order-last md:order-first">
              <PhoneFrame>
                <LeafChatMockup />
              </PhoneFrame>
            </GsapReveal>

            <div className="flex flex-col items-start gap-6 md:-translate-y-[100px]">
              <GsapReveal type="fade-up" delay={0.05}>
                {/* h5 → h3: 헤딩 위계 교정 */}
                <h3 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.45]">
                  <Lines text={sv.leafchat.heading} />
                </h3>
                <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                  <Lines text={sv.leafchat.body} />
                </p>
              </GsapReveal>

              <div>
                <GsapReveal type="fade-up" delay={0.1}>
                  <Link href={localePath(locale, '/contact')}
                    className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                    <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#16a34a] group-hover:text-[#16a34a]">
                      {sv.leafchat.cta}
                    </span>
                    <ArrowRight size={16} strokeWidth={2}
                      className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#16a34a]" />
                  </Link>
                </GsapReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ CTA BOTTOM ━━━━━━━━━━━━━━ */}
      <section className="px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-screen-xl">

          <h2>
            <WordReveal
              text={'Content\nBeyond\nExpectations'}
              className="block font-extrabold tracking-[-0.04em] leading-[1.15] text-[#0d1117] text-[clamp(1.8rem,3vw,3.4rem)]"
              stagger={0.07}
            />
          </h2>

        </div>
      </section>

    </main>
  );
}
