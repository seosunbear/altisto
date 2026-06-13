'use client'

/**
 * WordReveal — 단어 단위 마스크 슬라이드업 애니메이션
 *
 * 각 단어가 overflow:hidden 컨테이너 아래에서 위로 슬라이드돼
 * 타이포그래피 에디토리얼 느낌을 연출합니다.
 */

import { useEffect, useRef } from 'react'
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
        return token.split(' ').map((word, wi) => (
          <span
            key={`${ti}-${wi}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <span
              data-wr
              style={{ display: 'inline-block', transform: 'translateY(115%)' }}
            >
              {word}
            </span>
            {/* 단어 사이 공백 (마지막 단어 제외) */}
            {wi < token.split(' ').length - 1 && (
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
            )}
          </span>
        ))
      })}
    </span>
  )
}
