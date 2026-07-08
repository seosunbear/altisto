import type { ReactNode } from 'react';

/**
 * PhoneFrame — 앱 목업을 스마트폰 화면처럼 감싸는 프레임
 * 뉴모피즘 그림자로 돌출된, 살짝 기울어진 폰 (상태바 포함)
 * shadow=false 로 그림자 제거 가능 (기울여 겹치는 연출 등)
 */
export default function PhoneFrame({ children, shadow = true }: { children: ReactNode; shadow?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[320px] rotate-[12deg] scale-100 -translate-x-10 md:rotate-0 md:translate-x-0">

      {/* 베젤 */}
      <div className={`rounded-[2.8rem] bg-[#111318] p-2 ${shadow ? 'shadow-[6px_6px_18px_rgba(195,204,218,0.22),-6px_-6px_18px_#ffffff]' : ''}`}>

      {/* 스크린 — 곡률 = 베젤 곡률(2.8rem) − 베젤 두께(8px) */}
      <div className="relative overflow-hidden rounded-[2.3rem] bg-white">

        {/* 펀치홀 카메라 */}
        <div className="absolute left-1/2 top-2.5 z-20 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#111318]">
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2a2f3a]" />
        </div>

        {/* 상태바 */}
        <div className="flex items-center justify-between bg-white px-7 pb-1 pt-3.5">
          <span className="text-[11px] font-semibold tracking-tight text-[#111]">9:41</span>
          <div className="flex items-center gap-[5px]">
            {/* 신호 */}
            <svg width="14" height="10" viewBox="0 0 16 12" fill="#111">
              <rect x="0"    y="7"   width="2.8" height="4"    rx="0.8" />
              <rect x="4.2"  y="4.8" width="2.8" height="6.2"  rx="0.8" />
              <rect x="8.4"  y="2.6" width="2.8" height="8.4"  rx="0.8" />
              <rect x="12.6" y="0.4" width="2.8" height="10.6" rx="0.8" />
            </svg>
            {/* 와이파이 */}
            <svg width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="#111" strokeWidth="1.7" strokeLinecap="round">
              <path d="M1.5 4.5a10 10 0 0 1 13 0" />
              <path d="M4 7a6.5 6.5 0 0 1 8 0" />
              <path d="M6.5 9.5a3 3 0 0 1 3 0" />
            </svg>
            {/* 배터리 */}
            <svg width="19" height="10" viewBox="0 0 22 12" fill="none">
              <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="#111" strokeOpacity="0.35" />
              <rect x="2" y="2" width="13" height="8" rx="1.8" fill="#111" />
              <path d="M20.5 4v4a2.2 2.2 0 0 0 0-4z" fill="#111" fillOpacity="0.35" />
            </svg>
          </div>
        </div>

        {children}

      </div>
      </div>
    </div>
  );
}
