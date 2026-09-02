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
     VIEWPORT / SCROLLTRIGGER 안정화

     iOS 사파리는 스크롤 도중 주소창·하단 툴바가 접히고 펴지면서
     visualViewport.height 와 innerHeight 를 계속 바꾼다.
     예전 구현은 그 값을 --app-height 에 그대로 흘려보내고
     visualViewport 의 scroll 이벤트마다 ScrollTrigger.refresh() 까지
     불렀는데, 핀(pin)이 걸린 섹션에서 refresh() 는 스크롤 위치를
     다시 잡기 때문에

       스크롤 → 툴바 이동 → 높이 변경 → refresh → 스크롤 점프
       → 툴바 다시 이동 → ...

     하는 되먹임이 생겨 화면이 위아래로 튄다.
     그래서 높이는 CSS 의 svh(툴바 상태와 무관하게 고정) 에 맡기고,
     여기서는 방향 전환처럼 '진짜' 뷰포트가 바뀔 때만 갱신한다.
     ======================================================= */

  useEffect(() => {
    /* 툴바가 오르내리는 정도의 자잘한 리사이즈는 GSAP 내부에서도 무시 */
    ScrollTrigger.config({ ignoreMobileResize: true });

    let timer = 0;
    let lastWidth = window.innerWidth;

    const onOrientationChange = () => {
      window.clearTimeout(timer);

      /* 방향 전환 직후엔 레이아웃이 아직 확정되지 않아 한 박자 늦춘다 */
      timer = window.setTimeout(() => {
        lastWidth = window.innerWidth;
        ScrollTrigger.refresh();
      }, 250);
    };

    const onResize = () => {
      /* 가로 폭이 바뀐 경우만 진짜 레이아웃 변화로 본다.
         세로 폭만 변한 것은 iOS 주소창이 움직인 것이므로 무시. */
      if (window.innerWidth === lastWidth) return;
      onOrientationChange();
    };

    window.addEventListener('orientationchange', onOrientationChange);
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('orientationchange', onOrientationChange);
      window.removeEventListener('resize', onResize);
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

    /* 인앱 웹뷰(카카오·인스타 등)에서 쓰는 벤더 힌트 */
    v.setAttribute('x5-playsinline', 'true');
    v.setAttribute('x-webkit-airplay', 'deny');
    v.setAttribute('controls', 'false');
    v.removeAttribute('controls');
    v.controls = false;

    /*
     * 최후의 안전장치.
     * 위 속성을 다 붙여도 iOS 가 네이티브 전체화면 플레이어로
     * 넘어가는 경우(구형 웹뷰·저전력 모드 복귀 등)가 있는데,
     * 배경 영상이므로 전체화면이 열리는 즉시 되돌린다.
     */
    type IosVideo = HTMLVideoElement & {
      webkitExitFullscreen?: () => void;
    };

    const escapeFullscreen = () => {
      const iv = v as IosVideo;

      if (typeof iv.webkitExitFullscreen === 'function') {
        iv.webkitExitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };

    v.addEventListener(
      'webkitbeginfullscreen',
      escapeFullscreen,
    );

    const retry = () => {
      v.play().catch(() => {});
    };

    /*
     * iOS 는 화면 밖이거나 투명한 영상, 백그라운드로 갔다 온 탭의 영상을
     * 임의로 멈춘다. 배경 영상은 항상 돌아가야 하므로 멈추면 다시 건다.
     * 재생이 정책상 막힌 상태면 play() 가 reject 되고 그냥 끝난다.
     */
    const keepPlaying = () => {
      if (v.ended) return;
      v.play().catch(() => {});
    };

    v.addEventListener('pause', keepPlaying);
    document.addEventListener('visibilitychange', keepPlaying);

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
      v.removeEventListener(
        'webkitbeginfullscreen',
        escapeFullscreen,
      );

      v.removeEventListener('pause', keepPlaying);

      document.removeEventListener(
        'visibilitychange',
        keepPlaying,
      );

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
                creating <br />
                value <br />
                beyond 
                content
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
          controls={false}
          preload="auto"
          poster="/main.webp"
          disablePictureInPicture
          disableRemotePlayback
          /* 배경 장식이므로 포커스·낭독 대상에서 제외한다.
             탭이 닿아 네이티브 플레이어가 열릴 여지도 함께 없앤다. */
          aria-hidden
          tabIndex={-1}
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