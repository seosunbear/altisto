'use client'

/**
 * WordReveal — 단어 단위 마스크 슬라이드업 애니메이션
 *
 * 각 단어가 overflow:hidden 컨테이너 아래에서 위로 슬라이드돼
 * 타이포그래피 에디토리얼 느낌을 연출합니다.
 */

import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface WordRevealProps {
  /** 공백 기준으로 분리할 텍스트 (줄바꿈은 \n) */
  text: string
  className?: string
  delay?: number
  /** 단어별 스태거 (초) */
  stagger?: number
  /** ScrollTrigger start */
  start?: string
}

export default function WordReveal({
  text,
  className,
  delay   = 0,
  stagger = 0.08,
  start   = 'top 88%',
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll<HTMLSpanElement>('[data-wr]').forEach(w => {
        w.style.transform = 'translateY(0%)'
      })
      return
    }

    const words = el.querySelectorAll<HTMLSpanElement>('[data-wr]')
    gsap.set(words, { y: '115%' })

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () =>
        gsap.to(words, {
          y:        '0%',
          duration: 0.72,
          stagger,
          delay,
          ease:     'power4.out',
        }),
    })

    return () => st.kill()
  }, [delay, stagger, start])

  /* 텍스트를 단어 + 줄바꿈 토큰으로 파싱 */
  const tokens = text.split(/(\n)/g)

  return (
    <span ref={ref} className={className}>
      {tokens.map((token, ti) => {
        if (token === '\n') return <br key={`br-${ti}`} />
        const words = token.split(' ')
        return words.map((word, wi) => (
          /* 단어 span '바깥'에 실제 공백 문자를 두어 크롤러가 단어를 붙여 읽지 않도록 함.
             SSR HTML에 인라인 translateY(115%)를 넣지 않음 — 숨김은 useEffect(gsap.set)에서만
             처리해 JS 미실행 크롤러도 텍스트를 온전히 읽게 함 */
          <Fragment key={`${ti}-${wi}`}>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span data-wr style={{ display: 'inline-block' }}>
                {word}
              </span>
            </span>
            {wi < words.length - 1 && ' '}
          </Fragment>
        ))
      })}
    </span>
  )
}
