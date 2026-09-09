import type { CSSProperties, ReactNode } from 'react';

/* ──────────────────────────────────────────────────────────
   스크랩북 판에 붙는 조각들.

   전부 인라인 SVG 다. 외부 이미지는 일러스트와 얼굴 크롭 둘뿐이고
   나머지 장식은 여기서 그린다. 좌표는 각자 viewBox 안 기준이고,
   판 위 위치와 크기는 쓰는 쪽에서 style 로 넘긴다.

   색종이와 컬링 리본은 개수가 많아 손으로 적지 않고 씨앗 고정
   난수로 만든다. 시드가 고정이라 서버와 브라우저가 같은 값을 뽑고,
   하이드레이션이 갈리지 않는다.
   ────────────────────────────────────────────────────────── */

type Pos = { className?: string; style?: CSSProperties };

/* ── 씨앗 고정 난수 (mulberry32) ── */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ══════════ 색종이 ══════════ */

const CONFETTI_COLORS = [
  'var(--k-pink)',
  'var(--k-sky)',
  'var(--k-lilac)',
  'var(--k-cream)',
  'var(--k-mint)',
  'var(--k-edge)',
];

const CONFETTI = (() => {
  const rnd = seeded(20260221);
  return Array.from({ length: 54 }, () => {
    /* 캐릭터가 서는 세로 띠(34~60%)는 통째로 비운다. 얼굴이나 옷 위에
       조각이 떨어지면 스티커가 아니라 얼룩처럼 보인다. */
    let x = rnd() * 100;
    const y = rnd() * 100;
    if (x > 34 && x < 60) x = x < 47 ? x - 26 : x + 28;
    return {
      x,
      y,
      w: 0.5 + rnd() * 0.8,
      h: 0.9 + rnd() * 1.1,
      rot: rnd() * 360,
      color: CONFETTI_COLORS[Math.floor(rnd() * CONFETTI_COLORS.length)],
      round: rnd() > 0.72,
    };
  });
})();

export function Confetti() {
  return (
    <div aria-hidden className="merry-fade pointer-events-none absolute inset-0 overflow-hidden">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}cqw`,
            height: `${c.h}cqw`,
            background: c.color,
            borderRadius: c.round ? '50%' : '0.1cqw',
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════ 컬링 리본 ══════════ */

/** 사인 곡선을 따라 굵기가 변하는 띠 하나를 path 로 만든다 */
function ribbonPath(waves: number, amp: number, thick: number) {
  const steps = 44;
  const top: string[] = [];
  const bot: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = t * 200;
    const y = 30 + Math.sin(t * Math.PI * 2 * waves) * amp;
    const w = thick * (0.35 + 0.65 * Math.sin(Math.PI * t));
    top.push(`${x.toFixed(1)} ${(y - w / 2).toFixed(1)}`);
    bot.push(`${x.toFixed(1)} ${(y + w / 2).toFixed(1)}`);
  }
  return `M${top.join(' L')} L${bot.reverse().join(' L')} Z`;
}

const STREAMERS = [
  { id: 'a', left: -3, top: -2, width: 26, rot: 18, waves: 2.1, amp: 20, thick: 13, from: 'var(--k-lilac)', to: 'var(--k-sky)' },
  { id: 'b', left: 12, top: -6, width: 20, rot: -24, waves: 1.7, amp: 16, thick: 10, from: 'var(--k-cream)', to: 'var(--k-pink)' },
  { id: 'c', left: 70, top: -7, width: 24, rot: 12, waves: 2.4, amp: 18, thick: 12, from: 'var(--k-sky)', to: 'var(--k-lilac)' },
  { id: 'd', left: 84, top: 26, width: 22, rot: 74, waves: 2.0, amp: 20, thick: 12, from: 'var(--k-pink)', to: 'var(--k-cream)' },
  { id: 'e', left: 74, top: 82, width: 26, rot: -14, waves: 2.2, amp: 19, thick: 13, from: 'var(--k-lilac)', to: 'var(--k-pink)' },
  { id: 'f', left: -6, top: 74, width: 24, rot: 26, waves: 1.9, amp: 17, thick: 12, from: 'var(--k-sky)', to: 'var(--k-mint)' },
  { id: 'g', left: -4, top: 34, width: 18, rot: 96, waves: 1.8, amp: 15, thick: 10, from: 'var(--k-cream)', to: 'var(--k-lilac)' },
];

export function Streamers() {
  return (
    <div aria-hidden className="merry-fade pointer-events-none absolute inset-0 overflow-hidden">
      {STREAMERS.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 200 60"
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.width}%`,
            transform: `rotate(${s.rot}deg)`,
          }}
        >
          <defs>
            <linearGradient id={`str-${s.id}`} x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0" stopColor={s.from} />
              <stop offset="1" stopColor={s.to} />
            </linearGradient>
          </defs>
          <path d={ribbonPath(s.waves, s.amp, s.thick)} fill={`url(#str-${s.id})`} />
        </svg>
      ))}
    </div>
  );
}

