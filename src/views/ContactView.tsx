import type { Metadata } from 'next';
import { Clock } from 'lucide-react';
import GsapReveal from '@/components/GsapReveal';
import ContactForm from '@/components/ContactForm';
import PageSchema from '@/components/PageSchema';
import Lines from '@/i18n/Lines';
import { getDictionary, pageMetadata, type Locale } from '@/i18n';

export function contactMetadata(locale: Locale): Metadata {
  const m = getDictionary(locale).contact.meta;
  return pageMetadata(locale, '/contact', {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    ogTitle: m.ogTitle,
    ogDescription: m.ogDescription,
  });
}

export default function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const ct = t.contact;

  return (
    <main className="flex-1 pt-[68px] bg-white">
      {/* 구조화 데이터 — 화면에는 아무것도 그리지 않는다 */}
      <PageSchema
        locale={locale}
        path="/contact"
        name={ct.meta.schemaName}
        description={ct.meta.schemaDescription}
        crumbs={[
          { name: t.homeCrumb, path: '/' },
          { name: ct.title, path: '/contact' },
        ]}
      />


      {/* ━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━ */}
      <section className="relative bg-[#181818] border-b border-[#e5e7eb] px-6 md:px-10 overflow-hidden py-12 md:py-16 lg:py-24 flex items-center">

        {/* 유성우 장식 */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg width="600" height="480" viewBox="0 0 600 480" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <path id="cp1" d="M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54" />
              <path id="cp2" d="M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139" />
              <path id="cp3" d="M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234" />
              <path id="cp4" d="M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322" />
              <path id="cp5" d="M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407" />
            </defs>
            <path d="M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z" fill="#93c5fd">
              <animateMotion dur="5s" begin="0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.88;1" dur="5s" begin="0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z" fill="#c4b5fd">
              <animateMotion dur="4.6s" begin="1.0s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.07;0.88;1" dur="4.6s" begin="1.0s" repeatCount="indefinite" />
            </path>
            <path d="M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z" fill="#f9a8d4">
              <animateMotion dur="4.1s" begin="2.1s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.1s" begin="2.1s" repeatCount="indefinite" />
            </path>
            <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#a5f3fc">
              <animateMotion dur="3.6s" begin="0.5s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.70;0.70;0" keyTimes="0;0.08;0.88;1" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
            </path>
            <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#fde68a">
              <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.08;0.88;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
            </path>
            <path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#a7f3d0">
              <animateMotion dur="3.9s" begin="2.8s" repeatCount="indefinite" rotate="auto"><mpath href="#cp2" /></animateMotion>
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.9s" begin="2.8s" repeatCount="indefinite" />
            </path>
            <path d="M0,-11 L2.8,-2.8 L11,0 L2.8,2.8 L0,11 L-2.8,2.8 L-11,0 L-2.8,-2.8 Z" fill="#ddd6fe">
              <animateMotion dur="4.4s" begin="2.2s" repeatCount="indefinite" rotate="auto"><mpath href="#cp4" /></animateMotion>
              <animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.07;0.88;1" dur="4.4s" begin="2.2s" repeatCount="indefinite" />
            </path>
            <path d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" fill="#fed7aa">
              <animateMotion dur="3.4s" begin="2.6s" repeatCount="indefinite" rotate="auto"><mpath href="#cp1" /></animateMotion>
              <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.88;1" dur="3.4s" begin="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z" fill="#bfdbfe">
              <animateMotion dur="4.8s" begin="0.9s" repeatCount="indefinite" rotate="auto"><mpath href="#cp5" /></animateMotion>
              <animate attributeName="opacity" values="0;0.75;0.75;0" keyTimes="0;0.07;0.88;1" dur="4.8s" begin="0.9s" repeatCount="indefinite" />
            </path>
            <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#fbcfe8">
              <animateMotion dur="3s" begin="3.4s" repeatCount="indefinite" rotate="auto"><mpath href="#cp3" /></animateMotion>
              <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.08;0.88;1" dur="3s" begin="3.4s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-xl flex flex-col items-start text-left pl-[8vw]">
          <GsapReveal type="clip-up" delay={0}>
            <h1 className="mb-2 font-extrabold tracking-[-0.03em] leading-[1.1] text-white text-[1.25rem] md:text-[clamp(1.6rem,3vw,2.4rem)]">
              {ct.title}
            </h1>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.25}>
            <p className="max-w-sm text-[11px] md:text-[12px] leading-[1.9] text-[#9ca3af]">
              <Lines text={ct.intro} />
            </p>
          </GsapReveal>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━ INQUIRY FORM ━━━━━━━━━━━━━━ */}
      <section className="bg-white border-b border-[#e5e7eb] px-6 md:px-10 py-24">
        <div className="mx-auto max-w-screen-xl">

          <GsapReveal type="fade-up">
            <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-[#9ca3af]">
              inquiry
            </p>
          </GsapReveal>
          <GsapReveal type="clip-up" delay={0.1}>
            <h2 className="mb-3 text-center text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold tracking-[-0.02em] text-[#0d1117]">
              {ct.formHeading}
            </h2>
          </GsapReveal>
          <GsapReveal type="fade-up" delay={0.18}>
            <p className="mb-12 text-center text-[13px] leading-[1.8] text-[#6b7280]">
              {ct.formIntro}
            </p>
          </GsapReveal>

          <GsapReveal type="fade-up" delay={0.24}>
            <ContactForm t={ct.form} />
          </GsapReveal>

          {/* 응답 시간 뱃지 */}
          <GsapReveal type="fade-up" delay={0.3} className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e5e7eb]
              bg-white px-5 py-2.5">
              <Clock size={13} className="text-[#9ca3af]" />
              <span className="text-[12px] text-[#6b7280]">{ct.response.before}<strong className="text-[#0d1117] font-semibold">{ct.response.strong}</strong>{ct.response.after}</span>
            </div>
          </GsapReveal>
        </div>
      </section>

    </main>
  );
}
