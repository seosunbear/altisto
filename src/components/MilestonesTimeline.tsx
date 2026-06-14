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

/* 모노톤 — 정제된 실버/플래티넘 계열 */
const MONO = '#d4d7de';

/* ── 스타일 (키프레임 + 세로 타임라인 레이아웃) ─────────────── */
const STYLES = `
  @keyframes tl-pulse {
    0%   { box-shadow: 0 0 0 0   rgba(255,255,255,0.45), 0 0 10px rgba(255,255,255,0.5); }
    60%  { box-shadow: 0 0 0 10px rgba(255,255,255,0),    0 0 24px rgba(255,255,255,0.8);  }
    100% { box-shadow: 0 0 0 0   rgba(255,255,255,0),     0 0 10px rgba(255,255,255,0.5);  }
  }
  @keyframes tl-glow-breathe {
    0%, 100% { opacity: 0.7; transform: scale(0.9) rotate(0deg); }
    50%      { opacity: 1;   transform: scale(1.15) rotate(45deg); }
  }

  .tl-wrap   { position: relative; max-width: 820px; margin: 0 auto; padding: 40px 24px 80px; }

  /* 중앙 라인 + 진행선 + 이동 빛 */
  .tl-axis   { position: absolute; top: 40px; bottom: 80px; left: 50%; width: 2px; transform: translateX(-50%);
               background: rgba(255,255,255,0.08); border-radius: 2px; }
  .tl-fill   { position: absolute; top: 0; left: 0; width: 100%; height: 0;
               background: linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(212,215,222,0.5) 60%, rgba(255,255,255,0.18));
               border-radius: 2px; box-shadow: 0 0 10px rgba(255,255,255,0.25); will-change: height; }
  .tl-glow   { position: absolute; z-index: 5; left: 50%; top: 40px; transform: translate(-50%, -50%);
               display: flex; align-items: center; justify-content: center;
               will-change: top, opacity; opacity: 0; transition: opacity 200ms ease; }
  .tl-glow .head { width: 20px; height: 20px; background: #fff;
               clip-path: polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
               filter: drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 12px rgba(255,255,255,0.55));
               animation: tl-glow-breathe 2.4s ease-in-out infinite; }
  .tl-glow .tail { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
               width: 2px; height: 60px; border-radius: 2px;
               background: linear-gradient(to top, rgba(255,255,255,0.55), rgba(255,255,255,0)); }
  /* 별 뒤 진행선을 가려 별을 뚫지 않도록 */
  .tl-glow .mask { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
               width: 16px; height: 16px; border-radius: 50%; background: #0a0a0f; }

  /* 행 */
  .tl-row    { position: relative; display: grid; grid-template-columns: 1fr 1fr; column-gap: 56px;
               padding-bottom: 60px; opacity: 0; transform: translateY(30px);
               transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .tl-row.tl-in { opacity: 1; transform: none; }
  .tl-row:last-child { padding-bottom: 0; }

  .tl-card   { display: flex; flex-direction: column; gap: 8px; }
  .tl-row[data-side="left"]  .tl-card { grid-column: 1; align-items: flex-end; text-align: right; }
  .tl-row[data-side="right"] .tl-card { grid-column: 2; align-items: flex-start; text-align: left; }

  /* 도트 */
  .tl-dot    { position: absolute; left: 50%; top: 4px; transform: translateX(-50%); z-index: 2; }

  @media (max-width: 768px) {
    .tl-axis, .tl-fill { left: 9px; }
    .tl-glow  { left: 9px; }
    .tl-row   { grid-template-columns: 1fr; padding-left: 40px; }
    .tl-dot   { left: 9px; }
    .tl-row .tl-card { grid-column: 1 !important; align-items: flex-start !important; text-align: left !important; }
  }
`;

/* ── 도트 ─────────────────────────────── */
function Dot({ status, color }: { status: MilestoneStatus; color: string }) {
  if (status === 'current') {
    return (
      <span className="grid place-items-center rounded-full"
        style={{ width: 20, height: 20, border: `1px solid ${color}66`, background: '#0a0a0f' }}>
        <span className="block rounded-full"
          style={{ width: 9, height: 9, background: color, animation: 'tl-pulse 2.4s ease-in-out infinite' }} />
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span className="block rounded-full"
        style={{ width: 10, height: 10, border: '1px solid rgba(255,255,255,0.3)', background: '#0a0a0f' }} />
    );
  }
  return (
    <span className="grid place-items-center rounded-full"
      style={{ width: 18, height: 18, border: `1px solid ${color}33`, background: '#0a0a0f' }}>
      <span className="block rounded-full"
        style={{ width: 8, height: 8, background: color, boxShadow: `0 0 6px ${color}99` }} />
    </span>
  );
}

