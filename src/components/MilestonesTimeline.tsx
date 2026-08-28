'use client';

import { useRef, useEffect } from 'react';
import SectionLabel from '@/components/SectionLabel';

type MilestoneStatus = 'done' | 'current' | 'upcoming';

interface Milestone {
  year: string;
  event: string;
  status: MilestoneStatus;
  tag: string;
}

const milestones: Milestone[] = [
  { year: '2021', event: 'PYD 영상 팀 설립', status: 'done', tag: '시작' },
  { year: '2023', event: 'ColorfulStory 출범', status: 'done', tag: '개편' },
  { year: '2023', event: 'Altisto 설립', status: 'current', tag: '현재' },
  { year: '2026', event: '알티 베타 출시', status: 'upcoming', tag: '예정' },
  { year: '2026', event: '리프챗 정식 론칭', status: 'upcoming', tag: '예정' },
];

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

export default function MilestonesTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);

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
    <section className="relative overflow-hidden bg-[#0a0a0f] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-screen-xl">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl">
          <SectionLabel className="mb-6">
            history
          </SectionLabel>

          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight text-white">
            우리가 걸어온 길
          </h2>
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
                      {m.tag}
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
                    {m.event}
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