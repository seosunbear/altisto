'use client';

import { useCallback, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   자석 — 커서가 다가오면 버튼이 조금 끌려온다.
   진폭은 6px 남짓. 더 키우면 눌러야 할 자리가 도망 다녀서
   오히려 누르기 어려워진다. 손가락(터치)에는 붙이지 않는다.
   ────────────────────────────────────────────────────────── */

const PULL = 0.22;
const MAX = 6;

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  /* 스프링이라 커서를 빼도 velocity 를 물고 제자리로 돌아온다 */
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0)`;

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduce || e.pointerType !== 'mouse') return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(Math.max(-MAX, Math.min(MAX, dx * PULL)));
      y.set(Math.max(-MAX, Math.min(MAX, dy * PULL)));
    },
    [reduce, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      style={reduce ? undefined : { transform }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
