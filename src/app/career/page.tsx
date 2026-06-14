import type { Metadata } from 'next';
import GsapReveal from '@/components/GsapReveal';
import WordReveal from '@/components/WordReveal';
import JobBoard from '@/components/JobBoard';

export const metadata: Metadata = {
  title: '채용',
  description:
    '콘텐츠 그 이상의 가치를 만드는 여정, 이 즐거운 도전에 함께할 동료를 찾습니다. 알티스토의 열린 포지션을 확인해 보세요.',
};

export default function CareerPage() {
  return (
    <main className="flex-1 pt-[68px]">

      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative mx-4 md:mx-8 mt-3 mb-12 h-36 md:h-64 md:mb-16 flex items-end justify-start px-8 md:px-14 md:min-h-[30px] overflow-hidden rounded-none md:rounded-4xl">
        {/* 배경 사진 */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/main.png)' }}
        />
        {/* 가독성용 오버레이 */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))' }}
        />

        <div className="relative mb-8 z-10 w-full text-right">
          <WordReveal
            text="인터넷을 넘어 삶을 바꾸는"
            className="block text-[clamp(0.85rem,2.6vw,1.5rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white"
            stagger={0.08}
          /><WordReveal
            text="여정을 함께할 아티스트를 찾습니다"
            className="block text-[clamp(0.85rem,1vw,1.9rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white"
            stagger={0.08}
          />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ JOBS ━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 md:px-10 pb-24">
        <GsapReveal type="fade-up">
          <JobBoard />
        </GsapReveal>
      </section>

    </main>
  );
}