/* ── 카드 ─────────────────────────────── */
function Card({ m, color }: { m: Milestone; color: string }) {
  const isUpcoming = m.status === 'upcoming';
  const yearColor  = isUpcoming ? 'rgba(255,255,255,0.4)' : color;
  const titleColor = isUpcoming ? 'rgba(255,255,255,0.55)' : '#ffffff';
  const descColor  = isUpcoming ? 'rgba(255,255,255,0.4)'  : 'rgba(255,255,255,0.68)';

  return (
    <div className="tl-card">
      {/* 연도 · 월 · 태그 */}
      <div className="tl-meta flex items-baseline gap-2.5">
        <span className="font-light tabular-nums leading-none"
          style={{ fontSize: '1.5rem', letterSpacing: '-0.03em', color: yearColor }}>
          {m.year}
        </span>
        <span className="text-[9px] uppercase tracking-[0.28em]"
          style={{ color: isUpcoming ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.45)' }}>
          {m.sub}
        </span>
      </div>

      <span className="tl-tag text-[9px] uppercase tracking-[0.3em] font-medium"
        style={{ color: isUpcoming ? 'rgba(255,255,255,0.35)' : color }}>
        {m.tag}
      </span>

      <h3 className="font-medium leading-snug"
        style={{ fontSize: '14px', letterSpacing: '-0.01em', color: titleColor }}>
        {m.event}
      </h3>

      <p className="leading-relaxed max-w-[280px]"
        style={{ fontSize: '11px', color: descColor }}>
        {m.desc}
      </p>
    </div>
  );
}

/* ── 메인 컴포넌트 ─────────────────────────────── */
export default function MilestonesTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const fillRef   = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);

  /* ── 파티클 캔버스 (배경) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawStar = (x: number, y: number, r: number) => {
      const inner = r * 0.22;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) - Math.PI / 2;
        const rad   = i % 2 === 0 ? r : inner;
        const px    = x + rad * Math.cos(angle);
        const py    = y + rad * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    };

    const COLORS = ['#ffffff','#d4d7de','#b9bdc7','#e8eaf0','#a8acb6'];
    type P = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; t: number; T: number; color: string };
    const mkP = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.4 + 0.18,
      t: Math.floor(Math.random() * 300),
      T: Math.floor(Math.random() * 280 + 200),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
    const pts: P[] = Array.from({ length: 55 }, mkP);

    let live = true;
    const tick = () => {
      if (!live) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.t++;
        if (p.y < -8) Object.assign(p, mkP(), { y: canvas.height + 8, t: 0 });
        else if (p.t >= p.T) Object.assign(p, mkP(), { t: 0 });
        const a = p.alpha * Math.sin((p.t / p.T) * Math.PI);
        if (a <= 0.01) continue;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        drawStar(p.x, p.y, p.r);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    };
    tick();
    return () => { live = false; window.removeEventListener('resize', resize); };
  }, []);

  /* ── 행 등장(IntersectionObserver) ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rows = wrap.querySelectorAll<HTMLElement>('.tl-row');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('tl-in'); }),
      { threshold: 0.25, rootMargin: '0px 0px -12% 0px' },
    );
    rows.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, []);

  /* ── 스크롤에 따라 차오르는 진행선 + 이동 빛 ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    const glow = glowRef.current;
    if (!wrap || !fill || !glow) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect   = wrap.getBoundingClientRect();
        const total  = rect.height;
        const anchor = window.innerHeight * 0.52;            // 화면 중앙 살짝 위 기준
        const passed = anchor - rect.top;
        const p      = Math.max(0, Math.min(1, passed / total));
        const px     = p * total;

        fill.style.height = `${px}px`;
        glow.style.top    = `${px}px`;
        glow.style.opacity = p > 0.002 && p < 0.998 ? '1' : '0';
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <style>{STYLES}</style>

      {/* 파티클 캔버스 */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />

      {/* HISTORY 헤더 */}
      <div className="relative z-10 pt-24 pb-16 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em]"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          History
        </span>
        <h2 className="mt-3 text-2xl md:text-3xl font-black"
          style={{ color: '#fff', letterSpacing: '-0.03em' }}>
          우리가 걸어온 길
        </h2>
      </div>

      {/* 타임라인 */}
      <div ref={wrapRef} className="tl-wrap relative z-10">
        <div className="tl-axis">
          <div ref={fillRef} className="tl-fill" />
        </div>
        <div ref={glowRef} className="tl-glow">
          <div className="tail" />
          <div className="mask" />
          <div className="head" />
        </div>

        {milestones.map((m, i) => {
          const color = m.status === 'current' ? '#ffffff' : MONO;
          const side  = i % 2 === 0 ? 'left' : 'right';
          return (
            <div key={`${m.year}-${i}`} className="tl-row" data-side={side}>
              <div className="tl-dot"><Dot status={m.status} color={color} /></div>
              <Card m={m} color={color} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
