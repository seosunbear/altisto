import type { Metadata } from 'next';

import GsapReveal from '@/components/GsapReveal';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import MistralGrid from '@/components/mixtral';
import GrowthChart from '@/components/GrowthChart';
import CountUpStat from '@/components/CountUpStat';
import SecurityShowcase from '@/components/SecurityShowcase';
import PageSchema from '@/components/PageSchema';
import { ARTI_ID, LEAFCHAT_ID, OURSCHOOL_ID } from '@/lib/site';
import Lines from '@/i18n/Lines';
import { getDictionary, pageMetadata, type Locale } from '@/i18n';

/* 홈은 제목을 따로 두지 않는다 — 레이아웃의 기본 제목(사이트 제목)을 쓴다 */
export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata(locale, '/', {
    description: t.home.meta.description,
    ogTitle: t.meta.siteTitle,
    ogDescription: t.meta.ogDescription,
  });
}

const CONTAINER = 'relative z-10 mx-auto max-w-screen-xl mt-10 md:mt-0';

const HEADING =
  'text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight';

/* 그래프 섹션은 수치가 주인공이라 제목을 한 단계 낮춘다.
   최솟값(1.3rem)은 모바일 크기 그대로, PC 에서 커지는 폭만 줄였다 */
const HEADING_SM =
  'text-[clamp(1.3rem,1.8vw,1.6rem)] font-extrabold leading-[1.25] tracking-tight';


export default function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = t.home;

  return (
    <main className="flex-1">
      {/* 홈의 주 제목 — 화면에는 나오지 않는다.
          히어로 문구는 롤링 애니메이션(CharRoll)이 글자마다 복제본을 DOM 에
          깔아 두는 구조라, 그걸 h1 로 쓰면 크롤러에게 '콘콘텐텐츠츠…'로
          읽힌다. 그래서 애니메이션은 장식으로 두고, 같은 문장을 깨끗한
          텍스트로 한 번 더 적는다. 화면에 보이는 문구 그대로라 숨긴 키워드가
          아니다. */}
      <h1 className="sr-only">{home.h1}</h1>

      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        locale={locale}
        path="/"
        name={t.meta.siteTitle}
        description={home.meta.schemaDescription}
        mentions={[ARTI_ID, OURSCHOOL_ID, LEAFCHAT_ID]}
      />


      {/* =====================================================
          MISTRAL STYLE GRID
          ===================================================== */}

      <MistralGrid headline={home.hero} motto={home.motto} />

       {/* =====================================================
          GROWTH
          ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#0a0a0f]
          pl-10
          pr-6
          pt-15
          pb-[240px]
          md:pl-20
          md:pr-20
          md:pt-30
          md:pb-[420px]
          h-[700px]
          md:h-[780px]
        "
      >

        {/* 그래프는 섹션 아래쪽 고정 높이 띠 — 글자 영역과 겹치지 않는 선에서 최대한 붙인다.
            아래 패딩 = 이 높이(여유분 없이 딱 맞춤). 높이를 바꾸면 패딩도 같이 바꿔야 한다.

            PC 는 700px 높이로 그리고 140px 내려서 글과 띄운다. 섹션은 780px.
            선의 가장 낮은 점이 그래프 높이의 86%(y 430/500)라
            140 + 700 × 0.86 = 742px — 섹션 바닥(780) 안에 남는다.
            채우기는 88% 지점(756px)에서 다 사라져 바닥 경계가 비치지 않는다.
            더 내리려면 섹션 높이(md:h-[780px])도 같이 늘려야 한다. 예전엔
            880px 고정이라 선의 왼쪽 시작점과 가운데 골짜기가 바닥에서 잘렸다. */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-100
            md:top-[140px]
            h-[300px]
            md:h-[700px]
          "
        >
          <GrowthChart />
        </div>


        <div className={`${CONTAINER} mt-0 md:mt-8`} >

          <GsapReveal type="fade-up" delay={0.12}>
            <h2 className={`mb-1 ${HEADING_SM} text-white`}>
              <Lines text={home.growth.heading} />
            </h2>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.2}>
            <p
              className="
                mb-5
                max-w-md
                break-keep
                text-[clamp(10px,0.55rem+0.35vw,14px)]
                leading-[1.7]
                text-white/60
              "
            >
              {home.growth.sub}
            </p>
          </GsapReveal>

          {/* 2열 고정 — 세 번째 지표는 PC에서도 아랫줄로 내린다 */}

          <div className="grid max-w-md grid-cols-2  gap-y-5">

            <CountUpStat to={200} suffix="+" label={home.growth.stats[0]} delay={0.1} />
            <CountUpStat to={90000} suffix="+" label={home.growth.stats[1]} delay={0.25} />
            <CountUpStat to={20} suffix="+" label={home.growth.stats[2]} delay={0.4} />

          </div>

        </div>

      </section>



      {/* =====================================================
          HISTORY
          ===================================================== */}

      <MilestonesTimeline t={home.history} />


      {/* =====================================================
          SECURITY
          ===================================================== */}

     <section
  className="
    relative
    overflow-hidden
    bg-[#0a0a0f]
    px-6
    py-28
    md:px-10
    md:py-40
  "
>
  <div className={CONTAINER}>

    {/* HEADER */}
    <div
      className="
        mx-auto
        mb-14
        max-w-2xl
        text-center
        md:mb-20
      "
    >
      <GsapReveal
        type="fade-up"
        delay={0.05}
      >
        <h2
          className={`
            ${HEADING}
            mb-4
            text-white
          `}
        >
          {home.security.heading}
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
          {home.security.sub}
        </p>
      </GsapReveal>
    </div>


    {/* IMAGE + 양옆 윤곽선 카드 — 등장 연출은 SecurityShowcase 한 타임라인에 묶여 있다 */}
    <SecurityShowcase alt={home.security.imageAlt} />

  </div>
</section>

    </main>
  );
}