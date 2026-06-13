'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LINE1_WORDS = ['콘텐츠']
const LINE2_WORDS = ['그', '이상의', '가치를']

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const dividerRef  = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const headline = headlineRef.current
    const divider  = dividerRef.current
    const subtitle = subtitleRef.current
    if (!headline || !divider || !subtitle) return

    const words = Array.from(headline.querySelectorAll<HTMLSpanElement>('[data-word]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([words, divider, subtitle], { opacity: 1, y: 0, scaleX: 1 })
      return
    }

    gsap.set(words,   { y: '110%', opacity: 0 })
    gsap.set(divider, { scaleX: 0, opacity: 0, transformOrigin: 'left center' })
    gsap.set(subtitle,{ opacity: 0, y: 24 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(words, {
      y:        '0%',
      opacity:  1,
      duration: 0.72,
      ease:     'power3.out',
      stagger:  0.1,
    })

    tl.to(divider, {
      scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out',
    }, '-=0.22')

    tl.to(subtitle, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
    }, '-=0.28')

    return () => { tl.kill() }
  }, [])

  return (
    <section className="relative px-4 md:px-10 overflow-hidden min-h-screen flex items-end pb-16 md:items-center md:pb-0">
      {/* 블러 배경 */}
      <div className="absolute inset-0" style={{ backgroundImage: 'url(/main.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px)', transform: 'scale(1.05)' }} />

      {/* 하단 다크 오버레이 */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)' }} />
      {/* 모바일 전용 추가 어둠 — 상단 + 하단 */}
      <div className="absolute inset-0 md:hidden" style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)' }} />

      {/* 별 장식 — 데스크탑: 텍스트 주위 / 모바일: 우하단 */}
      {/* 데스크탑 */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 5 }}>
        <svg width="100%" height="100%" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="o1" d="M 120,350 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0" />
            <path id="o2" d="M 20,350  a 300,300 0 1,0 600,0 a 300,300 0 1,0 -600,0" />
            <path id="o3" d="M -80,350 a 400,400 0 1,0 800,0 a 400,400 0 1,0 -800,0" />
            <path id="o4" d="M -180,350 a 500,500 0 1,0 1000,0 a 500,500 0 1,0 -1000,0" />
            <path id="o5" d="M -330,350 a 650,650 0 1,0 1300,0 a 650,650 0 1,0 -1300,0" />
          </defs>
          {/* 궤도 1 */}
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="white">
            <animateMotion dur="20s" repeatCount="indefinite" rotate="auto"><mpath href="#o1"/></animateMotion>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="20s" repeatCount="indefinite"/>
          </path>
          {/* 궤도 2 */}
          <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="white">
            <animateMotion dur="28s" begin="5s" repeatCount="indefinite" rotate="auto"><mpath href="#o2"/></animateMotion>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="28s" begin="5s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="white">
            <animateMotion dur="28s" begin="19s" repeatCount="indefinite" rotate="auto"><mpath href="#o2"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="28s" begin="19s" repeatCount="indefinite"/>
          </path>
          {/* 궤도 3 */}
          <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill="white">
            <animateMotion dur="38s" begin="3s" repeatCount="indefinite" rotate="auto"><mpath href="#o3"/></animateMotion>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="38s" begin="3s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="white">
            <animateMotion dur="38s" begin="22s" repeatCount="indefinite" rotate="auto"><mpath href="#o3"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="38s" begin="22s" repeatCount="indefinite"/>
          </path>
          {/* 궤도 4 */}
          <path d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" fill="white">
            <animateMotion dur="50s" begin="8s" repeatCount="indefinite" rotate="auto"><mpath href="#o4"/></animateMotion>
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="50s" begin="8s" repeatCount="indefinite"/>
          </path>
          {/* 궤도 5 — 가장 바깥 */}
          <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="white">
            <animateMotion dur="65s" begin="6s" repeatCount="indefinite" rotate="auto"><mpath href="#o5"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="65s" begin="6s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="white">
            <animateMotion dur="65s" begin="38s" repeatCount="indefinite" rotate="auto"><mpath href="#o5"/></animateMotion>
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="65s" begin="38s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      {/* 모바일 — 우하단 궤도 */}
      <div className="absolute inset-0 pointer-events-none md:hidden" style={{ zIndex: 5 }}>
        <svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 궤도 중심 (340, 760) — 우하단 */}
            <path id="mo1" d="M 260,760 a 80,80 0 1,0 160,0 a 80,80 0 1,0 -160,0" />
            <path id="mo2" d="M 210,760 a 130,130 0 1,0 260,0 a 130,130 0 1,0 -260,0" />
            <path id="mo3" d="M 150,760 a 190,190 0 1,0 380,0 a 190,190 0 1,0 -380,0" />
            <path id="mo4" d="M 80,760  a 260,260 0 1,0 520,0 a 260,260 0 1,0 -520,0" />
            <path id="mo5" d="M 0,760   a 340,340 0 1,0 680,0 a 340,340 0 1,0 -680,0" />
          </defs>
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="white">
            <animateMotion dur="20s" repeatCount="indefinite" rotate="auto"><mpath href="#mo1"/></animateMotion>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="20s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="white">
            <animateMotion dur="28s" begin="5s" repeatCount="indefinite" rotate="auto"><mpath href="#mo2"/></animateMotion>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="28s" begin="5s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="white">
            <animateMotion dur="28s" begin="19s" repeatCount="indefinite" rotate="auto"><mpath href="#mo2"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="28s" begin="19s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill="white">
            <animateMotion dur="38s" begin="3s" repeatCount="indefinite" rotate="auto"><mpath href="#mo3"/></animateMotion>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="38s" begin="3s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="white">
            <animateMotion dur="38s" begin="22s" repeatCount="indefinite" rotate="auto"><mpath href="#mo3"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="38s" begin="22s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" fill="white">
            <animateMotion dur="50s" begin="8s" repeatCount="indefinite" rotate="auto"><mpath href="#mo4"/></animateMotion>
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="50s" begin="8s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="white">
            <animateMotion dur="65s" begin="6s" repeatCount="indefinite" rotate="auto"><mpath href="#mo5"/></animateMotion>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="65s" begin="6s" repeatCount="indefinite"/>
          </path>
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="white">
            <animateMotion dur="65s" begin="38s" repeatCount="indefinite" rotate="auto"><mpath href="#mo5"/></animateMotion>
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="65s" begin="38s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative mx-auto w-full max-w-screen-xl flex flex-col md:flex-row items-end md:items-center justify-end md:justify-between gap-12 pl-4 md:pl-[8vw] pr-4 md:pr-[4vw]" style={{ zIndex: 30 }}>
      <div className="flex flex-col items-end md:items-start text-right md:text-left">

        <h1
          ref={headlineRef}
          className="mb-2 md:mb-4 font-extrabold tracking-[-0.04em] leading-[1.1] text-white text-[clamp(1.8rem,3.5vw,3rem)]"
        >
          {/* 각 줄: overflow-hidden 클립 마스크로 슬라이드 업 */}
          <span className="block overflow-hidden">
            {LINE1_WORDS.map((w, i) => (
              <span
                key={`l1-${i}`}
                data-word
                className="inline-block mr-[0.22em] last:mr-0"
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {LINE2_WORDS.map((w, i) => (
              <span
                key={`l2-${i}`}
                data-word
                className="inline-block mr-[0.22em] last:mr-0"
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        <div
          ref={dividerRef}
          className="mb-3 md:mb-6 h-px w-10 bg-white/40"
          style={{ opacity: 0, transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />

        <p
          ref={subtitleRef}
          className="max-w-md text-[12px] md:text-[13px] leading-[1.7] md:leading-[2] tracking-[0.01em] text-white/70 font-normal"
          style={{ opacity: 0, transform: 'translateY(24px)' }}
        >
          지루한 일상속 알티스토는,<br />
          잠깐이지만 웃거나 몰두할 수 있는 세상을 만듭니다.
        </p>
      </div>

      </div>
    </section>
  )
}
