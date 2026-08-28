'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarTrail from '@/components/StarTrail';
import CharRoll from '@/components/CharRoll';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   MOTTO
   ========================================================= */

const MOTTO = [
  { text: 'MISSION', kind: 'label' },

  { text: '세계 82억 명,', kind: 'lead', mark: ['82억'] },
  { text: '모든 관객을', kind: 'lead' },
  { text: '사로잡아라', kind: 'lead' },

  { text: '저희만의', kind: 'lead', gap: true },
  { text: '다양한 콘텐츠로', kind: 'lead', mark: ['콘텐츠'] },
  { text: '관객을 사로잡는것', kind: 'lead' },
  { text: '그것이 저희의', kind: 'lead', gap: true },
  {
    text: '목표이자 주어진 미션입니다',
    kind: 'lead',
    mark: ['목표', '미션'],
  },
] as const;

const MOTTO_CLASS: Record<
  (typeof MOTTO)[number]['kind'],
  string
> = {
  label:
    'mb-3 text-[18px] font-extrabold tracking-[0.1em] text-white',

  lead:
    'text-[clamp(1rem,2vw,1.6rem)] font-bold leading-[1.2] tracking-[0.1em] text-white' +
    ' lg:text-[clamp(0.1rem,1.2vw,1.6rem)]',
};

/* =========================================================
   HIGHLIGHT COLORS
   ========================================================= */

const MARK_COLOR: Record<string, string> = {
  '82억': 'bg-[#93c5fd]',
  '콘텐츠': 'bg-[#c4b5fd]',
  '목표': 'bg-[#fed7aa]',
  '미션': 'bg-[#a5f3fc]',
};

const MARK_PAD_OPEN = {
  paddingLeft: '0.3em',
  paddingRight: '0.2em',
};

const MARK_PAD_SHUT = {
  paddingLeft: '0em',
  paddingRight: '0em',
};

/* =========================================================
   MOTTO LINE RENDER
   ========================================================= */

function renderLine(
  text: string,
  marks?: readonly string[],
) {
  if (!marks?.length) return text;

  const parts = text.split(
    new RegExp(`(${marks.join('|')})`, 'g'),
  );

  return parts.map((part, i) =>
    marks.includes(part) ? (
      <span
        key={i}
        data-mark
        className="relative inline-block"
      >
        {part}

        <span
          data-hl
          aria-hidden
          className={`
            pointer-events-none
            absolute
            inset-0
            w-0
            overflow-hidden
            rounded-[3px]
            ${MARK_COLOR[part]}
          `}
        >
          <span className="absolute left-0 top-0 whitespace-pre text-[#101014]">
            {part}
          </span>
        </span>
      </span>
    ) : (
      part
    ),
  );
}

/* =========================================================
   BREAKPOINTS
   ========================================================= */

const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023px)';

/* =========================================================
   COMPONENT
   ========================================================= */

