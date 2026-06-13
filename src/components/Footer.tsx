import Link from 'next/link';
import { Mail } from 'lucide-react';

const services = [
  { label: '알티 (외주 플랫폼)', href: '/services' },
  { label: '리프챗 (소통 플랫폼)', href: '/services' },
];

const company = [
  { label: '회사 소개', href: '/about' },
  { label: '핵심 가치', href: '/about' },
  { label: '문의하기', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e7eb]">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 py-14">

        {/* 상단: 로고 + 컬럼 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 select-none mb-4">
              <span className="text-[16px] font-bold text-[#0d1117]">Altisto</span>
            </Link>
            <p className="text-[13px] leading-[1.75] text-[#6b7280] max-w-[200px]">
              콘텐츠 그 이상의 가치를 만듭니다
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#9ca3af]">서비스</p>
            <ul className="space-y-2.5">
              {services.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-[13px] text-[#4b5563] hover:text-[#1d4ed8] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#9ca3af]">회사</p>
            <ul className="space-y-2.5">
              {company.map(l => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-[13px] text-[#4b5563] hover:text-[#1d4ed8] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#9ca3af]">연락처</p>
            <a href="mailto:connect@altisto.me"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#4b5563] hover:text-[#1d4ed8] transition-colors">
              <Mail size={13} />
              connect@altisto.me
            </a>
            <p className="mt-3 text-[12px] text-[#9ca3af]">영업일 기준 24시간 이내 응답</p>
          </div>
        </div>

        {/* 하단 구분선 + 저작권 */}
        <div className="border-t border-[#e5e7eb] pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-[#9ca3af]">© 2025 Altisto Inc. All rights reserved.</p>
          <p className="text-[12px] text-[#9ca3af]">대표이사 서현웅 &nbsp;·&nbsp; 사업자등록번호: 준비 중</p>
        </div>

      </div>
    </footer>
  );
}
