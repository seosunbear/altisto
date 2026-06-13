'use client';

import { useRef, useEffect } from 'react';

type MilestoneStatus = 'done' | 'current' | 'upcoming';

interface Milestone {
  year: string;
  sub: string;
  event: string;
  desc: string;
  status: MilestoneStatus;
  emoji: string;
  tag: string;
}

const milestones: Milestone[] = [
  { year: '2021', sub: 'March',  event: 'PYD 영상 팀 설립',    desc: '영상 크리에이터 팀으로 첫발을 내딛으며 콘텐츠 제작의 씨앗을 심었습니다.',       status: 'done',     emoji: '🎬', tag: '시작' },
  { year: '2023', sub: 'March',  event: 'PYD 커뮤니티 전환',   desc: '영상 팀을 넘어 누구나 참여할 수 있는 커뮤니티 플랫폼으로 성격을 확장했습니다.', status: 'done',     emoji: '🤝', tag: '확장' },
  { year: '2023', sub: 'July',   event: '커뮤니티 폐쇄',       desc: '더 나은 방향성을 찾기 위한 전략적 전환점.',                                     status: 'done',     emoji: '🔄', tag: '전환' },
  { year: '2023', sub: 'August', event: 'ColorfulStory 출범',  desc: '팀명을 ColorfulStory로 변경하고 조직 구조와 비전을 전면 개편했습니다.',           status: 'done',     emoji: '🌈', tag: '개편' },
  { year: '2025', sub: 'March',  event: 'Altisto 설립',        desc: '알티스토라는 새로운 이름과 함께 더 큰 꿈을 향해 팀을 새롭게 출범했습니다.',       status: 'current',  emoji: '🚀', tag: '현재' },
  { year: '2026', sub: 'TBA',    event: '알티 베타 출시',      desc: '알티 플랫폼의 베타 버전을 세상에 공개합니다.',                                   status: 'upcoming', emoji: '⭐', tag: '예정' },
  { year: '2026', sub: 'TBA',    event: '리프챗 정식 론칭',    desc: '리프챗 서비스를 정식 출시합니다.',                                               status: 'upcoming', emoji: '💬', tag: '예정' },
];

/* ── CSS 키프레임 ─────────────────────────────── */
const KEYFRAMES = `
  @keyframes tl-pulse {
    0%   { box-shadow: 0 0 0 0   rgba(96,165,250,0.6), 0 0 12px rgba(96,165,250,0.7); }
    60%  { box-shadow: 0 0 0 11px rgba(96,165,250,0),  0 0 28px rgba(96,165,250,1);   }
    100% { box-shadow: 0 0 0 0   rgba(96,165,250,0),   0 0 12px rgba(96,165,250,0.7); }
  }
  @keyframes tl-scan-flicker {
    0%, 100% { opacity: 0.25; }
    40%  { opacity: 0.7; }
    55%  { opacity: 0.4; }
    70%  { opacity: 0.75; }
  }
  @keyframes tl-line-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 1200px 0; }
  }
  @keyframes tl-dot-appear {
    from { transform: scale(0) rotate(45deg); opacity: 0; }
    to   { transform: scale(1) rotate(45deg); opacity: 1; }
  }
`;

/* ── 개별 마일스톤 컬럼 ────────────────────────── */
const RAINBOW = ['#9b8ef5','#6fa8f5','#f0a265','#cc82e8','#5fcc92','#e8837f','#e8c84a'];