/* ══════════ 배지 ══════════ */

/** 톱니 원(별 폭발) — 꼭짓점 24개 */
const BURST = (() => {
  const pts: string[] = [];
  const n = 24;
  for (let i = 0; i < n * 2; i += 1) {
    const r = i % 2 === 0 ? 50 : 42;
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(' ');
})();

export function StarBadge({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <polygon points={BURST} fill="var(--k-cream)" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeDasharray="4 3" />
      <circle cx="50" cy="50" r="13" fill="none" stroke="#FFFFFF" strokeWidth="2.4" />
      <g stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round">
        <line x1="50" y1="22" x2="50" y2="30" />
        <line x1="50" y1="70" x2="50" y2="78" />
        <line x1="22" y1="50" x2="30" y2="50" />
        <line x1="70" y1="50" x2="78" y2="50" />
        <line x1="31" y1="31" x2="37" y2="37" />
        <line x1="63" y1="63" x2="69" y2="69" />
        <line x1="69" y1="31" x2="63" y2="37" />
        <line x1="37" y1="63" x2="31" y2="69" />
      </g>
    </svg>
  );
}

/* ══════════ 카세트테이프 ══════════ */

export function Cassette({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 220 140" className={className} style={style} aria-hidden>
      <rect x="3" y="3" width="214" height="134" rx="12" fill="var(--k-pink)" stroke="#FFFFFF" strokeWidth="5" />
      <rect x="18" y="16" width="184" height="52" rx="6" fill="#FFFFFF" opacity="0.92" />
      <g stroke="var(--k-pink-d)" strokeWidth="2.6" strokeLinecap="round" opacity="0.75">
        <line x1="28" y1="30" x2="120" y2="30" />
        <line x1="28" y1="42" x2="96" y2="42" />
        <line x1="28" y1="54" x2="140" y2="54" />
        <line x1="158" y1="30" x2="192" y2="30" />
        <line x1="158" y1="42" x2="180" y2="42" />
      </g>
      <rect x="30" y="80" width="160" height="44" rx="8" fill="#FFFFFF" opacity="0.85" />
      {[70, 150].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="102" r="17" fill="var(--k-pink)" opacity="0.35" />
          <circle cx={cx} cy="102" r="10" fill="#FFFFFF" stroke="var(--k-pink-d)" strokeWidth="2.4" />
          <g stroke="var(--k-pink-d)" strokeWidth="2" strokeLinecap="round">
            <line x1={cx - 7} y1="102" x2={cx + 7} y2="102" />
            <line x1={cx} y1="95" x2={cx} y2="109" />
          </g>
        </g>
      ))}
      <rect x="96" y="94" width="28" height="16" rx="3" fill="var(--k-pink-d)" opacity="0.5" />
    </svg>
  );
}

/* ══════════ 음표 ══════════ */

