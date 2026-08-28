
'use client';

import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CharRollProps {
  /** 굴릴 한 줄 */
  text: string;

  /** 외부 클래스 */
  className?: string;

  /** 한 바퀴 구르는 시간 */
  duration?: number;

  /** 한 바퀴 후 다음 바퀴까지 쉬는 시간 */
  hold?: number;

  /** 글자 사이 시차 */
  scatter?: number;

  /** 처음 등장하는 시간 */
  intro?: number;

  /**
   * 처음 등장한 뒤 첫 롤링을 시작하기까지의 시간
   */
  delay?: number;

  /**
   * 반복 루프 자체의 시작 지연.
   *
   * 예:
   * 첫 번째 줄 = 0
   * 두 번째 줄 = 0.2
   *
   * 그러면 매 반복마다
   * 첫 번째 줄 → 0.2초 → 두 번째 줄
   */
  loopDelay?: number;
}

/* 글자마다 복제본 개수 */
const copiesAt = (i: number) => (i % 4 === 2 ? 3 : 2);

/* 복제본 사이 거리 */
const STEP = 140;

/* 글자가 잘리지 않도록 여유 */
const BLEED_Y = '0.12em';
const BLEED_X = '0.04em';

/* 처음 등장하는 시간 */
const INTRO_DURATION = 1.1;

export default function CharRoll({
  text,
  className,
  duration = 2,
  hold = 2.4,
  scatter = 0.012,
  intro = 0,
  delay = 0,
  loopDelay = 0,
}: CharRollProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    /*
     * 모션 감소 설정
     */
    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
    ) {
      gsap.set(el, {
        opacity: 1,
        x: 0,
      });

      return;
    }

    /*
     * 각 글자의 롤링 컨테이너
     */
    const rolls =
      gsap.utils.toArray<HTMLElement>(
        el.querySelectorAll('[data-roll]'),
      );

    if (!rolls.length) return;

    /*
     * =====================================================
     * 메인 타임라인
     * =====================================================
     */
    const tl = gsap.timeline({
      paused: true,
    });

    /*
     * =====================================================
     * 처음 등장 위치
     *
     * 오른쪽 → 왼쪽
     * =====================================================
     */

    const parent =
      el.parentElement?.getBoundingClientRect();

    const rect =
      el.getBoundingClientRect();

    const off = parent
      ? parent.right - rect.left + 40
      : window.innerWidth + 40;

    /*
     * 등장하기 전에는 완전히 숨김
     */
    gsap.set(el, {
      x: off,
      opacity: 0,
    });

    /*
     * =====================================================
     * 처음 등장
     * =====================================================
     *
     * intro = 0
     *   첫 번째 줄 즉시 등장
     *
     * intro = 0.5
     *   두 번째 줄 0.5초 후 등장
     */
    tl.to(
      el,
      {
        x: 0,
        opacity: 1,
        duration: INTRO_DURATION,
        ease: 'power4.out',
      },
      intro,
    );

    /*
     * =====================================================
     * 반복 롤링
     * =====================================================
     */

    const loop =
      gsap.timeline({
        repeat: -1,
        repeatDelay: hold,
      });

    /*
     * 랜덤 시차와 상관없이
     * 한 바퀴 길이는 고정
     */
    const loopDuration =
      (rolls.length - 1) *
        5 *
        scatter +
      duration;

    loop.to(
      {},
      {
        duration: loopDuration,
      },
      0,
    );

    /*
     * 글자 하나씩 롤링
     */
    rolls.forEach((roll, i) => {
      const n = Number(
        roll.dataset.copies,
      );

      /*
       * 오른쪽 글자부터 시작해서
       * 왼쪽으로 번진다.
       */
      const start =
        (rolls.length - 1 - i) *
        (1 +
          Math.floor(
            Math.random() * 5,
          )) *
        scatter;

      loop.fromTo(
        roll,
        {
          xPercent: 0,
        },
        {
          xPercent:
            STEP * (n - 1),
          duration,
          ease: 'power4.inOut',
        },
        start,
      );
    });

    /*
     * =====================================================
     * 반복 롤링 시작 위치
     * =====================================================
     *
     * delay:
     *   처음 등장 후 롤링 시작까지 기다림
     *
     * loopDelay:
     *   두 번째 줄 자체를 늦춤
     *
     * 따라서:
     *
     * 첫 번째
     * 0초
     *
     * 두 번째
     * 0.2초
     */
    tl.add(
      loop,
      delay + loopDelay,
    );

    /*
     * =====================================================
     * IntersectionObserver
     * =====================================================
     */

    const io =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
          } else {
            tl.pause();
          }
        },
        {
          threshold: 0,
        },
      );

    io.observe(el);

    return () => {
      io.disconnect();
      tl.kill();
    };
  }, [
    duration,
    hold,
    scatter,
    intro,
    delay,
    loopDelay,
  ]);

  /*
   * 단어 기준으로 분리
   */
  const words = text.split(' ');

  let charIndex = 0;

  return (
    <span
      ref={ref}
      className={className}
    >
      {/* 스크린리더용 원문 */}
      <span className="sr-only">
        {text}
      </span>

      {/* 실제 애니메이션 */}
      <span
        aria-hidden="true"
        style={{
          display: 'block',
        }}
      >
        {words.map(
          (word, wi) => (
            <Fragment key={wi}>
              <span
                style={{
                  display:
                    'inline-block',
                  whiteSpace:
                    'nowrap',
                }}
              >
                {Array.from(word).map(
                  (ch) => {
                    const currentIndex =
                      charIndex++;

                    const n =
                      copiesAt(
                        currentIndex,
                      );

                    return (
                      <span
                        key={
                          currentIndex
                        }
                        style={{
                          display:
                            'inline-block',

                          verticalAlign:
                            'top',

                          overflow:
                            'hidden',

                          boxSizing:
                            'content-box',

                          height: '1lh',

                          paddingBlock:
                            BLEED_Y,

                          marginBlock:
                            `-${BLEED_Y}`,

                          paddingInline:
                            BLEED_X,

                          marginInline:
                            `-${BLEED_X}`,
                        }}
                      >
                        <span
                          data-roll
                          data-copies={n}
                          style={{
                            display:
                              'block',

                            position:
                              'relative',
                          }}
                        >
                          {/* 현재 글자 */}
                          <span
                            style={{
                              display:
                                'block',

                              height:
                                '1lh',

                              whiteSpace:
                                'nowrap',
                            }}
                          >
                            {ch}
                          </span>

                          {/* 복제 글자 */}
                          {Array.from(
                            {
                              length:
                                n - 1,
                            },
                            (_, k) => (
                              <span
                                key={k}
                                style={{
                                  position:
                                    'absolute',

                                  top: 0,

                                  right:
                                    `${
                                      STEP *
                                      (k +
                                        1)
                                    }%`,

                                  height:
                                    '1lh',

                                  whiteSpace:
                                    'nowrap',
                                }}
                              >
                                {ch}
                              </span>
                            ),
                          )}
                        </span>
                      </span>
                    );
                  },
                )}
              </span>

              {wi <
                words.length -
                  1 &&
                ' '}
            </Fragment>
          ),
        )}
      </span>
    </span>
  );
}

