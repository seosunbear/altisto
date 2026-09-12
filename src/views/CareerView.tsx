import type { Metadata } from 'next';
import GsapReveal from '@/components/GsapReveal';
import CometField from '@/components/CometField';
import JobBoard from '@/components/JobBoard';
import PageSchema from '@/components/PageSchema';
import Lines from '@/i18n/Lines';
import { getDictionary, pageMetadata, type Locale } from '@/i18n';

export function careerMetadata(locale: Locale): Metadata {
  const m = getDictionary(locale).career.meta;
  return pageMetadata(locale, '/career', {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    ogTitle: m.ogTitle,
    ogDescription: m.ogDescription,
  });
}

export default function CareerView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const cr = t.career;

  return (
    <main className="flex-1 pt-[68px] bg-white">
      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        locale={locale}
        path="/career"
        name={cr.meta.schemaName}
        description={cr.meta.schemaDescription}
        crumbs={[
          { name: t.homeCrumb, path: '/' },
          { name: cr.title, path: '/career' },
        ]}
      />


      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#181818] border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-12 md:py-16 lg:py-24 flex items-center">

        {/* 유성우 장식 */}
        <CometField />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-2 font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-[1.25rem] md:text-[clamp(1.6rem,3vw,2.4rem)]">
              {cr.title}
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[11px] md:text-[12px] leading-[1.9] text-[#9ca3af]">
              <Lines text={cr.intro} />
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ JOBS ━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 md:px-10 pt-12 md:pt-16 pb-24">
        <GsapReveal type="fade-up">
          <JobBoard locale={locale} t={cr.board} />
        </GsapReveal>
      </section>

    </main>
  );
}
