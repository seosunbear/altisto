import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Lock, Clock, BarChart3, Users, MessageSquare } from 'lucide-react';

import GsapReveal from '@/components/GsapReveal';
import WordReveal from '@/components/WordReveal';
import AltiMockup from '@/components/AltiMockup';
import LeafChatMockup from '@/components/LeafChatMockup';
import AnimatedFeatureGrid from '@/components/AnimatedFeatureGrid';

export const metadata: Metadata = {
  title: '서비스',
  description: '알티(크리에이터 매칭 플랫폼)와 리프챗(연령별 채팅 & 커뮤니티) — 알티스토가 개발한 두 가지 자체 서비스를 소개합니다.',
};

const altiFeatures = [
  { icon: <Zap size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,         text: '스마트 크리에이터 매칭' },
  { icon: <Users size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,        text: '직접 연결 플랫폼' },
  { icon: <Lock size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,         text: '에스크로 안전 결제' },
  { icon: <BarChart3 size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,    text: '실시간 프로젝트 관리' },
  { icon: <CheckCircle size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,  text: '포트폴리오 & 작품 판매' },
  { icon: <Clock size={14} className="text-[#1d4ed8] flex-shrink-0" strokeWidth={2} />,        text: '24시간 이내 매칭' },
];

const leafFeatures = [
  { icon: <MessageSquare size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />, text: '연령별 채팅방 & 커뮤니티' },
  { icon: <Users size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />,         text: '또래 친구 만들기' },
  { icon: <Lock size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />,          text: '안전 인증 시스템' },
  { icon: <Zap size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />,           text: '실시간 1:1 · 그룹 채팅' },
  { icon: <BarChart3 size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />,     text: '관심사 기반 커뮤니티' },
  { icon: <CheckCircle size={14} className="text-[#16a34a] flex-shrink-0" strokeWidth={2} />,   text: '신고 & 안전 커뮤니티 관리' },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 pt-[68px]">

      {/* ━━━━━━━━━━━━━━ PAGE HEADER ━━━━━━━━━━━━━━ */}
      <section className="relative bg-white border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-24 flex items-center">

        {/* 유성우 장식 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <path id="sp1" d="M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54" />
              <path id="sp2" d="M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139" />
              <path id="sp3" d="M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234" />
              <path id="sp4" d="M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322" />
              <path id="sp5" d="M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407" />
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
              <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#sp1" /></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#7c3aed">
              <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#sp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#ec4899">
              <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#sp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
            </path>
            <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#06b6d4">
              <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#sp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#f59e0b">
              <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#sp5" /></animateMotion>
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
              사람들이 조금이라도 웃을 수 있도록<br />
              다양한 콘텐츠를 제공합니다
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ 알티 ━━━━━━━━━━━━━━ */}
      <section className="border-b border-[#e5e7eb] px-6 md:px-10 py-16">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-right">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-xl bg-[#1d4ed8] grid place-items-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                  <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af]">외주 · 협업 플랫폼</p>
                <h2 className="text-[1.3rem] font-bold tracking-tight text-[#0d1117]">알티 · Alti</h2>
              </div>
            </div>
          </GsapReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <GsapReveal type="fade-up" delay={0.05}>
                <h3 className="mb-4 text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold tracking-tight text-[#0d1117] leading-[1.2]">
                  크리에이터와 기업을<br />직접 연결하는 플랫폼
                </h3>
                <p className="mb-8 text-[14px] leading-[1.85] text-[#4b5563]">
                  알티는 단순한 외주 플랫폼을 넘어 포트폴리오 사이트 제작, 작품 판매 등
                  아티스트에게 필요한 다양한 기능을 제공합니다. 스마트 매칭 알고리즘으로
                  24시간 이내 최적의 크리에이터를 연결합니다.
                </p>
              </GsapReveal>

              <AnimatedFeatureGrid features={altiFeatures} />

              <GsapReveal type="fade-up" delay={0.1}>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1d4ed8] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#1e40af] transition-colors shadow-sm">
                  알티 바로가기 <ArrowRight size={14} />
                </Link>
              </GsapReveal>
            </div>

            <GsapReveal type="scale-in" delay={0.15}>
              <AltiMockup />
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 리프챗 ━━━━━━━━━━━━━━ */}
      <section className="border-b border-[#e5e7eb] px-6 md:px-10 py-16">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-right">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-xl bg-[#16a34a] grid place-items-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 2H2C1.45 2 1 2.45 1 3V13C1 13.55 1.45 14 2 14H15L19 18V3C19 2.45 18.55 2 18 2Z" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af]">연령별 채팅 & 커뮤니티</p>
                <h2 className="text-[1.3rem] font-bold tracking-tight text-[#0d1117]">리프챗 · LeafChat</h2>
              </div>
            </div>
          </GsapReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <GsapReveal type="scale-in" delay={0.15}>
              <LeafChatMockup />
            </GsapReveal>

            <div>
              <GsapReveal type="fade-up" delay={0.05}>
                <h3 className="mb-4 text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold tracking-tight text-[#0d1117] leading-[1.2]">
                  연령별로 안전하게<br />친구를 만드는 채팅 커뮤니티
                </h3>
                <p className="mb-8 text-[14px] leading-[1.85] text-[#4b5563]">
                  리프챗은 알티스토가 개발한 연령별 채팅 & 커뮤니티 플랫폼입니다. 또래끼리
                  편하게 소통하고, 안전한 환경에서 새로운 친구를 사귈 수 있습니다.
                  신뢰할 수 있는 안전 인증 시스템으로 건전한 커뮤니티를 만들어갑니다.
                </p>
              </GsapReveal>

              <AnimatedFeatureGrid features={leafFeatures} />

              <GsapReveal type="fade-up" delay={0.1}>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#16a34a] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors shadow-sm">
                  리프챗 바로가기 <ArrowRight size={14} />
                </Link>
              </GsapReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ CTA BOTTOM ━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 md:px-10 py-24">
        <div className="mx-auto max-w-screen-xl text-center">
          <GsapReveal type="scale-in">
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#9ca3af]">
                Get Started
              </p>
              <WordReveal
                text="지금 바로 시작하세요"
                className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight text-[#0d1117]"
                stagger={0.1}
              />
              <p className="text-[14px] leading-[1.9] text-[#6b7280] max-w-sm">
                알티스토의 서비스로 새로운 가능성을 열어보세요.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0d1117] px-7 py-3.5 text-[14px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors duration-300">
                문의하기 <ArrowRight size={15} />
              </Link>
            </div>
          </GsapReveal>
        </div>
      </section>

    </main>
  );
}
