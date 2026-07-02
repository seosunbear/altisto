import type { ReactNode } from 'react';

/**
 * PhoneFrame — 앱 목업을 스마트폰 안에서 구동되는 것처럼 감싸는 프레임
 * 베젤 + 다이나믹 아일랜드 + 상태바 + 홈 인디케이터
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">

      {/* 사이드 버튼 */}
      <div className="absolute -left-[2px] top-[88px] h-7 w-[3px] rounded-l-md bg-[#2a2d35]" />
      <div className="absolute -left-[2px] top-[128px] h-12 w-[3px] rounded-l-md bg-[#2a2d35]" />
      <div className="absolute -right-[2px] top-[108px] h-16 w-[3px] rounded-r-md bg-[#2a2d35]" />

      {/* 베젤 */}
      <div className="relative rounded-[3rem] bg-[#111318] p-[10px]">
        {/* 스크린 */}
        <div className="relative overflow-hidden rounded-[2.4rem] bg-white">

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

          {/* 홈 인디케이터 */}
          <div className="flex justify-center bg-white pb-2 pt-1.5">
            <div className="h-[4px] w-[100px] rounded-full bg-[#111318]" />
          </div>

        </div>
      </div>
    </div>
  );
}