export function Notes({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 80 110" className={className} style={style} aria-hidden>
      <g fill="var(--k-pink)">
        <ellipse cx="16" cy="88" rx="13" ry="10" transform="rotate(-18 16 88)" />
        <rect x="26" y="20" width="5.5" height="66" rx="2.5" />
        <path d="M31 20c14 6 22 14 20 28 6-16-2-28-20-36z" />
        <ellipse cx="52" cy="60" rx="10" ry="7.6" transform="rotate(-18 52 60)" />
        <rect x="59" y="12" width="4.5" height="50" rx="2" />
        <path d="M63 12c11 5 17 11 15 21 5-12-1-21-15-27z" />
      </g>
    </svg>
  );
}

/* ══════════ 트럼펫 ══════════ */

export function Trumpet({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 214 104" className={className} style={style} aria-hidden>
      <g fill="none" stroke="var(--k-cream)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* 마우스피스와 리드파이프 */}
        <path d="M6 42c-7 4-7 16 0 20" />
        <rect x="6" y="44" width="20" height="16" rx="7" />
        <rect x="24" y="44" width="126" height="16" rx="8" />
        {/* 벨 */}
        <path d="M150 40 200 12 200 92 150 64Z" />
        <ellipse cx="200" cy="52" rx="5" ry="40" />
        {/* 밸브 세 개 */}
        <rect x="60" y="18" width="14" height="28" rx="6" />
        <rect x="88" y="18" width="14" height="28" rx="6" />
        <rect x="116" y="18" width="14" height="28" rx="6" />
        {/* 아래 관 */}
        <path d="M62 60v16a12 12 0 0 0 12 12h48a12 12 0 0 0 12-12V60" />
      </g>
    </svg>
  );
}

/* ══════════ 튜바 ══════════ */

export function Tuba({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 200 156" className={className} style={style} aria-hidden>
      <g fill="none" stroke="var(--k-cream)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* 위로 벌어진 벨 */}
        <path d="M112 34c0-18 16-28 36-28s36 10 36 28" />
        <ellipse cx="148" cy="34" rx="36" ry="8" />
        {/* 목관 */}
        <path d="M148 42c0 30-10 48-32 58" />
        {/* 몸통 코일 */}
        <ellipse cx="78" cy="102" rx="52" ry="42" />
        {/* 밸브 세 개 */}
        <rect x="58" y="40" width="13" height="26" rx="6" />
        <rect x="80" y="36" width="13" height="30" rx="6" />
        <rect x="102" y="44" width="13" height="24" rx="6" />
        <path d="M64 66v10M86 66v10M108 68v8" />
        {/* 마우스피스 */}
        <path d="M30 130c-8 4-14 4-18 0" />
        <circle cx="18" cy="130" r="8" />
      </g>
    </svg>
  );
}

/* ══════════ 구름 ══════════ */

export function Cloud({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 200 110" className={className} style={style} aria-hidden>
      <path
        d="M46 92c-20 0-34-13-34-30s14-29 32-29c4-19 20-31 40-31 22 0 38 14 41 33 18 1 31 13 31 29s-14 28-34 28z"
        fill="var(--k-sky)"
        opacity="0.45"
      />
      <path
        d="M46 92c-20 0-34-13-34-30s14-29 32-29c4-19 20-31 40-31 22 0 38 14 41 33 18 1 31 13 31 29s-14 28-34 28z"
        fill="none"
        stroke="var(--k-sky)"
        strokeWidth="4"
      />
    </svg>
  );
}

/* ══════════ 레트로 창 ══════════ */

