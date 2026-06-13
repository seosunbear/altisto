'use client'

import { motion } from 'framer-motion'

/* 우상향 라인 좌표 (viewBox 1200 x 500) — 배경 전면을 채움 */
const PTS = [
  [   0, 430],
  [ 200, 380],
  [ 400, 400],
  [ 600, 300],
  [ 800, 320],
  [1000, 180],
  [1200,  70],
] as const

/* Catmull-Rom → 베지어 변환으로 부드러운 곡선 생성 */
function smoothPath(pts: readonly (readonly [number, number])[]) {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`
  }
  return d
}

const LINE = smoothPath(PTS)
const AREA = `${LINE} L1200 500 L0 500 Z`

/** 섹션 배경으로 깔리는 우상향 그래프 */
export default function GrowthChart() {
  return (
    <svg
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 영역 채우기 */}
      <motion.path
        d={AREA}
        fill="url(#growth-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      {/* 우상향 라인 */}
      <motion.path
        d={LINE}
        stroke="#3b82f6"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  )
}
