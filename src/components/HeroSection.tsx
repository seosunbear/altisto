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
