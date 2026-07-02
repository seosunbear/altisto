import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight } from 'lucide-react';

import GsapReveal from '@/components/GsapReveal';
import WordReveal from '@/components/WordReveal';
import AltiMockup from '@/components/AltiMockup';
import LeafChatMockup from '@/components/LeafChatMockup';
import AnimatedFeatureGrid from '@/components/AnimatedFeatureGrid';
import PhoneFrame from '@/components/PhoneFrame';
import MockupScaler from '@/components/MockupScaler';

export const metadata: Metadata = {
  title: '서비스',
  description: '알티(크리에이터 협업 플랫폼)와 리프챗(연령별 채팅 & 커뮤니티) — 알티스토가 개발한 두 가지 자체 서비스를 소개합니다.',
};

const altiFeatures = [
  '그룹 찾기 & 팀 협업',
  '프로젝트 스케줄 관리',
  '실시간 채팅',
  '의뢰 게시판 · 외주 매칭',
  '포트폴리오 & 작품 판매',
  '스마트 크리에이터 매칭',
];

const leafFeatures = [
  '연령별 채팅방 & 커뮤니티',
  '또래 친구 만들기',
  '안전 인증 시스템',
  '실시간 1:1 · 그룹 채팅',
  '관심사 기반 커뮤니티',
  '신고 & 안전 커뮤니티 관리',
];

const serviceIndex = [
  { no: '01', name: '알티',   tag: '크리에이터 협업 플랫폼',   href: '#alti',     dot: '#b19cd9' },
  { no: '02', name: '리프챗', tag: '연령별 채팅 & 커뮤니티',   href: '#leafchat', dot: '#16a34a' },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 pt-[68px] bg-white">

      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-white border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-24 flex items-center">

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
            {["M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54",
              "M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139",
              "M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234",
              "M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322",
              "M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407",
            ].map((d, i) => (
              <path key={i} d={d} stroke="#dbeafe" strokeWidth="1" strokeDasharray="3 11" strokeLinecap="round" opacity={0.7 - i * 0.1} />
            ))}
            <path d="M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z" fill="#1d4ed8">
              <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#7c3aed">
              <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#ec4899">
              <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
            </path>
            <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#06b6d4">
              <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#f59e0b">
              <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.08;0.88;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-4 font-extrabold tracking-[-0.03em] leading-[1.1] text-[#0d1117] text-[clamp(1.6rem,3vw,2.4rem)]">
              서비스
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.15}>
            <div className="mb-4 h-px w-8 bg-[#d1d5db]" />
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[12px] leading-[1.9] text-[#6b7280]">
              사람들이 조금이라도 웃을 수 있도록,<br />
              알티스토는 두 개의 서비스를 직접 만들고 운영합니다.
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ 알티 ━━━━━━━━━━━━━━ */}
      <section id="alti" className="scroll-mt-[70px] px-[8vw] py-10">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-6 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">01</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">알티 · Alti</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">크리에이터 협업 외주 플랫폼</span>
            </div>
          </GsapReveal>

          <div className="mb-16 flex flex-col items-start gap-6">
            <GsapReveal type="fade-up" delay={0.05}>
              <h5 className="mb-6 text-[clamp(1.5rem,2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.22]">
                아티스트와 클라이언트를 위한<br />협업 플랫폼
              </h5>
              <p className="max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                알티는 아티스트가 팀을 꾸리고 함께 작업하는 협업 플랫폼이에요
                <br /> 하나 홍보할게 있다면 개인간 거래는 수수료가 없어요!
              </p>
            </GsapReveal>

            <div>
              <GsapReveal type="fade-up" delay={0.1}>
                <a href="https://rti-eight.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0d1117]">
                  <span className="border-b-2 border-[#0d1117] pb-0.5 transition-colors group-hover:border-[#9370c7] group-hover:text-[#9370c7]">
                    알티 바로가기
                  </span>
                  <ArrowRight size={16} strokeWidth={2}
                    className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#9370c7]" />
                </a>
              </GsapReveal>
            </div>
          </div>

          {/* 목업 — 전체 폭 */}
          <GsapReveal type="fade-up" delay={0.1}>
            <div className="mx-auto max-w-4xl">
              <MockupScaler designWidth={560}>
                <AltiMockup />
              </MockupScaler>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 리프챗 ━━━━━━━━━━━━━━ */}
      <section id="leafchat" className="scroll-mt-[68px] px-6 md:px-10 py-24 md:py-36">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <div className="mb-14 md:mb-20 flex items-baseline gap-5 md:gap-8">
              <span className="text-[12px] font-medium tabular-nums text-[#9ca3af]">02</span>
              <h2 className="text-[15px] font-bold tracking-tight text-[#0d1117]">리프챗 · LeafChat</h2>
              <span className="ml-auto text-[12px] text-[#9ca3af]">연령별 채팅 & 커뮤니티</span>
            </div>
          </GsapReveal>

          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
            <GsapReveal type="fade-up" delay={0.15} className="order-last lg:order-first">
              <PhoneFrame>
                <LeafChatMockup />
              </PhoneFrame>
            </GsapReveal>

            <div>
              <GsapReveal type="fade-up" delay={0.05}>
                <h3 className="mb-6 text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#0d1117] leading-[1.22]">
                  연령별로 안전하게<br />친구를 만드는 커뮤니티
                </h3>
                <p className="mb-14 max-w-md text-[15px] leading-[1.9] text-[#6b7280]">
                  리프챗은 연령별로 안전하게 친구를 만들 수 있도록 만들어진 커뮤니티에요
                </p>
              </GsapReveal>

              <AnimatedFeatureGrid features={leafFeatures} />

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
