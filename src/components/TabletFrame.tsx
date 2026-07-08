import type { ReactNode } from 'react';

/**
 * TabletFrame — 가로형 태블릿 베젤 프레임 (MockupScaler 안에서 고정 픽셀로 렌더)
 * PhoneFrame과 같은 뉴모피즘 그림자 + 펀치홀 카메라 + 슬림 상태바
 */
export default function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[720px]">
      {/* 베젤 */}
      <div className="rounded-[2rem] bg-[#111318] p-2">
        {/* 스크린 — 곡률 = 베젤 곡률(2rem) − 베젤 두께(8px) */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-white">
          {/* 펀치홀 카메라 (가로 모드: 상단 중앙) */}
          <div className="absolute left-1/2 top-2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#111318]">
            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2a2f3a]" />
          </div>

          {/* 슬림 상태바 */}
          <div className="flex items-center justify-between bg-white px-7 pb-0.5 pt-2">
            <span className="text-[10px] font-semibold tracking-tight text-[#111]">9:41</span>
            <div className="flex items-center gap-[5px]">
              <svg width="12" height="9" viewBox="0 0 16 12" fill="#111">
                <rect x="0" y="7" width="2.8" height="4" rx="0.8" />
                <rect x="4.2" y="4.8" width="2.8" height="6.2" rx="0.8" />
                <rect x="8.4" y="2.6" width="2.8" height="8.4" rx="0.8" />
                <rect x="12.6" y="0.4" width="2.8" height="10.6" rx="0.8" />
              </svg>
              <svg width="11" height="9" viewBox="0 0 16 12" fill="none" stroke="#111" strokeWidth="1.7" strokeLinecap="round">
                <path d="M1.5 4.5a10 10 0 0 1 13 0" />
                <path d="M4 7a6.5 6.5 0 0 1 8 0" />
                <path d="M6.5 9.5a3 3 0 0 1 3 0" />
              </svg>
              <svg width="17" height="9" viewBox="0 0 22 12" fill="none">
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