function MilestoneItem({
  m, index, isFirst, isLast, isAbove,
}: {
  m: Milestone; index: number; isFirst: boolean; isLast: boolean; isAbove: boolean;
}) {
  const isCurrent = m.status === 'current';
  const isUpcoming = m.status === 'upcoming';

  const rainbow    = RAINBOW[index % RAINBOW.length];
  const yearColor  = isUpcoming ? 'rgba(0,0,0,0.35)' : rainbow;
  const subColor   = isUpcoming ? 'rgba(0,0,0,0.3)'  : `${rainbow}99`;
  const connColor  = isUpcoming ? 'rgba(0,0,0,0.2)'  : `${rainbow}55`;
  const lineColor  = isUpcoming ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.35)';
  const titleColor = isUpcoming ? 'rgba(0,0,0,0.45)' : '#0d1117';
  const descColor  = isUpcoming ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.65)';

  /* 연도 */
  const YearLabel = (
    <div className="flex flex-col items-center gap-[3px]">
      <span className="font-black tabular-nums leading-none"
        style={{ fontSize: '1.1rem', letterSpacing: '-0.04em', color: yearColor }}>
        {m.year}
      </span>
      <span className="text-[7px] uppercase tracking-[0.22em]" style={{ color: subColor }}>
        {m.sub}
      </span>
    </div>
  );

  /* 텍스트 블록 */
  const TextBlock = (
    <div className="flex flex-col items-center gap-[5px] w-[188px] text-center">
      <p className="font-semibold leading-[1.4]" style={{ fontSize: '16px', color: titleColor }}>
        {m.event}
      </p>
      <p className="leading-[1.7]" style={{ fontSize: '9.5px', color: descColor }}>
        {m.desc}
      </p>
    </div>
  );

  /* 연결선 */
  const Conn = ({ h, dir }: { h: string; dir: 'down' | 'up' | 'solid' }) => (
    <div className="w-px shrink-0 relative" style={{
      height: h,
      background:
        dir === 'down'  ? `linear-gradient(to bottom, ${connColor}, transparent)` :
        dir === 'up'    ? `linear-gradient(to top,    ${connColor}, transparent)` :
        connColor,
    }}>
      {/* 중간 작은 다이아몬드 장식 */}
      {dir === 'solid' && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '4px', height: '4px',
            background: connColor,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            animation: 'tl-dot-appear 0.4s ease both',
          }} />
      )}
    </div>
  );

  /* 도트 */
  const Dot = isCurrent ? (
    <div className="relative z-10 rounded-full border-2 shrink-0"
      style={{
        width: '14px', height: '14px',
        borderColor: rainbow,
        background: rainbow,
        animation: 'tl-pulse 2.2s ease-in-out infinite',
      }} />
  ) : isUpcoming ? (
    <div className="relative z-10 rounded-full border-2 shrink-0"
      style={{ width: '9px', height: '9px', borderColor: 'rgba(0,0,0,0.35)', background: '#ffffff' }} />
  ) : (
    <div className="relative z-10 rounded-full shrink-0"
      style={{ width: '9px', height: '9px', background: rainbow, boxShadow: `0 0 6px ${rainbow}88` }} />
  );

  return (
    <div
      data-milestone-col
      className="relative flex flex-col h-full shrink-0"
      style={{ width: '230px' }}
    >
      {/* 위쪽 절반 — 텍스트만 애니메이션 */}
      <div className="flex flex-col items-center justify-end" style={{ height: 'calc(50% - 8px)' }}>
        {isAbove ? (
          <div
            data-milestone-item
            data-above="1"
            className="flex flex-col items-center w-full"
            style={{
              opacity: isFirst ? 1 : 0,
              transform: isFirst ? 'translateY(0)' : 'translateY(18px)',
              willChange: 'opacity, transform',
            }}
          >
            {YearLabel}
            <Conn h="14px" dir="solid" />
            {TextBlock}
            <Conn h="28px" dir="down" />
          </div>
        ) : null}
      </div>

      {/* 라인 + 도트 — 항상 표시 */}
      <div className="relative flex items-center justify-center shrink-0" style={{ height: '16px' }}>
        {!isFirst && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-1/2"
            style={{ height: '1px', background: lineColor }} />
        )}
        {!isLast && (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 right-0"
            style={{ height: '1px', background: lineColor }} />
        )}
        {Dot}
      </div>

      {/* 아래쪽 절반 — 텍스트만 애니메이션 */}
      <div className="flex flex-col items-center justify-start" style={{ height: 'calc(50% - 8px)' }}>
        {!isAbove ? (
          <div
            data-milestone-item
            data-above="0"
            className="flex flex-col items-center w-full"
            style={{
              opacity: 0,
              transform: 'translateY(-18px)',
              willChange: 'opacity, transform',
            }}
          >
            <Conn h="28px" dir="up" />
            {TextBlock}
            <Conn h="14px" dir="solid" />
            {YearLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ─────────────────────────────── */
export default function MilestonesTimeline() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const rafIdRef    = useRef<number>(0);
  const currentXRef = useRef(0);
  const targetXRef  = useRef(0);

  /* ── 파티클 캔버스 ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* 4각 별(✦) 그리기 */
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

    const COLORS = ['#1d4ed8','#7c3aed','#ec4899','#06b6d4','#f59e0b','#10b981','#3b82f6','#a855f7'];

    type P = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; t: number; T: number; color: string };
    const mkP = (): P => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 4 + 1.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.45 + 0.2,
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

  /* ── 스크롤 + lerp ── */
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const glow  = glowRef.current;
    if (!outer || !track) return;

    const setHeight = () => {
      const max = track.scrollWidth - window.innerWidth;
      outer.style.height = max > 0 ? `${max + window.innerHeight}px` : `${window.innerHeight}px`;
    };

    const onScroll = () => {
      const ot = outer.getBoundingClientRect().top + window.scrollY;
      const sd = window.scrollY - ot;
      const ms = outer.offsetHeight - window.innerHeight;
      const p  = Math.max(0, Math.min(1, sd / ms));
      const mt = track.scrollWidth - window.innerWidth;
      targetXRef.current = p * mt;
    };

    /* 이미 등장한 아이템 추적 */
    const revealed = new Set<HTMLElement>();

    /* 첫 번째 컬럼은 처음부터 노출 — 미리 revealed에 등록 */
    const firstCol = track.querySelector<HTMLElement>('[data-milestone-col]');
    if (firstCol) revealed.add(firstCol);

    /* 아이템별 가시성 — 중앙 115px 이내 진입 시 하나씩 팝-인 */
    const REVEAL_PX   = 115; // 아이템 폭(230px)의 절반 → 동시에 1개만 트리거
    const prevX = new Map<HTMLElement, number>();

    const updateItems = () => {
      /* 컬럼 위치로 트리거 판단, 텍스트 래퍼에만 애니메이션 적용 */
      const cols = track.querySelectorAll<HTMLElement>('[data-milestone-col]');
      const vcx  = window.innerWidth / 2;

      cols.forEach(col => {
        const r  = col.getBoundingClientRect();
        const ic = r.left + r.width / 2;   // 컬럼 중심 x
        const d  = Math.abs(ic - vcx);
        const px = prevX.get(col);
        prevX.set(col, ic);

        /* 이 컬럼 안의 텍스트 래퍼 (애니메이션 대상) */
        const el = col.querySelector<HTMLElement>('[data-milestone-item]');
        if (!el) return;

        if (!revealed.has(col)) {
          /* 오른쪽에서 중앙 115px 이내로 진입하는 순간 1개씩 팝-인 */
          const wasRight = px === undefined || px > vcx + REVEAL_PX;
          if (wasRight && d < REVEAL_PX) {
            revealed.add(col);
            const isAbove = el.dataset.above === '1';
            el.style.transition = 'none';
            el.style.opacity    = '0';
            el.style.transform  = isAbove
              ? 'translateY(20px) scale(0.86)'
              : 'translateY(-20px) scale(0.86)';
            void el.offsetHeight;
            el.style.transition =
              'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.34,1.4,0.64,1)';
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0) scale(1)';
          }
        } else {
          /* 이미 등장 → 중앙에서 멀어질수록 살짝 어둡게/작게 */
          const t = Math.max(0, 1 - d / (window.innerWidth * 0.54));
          const e = t * t * (3 - 2 * t);
          el.style.transition = 'opacity 80ms linear, transform 80ms linear';
          el.style.opacity    = String(0.72 + e * 0.28);
          el.style.transform  = `scale(${0.94 + e * 0.06})`;
        }
      });
    };

    /* rAF lerp 루프 */
    const loop = () => {
      const cur = currentXRef.current;
      const tar = targetXRef.current;
      const diff = tar - cur;
      if (Math.abs(diff) > 0.05) {
        currentXRef.current += diff * 0.085;
        track.style.transform = `translateX(-${currentXRef.current}px)`;
        updateItems();

        /* 타임라인 라인 위 글로우 노드 위치 */
        if (glow) {
          const mt = track.scrollWidth - window.innerWidth;
          const prog = mt > 0 ? currentXRef.current / mt : 0;
          // 화면의 왼쪽~오른쪽 범위에서 이동
          const gx = window.innerWidth * 0.18 + prog * window.innerWidth * 0.64;
          glow.style.transform = `translateX(${gx}px)`;
          glow.style.opacity   = String(0.35 + prog * 0.4);
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    setHeight();
    onScroll();
    rafIdRef.current = requestAnimationFrame(loop);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { setHeight(); onScroll(); });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setHeight);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div ref={outerRef}>
      <style>{KEYFRAMES}</style>

      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh', background: '#ffffff' }}>

        {/* ── 중앙 방사형 블루 글로우 ── */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(29,78,216,0.03) 0%, transparent 70%)',
        }} />

        {/* ── 파티클 캔버스 ── */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* 스캔 라인 제거 */}

        {/* ── 타임라인 라인 위 이동 글로우 노드 ── */}
        <div ref={glowRef} className="absolute z-20 pointer-events-none" style={{
          top: 'calc(50% - 4px)',
          left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#3b82f6',
          boxShadow: '0 0 0 4px rgba(59,130,246,0.15), 0 0 14px 4px rgba(59,130,246,0.2)',
          willChange: 'transform, opacity',
          transition: 'opacity 200ms ease',
        }} />

        {/* ── HISTORY 라벨 ── */}
        <div className="absolute top-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <span className="text-[16px] font-bold uppercase tracking-[0.38em]"
            style={{ color: 'rgba(0,0,0,0.5)' }}>
            History
          </span>
        </div>

        {/* ── 좌우 페이드 ── */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '110px', background: 'linear-gradient(to right, #ffffff, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '110px', background: 'linear-gradient(to left, #ffffff, transparent)' }} />

        {/* ── 슬라이딩 트랙 ── */}
        <div ref={trackRef} className="flex items-stretch h-full"
          style={{ willChange: 'transform', transform: 'translateX(0)' }}>

          {/* 첫 아이템 중심이 스크롤 0일 때 화면 중앙에 오도록 50vw - 절반폭 */}
          <div style={{ width: 'calc(50vw - 115px)', flexShrink: 0 }} />

          {milestones.map((m, i) => (
            <MilestoneItem
              key={`${m.year}-${i}`}
              m={m}
              index={i}
              isFirst={i === 0}
              isLast={i === milestones.length - 1}
              isAbove={i % 2 === 0}
            />
          ))}

          <div style={{ width: 'calc(50vw - 115px)', flexShrink: 0 }} />
        </div>


        {/* ── 스크롤 힌트 ── */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center items-center gap-3 pointer-events-none"
          style={{ color: 'rgba(0,0,0,0.25)' }}>
          <div style={{ width: '22px', height: '1px', background: 'rgba(0,0,0,0.2)' }} />
          <span className="text-[8px] uppercase tracking-[0.3em]">scroll to explore</span>
          <div style={{ width: '22px', height: '1px', background: 'rgba(0,0,0,0.2)' }} />
        </div>

      </div>
    </div>
  );
}
