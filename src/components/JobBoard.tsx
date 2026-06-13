'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Search } from 'lucide-react'
import { jobs, teamOptions, typeOptions } from '@/data/jobs'

function Dropdown({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const active = value !== '전체'

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-2xl border px-3.5 py-3 text-[14px] font-semibold transition-colors md:gap-2 md:px-5 md:text-[15px] ${
          active
            ? 'border-[#3182F6] bg-[#3182F6]/[0.06] text-[#3182F6]'
            : 'border-[#E5E8EB] bg-white text-[#191F28] hover:border-[#d1d6db]'
        }`}
      >
        {active ? value : placeholder}
        <ChevronDown
          size={17}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${active ? 'text-[#3182F6]' : 'text-[#8B95A1]'}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-20 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => {
                  onChange(o)
                  setOpen(false)
                }}
                className={`block w-full px-5 py-2.5 text-left text-[15px] transition-colors hover:bg-[#F9FAFB] ${
                  o === value ? 'font-bold text-[#3182F6]' : 'font-medium text-[#4E5968]'
                }`}
              >
                {o === '전체' ? `${placeholder}` : o}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function JobBoard() {
  const [team, setTeam] = useState('전체')
  const [type, setType] = useState('전체')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const filtered = jobs.filter(
    (j) =>
      (team === '전체' || j.team === team) &&
      (type === '전체' || j.type === type) &&
      (q === '' || j.title.toLowerCase().includes(q) || j.team.toLowerCase().includes(q)),
  )
  const dirty = team !== '전체' || type !== '전체' || query !== ''

  return (
    <div className="mx-auto max-w-screen-xl">
      {/* 검색창 + 필터 — 한 줄 */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative min-w-0 flex-1 md:max-w-sm">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8B95A1]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="직무 또는 직군을 검색해 보세요"
            className="w-full rounded-2xl border border-[#E5E8EB] bg-[#F9FAFB] py-3 pr-5 text-[15px] text-[#191F28] placeholder:text-[#8B95A1] transition-colors focus:border-[#3182F6] focus:bg-white focus:outline-none"
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        <Dropdown placeholder="모든 직군" value={team} options={teamOptions} onChange={setTeam} />
        <Dropdown placeholder="고용형태" value={type} options={typeOptions} onChange={setType} />
        {dirty && (
          <button
            onClick={() => {
              setTeam('전체')
              setType('전체')
              setQuery('')
            }}
            className="ml-0.5 shrink-0 text-[13px] font-medium text-[#8B95A1] underline-offset-4 hover:text-[#4E5968] hover:underline"
          >
            초기화
          </button>
        )}
      </div>

      {/* 카운트 */}
      <p className="mt-12 mb-3 text-[17px] font-bold text-[#191F28]">
        <span className="text-[#3182F6]">{filtered.length}</span>개의 포지션이 열려있어요
      </p>

      {/* 리스트 */}
      <ul>
        {filtered.map((j) => (
          <li key={j.title} className="border-b border-[#F2F4F6]">
            <Link
              href="/contact"
              className="group flex items-center justify-between gap-4 rounded-2xl px-2 py-7 transition-colors hover:bg-[#F9FAFB] md:px-5"
            >
              <div className="min-w-0">
                <h3 className="text-[clamp(1.15rem,2vw,1.5rem)] font-bold tracking-tight text-[#191F28] transition-colors group-hover:text-[#3182F6]">
                  {j.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] text-[#8B95A1]">
                  <span className="font-semibold text-[#4E5968]">{j.team}</span>
                  <span className="h-3 w-px bg-[#E5E8EB]" />
                  <span>{j.type}</span>
                  <span className="h-3 w-px bg-[#E5E8EB]" />
                  <span>{j.location}</span>
                </div>
              </div>
              <ArrowRight
                size={22}
                className="flex-shrink-0 text-[#D1D6DB] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#3182F6]"
              />
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-[15px] text-[#8B95A1]">
          {jobs.length === 0 ? '현재 모집 중인 포지션이 없어요' : '조건에 맞는 포지션이 없어요'}
        </p>
      )}
    </div>
  )
}
