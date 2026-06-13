'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export type RevealType = 'fade-up' | 'fade-right' | 'fade-left' | 'scale-in' | 'clip-up'

interface GsapRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  type?: RevealType
  /** ScrollTrigger start 값. 기본 'top 88%' */
  start?: string
}

export default function GsapReveal({
  children,
  className,
  style,
  delay   = 0,
  duration = 0.75,
  type    = 'fade-up',
  start   = 'top 88%',
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clipPath: 'none' })
      return
    }

    /* 시작 상태 */
    const from: gsap.TweenVars = {}
    const to: gsap.TweenVars   = { opacity: 1, y: 0, x: 0, scale: 1, duration, delay, ease: 'power3.out' }

    switch (type) {
      case 'fade-up':
        from.opacity = 0; from.y = 44; break
      case 'fade-right':
        from.opacity = 0; from.x = -40; break
      case 'fade-left':
        from.opacity = 0; from.x = 40; break
      case 'scale-in':
        from.opacity = 0; from.scale = 0.88
        to.ease = 'back.out(1.4)'; break
      case 'clip-up':
        from.clipPath = 'inset(0 0 100% 0)'; from.opacity = 1
        to.clipPath = 'inset(0 0 0% 0)';   to.opacity = 1
        to.ease = 'power4.out'; break
    }

    gsap.set(el, from)

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => gsap.to(el, to),
    })

    return () => st.kill()
  }, [type, delay, duration, start])

  /* 서버 렌더링 시 초기 투명도 → Flash 방지 */
  const initStyle: CSSProperties =
    type === 'clip-up'
      ? { clipPath: 'inset(0 0 100% 0)', ...style }
      : { opacity: 0, ...style }

  return (
    <div ref={ref} className={className} style={initStyle}>
      {children}
    </div>
  )
}
