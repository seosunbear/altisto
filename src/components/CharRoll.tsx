
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
   * 등장이 시작된 뒤 첫 롤링을 시작하기까지의 시간.
   * 0 이면 날아 들어오면서 함께 구른다.
   */
  delay?: number;

  /**
   * 반복 루프만 추가로 늦추는 시간.
   *
   * 줄 사이 시차는 intro 가 이미 만든다.
   * (반복도 등장 시점을 기준으로 이어지므로
   *  intro 를 0.5 차이로 주면 반복도 0.5 차이로 돈다.)
   * 여기에 값을 주면 그 위에 더해진다.
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

/* 등장과 함께 도는 첫 바퀴 시간.
   등장보다 조금 길게 잡아 글자가 멈춘 직후까지 릴이 감속하며 돌게 한다. */
const FIRST_ROLL_DURATION = 1.4;

export default function CharRoll({
  text,
  className,
  duration = 2,
  hold = 1.6,
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
     * 롤링
     * =====================================================
     *
     * 첫 바퀴는 등장과 한 몸으로 돈다. 줄이 날아 들어오는 동안
     * 글자들이 이미 구르고 있다가, 자리에 닿으면서 감속해 멈춘다.
     * (슬롯 릴이 멈춰 서는 느낌)
     *
     * 반복 루프를 그냥 등장 시점에 붙이면 안 된다. 루프의 ease 는
     * power4.inOut 이라 처음 0.6초가 거의 제자리여서, 실제로 굴러가는
     * 구간은 글자가 다 들어온 뒤에 온다. 결국 '들어온 다음 구르는'
     * 것으로 보인다. 그래서 첫 바퀴만 등장과 같은 계열의 out ease 로
     * 따로 만든다.
     *
     * 터치 기기도 똑같이 굴린다. 모바일에서 헤드라인은 핀 스크럽을
     * 따라 clip 영역 밖으로 밀려나는데, 그러면 IntersectionObserver
     * 가 타임라인을 멈춘다. 글자 14개 transform 이라 비용도 작다.
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
    const maxScatter =
      (rolls.length - 1) *
      5 *
      scatter;

    const loopDuration =
      maxScatter + duration;

    loop.to(
      {},
      {
        duration: loopDuration,
      },
      0,
    );

    /* 첫 바퀴가 시작되는 시점 */
    const firstRollAt =
      intro + delay;

    /*
     * 글자 하나씩 롤링
     */
    rolls.forEach((roll, i) => {
      const n = Number(
        roll.dataset.copies,
      );

      const to =
        STEP * (n - 1);

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

      /* 첫 바퀴 — 등장과 함께 */
      tl.fromTo(
        roll,
        {
          xPercent: 0,
        },
        {
          xPercent: to,
          duration:
            FIRST_ROLL_DURATION,
          ease: 'power3.out',
        },
        firstRollAt + start,
      );

      /* 반복 — 끝은 마지막 복제본(같은 글자)이라
         다음 바퀴가 0 으로 되돌아가도 티가 안 난다 */
      loop.fromTo(
        roll,
        {
          xPercent: 0,
        },
        {
          xPercent: to,
          duration,
          ease: 'power4.inOut',
        },
        start,
      );
    });

    /*
     * 반복은 첫 바퀴가 끝나고 hold 만큼 쉰 뒤부터.
     * 반복 루프 안의 리듬(구르기 → hold → 구르기)과 같은 간격이다.
     */
    tl.add(
      loop,
      firstRollAt +
        maxScatter +
        FIRST_ROLL_DURATION +
        hold +
        loopDelay,
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
      /* 서버 HTML 단계부터 숨겨 둔다. 안 그러면 하이드레이션 전까지
         글자가 제자리에 먼저 보였다가 사라진 뒤 날아 들어온다.
         (모션 감소 설정이면 effect 에서 바로 1 로 돌린다) */
      style={{
        opacity: 0,
      }}
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

