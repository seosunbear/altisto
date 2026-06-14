'use client'

import Link            from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useState }    from 'react'

const ITEMS = [
  { no: '01', en: 'Services', ko: '서비스',   desc: '알티와 리프챗, 우리가 만든 서비스를 만나보세요.', href: '/services', accent: '#5b8cff' },
  { no: '02', en: 'Contact',  ko: '문의하기', desc: '협업·제휴·서비스 문의는 언제든 환영합니다.',       href: '/contact',  accent: '#22c55e' },
  { no: '03', en: 'Careers',  ko: '함께하기', desc: '함께 성장할 동료를 기다리고 있습니다.',           href: '/career',   accent: '#f5a524' },
] as const

export default function ExploreList() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <ul
      className="flex flex-col sm:h-60 sm:flex-row"
      onMouseLeave={() => setActive(null)}
    >
      {ITEMS.map((item, i) => {
        // 호버한 카드는 넓게, 나머지는 좁게 밀려남
        const grow = active === null ? 1 : active === i ? 2.4 : 0.8
        const dimmed = active !== null && active !== i
        return (
          <li
            key={item.en}
            onMouseEnter={() => setActive(i)}
            className="min-w-0 basis-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ flexGrow: grow }}
          >
            <Link
              href={item.href}
              className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-5 transition-opacity duration-500 sm:gap-12 sm:p-6"
              style={{ opacity: dimmed ? 0.45 : 1 }}
            >
              {/* 호버 시 아래에서 차오르는 액센트 배경 */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                style={{ background: `linear-gradient(0deg, ${item.accent}24 0%, ${item.accent}08 50%, transparent 90%)` }}
              />

              {/* 상단 — 번호 + 화살표 */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[11px] font-bold tracking-widest text-white/30 transition-colors duration-300"
                  style={{ color: active === i ? item.accent : undefined }}
                >
                  {item.no}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-transparent"
                  style={{ background: active === i ? item.accent : 'transparent' }}
                >
                  <ArrowUpRight
                    size={15}
                    className="text-white/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a0a0f]"
                  />
                </span>
              </div>

              {/* 하단 — 타이틀 + 설명 */}
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                  {item.en}
                </p>
                <h3 className="mb-2 whitespace-nowrap text-[clamp(1.1rem,2vw,1.5rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                  {item.ko}
                </h3>
                <p className="text-[12px] leading-[1.6] text-white/45 transition-colors duration-300 group-hover:text-white/65">
                  {item.desc}
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
