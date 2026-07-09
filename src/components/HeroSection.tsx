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

  /* 자동재생 차단 등으로 onEnded가 오지 않아도 글자가 반드시 등장하도록 폴백
     (영상 길이 ~8.2초 — 크롤러 렌더링 시 텍스트가 숨겨진 채 남지 않게 함) */
  useEffect(() => {
    const t = setTimeout(() => setVideoEnded(true), 9000)
    return () => clearTimeout(t)
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
          {/* 각 줄: overflow-hidden 클립 마스크로 슬라이드 업.
              단어 사이에 margin 대신 실제 공백 문자를 넣어
              크롤러가 "그이상의가치를"처럼 붙여 읽지 않도록 함 */}
          <span className="block overflow-hidden">
            {LINE1_WORDS.map((w, i) => (
              <span key={`l1-${i}`}>
                <span data-word className="inline-block">
                  {w}
                </span>
                {i < LINE1_WORDS.length - 1 && ' '}
              </span>
            ))}
          </span>
          {/* 줄(블록) 사이에도 공백 문자를 넣어 원시 HTML에서 "콘텐츠그"로 붙지 않게 함
              — 블록 요소 사이 공백이라 화면에는 보이지 않음 */}
          {' '}
          <span className="block overflow-hidden">
            {LINE2_WORDS.map((w, i) => (
              <span key={`l2-${i}`}>
                <span data-word className="inline-block">
                  {w}
                </span>
                {i < LINE2_WORDS.length - 1 && ' '}
              </span>
            ))}
          </span>
        </h1>

        {/* SSR HTML에서 인라인 opacity:0으로 숨기지 않음 — 숨김은 useEffect(gsap)에서만 처리해
            JS를 실행하지 않는 크롤러도 텍스트를 온전히 읽을 수 있게 함.
            '소프트웨어 및 플랫폼 개발사'라는 핵심 정체성을 페이지 최상단 문장으로 배치 */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-[12px] md:text-[14px] leading-[1.7] md:leading-[1.9] tracking-[0.01em] text-white/75 font-normal"
        >
          소프트웨어 및 플랫폼 개발사 알티스토는<br />
          지루한 일상 속, 잠깐이지만 웃거나 몰두할 수 있는 세상을 만듭니다.
        </p>
      </div>

      </div>
    </section>
  )
}
