'use client'

import { useState } from 'react'
import { Rocket, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'

import type { Dictionary } from '@/i18n/dictionaries/ko'

type ContactFormText = Dictionary['contact']['form']

/* 아이콘·색만 여기 둔다. 이름과 설명은 언어별 사전(contact.form.categories) */
const categories = [
  { id: 'service', icon: Rocket, color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'invest', icon: TrendingUp, color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'etc', icon: MessageCircle, color: '#0891b2', bg: '#ecfeff' },
] as const

type CategoryId = (typeof categories)[number]['id']

const MAIL = 'connect@altisto.me'

export default function ContactForm({ t }: { t: ContactFormText }) {
  const [category, setCategory] = useState<CategoryId>('service')
  const [name, setName]         = useState('')
  const [company, setCompany]   = useState('')
  const [email, setEmail]       = useState('')
  const [message, setMessage]   = useState('')

  const valid = name.trim() && email.trim() && message.trim()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return

    const label = t.categories[category].label
    const subject = t.mail.subject.replace('{category}', label).replace('{name}', name)
    const body = [
      `${t.mail.category}: ${label}`,
      `${t.mail.name}: ${name}`,
      company.trim() ? `${t.mail.company}: ${company}` : null,
      `${t.mail.email}: ${email}`,
      '',
      t.mail.divider,
      message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const inputCls =
    'w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[14px] text-[#0d1117] ' +
    'placeholder:text-[#9ca3af] outline-none transition-colors duration-200 ' +
    'focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/10'

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">

      {/* 1. 문의 유형 선택 */}
      <fieldset className="mb-8">
        <legend className="mb-3 text-[12px] font-semibold text-[#374151]">
          {t.legend}
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {categories.map((c) => {
            const active = category === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={active}
                className={
                  'group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-200 ' +
                  (active
                    ? 'border-transparent bg-[#eef0f3]'
                    : 'border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#fafafa]')
                }
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: c.bg }}
                >
                  <c.icon size={18} style={{ color: c.color }} strokeWidth={1.9} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0d1117]">{t.categories[c.id].label}</p>
                  <p className="mt-0.5 text-[11px] leading-[1.5] text-[#6b7280]">{t.categories[c.id].desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* 2. 입력 필드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[12px] font-semibold text-[#374151]">
            {t.name} <span className="text-[#1d4ed8]">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-[12px] font-semibold text-[#374151]">
            {t.company} <span className="text-[#9ca3af]">{t.optional}</span>
          </label>
          <input
            id="cf-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t.companyPlaceholder}
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-email" className="mb-1.5 block text-[12px] font-semibold text-[#374151]">
          {t.email} <span className="text-[#1d4ed8]">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputCls}
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="mb-1.5 block text-[12px] font-semibold text-[#374151]">
          {t.message} <span className="text-[#1d4ed8]">*</span>
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          rows={5}
          className={inputCls + ' resize-y min-h-[120px]'}
          required
        />
      </div>

      {/* 3. 제출 */}
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={!valid}
          className="group inline-flex items-center gap-2 rounded-xl bg-[#0d1117] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#0d1117]"
        >
          {t.submit}
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
        <p className="text-[12px] leading-[1.6] text-[#9ca3af]">
          {t.mailHint}<br className="hidden sm:block" />
          {t.mailDirect}{' '}
          <a href={`mailto:${MAIL}`} className="font-medium text-[#1d4ed8] hover:underline">
            {MAIL}
          </a>
        </p>
      </div>
    </form>
  )
}
