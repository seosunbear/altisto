'use client'

import { useEffect, useState } from 'react'

/** 히어로 배경(/main.webp)이 로드될 때까지 보여주는 우아한 로딩 오버레이 */
export default function LoadingScreen() {
  const [loaded, setLoaded]   = useState(false) // 이미지 + 최소 노출 시간 충족
  const [removed, setRemoved] = useState(false) // 페이드아웃 후 DOM 제거

  useEffect(() => {
    const start = Date.now()
    const MIN_VISIBLE = 700 // 깜빡임 방지 최소 노출(ms)

    const finish = () => {
      const elapsed = Date.now() - start
      const wait = Math.max(0, MIN_VISIBLE - elapsed)
      setTimeout(() => setLoaded(true), wait)
    }

    const img = new window.Image()
    img.src = '/main.webp'
    if (img.complete) finish()
    else {
      img.onload  = finish
      img.onerror = finish // 실패해도 화면을 막지 않음
    }

    return () => { img.onload = null; img.onerror = null }
  }, [])

  // 페이드아웃 트랜지션이 끝나면 완전히 언마운트
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setRemoved(true), 650)
    return () => clearTimeout(t)
  }, [loaded])

  if (removed) return null

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-[600ms] ease-out"
      style={{
        background: 'radial-gradient(120% 120% at 50% 35%, #14141c 0%, #0a0a0f 60%, #050507 100%)',
        opacity: loaded ? 0 : 1,
        pointerEvents: loaded ? 'none' : 'auto',
      }}
    >
      {/* 워드마크 — 아래에서 위로 채워짐 */}
      <div className="relative select-none text-[clamp(1.4rem,5vw,2.2rem)] font-extrabold tracking-[-0.03em] leading-none">
        {/* 베이스(빈 글자) */}
        <span className="text-white/15">Altisto</span>
        {/* 채워지는 레이어 */}
        <span
          className="absolute inset-0 text-white"
          style={{ animation: 'loader-text-fill 1.6s ease-in-out infinite' }}
        >
          Altisto
        </span>
      </div>
    </div>
  )
}
