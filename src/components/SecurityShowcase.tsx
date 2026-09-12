'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* 최종 기울기 — 가운데를 향해 선 모니터처럼 바깥 모서리가 앞으로 나온다 */
const OPEN = 26
/* 시작할 때 카드를 이미지 뒤로 밀어 넣는 거리 — 카드가 통째로 이미지 뒤에 숨는다 */
const TUCK = 250

const CARD = 'aspect-[3/4] w-[clamp(220px,21vw,290px)] rounded-3xl border'

/**
 * 보안 섹션 이미지 + 양옆 윤곽선 카드의 등장 연출. 한 타임라인으로 묶었다.
 *
 *  0.00s  이미지가 바닥에 눕혀 있던 카드를 세우듯 rotateX 18° → 0 으로 일어선다
 *  0.30s  카드가 이미지 뒤에서 옆으로 빠져나오며 경첩처럼 26° 로 열린다.
 *         잔상 카드 두 장이 더 바깥으로 부채처럼 퍼진다
 *  1.00s  잔상이 본 카드로 착 접혀 들어오고, 부딪힌 순간 윤곽선이 번쩍 + 살짝 밀린다
 *  1.35s  이미지 표면에 빛이 한 번 훑고 지나간다
 *
 * 최종 상태는 이전과 똑같다(윤곽선 카드 한 장씩, 26°). 잔상은 연출 중에만 보인다.
 * 전부 transform·opacity 만 움직인다. perspective 는 transformPerspective 로
 * 요소마다 transform 안에 넣는다(부모 perspective 는 filter 가 있으면 평면으로 눌린다).
 */
export default function SecurityShowcase({ alt }: { alt: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = root.current
    if (!el) return

    const q = gsap.utils.selector(el)
    const image = q('[data-image]')
    const glare = q('[data-glare]')

    const ctx = gsap.context(() => {
      /* 바깥쪽 방향: 왼쪽 카드는 -1, 오른쪽은 +1 */
      const sides = (['left', 'right'] as const).map(side => ({
        dir: side === 'left' ? -1 : 1,
        origin: side === 'left' ? 'right center' : 'left center',
        wing: q(`[data-wing="${side}"]`),
        flash: q(`[data-wing="${side}"] [data-flash]`),
        echoes: [1, 2].map(n => ({ n, el: q(`[data-echo="${side}-${n}"]`) })),
      }))

      for (const s of sides) {
        gsap.set([s.wing, ...s.echoes.map(e => e.el)], {
          transformPerspective: 1100,
          transformOrigin: s.origin,
        })
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        /* 움직임은 빼고 제자리에서 흐리게 나타나기만 */
        for (const s of sides) gsap.set(s.wing, { rotationY: -s.dir * OPEN })
        gsap.fromTo([image, ...sides.map(s => s.wing)], { opacity: 0 }, {
          opacity: 1, duration: 0.4, ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
        return
      }

      /* ── 시작 상태 ── */
      gsap.set(image, {
        transformPerspective: 1400, transformOrigin: '50% 100%',
        rotationX: 18, y: 70, scale: 0.94, opacity: 0,
      })
      /* SSR 인라인 translateX(-110%) 를 GSAP 이 px 로 읽어 두므로 x 를 0 으로 되돌리고 xPercent 로만 민다 */
      gsap.set(glare, { x: 0, xPercent: -110 })
      for (const s of sides) {
        gsap.set([s.wing, ...s.echoes.map(e => e.el)], {
          x: -s.dir * TUCK, rotationY: 0, scale: 0.88, opacity: 0,
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })

      /* 1. 이미지가 일어선다 */
      tl.to(image, { rotationX: 0, y: 0, scale: 1, duration: 1.1, ease: 'expo.out' }, 0)
        .to(image, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)

      for (const s of sides) {
        const open = -s.dir * OPEN

        /* 2. 본 카드가 뒤에서 빠져나오며 열린다 */
        tl.to(s.wing, { opacity: 1, duration: 0.15, ease: 'none' }, 0.3)
          .to(s.wing, { x: 0, rotationY: open, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.3)

        /* 잔상 두 장 — 더 바깥으로, 더 많이 꺾여 부채처럼 퍼진다 */
        for (const e of s.echoes) {
          tl.to(e.el, { opacity: e.n === 1 ? 0.5 : 0.28, duration: 0.15, ease: 'none' }, 0.3 + e.n * 0.05)
            .to(e.el, {
              x: s.dir * 38 * e.n, rotationY: open - s.dir * 11 * e.n, scale: 1,
              duration: 0.7, ease: 'expo.out',
            }, 0.3 + e.n * 0.05)
            /* 3. 본 카드로 착 접혀 들어오며 사라진다 */
            .to(e.el, {
              x: 0, rotationY: open, opacity: 0,
              duration: 0.35, ease: 'power3.inOut',
            }, 1.0)
        }

        /* 부딪힌 순간 — 안쪽으로 살짝 밀렸다가 튕겨 제자리 + 윤곽선 번쩍 */
        tl.to(s.wing, { x: -s.dir * 7, duration: 0.07, ease: 'power2.out' }, 1.3)
          .to(s.wing, { x: 0, duration: 0.5, ease: 'back.out(2.5)' }, 1.37)
          .to(s.flash, { opacity: 1, duration: 0.07, ease: 'none' }, 1.3)
          .to(s.flash, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 1.37)
      }

      /* 4. 빛이 이미지 표면을 한 번 훑는다 */
      tl.to(glare, { xPercent: 110, duration: 1.1, ease: 'power2.inOut' }, 1.35)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative mx-auto max-w-[1120px]">

      {/* 양옆 윤곽선 카드 — 자리가 모자라는 lg 미만에서는 숨긴다.
          카드 안쪽 모서리가 이미지 가장자리 뒤로 60px 파고든다(이미지 반폭 360 − 60 = 300).
          SSR 에는 opacity 0 — 하이드레이션 전 평평한 카드가 비치지 않게(글 없는 장식) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {(['left', 'right'] as const).map(side => (
          <div key={side}
            className={`absolute inset-y-0 flex items-center ${
              side === 'left' ? 'right-[calc(50%+300px)]' : 'left-[calc(50%+300px)]'
            }`}
          >
            <div className="relative">
              {[2, 1].map(n => (
                /* 잔상은 윤곽선을 더 밝게 — 본 카드(15%)와 같으면 opacity 가 곱해져 거의 안 보인다 */
                <div key={n} data-echo={`${side}-${n}`} className={`${CARD} absolute inset-0 border-white/50`} style={{ opacity: 0 }} />
              ))}
              <div data-wing={side} className={`${CARD} relative border-white/15`} style={{ opacity: 0 }}>
                <div data-flash className="absolute -inset-px rounded-3xl border border-white/70" style={{ opacity: 0 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 원본 비율(16:9) 그대로. 폭 720px 이면 높이가 예전 정사각형(410px)과 비슷하다 */}
      <div data-image className="relative z-10 mx-auto w-full max-w-[720px]">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)] md:rounded-3xl">
          <Image
            src="/altistosecurities.jpg"
            alt={alt}
            width={1920}
            height={1080}
            sizes="(min-width: 800px) 720px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
            quality={90}
            className="block h-auto w-full"
          />
          {/* 빛 줄기 — 처음엔 왼쪽 밖에 있다가 한 번 가로지른다 */}
          <div
            data-glare
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)',
              mixBlendMode: 'screen',
              transform: 'translateX(-110%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
