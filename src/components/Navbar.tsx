'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: '서비스', href: '/services' },
  { label: '메리', href: '/merry' },
  { label: '채용', href: '/career' },
  { label: '문의', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [overLight, setOverLight] = useState(false);

  // 홈만 어두운 히어로(흰 텍스트), 그 외 페이지는 어바웃처럼 어두운 텍스트.
  // 홈이라도 흰 배경 섹션(data-nav-light) 위를 지날 땐 흰 글자가 묻히므로 어두운 글자로 전환한다.
  const isHome = pathname === '/';
  const darkText = !isHome || overLight;

  useEffect(() => {
    /* 헤더 높이의 중간 지점(y=34)에 흰 배경 섹션이 걸쳐 있는지 매 스크롤마다 판정 */
    const lightSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-light]'));

    const measure = () => {
      setScrolled(window.scrollY > 4);

      /* 흰 배경 섹션이 하나도 없으면 rect 를 잴 이유가 없다.
         getBoundingClientRect 는 강제 동기 레이아웃이라, GSAP 이 방금 쓴
         핀 transform 을 매 프레임 다시 계산하게 만들어 스크롤이 끊긴다. */
      if (!lightSections.length) return;

      setOverLight(lightSections.some(el => {
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 34 && bottom >= 34;
      }));
    };

    /* 스크롤 이벤트마다 부르면 GSAP 핀 애니메이션과 겹쳐 모바일이 버벅이므로
       프레임당 한 번으로 묶는다. */
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
    <header
      /* backdrop-blur 는 md 이상에서만 켠다.
         backdrop-filter 가 걸린 fixed 헤더는 아래 내용이 스크롤될 때마다
         합성기가 배경을 다시 블러 처리해야 해서, 핀이 걸린 히어로가
         움직이는 동안 모바일에서 프레임을 그대로 잡아먹는다.
         모바일에서는 같은 인상을 주는 반투명 단색으로 대체한다.
         transition 도 all 이 아니라 색상으로 좁힌다(all 은 backdrop-filter
         까지 매 프레임 보간한다). */
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? darkText
            /* 밝은 배경 위 — 불투명 흰 헤더. 투명 blur로 두면 아래 글자가 번져 보인다 */
            ? 'bg-white/90 md:backdrop-blur-md border-b border-[#e5e7eb]'
            : 'bg-[#101014]/70 md:bg-transparent md:backdrop-blur-md border-b border-transparent'
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

    </header>

    {/* 모바일 메뉴 — 오른쪽 슬라이드 드로어 */}
    {/* 배경 딤 */}
    <div
      onClick={() => setOpen(false)}
      className={`fixed inset-0 z-[55] bg-black/40 transition-opacity duration-300 md:hidden ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    />
    {/* 드로어 패널 */}
    <aside
      className={`fixed top-0 right-0 z-[60] h-full w-[280px] max-w-[80vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-[68px] items-center justify-end px-4">
        <button onClick={() => setOpen(false)}
          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 transition-colors"
          aria-label="메뉴 닫기">
          <X size={20} className="text-[#0d1117]" />
        </button>
      </div>
      <nav className="px-6 py-2 flex flex-col gap-1">
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
    </aside>
    </>
  );
}
