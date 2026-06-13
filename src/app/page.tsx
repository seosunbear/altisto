import Link              from 'next/link';
import { ArrowRight }    from 'lucide-react';
import HeroSection       from '@/components/HeroSection';
import GsapReveal        from '@/components/GsapReveal';
import WordReveal        from '@/components/WordReveal';
import LoadingScreen     from '@/components/LoadingScreen';
import GrowthChart       from '@/components/GrowthChart';
import CountUpStat       from '@/components/CountUpStat';

export default function HomePage() {
  return (
    <main className="flex-1">

      <LoadingScreen />

      {/* ━━━━━━━━━━━━━━━━━━ HERO — 자모 조립 애니메이션 ━━━━━━━━━━━━━━━━━━ */}
      <HeroSection />

      {/* ━━━━━━━━━━━━━━━━━━ START ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 py-28 overflow-hidden">

        {/* 콘텐츠 */}
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col items-center text-center">

          <GsapReveal type="fade-up" delay={0.05}>
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              start
            </p>
          </GsapReveal>

          <div className="flex flex-col items-center mb-8 max-w-2xl">
            <WordReveal
              text="사용자라는 관객을 위해"
              className="text-[clamp(1rem,2vw,2rem)] font-extrabold leading-[1.2] tracking-tight text-white"
              delay={0.1}
              stagger={0.09}
            />
            <WordReveal
              text="끊임없이 변화를 추구하는 사람들"
              className="text-[clamp(1.6rem,3.8vw,2.8rem)] font-extrabold leading-[1.2] tracking-tight text-white"
              delay={0.2}
              stagger={0.09}
            />
          </div>

          <GsapReveal type="fade-up" delay={0.45}>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-12 bg-white/20 origin-right" style={{ animation: 'line-expand 0.6s 0.5s ease both' }} />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffffff" opacity="0.5"
                style={{ animation: 'star-twinkle 2s 0.6s ease-in-out infinite' }}>
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
              <div className="h-px w-12 bg-white/20 origin-left" style={{ animation: 'line-expand 0.6s 0.5s ease both' }} />
            </div>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.6}>
            <p className="text-[14px] leading-[1.9] text-white/60 max-w-sm">
              We are artists and maestros
            </p>
          </GsapReveal>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ GROWTH — 우상향 그래프 배경 ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 pt-12 pb-52 md:pt-16 md:pb-72 min-h-[90vh] overflow-hidden">

        {/* 배경 그래프 */}
        <GrowthChart />

        {/* 왼쪽 위 — 텍스트 */}
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col items-start text-left">
          <GsapReveal type="fade-up" delay={0.12}>
            <h2 className="mb-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              시작은 미미하지만<br />끝은 창대하게
            </h2>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.2}>
            <p className="mb-6 max-w-md text-[14px] leading-[1.6] text-white/60">
              화려한 숫자는 없지만 매일 어제보다 한 걸음 더 나아갑니다.
            </p>
          </GsapReveal>

          <div className="flex gap-12">
            <CountUpStat to={200}   suffix="+" label="누적 서비스 가입자 수" delay={0.1} />
            <CountUpStat to={20}    suffix="+" label="운영 서비스 수"        delay={0.35} />
            <CountUpStat to={90000} suffix="+" label="누적 조회 수"          delay={0.6} />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ QUICK LINKS — 카카오 스타일 ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 py-28 md:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up" delay={0.05}>
            <p className="mb-12 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              explore
            </p>
          </GsapReveal>

          {/* 하이라인 구분 그리드 */}
          <div className="grid grid-cols-1 border-l border-t border-white/10 md:grid-cols-2">
            {[
              { no: '01', en: 'Services', ko: '서비스',     desc: '알티와 리프챗, 우리가 만든 서비스를 만나보세요.', href: '/services' },
              { no: '02', en: 'About',    ko: '회사 소개',   desc: '알티스토가 그리는 콘텐츠 생태계의 비전.',         href: '/about'    },
              { no: '03', en: 'Contact',  ko: '문의하기',     desc: '협업·제휴·서비스 문의는 언제든 환영합니다.',       href: '/contact'  },
              { no: '04', en: 'Careers',  ko: '함께하기',     desc: '함께 성장할 동료를 기다리고 있습니다.',           href: '/career'   },
            ].map((q, i) => (
              <GsapReveal key={q.en} type="clip-up" className="h-full border-b border-r border-white/10" delay={0.12 + i * 0.13} duration={0.85}>
                <Link
                  href={q.href}
                  className="group relative flex h-full flex-col justify-between bg-[#0a0a0f] p-9 md:p-12 transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <div className="mb-16 flex items-start justify-between">
                    <span className="text-[12px] font-bold tracking-widest text-white/30">{q.no}</span>
                    <ArrowRight
                      size={22}
                      className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">{q.en}</p>
                    <h3 className="mb-3 text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-tight text-white">{q.ko}</h3>
                    <p className="text-[13px] leading-[1.7] text-white/55">{q.desc}</p>
                  </div>
                </Link>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ CTA ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 py-32 md:py-40 overflow-hidden">
        {/* 은은한 광원 */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1d4ed8]/15 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col items-center text-center">
          <GsapReveal type="fade-up" delay={0.05}>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              get started
            </p>
          </GsapReveal>

          <WordReveal
            text="함께 만들어 갈 준비가 되셨나요?"
            className="mb-6 text-[clamp(1.7rem,4vw,3rem)] font-extrabold tracking-tight text-white"
            stagger={0.08}
          />

          <GsapReveal type="fade-up" delay={0.3}>
            <p className="mb-9 max-w-md text-[14px] leading-[1.9] text-white/60">
              알티스토와 함께 콘텐츠 그 이상의 가치를 만들어 보세요.
            </p>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.4}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[14px] font-semibold text-[#0d1117] transition-colors duration-300 hover:bg-[#60a5fa] hover:text-white"
            >
              문의하기 <ArrowRight size={15} />
            </Link>
          </GsapReveal>
        </div>
      </section>

    </main>
  );
}
