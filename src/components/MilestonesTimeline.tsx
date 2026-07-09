'use client';

import { useRef, useEffect } from 'react';

type MilestoneStatus = 'done' | 'current' | 'upcoming';

interface Milestone {
  year: string;
  event: string;
  status: MilestoneStatus;
  tag: string;
}

const milestones: Milestone[] = [
  { year: '2021', event: 'PYD 영상 팀 설립',    status: 'done',     tag: '시작' },
  { year: '2023', event: 'ColorfulStory 출범',  status: 'done',     tag: '개편' },
  { year: '2023', event: 'Altisto 설립',        status: 'current',  tag: '현재' },
  { year: '2026', event: '알티 베타 출시',      status: 'upcoming', tag: '예정' },
  { year: '2026', event: '리프챗 정식 론칭',    status: 'upcoming', tag: '예정' },
];

function Dot({ status }: { status: MilestoneStatus }) {
  if (status === 'current') {
    return (
      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-white/30 bg-black">
        <span className="block h-2 w-2 rounded-full bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.6)' }} />
      </span>
    );
  }
  if (status === 'upcoming') {
    return <span className="mt-1 block h-2.5 w-2.5 rounded-full border border-white/25 bg-black" />;
  }
  return <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-white/40" />;
}

export default function MilestonesTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* 행 등장(IntersectionObserver) */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rows = wrap.querySelectorAll<HTMLElement>('[data-tl-row]');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'none';
        }
      }),
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    );
    rows.forEach(r => {
      /* 숨김 초기 상태는 클라이언트에서만 적용 — SSR HTML에서는 연혁 텍스트가 보이는 상태 유지(SEO) */
      r.style.opacity = '0';
      r.style.transform = 'translateY(24px)';
      io.observe(r);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-screen-xl">

        {/* 헤더 */}
        <div className="mb-16 text-center md:mb-20">
          {/* 장식용 영문 라벨 — 스니펫 오염 방지 */}
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40" aria-hidden="true">
            <span data-nosnippet>History</span>
          </p>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold tracking-tight text-white">
            우리가 걸어온 길
          </h2>
        </div>

        {/* 타임라인 */}
        <div ref={wrapRef} className="relative mx-auto max-w-2xl">
          {/* 세로 라인 */}
          <div aria-hidden className="absolute bottom-2 left-[8px] top-2 w-px bg-white/10" />

          <ol className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isUpcoming = m.status === 'upcoming';
              return (
                <li
                  key={`${m.year}-${i}`}
                  data-tl-row
                  className="relative pl-12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="absolute left-0 top-1">
                    <Dot status={m.status} />
                  </span>

                  <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className={`text-[15px] font-bold tabular-nums tracking-tight ${isUpcoming ? 'text-white/40' : 'text-white'}`}>
                      {m.year}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      m.status === 'current'
                        ? 'border-white/30 bg-white/5 text-white'
                        : 'border-white/10 text-white/40'
                    }`}>
                      {m.tag}
                    </span>
                  </div>

                  <h3 className={`text-[15px] font-semibold tracking-tight ${isUpcoming ? 'text-white/45' : 'text-white/90'}`}>
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
