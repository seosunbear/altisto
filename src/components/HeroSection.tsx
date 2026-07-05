'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LINE1_WORDS = ['콘텐츠']
const LINE2_WORDS = ['그', '이상의', '가치를']

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)

  /* 마운트 시 글자 숨김 */
  useEffect(() => {
    const headline = headlineRef.current
    const subtitle = subtitleRef.current
    if (!headline || !subtitle) return

    const words = Array.from(headline.querySelectorAll<HTMLSpanElement>('[data-word]'))
    gsap.set(words,   { y: '110%', opacity: 0 })
    gsap.set(subtitle,{ opacity: 0, y: 24 })
  }, [])

  /* 동영상이 끝나면 글자 등장 */
  useEffect(() => {
    if (!videoEnded) return
    const headline = headlineRef.current
    const subtitle = subtitleRef.current
    if (!headline || !subtitle) return

    const words = Array.from(headline.querySelectorAll<HTMLSpanElement>('[data-word]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([words, subtitle], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(words, {
      y:        '0%',
      opacity:  1,
      duration: 0.72,
      ease:     'power3.out',
      stagger:  0.1,
    })

    tl.to(subtitle, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
    }, '-=0.28')

    return () => { tl.kill() }
  }, [videoEnded])

  return (
    <section className="relative px-4 md:px-10 overflow-hidden min-h-screen flex items-center">
      {/* 배경 동영상 — 1회 재생, 종료 후 마지막 프레임 유지 */}
      <video
        autoPlay
        muted
        playsInline
        poster="/main.png"
        src="/hero.mp4"
        onEnded={() => setVideoEnded(true)}
        onError={() => setVideoEnded(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 하단 다크 오버레이 */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)' }} />
      {/* 모바일 전용 추가 어둠 — 상단 + 하단 */}
      <div className="absolute inset-0 md:hidden" style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)' }} />

      {/* 콘텐츠 영역 */}
      <div className="relative mx-auto w-full max-w-screen-xl flex items-center justify-center gap-12 px-4" style={{ zIndex: 30 }}>
      <div className="flex flex-col items-start text-left">

        <h1
          ref={headlineRef}
          className="mb-4 md:mb-6 font-extrabold tracking-[-0.04em] leading-[1.12] text-white text-[clamp(2rem,4.2vw,3.6rem)]"
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

        <p
          ref={subtitleRef}
          className="max-w-xl text-[12px] md:text-[14px] leading-[1.7] md:leading-[1.9] tracking-[0.01em] text-white/75 font-normal"
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
