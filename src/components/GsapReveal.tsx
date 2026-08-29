'use client'

import {
  useEffect,
  useRef,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
  type CSSProperties,
  type ReactElement,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export type RevealType =
  | 'fade-up'
  | 'fade-right'
  | 'fade-left'
  | 'scale-in'
  | 'clip-up'

interface GsapRevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties

  delay?: number
  duration?: number
  type?: RevealType
  start?: string

  /** Toss 스타일 Blur Reveal */
  blur?: boolean
  blurAmount?: number

  /** 단어별 순차 애니메이션 */
  staggerWords?: boolean
  staggerEach?: number
}

/* 문자열을 단어 단위 span으로 분리 */
function splitWords(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part, i) => {
      if (part.trim() === '') return part // 공백 유지

      return (
        <span
          key={i}
          data-word
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            willChange: 'transform, opacity, filter',
          }}
        >
          {part}
        </span>
      )
    })
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => <span key={i}>{splitWords(child)}</span>)
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<any>

    return cloneElement(element, {
      ...element.props,
      children: splitWords(element.props.children),
    })
  }

  return node
}

export default function GsapReveal({
  children,
  className,
  style,

  delay = 0,
  duration = 1.05,
  type = 'fade-up',
  start = 'top 88%',

  blur = true,
  blurAmount = 12,

  staggerWords = false,
  staggerEach = 0.08,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const el = ref.current
    if (!el) return

    const targets = staggerWords
      ? el.querySelectorAll<HTMLElement>('[data-word]')
      : el

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        clipPath: 'none',
        clearProps: 'willChange',
      })
      return
    }

    const from: gsap.TweenVars = {
      willChange: 'transform, opacity, filter',
    }

    const to: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      delay,
      ease: 'power4.out',
      clearProps: 'willChange',
    }

    switch (type) {
      case 'fade-up':
        from.opacity = 0
        from.y = 32
        break

      case 'fade-right':
        from.opacity = 0
        from.x = -32
        break

      case 'fade-left':
        from.opacity = 0
        from.x = 32
        break

      case 'scale-in':
        from.opacity = 0
        from.scale = 0.94
        break

      case 'clip-up':
        from.clipPath = 'inset(0 0 100% 0)'
        from.opacity = 1
        to.clipPath = 'inset(0 0 0% 0)'
        break
    }

    // Toss 스타일 블러
    if (blur && type !== 'clip-up') {
      from.filter = `blur(${blurAmount}px)`
      to.filter = 'blur(0px)'
    }

    gsap.set(targets, from)

    const tween = gsap.to(targets, {
      ...to,
      stagger: staggerWords ? staggerEach : 0,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [
    type,
    delay,
    duration,
    start,
    blur,
    blurAmount,
    staggerWords,
    staggerEach,
  ])

  return (
    <div ref={ref} className={className} style={style}>
      {staggerWords ? splitWords(children) : children}
    </div>
  )
}