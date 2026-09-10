'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'

/* loader-text-fill 한 바퀴(globals.css)와, 그중 글자가 다 차는 지점(70%) */
const FILL_CYCLE = 1600
const FILL_FULL = 1120

/* 서버 HTML 로 그려진 로딩 화면이 문서에 있나 = 첫 진입인가.
   로딩 화면이 가리는 건 하이드레이션 전 화면뿐이다. 그 사이엔 GSAP 이
   아직 초기 상태를 잡지 않아서 MISSION 문구 같은 요소가 제자리에 그대로
   드러나 있다. 다른 페이지에서 넘어오는 클라이언트 내비게이션은 스크립트가
   이미 떠 있어 가릴 것이 없으니 건너뛴다. 서버에서는 늘 띄운다. */
const isFirstPaint = () =>
  typeof document === 'undefined' || !!document.querySelector('.loader-screen')

interface LoadingScreenProps {
  /** 로딩 화면이 걷히기 시작할 때. 건너뛸 때도 바로 불린다 */
  onReveal?: () => void
}

/** 첫 진입 때 하이드레이션이 끝날 때까지 화면을 덮는 로딩 오버레이 */
export default function LoadingScreen({ onReveal }: LoadingScreenProps) {
  const [loaded, setLoaded]   = useState(() => !isFirstPaint()) // 걷히기 시작
  const [removed, setRemoved] = useState(loaded)                // 페이드아웃 후 DOM 제거
  const fillRef = useRef<HTMLSpanElement>(null)

  const reveal = useEffectEvent(() => onReveal?.())

  useEffect(() => {
    if (loaded) return

    /* effect 가 돌았다 = 하이드레이션이 끝났고, 그보다 먼저 도는
       layout effect(GSAP 초기 상태)도 이미 다 잡혔다.
       워드마크가 채워지는 중이면 다 찰 때까지만 기다렸다가 걷는다.
       중간에 끊으면 반쯤 찬 글자가 그대로 사라져서 끊긴 것처럼 보인다. */
    const anim = fillRef.current?.getAnimations?.()[0]
    const t = typeof anim?.currentTime === 'number'
      ? anim.currentTime % FILL_CYCLE
      : FILL_FULL // 애니메이션이 없으면(모션 감소) 기다리지 않는다

    const timer = setTimeout(() => setLoaded(true), Math.max(0, FILL_FULL - t))
    return () => clearTimeout(timer)
  }, [loaded])

  // 걷히기 시작하면 알리고, 페이드아웃 트랜지션이 끝나면 완전히 언마운트
  useEffect(() => {
    if (!loaded) return
    reveal()
    const t = setTimeout(() => setRemoved(true), 650)
    return () => clearTimeout(t)
  }, [loaded])

  if (removed) return null

  return (
    <div
      aria-hidden
      className="loader-screen fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-[600ms] ease-out"
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
        {/* 채워지는 레이어 — 걷히는 동안에는 루프를 멈추고 꽉 찬 채로 둔다 */}
        <span
          ref={fillRef}
          className={`absolute inset-0 text-white ${loaded ? '' : 'loader-fill'}`}
        >
          Altisto
        </span>
      </div>
    </div>
  )
}
