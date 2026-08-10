'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* iOS Safari 인라인 재생 보장.
     iOS는 재생 시작 시점에 muted/playsinline이 확정돼 있지 않으면 인라인 재생을
     거부하고 네이티브 전체화면 플레이어로 넘겨버린다. React가 SSR HTML에
     내보내는 속성만 믿지 말고 마운트 직후 속성·프로퍼티를 직접 못 박은 뒤
     play()를 명시적으로 호출한다. */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted        = true
    v.defaultMuted = true
    v.playsInline  = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', 'true') // iOS 9 이하 · 인앱 웹뷰

    // 자동재생이 차단되면(저전력 모드 등) 첫 사용자 입력에서 한 번 더 시도
    const retry = () => { v.play().catch(() => {}) }

    v.play().catch(() => {
      window.addEventListener('touchstart', retry, { once: true, passive: true })
      window.addEventListener('click',      retry, { once: true })
    })

    return () => {
      window.removeEventListener('touchstart', retry)
      window.removeEventListener('click', retry)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 화면에는 영상만 두되 페이지의 h1과 핵심 정체성 문장은 DOM에 남긴다 —
          JS를 실행하지 않는 검색·AI 크롤러와 화면 낭독기가 읽는 문장 */}
      <h1 className="sr-only">
        소프트웨어 및 플랫폼 개발사 알티스토(Altisto) — 상상을 현실로
      </h1>

      {/* 배경 동영상 — 1회 재생, 종료 후 마지막 프레임 유지.
          mp4(H.264 High L4.0)를 먼저 둔다. VP9 webm이 앞에 있으면 iOS Safari가
          기기마다 들쭉날쭉한 VP9 경로를 골라 디코딩에 실패할 수 있는데,
          두 파일 크기 차이는 수십 KB뿐이라 순서를 바꿔 얻는 손해가 없다.
          pointer-events-none — 배경이므로 탭이 닿아 네이티브 플레이어가 뜨지 않게 한다. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/main.webp"
        disablePictureInPicture
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/hero.webm" type="video/webm" />
      </video>
    </section>
  )
}
