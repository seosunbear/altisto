'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import { ORG_INSTAGRAM } from '@/lib/site';
import { localePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ko';

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary['footer'] }) {
  const pathname = usePathname();
  const dark = pathname === localePath(locale, '/');

  const services = [
    { label: t.arti, href: localePath(locale, '/services') },
    { label: t.ourschool, href: localePath(locale, '/services#ourschool') },
    { label: t.leafchat, href: localePath(locale, '/services#leafchat') },
  ];

  const company = [
    { label: t.contact, href: localePath(locale, '/contact') },
    { label: t.career, href: localePath(locale, '/career') },
  ];

  const headingCls = `mb-4 text-[11px] font-bold uppercase tracking-[0.15em] ${dark ? 'text-white/40' : 'text-[#9ca3af]'}`;
  const linkCls = `text-[13px] transition-colors ${dark ? 'text-white/60 hover:text-white' : 'text-[#4b5563] hover:text-[#1d4ed8]'}`;
  const mutedCls = dark ? 'text-white/40' : 'text-[#9ca3af]';

  return (
    <footer className={dark ? 'bg-[#0a0a0f] border-t border-white/10' : 'bg-white border-t border-[#e5e7eb]'}>
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 py-14">

        {/* 상단: 로고 + 컬럼 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <Link href={localePath(locale, '/')} className="inline-flex items-center gap-1 select-none mb-">
              <span className={`text-[16px] font-bold ${dark ? 'text-white' : 'text-[#0d1117]'}`}>Altisto</span>
            </Link>
            {/* 푸터에도 회사 카테고리(개발사)를 명시해 정체성 신호 강화 */}
            <p className={`text-[13px] leading-[1.75] max-w-[220px] ${dark ? 'text-white/50' : 'text-[#6b7280]'}`}>
              {t.tagline}
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <p className={headingCls}>{t.servicesHeading}</p>
            <ul className="space-y-2.5">
              {services.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <p className={headingCls}>{t.companyHeading}</p>
            <ul className="space-y-2.5">
              {company.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className={headingCls}>{t.contactHeading}</p>
            <a href="mailto:connect@altisto.me"
              className={`inline-flex items-center gap-1.5 ${linkCls}`}>
              <Mail size={13} />
              connect@altisto.me
            </a>
            {/* 공식 인스타그램 — 사이트와 계정을 잇는 보이는 링크 (site.ts 주석 참고) */}
            <a href={ORG_INSTAGRAM} target="_blank" rel="noopener" className={`mt-2 block ${linkCls}`}>
              Instagram @altisto.official
            </a>
            <p className={`mt-3 text-[12px] ${mutedCls}`}>{t.responseTime}</p>
          </div>
        </div>

        {/* 하단 구분선 + 저작권 */}
        <div className={`border-t pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${dark ? 'border-white/10' : 'border-[#e5e7eb]'}`}>
          <p className={`text-[12px] ${mutedCls}`}>© 2025 Altisto Inc. All rights reserved.</p>
          <p className={`text-[12px] ${mutedCls}`}>{t.ceo} &nbsp;·&nbsp; {t.bizNo}</p>
        </div>

      </div>
    </footer>
  );
}
