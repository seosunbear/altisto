import type { Metadata } from 'next';
import Image              from 'next/image';
import HeroSection        from '@/components/HeroSection';
import GsapReveal         from '@/components/GsapReveal';
import LoadingScreen      from '@/components/LoadingScreen';
import GrowthChart        from '@/components/GrowthChart';
import CountUpStat        from '@/components/CountUpStat';
import MilestonesTimeline from '@/components/MilestonesTimeline';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/* 모든 섹션이 같은 좌우 여백·헤드라인 타이포를 공유한다 (색상만 섹션별로 지정) */
const CONTAINER = 'relative z-10 mx-auto max-w-screen-xl';
const HEADING   = 'text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight';

export default function HomePage() {
  return (
    <main className="flex-1">

      <LoadingScreen />

      {/* ━━━━━━━━━━━━━━━━━━ HERO — 자모 조립 애니메이션 ━━━━━━━━━━━━━━━━━━ */}
      <HeroSection />


      {/* ━━━━━━━━━━━━━━━━━━ GROWTH — 우상향 그래프 ━━━━━━━━━━━━━━━━━━ */}
      {/* 아래 여백만 다른 섹션보다 크다 — 그 자리를 그래프 띠가 채운다.
          py 유틸리티와 충돌하지 않도록 위/아래 패딩을 따로 적는다 */}
      <section className="relative overflow-hidden bg-[#0a0a0f] px-6 pt-28 pb-[280px] md:px-10 md:pt-40 md:pb-[470px]">

        {/* 그래프는 섹션 아래쪽 고정 높이 띠 — 글자 영역과 구조적으로 겹치지 않는다.
            아래 패딩 = 이 높이 + 여유분(40~50px). 높이를 바꾸면 패딩도 같이 바꿔야 한다 */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] md:h-[420px]">
          <GrowthChart />
        </div>

        <div className={CONTAINER}>

          <GsapReveal type="fade-up" delay={0.12}>
            <h2 className={`mb-4 ${HEADING} text-white`}>
              사용자라는 관객을 위해<br />끊임없이 변화하는 사람들
            </h2>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.2}>
            <p className="mb-14 max-w-md break-keep text-[14px] leading-[1.7] text-white/60">
              화려한 숫자는 없지만 매일 어제보다 한 걸음 더 나아갑니다.
            </p>
          </GsapReveal>

          {/* 2열 고정 — 세 번째 지표(운영 서비스 수)는 PC에서도 아랫줄로 내린다 */}
          <div className="grid max-w-md grid-cols-2 gap-x-12 gap-y-10">
            <CountUpStat to={200}   suffix="+" label="누적 서비스 가입자 수" delay={0.1}  />
            <CountUpStat to={90000} suffix="+" label="누적 조회 수"          delay={0.25} />
            <CountUpStat to={20}    suffix="+" label="운영 서비스 수"        delay={0.4}  />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ HISTORY — 마일스톤 타임라인 ━━━━━━━━━━━━━━━━━━ */}
      <MilestonesTimeline />

      {/* ━━━━━━━━━━━━━━━━━━ SECURITY — 정보 보호 약속 ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#0a0a0f] pt-28 pb-28 md:pt-40 md:pb-40">

        {/* 좌우 여백을 바깥 div가 맡는다 — 다른 섹션과 글자 시작선을 정확히 맞추기 위함 */}
        <div className="px-6 md:px-10">
        {/* 아래 이미지가 좌우 대칭으로 놓이므로 글자도 가운데 정렬로 맞춘다 */}
        <div className={`${CONTAINER} mb-14 text-center md:mb-20`}>
          <GsapReveal type="fade-up" delay={0.05}>
            <h2 className={`mb-4 ${HEADING} text-white`}>
              내 정보는 항상 안전하게
            </h2>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.12}>
            <p className="mx-auto max-w-md break-keep text-[14px] leading-[1.7] text-white/60">
              알티스토는 항상 높은 수준의 보안을 만들어가고 있어요
            </p>
          </GsapReveal>
        </div>
        </div>

        {/* 약속에 찍는 인장 — 글자와 같은 컨테이너 폭에 맞춘다.
            워드마크가 이미지 안에 이미 들어 있으므로 위에 텍스트를 얹지 않는다. */}
        <div className="px-6 md:px-10">
        <div className={CONTAINER}>
          <GsapReveal type="clip-up" duration={1.2} start="top 92%">
            {/* 양옆 여백 — 패딩은 바깥 div가 맡는다.
                fill 이미지는 relative 부모의 '패딩 박스'를 기준으로 깔리기 때문에
                같은 div에 패딩을 주면 이미지가 들여쓰기되지 않는다 */}
            <div className="px-6 md:px-20">
              {/* 높이는 고정, 폭만 잘린다. 모서리 라운드는 부모에서 클립 */}
              <div className="relative h-[260px] w-full overflow-hidden rounded-2xl md:h-[410px] md:rounded-3xl">
                <Image
                  src="/altistosecurities.jpg"
                  alt="Altisto securities"
                  fill
                  sizes="(min-width: 1360px) 1120px, 100vw"
                  quality={90}   /* 어두운 그라데이션 — 기본 75에서는 밴딩이 보인다 */
                  className="object-cover"
                />
              </div>
            </div>
          </GsapReveal>
        </div>
        </div>
      </section>

    </main>
  );
}
