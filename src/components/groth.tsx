
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* --------------------------------
   글자 분리
-------------------------------- */

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span
          key={index}
          data-char
          className="inline-block"
          style={{
            color: 'rgba(0, 0, 0, 0.22)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  )
}

/* --------------------------------
   단어 단위 Reveal
-------------------------------- */

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, index, array) => (
        <span
          key={index}
          className="
            inline-block
            overflow-hidden
            align-bottom
          "
        >
          <span
            data-word
            className="
              inline-block
              will-change-transform
            "
          >
            <SplitChars text={word} />
          </span>

          {index < array.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  )
}

export default function TossStyleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current

    if (!section || !title) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(
        '[data-word]',
        title
      )

      const chars = gsap.utils.toArray<HTMLElement>(
        '[data-char]',
        title
      )

      /* =====================================
         초기 상태
      ===================================== */

      gsap.set(words, {
        y: 45,
        opacity: 0,
        filter: 'blur(12px)',
      })

      gsap.set(title, {
        y: 0,
        scale: 1,
        transformOrigin: 'center center',
      })

      /* =====================================
         1. 페이지 진입 Reveal
      ===================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },

        onComplete: () => {
          ScrollTrigger.refresh()
        },
      })

      intro.to(words, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.65,
        stagger: 0.13,
      })

      /* =====================================
         2. 스크롤 애니메이션
         
         축소 + 검정색으로 동시에
      ===================================== */

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      scrollTl.to(
        title,
        {
          y: -280,
          scale: 0.52,
          duration: 1,
          ease: 'none',
        },
        0
      )

      scrollTl.to(
        chars,
        {
          color: '#000000',
          duration: 1,
          stagger: {
            each: 0.025,
          },
          ease: 'none',
        },
        0
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-screen
        overflow-hidden
        bg-white
        text-black
      "
    >
      <div
        className="
          relative
          h-screen
          px-6
          md:px-12
        "
      >
        <div
          ref={titleRef}
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            text-center
            will-change-transform
          "
        >
          <div
            className="
              text-[clamp(2.5rem,7.5vw,6rem)]
              font-extrabold
              leading-[1.3]
              tracking-[0.02em]
            "
          >
            <div>
              <SplitWords text="사용자라는 관객을 위해" />
            </div>

            <div>
              <SplitWords text="끊임없이 변화하는 사람들" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

