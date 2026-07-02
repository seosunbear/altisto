'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * MockupScaler — 목업을 designWidth 기준으로 렌더한 뒤
 * 컨테이너 폭에 맞춰 transform: scale로 비율 그대로 확대/축소
 */
export default function MockupScaler({
  designWidth = 560,
  children,
}: {
  designWidth?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / designWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
      <div
        className="absolute left-0 top-0"
        style={{
          width: designWidth,
          transform: `scale(${scale ?? 1})`,
          transformOrigin: 'top left',
          visibility: scale === null ? 'hidden' : 'visible',
        }}
      >
        {children}
      </div>
    </div>
  );
}
