'use client';

import { useEffect, useState } from 'react';

const LINE1 = 'We Are Artists';
const LINE2 = 'We Are Maestros';

// 한 글자당 타이핑 속도 (ms)
const SPEED = 38;
// 첫 번째 줄 시작 딜레이 (ms)
const START_DELAY = 150;
// 두 번째 줄은 첫 번째 줄 완성 후 이 만큼 쉬고 시작 (ms)
const PAUSE_BETWEEN = 220;

export default function TypewriterHeadline() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [showCursor1, setShowCursor1] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);
  const [line1Done, setLine1Done] = useState(false);

  /* ── 첫 번째 줄 타이핑 ── */
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowCursor1(true);
    }, START_DELAY);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!showCursor1) return;
    if (line1.length >= LINE1.length) {
      // 첫 번째 줄 완성
      const doneTimer = setTimeout(() => {
        setShowCursor1(false);
        setLine1Done(true);
      }, PAUSE_BETWEEN);
      return () => clearTimeout(doneTimer);
    }
    const t = setTimeout(() => {
      setLine1(LINE1.slice(0, line1.length + 1));
    }, SPEED);
    return () => clearTimeout(t);
  }, [showCursor1, line1]);

  /* ── 두 번째 줄 타이핑 ── */
  useEffect(() => {
    if (!line1Done) return;
    setShowCursor2(true);
  }, [line1Done]);

  useEffect(() => {
    if (!showCursor2) return;
    if (line2.length >= LINE2.length) {
      // 두 번째 줄 완성 → 커서는 계속 깜빡이게 둠 (또는 끄고 싶으면 setShowCursor2(false))
      return;
    }
    const t = setTimeout(() => {
      setLine2(LINE2.slice(0, line2.length + 1));
    }, SPEED);
    return () => clearTimeout(t);
  }, [showCursor2, line2]);

  return (
    <div className="mb-8 space-y-1 text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight text-[#0d1117]">
      {/* 첫 번째 줄 */}
      <div className="min-h-[1.2em]">
        <span>{line1}</span>
        {showCursor1 && (
          <span
            className="inline-block align-baseline ml-[2px] w-[3px] rounded-sm bg-[#1d4ed8]"
            style={{
              height: '0.85em',
              animation: 'cursor-blink 0.7s step-end infinite',
            }}
          />
        )}
      </div>

      {/* 두 번째 줄 */}
      <div className="min-h-[1.2em]">
        <span>{line2}</span>
        {showCursor2 && (
          <span
            className="inline-block align-baseline ml-[2px] w-[3px] rounded-sm bg-[#1d4ed8]"
            style={{
              height: '0.85em',
              animation: 'cursor-blink 0.7s step-end infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}
