'use client'

import { useEffect, useRef } from 'react'
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        ref={numRef}
        className="text-[2rem] font-bold leading-none tracking-tight text-white tabular-nums"
      >
        0{suffix}
      </p>
      <p className="mt-2 text-[12px] font-medium text-white/50">{label}</p>
    </motion.div>
  )
}
