'use client';

import { useMemo } from 'react';

/* 결정적 의사난수 — SSR/CSR 불일치 방지 */
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

interface Meteor {
  left: number;   // %
  top: number;    // %
  len: number;    // px
  delay: number;  // s
  dur: number;    // s
  opacity: number;
}

const KEYFRAMES = `
  @keyframes meteor-fall {
    0%   { transform: translate3d(0, 0, 0) rotate(-45deg); opacity: 0; }
    8%   { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translate3d(-340px, 340px, 0) rotate(-45deg); opacity: 0; }
  }
  @keyframes meteor-twinkle {
    0%, 100% { opacity: 0.15; }
    50%      { opacity: 0.7; }
  }
`;

export default function MeteorShower() {
  const { meteors, stars } = useMemo(() => {
    const rng = makeRng(20260614);
    const meteors: Meteor[] = Array.from({ length: 14 }, () => ({
      left: rng() * 100,
      top: rng() * 60 - 10,
      len: rng() * 90 + 70,
      delay: rng() * 8,
      dur: rng() * 2.5 + 3,
      opacity: rng() * 0.4 + 0.35,
    }));
    const stars = Array.from({ length: 40 }, () => ({
      left: rng() * 100,
      top: rng() * 100,
      size: rng() * 1.6 + 0.6,
      delay: rng() * 4,
      dur: rng() * 3 + 2.5,
    }));
    return { meteors, stars };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{KEYFRAMES}</style>

      {/* 정적 별 */}
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `meteor-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* 유성 */}
      {meteors.map((m, i) => (
        <span
          key={`m-${i}`}
          className="absolute"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.len}px`,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))',
            opacity: m.opacity,
            transform: 'rotate(-45deg)',
            transformOrigin: 'left center',
            animation: `meteor-fall ${m.dur}s ${m.delay}s linear infinite`,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
          }}
        />
      ))}
    </div>
  );
}
