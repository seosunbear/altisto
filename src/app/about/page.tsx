import type { Metadata } from 'next';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import GsapReveal from '@/components/GsapReveal';

export const metadata: Metadata = {
  title: '회사 소개',
  description: '알티스토의 비전, 미션, 핵심 가치와 리더십을 소개합니다.',
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-[68px]">

      {/* ━━━━━━━━━━━━━━ PAGE HEADER ━━━━━━━━━━━━━━ */}
      <section className="relative bg-white border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-24 flex items-center">

        {/* 유성우 장식 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <path id="ap1" d="M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54" />
              <path id="ap2" d="M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139" />
              <path id="ap3" d="M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234" />
              <path id="ap4" d="M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322" />
              <path id="ap5" d="M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407" />
            </defs>
            {[
              "M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54",
              "M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139",
              "M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234",
              "M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322",
              "M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407",
            ].map((d, i) => (
              <path key={i} d={d} stroke="#dbeafe" strokeWidth="1" strokeDasharray="3 11" strokeLinecap="round" opacity={0.7 - i * 0.1} />
            ))}
            <path d="M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z" fill="#1d4ed8">
              <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#ap1" /></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#7c3aed">
              <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#ap2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#ec4899">
              <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#ap3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
            </path>
            <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#06b6d4">
              <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#ap4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#f59e0b">
              <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#ap5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.08;0.88;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up">
            <h1 className="mb-4 font-extrabold tracking-[-0.03em] leading-[1.1] text-[#0d1117] text-[clamp(1.6rem,3vw,2.4rem)]">
              소개
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.15}>
            <div className="mb-4 h-px w-8 bg-[#d1d5db]" />
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[12px] leading-[1.9] text-[#6b7280]">
              우리가 존재하는 이유
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ MISSION ━━━━━━━━━━━━━━ */}
      <section className="relative bg-white border-b border-[#e5e7eb] px-6 md:px-10 py-24 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col items-center text-center">

          <GsapReveal type="fade-up" delay={0.05}>
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.35em] text-[#1d4ed8]">
              we are
            </p>
          </GsapReveal>

          <TypewriterHeadline />

          <GsapReveal type="fade-up" delay={0.3}>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-14 bg-[#e5e7eb]" />
              <div className="h-1 w-1 rounded-full bg-[#d1d5db]" />
              <div className="h-px w-14 bg-[#e5e7eb]" />
            </div>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.4}>
            <p className="text-[14px] leading-[2] text-[#6b7280] max-w-sm">
              우리는 아티스트이자 지휘자가 되어<br />
              다양한 인생의 컨텐츠와 그 이상의 가치를 만들어갑니다
            </p>
          </GsapReveal>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ VALUES ━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━ MILESTONES ━━━━━━━━━━━━━━ */}
      <MilestonesTimeline />

    </main>
  );
}
