'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'

interface CountUpStatProps {
  to: number
  suffix?: string
  label: string
  /** 등장 지연 — 하나씩 순차 등장 */
  delay?: number
}

export default function CountUpStat({ to, suffix = '', label, delay = 0 }: CountUpStatProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  /* 하이드레이션 후에만 숨김 상태 적용 — SSR HTML에는 opacity:0이 남지 않게(SEO) */
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!inView) return
    const node = numRef.current
    if (!node) return

    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString() + suffix
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, delay])

  return (
    /* initial={false}: SSR HTML에 opacity:0 인라인 숨김이 박히지 않도록 함(SEO).
       숨김→등장 전환은 클라이언트 하이드레이션 후에만 적용 */
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : mounted ? { opacity: 0, y: 28 } : undefined}
      transition={inView ? { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
    >
      {/* SSR에는 최종 수치를 그대로 노출 — 카운트업은 클라이언트에서 0부터 다시 시작 */}
      <p
        ref={numRef}
        className="text-[2rem] font-bold leading-none tracking-tight text-white tabular-nums"
      >
        {to.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-[12px] font-medium text-white/50">{label}</p>
    </motion.div>
  )
}
