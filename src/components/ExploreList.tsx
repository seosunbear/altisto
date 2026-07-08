'use client'

import Link            from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const ITEMS = [
  { no: '01', en: 'Services', ko: '서비스',   desc: '알티·우리학교·리프챗, 우리가 만든 서비스를 만나보세요.', href: '/services' },
  { no: '02', en: 'Contact',  ko: '문의하기', desc: '협업·제휴·서비스 문의는 언제든 환영합니다.',       href: '/contact' },
  { no: '03', en: 'Careers',  ko: '함께하기', desc: '함께 성장할 동료를 기다리고 있습니다.',           href: '/career' },
] as const

export default function ExploreList() {
  return (
    <ul className="flex flex-col border-t border-white/10">
      {ITEMS.map(item => (
        <li key={item.en} className="border-b border-white/10">
          <Link
            href={item.href}
            className="group relative flex items-center gap-5 overflow-hidden py-7 md:gap-10 md:py-10"
          >
            {/* 호버 시 왼쪽에서 스며드는 액센트 */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 65%)' }}
            />

            {/* 번호 */}
            <span className="text-[11px] font-bold tracking-widest text-white/30 transition-colors duration-300 group-hover:text-white">
              {item.no}
            </span>

            {/* 타이틀 */}
            <div className="min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                {item.en}
              </p>
              <h3 className="truncate text-[clamp(1.3rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-tight text-white">
                {item.ko}
              </h3>
            </div>

            {/* 설명 — 데스크톱에서만 */}
            <p className="hidden max-w-[260px] text-[12px] leading-[1.7] text-white/40 transition-colors duration-300 group-hover:text-white/65 md:block">
              {item.desc}
            </p>

            {/* 화살표 */}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-transparent group-hover:bg-white">
              <ArrowUpRight
                size={16}
                className="text-white/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a0a0f]"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
