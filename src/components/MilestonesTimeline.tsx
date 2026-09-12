'use client';

import { useRef, useEffect, useState } from 'react';
import GsapReveal from './GsapReveal';
import StarTrail from './StarTrail';

type MilestoneStatus = 'done' | 'current' | 'upcoming';

/* 연도와 상태만 여기 둔다. 사건·태그 문구는 언어별 사전의
   home.history 가 같은 순서로 들고 있다. */
const milestones: { year: string; status: MilestoneStatus }[] = [
  { year: '2021', status: 'done' },
  { year: '2023', status: 'done' },
  { year: '2023', status: 'current' },
  { year: '2026', status: 'upcoming' },
  { year: '2026', status: 'upcoming' },
];

interface MilestonesTimelineProps {
  t: { subtitle: string; events: string[]; tags: string[] };
}

function Dot({ status }: { status: MilestoneStatus }) {
  if (status === 'current') {
    return (
      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-white/30 bg-[#0a0a0f]">
        <span
          className="block h-2 w-2 rounded-full bg-white"
          style={{
            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
          }}
        />
      </span>
    );
  }

  if (status === 'upcoming') {
    return (
      <span className="block h-2.5 w-2.5 rounded-full border border-white/25 bg-[#0a0a0f]" />
    );
  }

  return (
    <span className="block h-2.5 w-2.5 rounded-full bg-white/40" />
  );
}

export default function MilestonesTimeline({ t }: MilestonesTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  /* 유성우가 섹션 전체에 퍼지도록 섹션 크기를 잰다.
     서버 렌더에선 잴 수 없어 PC 기준값으로 시작한다(첫 화면 밖이라 바뀌는 게 안 보인다). */
  const [area, setArea] = useState({ w: 1440, h: 950 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ro = new ResizeObserver(() => {
      const w = section.offsetWidth;
      const h = section.offsetHeight;
      setArea(prev => (prev.w === w && prev.h === h ? prev : { w, h }));
    });

    ro.observe(section);
    return () => ro.disconnect();
  }, []);

  /* 유성우 SMIL 은 화면 밖에서도 메인 스레드에서 계속 돈다.
     섹션이 보일 때만 움직이게 한다. */
  useEffect(() => {
    const svg = starsRef.current?.querySelector('svg');
    if (!svg) return;

    svg.pauseAnimations();

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });

    io.observe(svg);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rows = wrap.querySelectorAll<HTMLElement>('[data-tl-row]');

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;

          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';

          io.unobserve(el);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    rows.forEach(row => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(24px)';
      io.observe(row);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0f] px-6 py-28 md:px-10 md:py-40">

      {/* 유성우 — 섹션 전체에서 아래→위로 올라간다.
          StarTrail 은 오른쪽→왼쪽으로 날아가므로 시계 방향 90도 돌린다.
          돌리면 가로·세로가 바뀌어서 width 가 세로 이동 거리,
          height 가 가로로 퍼지는 폭이 된다.
          세로 이동 거리는 섹션 높이의 1.1배라 별이 바닥 아래에서 나와 천장 위로 빠진다.
          가로 폭은 섹션 폭의 1.15배라 다섯 갈래가 양 끝까지 고르게 퍼진다. */}
      <div
        ref={starsRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="shrink-0 rotate-90">
          <StarTrail
            idPrefix="history"
            width={Math.round(area.h * 1.1)}
            height={Math.round(area.w * 1.15)}
            starScale={0.55}
            durationScale={2}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-screen-xl">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl">
          <GsapReveal staggerWords staggerEach={0.06} className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.3] text-white">
            history<span className="text-[#4338ca]">.</span><br />
            {t.subtitle}
          </GsapReveal>

        </div>

        {/* Timeline */}
        <div
          ref={wrapRef}
          className="relative mx-auto max-w-2xl"
        >
          {/* Timeline line */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[9px] top-0 w-px bg-white/10"
          />

          <ol className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isUpcoming = m.status === 'upcoming';

              return (
                <li
                  key={`${m.year}-${i}`}
                  data-tl-row
                  className="
                    relative
                    pl-10
                    opacity-100
                    transition-[opacity,transform]
                    duration-700
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                  "
                >
                  {/* Dot */}
                  <span
                    className="
                      absolute
                      left-0
                      top-[2px]
                      z-10
                      flex
                      h-[18px]
                      w-[18px]
                      items-center
                      justify-center
                    "
                  >
                    <Dot status={m.status} />
                  </span>

                  {/* Year / Tag */}
                  <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className={`
                        text-[15px]
                        font-bold
                        tabular-nums
                        tracking-tight
                        ${
                          isUpcoming
                            ? 'text-white/40'
                            : 'text-white'
                        }
                      `}
                    >
                      {m.year}
                    </span>

                    <span
                      className={`
                        rounded-full
                        border
                        px-2
                        py-0.5
                        text-[10px]
                        font-medium
                        ${
                          m.status === 'current'
                            ? 'border-white/30 bg-white/5 text-white'
                            : 'border-white/10 text-white/40'
                        }
                      `}
                    >
                      {t.tags[i]}
                    </span>
                  </div>

                  {/* Event */}
                  <h3
                    className={`
                      text-[15px]
                      font-semibold
                      tracking-tight
                      ${
                        isUpcoming
                          ? 'text-white/45'
                          : 'text-white/90'
                      }
                    `}
                  >
                    {t.events[i]}
                  </h3>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}