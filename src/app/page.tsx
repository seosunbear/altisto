import type { Metadata } from 'next';
import Image from 'next/image';

import GsapReveal from '@/components/GsapReveal';
import MilestonesTimeline from '@/components/MilestonesTimeline';
import MistralGrid from '@/components/mixtral';
import Groth from '@/components/groth';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const CONTAINER = 'relative z-10 mx-auto max-w-screen-xl';

const HEADING =
  'text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.2] tracking-tight';

/* 그래프 섹션은 수치가 주인공이라 제목을 한 단계 낮춘다 */
const HEADING_SM =
  'text-[clamp(1.3rem,2.4vw,1.9rem)] font-extrabold leading-[1.25] tracking-tight';


export default function HomePage() {

  return (
    <main className="flex-1">


      {/* =====================================================
          MISTRAL STYLE GRID
          ===================================================== */}

      <MistralGrid />

      <Groth/>


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


    {/* IMAGE */}
    <GsapReveal
      type="clip-up"
      duration={1.2}
      start="top 92%"
    >
      <div
        className="
          mx-auto
          max-w-[1120px]
        "
      >
        <div
          className="
  relative
  mx-auto
  aspect-square
  w-full
  max-w-[410px]
  overflow-hidden
  rounded-2xl
  md:rounded-3xl
"
        >
          <Image
            src="/altistosecurities.jpg"
            alt="Altisto securities"
            fill
            sizes="
              (min-width: 1360px) 1120px,
              (min-width: 768px) calc(100vw - 80px),
              calc(100vw - 48px)
            "
            quality={90}
            className="object-cover"
          />
        </div>
      </div>
    </GsapReveal>

  </div>
</section>

    </main>
  );
}