export function RetroWindow({
  className,
  style,
  title,
  children,
}: Pos & { title: string; children?: ReactNode }) {
  return (
    <div
      className={`overflow-hidden rounded-md border-2 border-[var(--k-sky-d)] bg-white [container-type:inline-size] ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-between bg-[var(--k-sky)] px-[4cqw] py-[2.4cqw]">
        <span
          className="font-[family-name:var(--font-display)] text-[5.4cqw] font-medium leading-none text-[var(--k-ink)]"
          style={{ letterSpacing: '0.06em' }}
        >
          {title}
        </span>
        <span className="flex items-center gap-[2.4cqw] text-[5.4cqw] leading-none text-[var(--k-ink)]">
          <span>—</span>
          <span>□</span>
          <span>×</span>
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ══════════ 메모지 뭉치 ══════════ */

export function PaperStrips({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 40 130" className={className} style={style} aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="3"
          y={3 + i * 21}
          width="34"
          height="16"
          rx="3"
          fill="#FFF3D6"
          stroke="var(--k-cream)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

/* ══════════ 바코드 ══════════ */

const BARS = (() => {
  const rnd = seeded(90221);
  let x = 2;
  const out: { x: number; w: number }[] = [];
  while (x < 116) {
    const w = 1.5 + rnd() * 4;
    out.push({ x, w });
    x += w + 1.5 + rnd() * 3;
  }
  return out;
})();

export function Barcode({ className, style }: Pos) {
  return (
    <svg viewBox="0 0 120 46" className={className} style={style} aria-hidden>
      {BARS.map((b, i) => (
        <rect key={i} x={b.x} y="2" width={b.w} height="34" fill="var(--k-ink)" />
      ))}
      <text x="60" y="44" textAnchor="middle" fill="var(--k-ink)" style={{ font: '500 8px var(--font-display)', letterSpacing: '0.3em' }}>
        02210163
      </text>
    </svg>
  );
}

/* ══════════ 티켓 ══════════ */

export function Ticket({ className, style, lines }: Pos & { lines: [string, string] }) {
  return (
    <svg viewBox="0 0 190 110" className={className} style={style} aria-hidden>
      <path
        d="M8 8h174v28a14 14 0 0 0 0 28v38H8V64a14 14 0 0 0 0-28z"
        fill="var(--k-sky)"
        stroke="#FFFFFF"
        strokeWidth="4"
      />
      <path
        d="M18 18h154v18a14 14 0 0 0 0 28v28H18V64a14 14 0 0 0 0-28z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeDasharray="5 4"
        opacity="0.9"
      />
      <g stroke="var(--k-ink)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="95" y1="30" x2="95" y2="38" />
        <line x1="79" y1="34" x2="84" y2="40" />
        <line x1="111" y1="34" x2="106" y2="40" />
      </g>
      <text x="95" y="66" textAnchor="middle" fill="var(--k-ink)" style={{ font: '600 15px var(--font-script)' }}>
        {lines[0]}
      </text>
      <text x="95" y="86" textAnchor="middle" fill="var(--k-ink)" style={{ font: '600 15px var(--font-script)' }}>
        {lines[1]}
      </text>
    </svg>
  );
}

/* ══════════ 리본 배너 ══════════ */

export function RibbonBanner({
  className,
  style,
  text,
  from,
  to,
  id,
}: Pos & { text: string; from: string; to: string; id: string }) {
  return (
    <svg viewBox="0 0 260 62" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={`ban-${id}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d="M0 12 L260 0 L260 50 L0 62 Z" fill={`url(#ban-${id})`} />
      <path d="M0 12 L260 0" stroke="#FFFFFF" strokeWidth="2" opacity="0.55" />
      <text
        x="130"
        y="40"
        textAnchor="middle"
        fill="#FFFFFF"
        style={{ font: '700 30px var(--font-script)' }}
      >
        {text}
      </text>
    </svg>
  );
}

/* ══════════ 말풍선 라벨 ══════════ */

export function BubbleLabel({ className, style, children }: Pos & { children?: ReactNode }) {
  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      <svg viewBox="0 0 260 90" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        <rect x="3" y="3" width="254" height="84" rx="42" fill="#FFFFFF" opacity="0.7" />
        <rect x="3" y="3" width="254" height="84" rx="42" fill="none" stroke="var(--k-sky)" strokeWidth="3.5" />
        <rect x="12" y="12" width="236" height="66" rx="33" fill="none" stroke="var(--k-sky)" strokeWidth="1.6" opacity="0.7" />
      </svg>
      <div className="absolute inset-0 grid place-items-center px-[2.5cqw] text-center">{children}</div>
    </div>
  );
}
