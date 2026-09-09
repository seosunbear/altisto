'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  /*
   * 관찰 대상은 path 가 아니라 감싸는 div 다.
   *
   * WebKit(= iOS 사파리·크롬·인앱 웹뷰 전부)에는
   * "음수 rootMargin 을 준 IntersectionObserver 는 SVG 자식 요소를
   * 절대 교차한 것으로 보고하지 않는다"는 버그가 있다.
   * 같은 옵션이라도 대상이 div 나 <svg> 자신이면 정상 동작한다.
   *
   *   대상 = <path>, rootMargin 없음   → 교차 보고됨
   *   대상 = <path>, rootMargin -80px  → 영원히 false   ← 여기에 걸렸었다
   *   대상 = <div>,  rootMargin -80px  → 교차 보고됨
   *
   * 그래서 motion.path 에 whileInView + viewport.margin 을 직접 걸면
   * iOS 에서는 onViewportEnter 가 한 번도 불리지 않아 두 path 가
   * initial 값(opacity 0, pathLength 0)에 멈춘 채 그래프가 통째로
   * 안 보인다. 크롬에서만 멀쩡해서 놓치기 쉽다.
   *
   * 관찰은 div 하나로 하고, 그 결과를 두 path 에 내려준다.
   */
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="absolute inset-0">
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
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* 우상향 라인 — non-scaling-stroke는 pathLength dash 계산을 왜곡해
            넓은 화면에서 선이 중간에 끊기므로 사용하지 않는다 */}
        <motion.path
          d={LINE}
          stroke="#3b82f6"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
    </div>
  )
}