export default function MistralGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     REAL VIEWPORT HEIGHT
     ======================================================= */

  useEffect(() => {
    let raf = 0;

    const updateViewportHeight = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const height =
          window.visualViewport?.height ??
          window.innerHeight;

        document.documentElement.style.setProperty(
          '--app-height',
          `${height}px`,
        );

        /*
         * Chrome 모바일의 주소창/하단 네비바가
         * 움직인 직후 ScrollTrigger도 바로 다시 계산한다.
         */
        ScrollTrigger.refresh();
      });
    };

    updateViewportHeight();

    const viewport = window.visualViewport;

    viewport?.addEventListener(
      'resize',
      updateViewportHeight,
    );

    viewport?.addEventListener(
      'scroll',
      updateViewportHeight,
    );

    window.addEventListener(
      'resize',
      updateViewportHeight,
    );

    return () => {
      cancelAnimationFrame(raf);

      viewport?.removeEventListener(
        'resize',
        updateViewportHeight,
      );

      viewport?.removeEventListener(
        'scroll',
        updateViewportHeight,
      );

      window.removeEventListener(
        'resize',
        updateViewportHeight,
      );
    };
  }, []);

  /* =======================================================
     GSAP / SCROLLTRIGGER
     ======================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const text = textRef.current;

    if (!section || !panel || !text) return;

    /* =====================================================
       COMMON ANIMATION
       ===================================================== */

    const common = (
      tl: gsap.core.Timeline,
      mottoAt: number,
    ) => {
      /*
       * 영상과 콘텐츠는 처음에는 숨김
       */
      gsap.set(
        [videoRef.current, contentRef.current],
        {
          opacity: 0,
        },
      );

      gsap.set(contentRef.current, {
        y: 28,
      });

      /*
       * 별 전환
       */
      gsap.set(sweepRef.current, {
        opacity: 0,
      });

      gsap.set(text, {
        y: 0,
      });

      /*
       * 영상 등장
       */
      tl.to(
        videoRef.current,
        {
          opacity: 1,
          ease: 'none',
          duration: 0.2,
        },
        0.03,
      );

      /*
       * 별 플래시
       */
      const sweep = sweepRef.current;

      if (sweep) {
        const flash = gsap.timeline({
          paused: true,
        });

        flash
          .fromTo(
            sweep,
            {
              xPercent: 16,
            },
            {
              xPercent: -16,
              duration: 1.5,
              ease: 'none',
            },
            0,
          )
          .fromTo(
            sweep,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              ease: 'power1.out',
            },
            0,
          )
          .to(
            sweep,
            {
              opacity: 0,
              duration: 0.75,
              ease: 'power1.in',
            },
            0.75,
          );

        tl.call(
          () => {
            if (!flash.isActive()) {
              flash.restart();
            }
          },
          undefined,
          0.3,
        );
      }

      /*
       * 모토 등장
       */
      const mottoLines = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(
            mottoRef.current.children,
          )
        : [];

      tl.from(
        mottoLines,
        {
          y: -40,
          opacity: 0,
          ease: 'power2.out',
          duration: 0.1,
          stagger: 0.03,
        },
        mottoAt,
      );

      /*
       * 형광펜
       */
      const words = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(
            mottoRef.current.querySelectorAll(
              '[data-mark]',
            ),
          )
        : [];

      words.forEach((word, i) => {
        const box =
          word.querySelector<HTMLElement>('[data-hl]');

        const inner =
          box?.firstElementChild as HTMLElement | null;

        const at =
          mottoAt +
          0.34 +
          i * 0.06;

        /*
         * 형광펜 열림
         */
        tl.fromTo(
          box,
          {
            width: '0%',
          },
          {
            width: '100%',
            ease: 'power2.out',
            duration: 0.08,
          },
          at,
        );

        /*
         * 패딩
         */
        tl.fromTo(
          [word, inner],
          MARK_PAD_SHUT,
          {
            ...MARK_PAD_OPEN,
            ease: 'power2.out',
            duration: 0.08,
          },
          at,
        );

        /*
         * 살짝 튀어오름
         */
        tl.to(
          word,
          {
            y: -5,
            ease: 'power2.out',
            duration: 0.035,
          },
          at,
        );

        tl.to(
          word,
          {
            y: 0,
            ease: 'power2.inOut',
            duration: 0.045,
          },
          at + 0.035,
        );
      });
    };

    const mm = gsap.matchMedia();

    /* =====================================================
       DESKTOP
       ===================================================== */

    mm.add(DESKTOP, () => {
      gsap.set(panel, {
        width: '30%',
        height: '68%',
      });

      const cells = [
        introRef.current,
        paletteRef.current,
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2700',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      /*
       * 1단
       */

      tl.to(
        panel,
        {
          width: '72%',
          height: '90%',
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        headlineRef.current,
        {
          xPercent: 60,
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        cells,
        {
          yPercent: 68.75,
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        mottoRef.current,
        {
          xPercent: 150,
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      /*
       * 헤드라인
       */

      tl.to(
        text,
        {
          y: '22vh',
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        text,
        {
          yPercent: 190,
          ease: 'power1.in',
          duration: 0.35,
        },
        0.044,
      );

      /*
       * 클리핑
       */

      tl.to(
        clipRef.current,
        {
          height: '90%',
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        clipRef.current,
        {
          height: '100%',
          ease: 'none',
          duration: 0.25,
        },
        0.3,
      );

      /*
       * 2단
       */

      tl.to(
        panel,
        {
          height: '100%',
          ease: 'none',
          duration: 0.25,
        },
        0.3,
      );

      tl.to(
        cells,
        {
          yPercent: 100,
          ease: 'none',
          duration: 0.25,
        },
        0.3,
      );

      /*
       * 유성우
       */

      tl.to(
        paletteRef.current,
        {
          xPercent: -100,
          ease: 'none',
          duration: 0.37,
        },
        0.18,
      );

      /*
       * 로고
       */

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.13,
      );

      /*
       * 모토
       */

      common(tl, 0.1);
    });

    /* =====================================================
       MOBILE
       ===================================================== */

    mm.add(MOBILE, () => {
      gsap.set(panel, {
        width: '100%',
        height: '32%',
      });

      const cells = [
        introRef.current,
        paletteRef.current,
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2350',
          scrub: true,
          pin: true,

          /*
           * 중요:
           * 모바일에서는 anticipatePin을 제거한다.
           *
           * Chrome의 주소창 / 하단 네비바가
           * 움직일 때 pin 위치가 한 박자 먼저
           * 예측되어 오히려 늦게 따라오는 현상을 방지.
           */
        },
      });

      /*
       * 헤드라인
       */

      tl.to(
        text,
        {
          y: '130vh',
          ease: 'none',
          duration: 0.65,
        },
        0,
      );

      /*
       * 영상 패널
       */

      tl.to(
        panel,
        {
          height: '78%',
          ease: 'none',
          duration: 0.3,
        },
        0,
      );

      tl.to(
        panel,
        {
          height: '100%',
          ease: 'none',
          duration: 0.25,
        },
        0.3,
      );

      /*
       * 아래 칸 이동
       */

      tl.to(
        cells,
        {
          yPercent: 31.25,
          ease: 'none',
          duration: 0.066,
        },
        0.234,
      );

      tl.to(
        cells,
        {
          yPercent: 100,
          ease: 'none',
          duration: 0.25,
        },
        0.3,
      );

      /*
       * 로고 등장
       */

      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.16,
        },
        0.13,
      );

      /*
       * 모토 나오기 전에 로고 제거
       */

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          ease: 'none',
          duration: 0.07,
        },
        0.3,
      );

      /*
       * 유성우
       */

      tl.to(
        paletteRef.current,
        {
          xPercent: -100,
          ease: 'power1.in',
          duration: 0.13,
        },
        0.18,
      );

      /*
       * 모바일 모토
       */

      common(tl, 0.34);
    });

    return () => {
      mm.revert();
    };
  }, []);

  /* =======================================================
     VIDEO
     ======================================================= */

  useEffect(() => {
    const v = videoRef.current;

    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute(
      'webkit-playsinline',
      'true',
    );

    const retry = () => {
      v.play().catch(() => {});
    };

    v.play().catch(() => {
      window.addEventListener(
        'touchstart',
        retry,
        {
          once: true,
          passive: true,
        },
      );

      window.addEventListener(
        'click',
        retry,
        {
          once: true,
        },
      );
    });

    return () => {
      window.removeEventListener(
        'touchstart',
        retry,
      );

      window.removeEventListener(
        'click',
        retry,
      );
    };
  }, []);

  /* =======================================================
     JSX
     ======================================================= */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[var(--app-height)]
        overflow-hidden
        bg-[#101014]
        lg:h-screen
      "
    >
      {/* ===================================================
          GRID
          =================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        {/* =================================================
            HEADLINE
            ================================================= */}

        <div
          ref={headlineRef}
          className="
            absolute
            left-0
            top-0
            z-0
            h-full
            w-full
            overflow-hidden
            border-white/10
            bg-[#101014]
            lg:left-[30%]
            lg:w-[70%]
            lg:border-l
          "
        >
          <div
            ref={clipRef}
            className="
              absolute
              inset-x-0
              top-[32%]
              h-[36%]
              overflow-hidden
              lg:top-0
              lg:h-[68%]
            "
          >
            <div
              ref={textRef}
              className="
                absolute
                inset-x-0
                top-0
                flex
                h-[36svh]
                items-end
                p-6
                lg:h-[68vh]
                lg:p-14
              "
            >
              <div
                className="
                  max-w-3xl
                  text-[clamp(1.9rem,8vw,3.4rem)]
                  font-bold
                  leading-[0.95]
                  tracking-[-0.06em]
                  text-white
                  lg:text-[clamp(3rem,5vw,7rem)]
                "
              >
                <CharRoll
                  text="콘텐츠 그 이상의"
                  intro={0}
                  loopDelay={0}
                  className="block"
                />

                <CharRoll
                  text="가치를 만듭니다"
                  intro={0.5}
                  loopDelay={0.5}
                  className="
                    mt-2
                    block
                    text-[clamp(1.9rem,8vw,3.4rem)]
                    tracking-[-0.03em]
                    lg:text-[clamp(3rem,3vw,7rem)]
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            INTRO
            ================================================= */}

        <div
          ref={introRef}
          className="
            target-panel
            absolute
            left-0
            top-[68%]
            z-10
            h-[32%]
            w-[62%]
            overflow-hidden
            border-r
            border-t
            border-white/10
            bg-[#4338ca]
            lg:w-[30%]
          "
        >
          <div
            className="
              absolute
              inset-0
              flex
              items-end
              p-5
              lg:p-10
            "
          >
            <div className="max-w-xl">
              <h3
                className="
                  text-[clamp(1.5rem,3vw,3rem)]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                  lg:text-[clamp(1.3rem,2.3vw,3rem)]
                "
              >
                Content <br />
                beyond <br />
                expectations.
              </h3>
            </div>
          </div>
        </div>

        {/* =================================================
            PALETTE
            ================================================= */}

        <div
          ref={paletteRef}
          className="
            absolute
            left-[62%]
            top-[68%]
            z-20
            h-[32%]
            w-[38%]
            overflow-hidden
            border-t
            border-white/10
            bg-[#101018]
            lg:left-[30%]
            lg:w-[70%]
          "
        >
          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <StarTrail idPrefix="grid" />
          </div>
        </div>
      </div>

      {/* ===================================================
          VIDEO PANEL
          =================================================== */}

      <div
        ref={panelRef}
        className="
          absolute
          left-0
          top-0
          z-30
          h-[32%]
          w-full
          overflow-hidden
          bg-[#101014]
          lg:bg-[#1B1B39]
          lg:h-[68%]
          lg:w-[30%]
        "
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/main.webp"
          disablePictureInPicture
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-0
          "
        >
          <source
            src="/hero.mp4"
            type="video/mp4"
          />

          <source
            src="/hero.webm"
            type="video/webm"
          />
        </video>

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
          "
        />

        <div
          ref={contentRef}
          className="
            absolute
            inset-0
            flex
            items-center
            pl-8
            lg:pl-20
          "
        >
          <p
            className="
              text-[clamp(1.75rem,3.5vw,4rem)]
              font-bold
              leading-[0.95]
              tracking-[-0.04em]
              text-white
            "
          >
            Altisto
          </p>
        </div>
      </div>

      {/* ===================================================
          MOTTO
          =================================================== */}

      <div
        ref={mottoRef}
        className="
          absolute
          inset-y-0
          left-0
          z-30
          flex
          w-full
          flex-col
          justify-center
          gap-1
          px-6
          lg:left-[30%]
          lg:w-[28vw]
          lg:px-10
        "
      >
        {MOTTO.map((line) => (
          <p
            key={line.text}
            className={`
              ${MOTTO_CLASS[line.kind]}
              ${'gap' in line ? 'mt-6' : ''}
            `}
          >
            {renderLine(
              line.text,
              'mark' in line
                ? line.mark
                : undefined,
            )}
          </p>
        ))}
      </div>

      {/* ===================================================
          SWEEP
          =================================================== */}

      <div
        ref={sweepRef}
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          z-40
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        <StarTrail
          idPrefix="sweep"
          width={1700}
          height={1100}
        />
      </div>

      {/* ===================================================
          SCROLL
          =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-6
          right-6
          z-50
          text-[10px]
          tracking-[0.25em]
          text-white/30
        "
      >
        SCROLL
      </div>
    </section>
  );
}