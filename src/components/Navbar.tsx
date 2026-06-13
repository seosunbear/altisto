'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: '서비스', href: '/services' },
  { label: '회사 소개', href: '/about' },
  { label: '채용', href: '/career' },
  { label: '문의', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  // 홈만 어두운 히어로(흰 텍스트), 그 외 페이지는 어바웃처럼 어두운 텍스트
  const darkText = !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? isHome
            ? 'backdrop-blur-md border-b border-transparent'
            : 'bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-screen-xl items-center justify-between px-6 md:px-10">

        {/* 로고 */}
        <Link href="/" onClick={() => setOpen(false)}
          className="flex items-baseline gap-1.5 select-none group">
          <span className={`text-[17px] font-bold tracking-tight transition-colors duration-300 ${darkText ? 'text-[#0d1117]' : 'text-white'}`}>Altisto</span>
          {pathname === '/career' && (
            <span className={`text-[17px] font-light tracking-tight transition-colors duration-300 ${darkText ? 'text-[#0d1117]' : 'text-white'}`}>careers</span>
          )}
        </Link>

        {/* 데스크탑 내비 */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {links.map(l => {
            const isActive = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                className={`relative flex items-center h-full px-4 text-[14px] font-medium transition-colors duration-300 ${
                  darkText
                    ? isActive ? 'text-[#0d1117]' : 'text-[#6b7280] hover:text-[#0d1117]'
                    : isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}>
                {l.label}
                {isActive && (
                  <span className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-colors duration-300 ${darkText ? 'bg-[#0d1117]' : 'bg-white'}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 모바일 햄버거 */}
        <button onClick={() => setOpen(v => !v)}
          className="grid h-9 w-9 place-items-center md:hidden rounded-lg hover:bg-black/5 transition-colors"
          aria-label="메뉴 열기">
          {open ? <X size={20} className={darkText ? 'text-[#0d1117]' : 'text-white'} /> : <Menu size={20} className={darkText ? 'text-[#0d1117]' : 'text-white'} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${open ? 'max-h-80' : 'max-h-0'}`}>
        <nav className="px-6 py-4 flex flex-col gap-1 bg-white/80 backdrop-blur-md">
          {links.map(l => {
            const isActive = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`relative px-3 py-3 text-[15px] font-medium transition-colors border-l-2 ${
                  isActive
                    ? 'text-[#0d1117] border-[#0d1117] pl-4'
                    : 'text-[#6b7280] border-transparent hover:text-[#0d1117] hover:pl-4'
                }`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
