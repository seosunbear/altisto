import type { Metadata } from 'next';
import Image from 'next/image';

import GsapReveal from '@/components/GsapReveal';
import GrowthChart from '@/components/GrowthChart';
import CountUpStat from '@/components/CountUpStat';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import MistralGrid from '@/components/mixtral';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const CONTAINER = 'relative z-10 mx-auto max-w-screen-xl';

const HEADING =
  'text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight';


export default function HomePage() {

  return (
    <main className="flex-1">


      {/* =====================================================
          MISTRAL STYLE GRID
          ===================================================== */}

      <MistralGrid />


      {/* =====================================================
          GROWTH
          ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#0a0a0f]
          px-6
          pt-28
          pb-[280px]
          md:px-10
          md:pt-40
          md:pb-[470px]
        "
      >

        {/* 그래프는 섹션 아래쪽 고정 높이 띠 — 글자 영역과 겹치지 않는다.
            아래 패딩 = 이 높이 + 여유분. 높이를 바꾸면 패딩도 같이 바꿔야 한다 */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[240px]
            md:h-[420px]
          "
        >
          <GrowthChart />
        </div>


        <div className={CONTAINER}>

          <GsapReveal type="fade-up" delay={0.12}>
            <h2 className={`mb-4 ${HEADING} text-white`}>
              사용자라는 관객을 위해
              <br />
              끊임없이 변화하는 사람들
            </h2>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.2}>
            <p
              className="
                mb-14
                max-w-md
                break-keep
                text-[14px]
                leading-[1.7]
                text-white/60
              "
            >
              화려한 숫자는 없지만 매일 어제보다 한 걸음 더 나아갑니다.
            </p>
          </GsapReveal>

          {/* 2열 고정 — 세 번째 지표는 PC에서도 아랫줄로 내린다 */}

          <div className="grid max-w-md grid-cols-2 gap-x-12 gap-y-10">

            <CountUpStat to={200} suffix="+" label="누적 서비스 가입자 수" delay={0.1} />
            <CountUpStat to={90000} suffix="+" label="누적 조회 수" delay={0.25} />
            <CountUpStat to={20} suffix="+" label="운영 서비스 수" delay={0.4} />

          </div>

        </div>

      </section>


      {/* =====================================================
          HISTORY
          ===================================================== */}

      <MilestonesTimeline />


      {/* =====================================================
          SECURITY
          ===================================================== */}

      <section
        className="
          relative
          bg-[#0a0a0f]
          pt-28
          pb-28
          md:pt-40
          md:pb-40
        "
      >

        {/* HEADER */}

        <div className="px-6 md:px-10">

          <div
            className={`
              ${CONTAINER}
              mb-14
              text-center
              md:mb-20
            `}
          >

            <GsapReveal
              type="fade-up"
              delay={0.05}
            >

              <h2
                className={`mb-4 ${HEADING} text-white`}
              >
                내 정보는 항상 안전하게
              </h2>

            </GsapReveal>


            <GsapReveal
              type="fade-up"
              delay={0.12}
            >

              <p
                className="
                  mx-auto
                  max-w-md
                  break-keep
                  text-[14px]
                  leading-[1.7]
                  text-white/60
                "
              >
                알티스토는 항상 높은 수준의
                보안을 만들어가고 있어요
              </p>

            </GsapReveal>

          </div>

        </div>


        {/* IMAGE */}

        <div className="px-6 md:px-10">

          <div className={CONTAINER}>

            <GsapReveal
              type="clip-up"
              duration={1.2}
              start="top 92%"
            >

              <div className="px-6 md:px-20">

                <div
                  className="
                    relative
                    h-[260px]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    md:h-[410px]
                    md:rounded-3xl
                  "
                >

                  <Image
                    src="/altistosecurities.jpg"
                    alt="Altisto securities"
                    fill
                    sizes="
                      (min-width: 1360px) 1120px,
                      100vw
                    "
                    quality={90}
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