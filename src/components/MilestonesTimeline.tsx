'use client';

import { useRef, useEffect } from 'react';

type MilestoneStatus = 'done' | 'current' | 'upcoming';

interface Milestone {
  year: string;
  sub: string;
  event: string;
  desc: string;
  status: MilestoneStatus;
  tag: string;
}

const milestones: Milestone[] = [
  { year: '2021', sub: 'March',  event: 'PYD 영상 팀 설립',    desc: '영상 크리에이터 팀으로 첫발을 내딛으며 콘텐츠 제작의 씨앗을 심었습니다.',       status: 'done',     tag: '시작' },
  { year: '2023', sub: 'March',  event: 'PYD 커뮤니티 전환',   desc: '영상 팀을 넘어 누구나 참여할 수 있는 커뮤니티 플랫폼으로 성격을 확장했습니다.', status: 'done',     tag: '확장' },
  { year: '2023', sub: 'July',   event: '커뮤니티 폐쇄',       desc: '더 나은 방향성을 찾기 위한 전략적 전환점.',                                     status: 'done',     tag: '전환' },
  { year: '2023', sub: 'August', event: 'ColorfulStory 출범',  desc: '팀명을 ColorfulStory로 변경하고 조직 구조와 비전을 전면 개편했습니다.',           status: 'done',     tag: '개편' },
  { year: '2023', sub: 'March',  event: 'Altisto 설립',        desc: '알티스토라는 새로운 이름과 함께 더 큰 꿈을 향해 팀을 새롭게 출범했습니다.',       status: 'current',  tag: '현재' },
  { year: '2026', sub: 'TBA',    event: '알티 베타 출시',      desc: '알티 플랫폼의 베타 버전을 세상에 공개합니다.',                                   status: 'upcoming', tag: '예정' },
  { year: '2026', sub: 'TBA',    event: '리프챗 정식 론칭',    desc: '리프챗 서비스를 정식 출시합니다.',                                               status: 'upcoming', tag: '예정' },
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
    rows.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-screen-xl">

        {/* 헤더 */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
            History
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
                  style={{ opacity: 0, transform: 'translateY(24px)' }}
                >
                  <span className="absolute left-0 top-1">
                    <Dot status={m.status} />
                  </span>

                  <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className={`text-[15px] font-bold tabular-nums tracking-tight ${isUpcoming ? 'text-white/40' : 'text-white'}`}>
                      {m.year}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {m.sub}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      m.status === 'current'
                        ? 'border-white/30 bg-white/5 text-white'
                        : 'border-white/10 text-white/40'
                    }`}>
                      {m.tag}
                    </span>
                  </div>

                  <h3 className={`mb-1 text-[15px] font-semibold tracking-tight ${isUpcoming ? 'text-white/45' : 'text-white/90'}`}>
                    {m.event}
                  </h3>
                  <p className={`max-w-md text-[13px] leading-[1.7] ${isUpcoming ? 'text-white/30' : 'text-white/55'}`}>
                    {m.desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}
