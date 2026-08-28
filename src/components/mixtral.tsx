'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarTrail from '@/components/StarTrail';
import CharRoll from '@/components/CharRoll';

gsap.registerPlugin(ScrollTrigger);

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

const MARK_COLOR: Record<string, string> = {
  '82억': 'bg-[#93c5fd]',
  콘텐츠: 'bg-[#c4b5fd]',
  목표: 'bg-[#fed7aa]',
  미션: 'bg-[#a5f3fc]',
};

const MARK_PAD_OPEN = {
  paddingLeft: '0.3em',
  paddingRight: '0.2em',
};

const MARK_PAD_SHUT = {
  paddingLeft: '0em',
  paddingRight: '0em',
};

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

const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023px)';

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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const text = textRef.current;

    if (!section || !panel || !text) return;

    const common = (
      tl: gsap.core.Timeline,
      mottoAt: number,
    ) => {
      gsap.set(
        [videoRef.current, contentRef.current],
        {
          opacity: 0,
        },
      );

      gsap.set(contentRef.current, {
        y: 28,
      });

      gsap.set(sweepRef.current, {
        opacity: 0,
      });

      gsap.set(text, {
        y: 0,
      });

      tl.to(
        videoRef.current,
        {
          opacity: 1,
          ease: 'none',
          duration: 0.2,
        },
        0.03,
      );

      const sweep = sweepRef.current;

      if (sweep) {
        const flash = gsap.timeline({
          paused: true,
        });

        flash
          .fromTo(
            sweep,
            { xPercent: 16 },
            {
              xPercent: -16,
              duration: 1.5,
              ease: 'none',
            },
            0,
          )
          .fromTo(
            sweep,
            { opacity: 0 },
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

      const words = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(
            mottoRef.current.querySelectorAll(
              '[data-mark]',
            ),
          )
        : [];

      words.forEach((word, i) => {
        const box =
          word.querySelector<HTMLElement>(
            '[data-hl]',
          );

        const inner =
          box?.firstElementChild as HTMLElement | null;

        const at =
          mottoAt + 0.34 + i * 0.06;

        if (box) {
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
        }

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

    /*
     * =====================================================
     * PC
     * =====================================================
     */

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

      tl.to(
        paletteRef.current,
        {
          xPercent: -100,
          ease: 'none',
          duration: 0.37,
        },
        0.18,
      );

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

      common(tl, 0.1);
    });

    /*
     * =====================================================
     * MOBILE
     * =====================================================
     */

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
          anticipatePin: 1,
        },
      });

      /*
       * -----------------------------------------------------
       * Chrome 모바일 viewport 실시간 동기화
       *
       * refresh()를 사용하지 않는다.
       *
       * refresh()는 레이아웃 전체를 다시 계산하기 때문에
       * Chrome 하단 네비게이션 바가 움직일 때 한 박자
       * 늦게 따라오는 현상이 생길 수 있다.
       *
       * visualViewport의 resize / scroll을 받아서
       * 다음 프레임에 ScrollTrigger.update()만 실행한다.
       * -----------------------------------------------------
       */

      const viewport = window.visualViewport;

      let rafId = 0;

      const syncViewport = () => {
        cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          ScrollTrigger.update();
        });
      };

      viewport?.addEventListener(
        'resize',
        syncViewport,
        { passive: true },
      );

      viewport?.addEventListener(
        'scroll',
        syncViewport,
        { passive: true },
      );

      /*
       * -----------------------------------------------------
       * 모바일 애니메이션
       * -----------------------------------------------------
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

      tl.to(
        contentRef.current,
        {
          opacity: 0,
          ease: 'none',
          duration: 0.07,
        },
        0.30,
      );

      tl.to(
        paletteRef.current,
        {
          xPercent: -100,
          ease: 'power1.in',
          duration: 0.13,
        },
        0.18,
      );

      common(tl, 0.34);

      /*
       * matchMedia가 MOBILE 조건을 해제할 때
       * visualViewport 이벤트도 같이 제거한다.
       */

      return () => {
        cancelAnimationFrame(rafId);

        viewport?.removeEventListener(
          'resize',
          syncViewport,
        );

        viewport?.removeEventListener(
          'scroll',
          syncViewport,
        );
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  /*
   * =====================================================
   * VIDEO
   * =====================================================
   */

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

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[100dvh]
        overflow-hidden
        bg-[#101014]
        lg:h-screen
        lg:min-h-0
      "
      style={{
        minHeight:
          'calc(100dvh + env(safe-area-inset-bottom))',
      }}
    >
      {/* viewport 바깥까지 항상 배경 유지 */}
      <div
        aria-hidden
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          bg-[#101014]
        "
      />

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          bg-[#101014]
        "
        style={{
          minHeight:
            'calc(100% + env(safe-area-inset-bottom))',
          paddingBottom:
            'env(safe-area-inset-bottom)',
        }}
      >
        {/* =====================================================
            헤드라인
            ===================================================== */}

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

        {/* =====================================================
            아래 왼쪽
            ===================================================== */}

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

        {/* =====================================================
            아래 오른쪽
            ===================================================== */}

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

      {/* =====================================================
          영상 패널
          ===================================================== */}

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
          lg:h-[68%]
          lg:w-[30%]
          lg:bg-[#1B1B39]
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

      {/* =====================================================
          MOTTO
          ===================================================== */}

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

      {/* =====================================================
          별 전환
          ===================================================== */}

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

      {/* =====================================================
          SCROLL
          ===================================================== */}

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

      {/* =====================================================
          모바일 하단 safe-area
          ===================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[60]
          hidden
          bg-[#101014]
          lg:hidden
        "
        style={{
          height:
            'env(safe-area-inset-bottom)',
        }}
      />
    </section>
  );
}