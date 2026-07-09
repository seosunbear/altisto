import type { Metadata } from 'next';
import HeroSection       from '@/components/HeroSection';
import GsapReveal        from '@/components/GsapReveal';
import WordReveal        from '@/components/WordReveal';
import LoadingScreen     from '@/components/LoadingScreen';
import GrowthChart       from '@/components/GrowthChart';
import CountUpStat       from '@/components/CountUpStat';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import ExploreList        from '@/components/ExploreList';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main className="flex-1">

      <LoadingScreen />

      {/* ━━━━━━━━━━━━━━━━━━ HERO — 자모 조립 애니메이션 ━━━━━━━━━━━━━━━━━━ */}
      <HeroSection />

      {/* ━━━━━━━━━━━━━━━━━━ START ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 py-60 md:py-80 overflow-hidden">

        {/* 콘텐츠 */}
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col items-center text-center">

          <GsapReveal type="fade-up" delay={0.05}>
            {/* 장식용 영문 라벨 — data-nosnippet으로 검색 스니펫에 "start."처럼 섞여 나오는 것 차단 */}
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40" aria-hidden="true">
              <span data-nosnippet>start</span>
            </p>
          </GsapReveal>

          {/* div → h2: 섹션 헤드라인임을 시맨틱하게 명시 */}
          <h2 className="flex flex-col items-center mb-8 max-w-2xl">
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
          </h2>

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

          {/* 정체성(개발사)을 먼저, 영상 팀 출발 히스토리는 스토리텔링으로 그 뒤에 배치 */}
          <GsapReveal type="fade-up" delay={0.6}>
            <p className="text-[14px] leading-[1.9] text-white/60 max-w-md">
              알티스토는 소프트웨어 및 플랫폼 개발사입니다.
              영상 크리에이터 팀으로 첫발을 내딛은 경험을 바탕으로,
              지금은 크리에이터 플랫폼 &lsquo;알티&rsquo;와 연령별 커뮤니티 &lsquo;리프챗&rsquo;을 만듭니다.
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

          <div className="flex flex-col gap-8">
            <div className="flex gap-12">
              <CountUpStat to={200}   suffix="+" label="누적 서비스 가입자 수" delay={0.1} />
              <CountUpStat to={90000} suffix="+" label="누적 조회 수"          delay={0.35} />
            </div>
            <CountUpStat to={20} suffix="+" label="운영 서비스 수" delay={0.6} />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ HISTORY — 마일스톤 타임라인 ━━━━━━━━━━━━━━━━━━ */}
      <MilestonesTimeline />

      {/* ━━━━━━━━━━━━━━━━━━ QUICK LINKS — 카카오 스타일 ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] px-6 md:px-10 py-28 md:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up" delay={0.05}>
            {/* 장식용 영문 라벨 — 스니펫 오염 방지 */}
            <p className="mb-12 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40" aria-hidden="true">
              <span data-nosnippet>explore</span>
            </p>
          </GsapReveal>

          {/* 인터랙티브 호버 리스트 */}
          <GsapReveal type="fade-up" delay={0.12} duration={0.85}>
            <ExploreList />
          </GsapReveal>
        </div>
      </section>

    </main>
  );
}
