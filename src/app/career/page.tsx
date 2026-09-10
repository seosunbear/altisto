import type { Metadata } from 'next';
import GsapReveal from '@/components/GsapReveal';
import CometField from '@/components/CometField';
import JobBoard from '@/components/JobBoard';
import PageSchema from '@/components/PageSchema';

export const metadata: Metadata = {
  title: '채용',
  description:
    '콘텐츠 그 이상의 가치를 만드는 여정, 이 즐거운 도전에 함께할 동료를 찾습니다. 알티스토의 열린 포지션을 확인해 보세요.',
  alternates: { canonical: '/career' },
  keywords: ['알티스토 채용', 'Altisto 채용', '스타트업 채용', '개발자 채용', '디자이너 채용', '소프트웨어 회사 채용'],
  openGraph: {
    title: '채용 | 알티스토',
    description: '알티스토와 함께할 동료를 찾습니다. 열린 포지션을 확인해 보세요.',
    url: '/career',
  },
};

export default function CareerPage() {
  return (
    <main className="flex-1 pt-[68px] bg-white">
      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        path="/career"
        name="채용 | 알티스토"
        description="소프트웨어 및 플랫폼 개발사 알티스토의 열린 포지션 안내."
        crumbs={[
          { name: '홈', path: '/' },
          { name: '채용', path: '/career' },
        ]}
      />


      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#181818] border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-12 md:py-16 lg:py-24 flex items-center">

        {/* 유성우 장식 */}
        <CometField />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-2 font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-[1.25rem] md:text-[clamp(1.6rem,3vw,2.4rem)]">
              채용
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[11px] md:text-[12px] leading-[1.9] text-[#9ca3af]">
              인터넷을 넘어 삶을 바꾸는,<br />
              여정을 함께할 아티스트를 찾습니다.
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ JOBS ━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 md:px-10 pt-12 md:pt-16 pb-24">
        <GsapReveal type="fade-up">
          <JobBoard />
        </GsapReveal>
      </section>

    </main>
  );
}
