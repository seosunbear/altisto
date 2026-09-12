'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Check, ChevronDown, Globe, Menu, X } from 'lucide-react';
import { LOCALE_LABEL, LOCALES, localePath, stripLocale, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ko';

const LINK_PATHS = [
  { key: 'services', path: '/services' },
  { key: 'merry', path: '/merry' },
  { key: 'career', path: '/career' },
  { key: 'contact', path: '/contact' },
] as const;

export default function Navbar({ locale, t }: { locale: Locale; t: Dictionary['nav'] }) {
  const pathname = usePathname();
  const links = LINK_PATHS.map(l => ({ label: t[l.key], href: localePath(locale, l.path) }));

  /* 언어 전환 — 지금 보고 있는 페이지의 다른 언어판으로 보낸다.
     루트 레이아웃이 달라 어차피 전체 새로고침이라 <Link> 대신 <a> 를 쓴다
     (다른 언어판을 미리 받아 두는 prefetch 도 막는다). */
  const basePath = stripLocale(pathname);
  const languages = LOCALES.map(l => ({ locale: l, href: localePath(l, basePath), ...LOCALE_LABEL[l] }));
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const [overLight, setOverLight] = useState(false);

  // 홈만 어두운 히어로(흰 텍스트), 그 외 페이지는 어바웃처럼 어두운 텍스트.
  // 홈이라도 흰 배경 섹션(data-nav-light) 위를 지날 땐 흰 글자가 묻히므로 어두운 글자로 전환한다.
  const isHome = pathname === localePath(locale, '/');
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

  /* 언어 드롭다운 — 바깥 클릭·Esc 로 닫는다 */
  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

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
        <Link href={localePath(locale, '/')} onClick={() => setOpen(false)}
          className="flex items-baseline gap-1.5 select-none group">
          <span className={`text-[17px] font-bold tracking-tight transition-colors duration-300 ${darkText ? 'text-[#0d1117]' : 'text-white'}`}>Altisto</span>
          {pathname === localePath(locale, '/career') && (
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

          {/* 언어 전환 — 링크 줄 끝의 드롭다운 */}
          <div
            ref={langRef}
            className={`relative ml-2 border-l pl-3 transition-colors duration-300 ${darkText ? 'border-[#e5e7eb]' : 'border-white/20'}`}
          >
            <button
              type="button"
              onClick={() => setLangOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={langOpen}
              aria-label={`${t.language}: ${LOCALE_LABEL[locale].native}`}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] font-semibold tracking-[0.06em] transition-colors duration-300 ${
                darkText
                  ? 'text-[#0d1117] hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe size={14} strokeWidth={2} aria-hidden />
              {LOCALE_LABEL[locale].short}
              <ChevronDown size={13} strokeWidth={2.25} aria-hidden
                className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* 닫혀 있어도 DOM 에 남겨 둔다 — invisible 이라 탭 순서·스크린리더에서는 빠진다 */}
            <div
              role="group"
              aria-label={t.language}
              className={`absolute right-0 top-[calc(100%+8px)] min-w-[148px] origin-top-right rounded-xl border border-[#e5e7eb] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform,visibility] ${
                langOpen
                  ? 'visible scale-100 opacity-100 duration-150 ease-out'
                  : 'invisible scale-[0.97] opacity-0 duration-100 ease-in'
              }`}
            >
              {languages.map(l => {
                const current = l.locale === locale;
                return (
                  <a key={l.locale} href={l.href} hrefLang={l.locale} lang={l.locale}
                    aria-current={current ? 'true' : undefined}
                    onClick={() => setLangOpen(false)}
                    className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                      current
                        ? 'font-semibold text-[#0d1117]'
                        : 'font-medium text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#0d1117]'
                    }`}>
                    <span>{l.native}</span>
                    {current
                      ? <Check size={14} strokeWidth={2.5} aria-hidden />
                      : <span className="text-[11px] font-semibold tracking-[0.06em] text-[#9ca3af]">{l.short}</span>}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* 모바일 햄버거 */}
        <button onClick={() => setOpen(v => !v)}
          className="grid h-9 w-9 place-items-center md:hidden rounded-lg hover:bg-black/5 transition-colors"
          aria-label={t.openMenu}>
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
          aria-label={t.closeMenu}>
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

      {/* 언어 전환 — 드로어 아래쪽, 각 언어를 그 언어 이름으로 */}
      <div className="mx-6 mt-6 border-t border-[#e5e7eb] px-3 pt-5">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#9ca3af]">{t.language}</p>
        <div role="group" aria-label={t.language} className="flex flex-wrap gap-2">
          {languages.map(l => (
            <a key={l.locale} href={l.href} hrefLang={l.locale} lang={l.locale}
              aria-current={l.locale === locale ? 'true' : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                l.locale === locale
                  ? 'border-[#0d1117] bg-[#0d1117] text-white'
                  : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#0d1117] hover:text-[#0d1117]'
              }`}>
              {l.native}
            </a>
          ))}
        </div>
      </div>
    </aside>
    </>
  );
}
