import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight } from 'lucide-react';

import GsapReveal from '@/components/GsapReveal';
import WordReveal from '@/components/WordReveal';
import AltiMockup from '@/components/AltiMockup';
import LeafChatMockup from '@/components/LeafChatMockup';
import OurSchoolMockup from '@/components/OurSchoolMockup';
import PhoneFrame from '@/components/PhoneFrame';
import MockupScaler from '@/components/MockupScaler';

export const metadata: Metadata = {
  title: '서비스',
  description:
    '알티스토의 서비스 — 크리에이터 협업 플랫폼 알티, 스쿨 라이프 슈퍼앱 우리학교, 연령별 채팅 & 커뮤니티 리프챗(LeafChat)을 소개합니다.',
  alternates: { canonical: '/services' },
};


export default function ServicesPage() {
  return (
    <main className="flex-1 pt-[68px] bg-white">

      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#181818] border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-12 md:py-16 lg:py-24 flex items-center">

        {/* 유성우 장식 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <path id="cp1" d="M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54" />
              <path id="cp2" d="M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139" />
              <path id="cp3" d="M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234" />
              <path id="cp4" d="M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322" />
              <path id="cp5" d="M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407" />
            </defs>
            <path d="M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z" fill="#93c5fd">
              <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#c4b5fd">
              <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#f9a8d4">
              <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
            </path>
            <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#a5f3fc">
              <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#fde68a">
              <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.08;0.88;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </path>
            <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#a7f3d0">
              <animateMotion dur="3.9s" begin="2.8s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.9s" begin="2.8s" repeatCount="indefinite" />
            </path>
            <path d="M0,-11 L2.8,-2.8 L11,0 L2.8,2.8 L0,11 L-2.8,2.8 L-11,0 L-2.8,-2.8 Z" fill="#ddd6fe">
              <animateMotion dur="4.4s" begin="2.2s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.07;0.88;1" dur="4.4s" begin="2.2s" repeatCount="indefinite" />
            </path>
            <path d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" fill="#fed7aa">
              <animateMotion dur="3.4s" begin="2.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.4s" begin="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill="#bfdbfe">
              <animateMotion dur="4.8s" begin="0.9s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.8s" begin="0.9s" repeatCount="indefinite" />
            </path>
            <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#fbcfe8">
              <animateMotion dur="3s" begin="3.4s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.08;0.88;1" dur="3s" begin="3.4s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-2 font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-[1.25rem] md:text-[clamp(1.6rem,3vw,2.4rem)]">
              서비스
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[11px] md:text-[12px] leading-[1.9] text-[#9ca3af]">
              사람들이 조금이라도 웃을 수 있도록,<br />
              알티스토는 세 개의 서비스를 직접 만들고 운영합니다.
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ 알티 ━━━━━━━━━━━━━━ */}
      <section id="alti" className="scroll-mt-[70px] px-[8vw] pt-10 pb-24 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-14 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">01</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">알티 · Alti</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">크리에이터 협업 외주 플랫폼</span>
            </div>
          </GsapReveal>

          <div className="mb-16 flex flex-col items-start gap-6">
            <GsapReveal type="fade-up" delay={0.05}>
              {/* h5 → h3: h2 바로 아래 단계로 헤딩 위계 교정 */}
              <h3 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.22]">
                아티스트와 클라이언트를 위한<br />협업 플랫폼
              </h3>
              <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                알티는 아티스트가 팀을 꾸리고 함께 작업하는 협업 플랫폼이에요
                <br /> 하나 홍보할게 있다면 개인간 거래는 수수료가 없어요!
              </p>
            </GsapReveal>

            <div>
              <GsapReveal type="fade-up" delay={0.1}>
                <a href="https://rti-eight.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                  <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#f472b6] group-hover:text-[#f472b6]">
                    알티 바로가기
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
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">우리학교 · OurSchool</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">스쿨 라이프 슈퍼앱</span>
            </div>
          </GsapReveal>

          {/* 왼쪽 텍스트 + 오른쪽 기울인 폰. 텍스트는 섹션 헤더에 이어지도록 위쪽 정렬 */}
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="flex w-full min-w-0 flex-col items-start gap-6">
              <GsapReveal type="fade-up" delay={0.05}>
                {/* h5 → h3: 헤딩 위계 교정 */}
                <h3 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.45]">
                  시간표부터 급식, 학생증까지<br />학교 생활을 한 앱에
                </h3>
                <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                  우리학교는 시간표·급식·학생증·조퇴외출을 <br /> 하나로 모은 스쿨 라이프 앱이에요<br />게시판과 커뮤니티에서 우리 학교 친구들과 소통해요!
                </p>
              </GsapReveal>

              <div>
                <GsapReveal type="fade-up" delay={0.1}>
                  <Link href="/contact"
                    className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                    <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#3b82f6] group-hover:text-[#3b82f6]">
                      우리학교 바로가기
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
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">리프챗 · LeafChat</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">연령별 채팅 & 커뮤니티</span>
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
                  연령별로 안전하게<br />친구를 만드는 커뮤니티
                </h3>
                <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                  리프챗은 연령별로 안전하게 친구를 <br /> 만들 수 있도록 만들어진 커뮤니티에요<br />인증 및 유해차단 서비스로 안전하게 대화 가능해요!
                </p>
              </GsapReveal>

              <div>
                <GsapReveal type="fade-up" delay={0.1}>
                  <Link href="/contact"
                    className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                    <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#16a34a] group-hover:text-[#16a34a]">
                      리프챗 바로가기
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
