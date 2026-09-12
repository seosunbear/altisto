import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ARTI_ID, LEAFCHAT_ID, MERI_ID, MERI_IMAGE_ID, MERI_INSTAGRAM, ORG_ID, ORG_INSTAGRAM, OURSCHOOL_ID, SITE_ID, SITE_URL } from "@/lib/site";
import { getDictionary, LOCALES, localePath, OG_LOCALE, SCHEMA_LANG, type Locale } from "@/i18n";

/* ──────────────────────────────────────────────────────────
   루트 레이아웃 본체 — app/(ko)/layout.tsx 와 app/[lang]/layout.tsx 가
   언어만 바꿔 같이 쓴다. 루트 레이아웃이 둘이라 <html lang> 이
   언어마다 제대로 찍힌다(i18n/config.ts 참고).
   ────────────────────────────────────────────────────────── */

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.siteTitle,
      template: t.titleTemplate,
    },
    description: t.description,
    keywords: t.keywords,
    applicationName: t.siteName,
    authors: [{ name: t.siteName, url: SITE_URL }],
    creator: t.siteName,
    publisher: t.siteName,
    /* 검색엔진 소유 확인 태그. 값은 코드가 아니라 Vercel 환경변수로 넣는다
       (구글 서치콘솔 / 네이버 서치어드바이저 / 빙 웹마스터에서 발급).
       비어 있으면 태그 자체를 내보내지 않는다. 정적 페이지라 값을 넣은 뒤
       재배포해야 반영된다. */
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      other: {
        ...(process.env.NAVER_SITE_VERIFICATION
          ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
          : {}),
        ...(process.env.BING_SITE_VERIFICATION
          ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
          : {}),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: t.siteTitle,
      description: t.ogDescription,
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url: localePath(locale, "/"),
      siteName: t.siteName,
      images: [
        {
          url: "/og.jpg",
          width: 1920,
          height: 1080,
          alt: t.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.twitterDescription,
      images: ["/og.jpg"],
    },
  };
}

/* Organization + 하위 프로덕트(알티·우리학교·리프챗)를 하나의 @graph로 연결한 구조화 데이터.
   법인 등록 전 프로젝트 팀/회사 조직 기준이라 legalName·사업자번호류 필드는 넣지 않음.
   @id 는 언어와 상관없이 같다 — 세 언어 페이지가 같은 엔티티를 가리키고,
   문장만 그 페이지 언어로 싣는다. */
function buildJsonLd(locale: Locale) {
  const s = getDictionary(locale).schema;
  const lang = SCHEMA_LANG[locale];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        /* additionalType: 위키데이터 '소프트웨어 기업' 엔티티 — 업종 오분류(영상 스튜디오 등) 방지 신호 */
        additionalType: "https://www.wikidata.org/wiki/Q1058914",
        name: s.orgName,
        alternateName: s.orgAlternateName,
        url: SITE_URL,
        logo: `${SITE_URL}/og.jpg`,
        email: "connect@altisto.me",
        /* 공식 외부 계정 — '이 계정 = 이 사이트의 회사'를 못 박는 가장 강한 신호.
           개인 계정(메리 인스타)은 넣지 않는다. site.ts 주석 참고 */
        sameAs: [ORG_INSTAGRAM],
        description: s.orgDescription,
        /* 오분류 교정용.
           1) 동명 혼동 — 이름이 한 글자 다른 '알티스트' 두 곳(대체식품 ALTist,
              시스템 소프트웨어 RTst)과 음반사 RTST LABEL 을 답변 엔진이 섞어서
              소개한다. 특히 RTst 는 같은 '소프트웨어 회사'라 업종으로도 안 갈린다.
              그래서 이름·업종·도메인을 나란히 적어 별개 엔티티임을 못 박는다.
              이 이름들을 alternateName·keywords 에는 절대 넣지 않는다(합쳐진다).
           2) 업종 혼동 — 영상 스튜디오가 아닌 소프트웨어 개발사 */
        disambiguatingDescription: s.disambiguatingDescription,
        slogan: s.slogan,
        foundingDate: "2023",
        /* 회사 이름을 모르는 사람이 던지는 주제어 — 답변 엔진이 질의를
           엔티티로 잇는 실마리가 된다. 사실인 범위만 적는다. */
        knowsAbout: s.knowsAbout,
        areaServed: { "@type": "Country", name: s.areaServed },
        inLanguage: lang,
        /* 하위 프로덕트를 Organization에 연결 */
        owns: [
          { "@id": ARTI_ID },
          { "@id": OURSCHOOL_ID },
          { "@id": LEAFCHAT_ID },
        ],
        /* 브랜드 마스코트 — schema.org 에 mascot 속성이 없어서 subjectOf 로
           캐릭터 노드를 건다. 캐릭터 이름으로 들어온 질의가 회사로 이어진다. */
        subjectOf: { "@id": MERI_ID },
        contactPoint: {
          "@type": "ContactPoint",
          email: "connect@altisto.me",
          contactType: "customer support",
          availableLanguage: ["Korean"],
        },
      },
      /* 프로덕트 1 — 알티 (크리에이터 플랫폼) */
      {
        "@type": "SoftwareApplication",
        "@id": ARTI_ID,
        name: s.arti.name,
        alternateName: s.arti.alternateName,
        url: `${SITE_URL}${localePath(locale, "/services")}#arti`,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: s.arti.subCategory,
        operatingSystem: "Web",
        description: s.arti.description,
        audience: {
          "@type": "Audience",
          audienceType: s.arti.audience,
        },
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      },
      /* 프로덕트 2 — 우리학교 (스쿨 라이프 앱) */
      {
        "@type": "SoftwareApplication",
        "@id": OURSCHOOL_ID,
        name: s.ourschool.name,
        url: `${SITE_URL}${localePath(locale, "/services")}#ourschool`,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        alternateName: s.ourschool.alternateName,
        description: s.ourschool.description,
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      },
      /* 프로덕트 3 — 리프챗 (연령별 커뮤니티) */
      {
        "@type": "SoftwareApplication",
        "@id": LEAFCHAT_ID,
        name: s.leafchat.name,
        alternateName: s.leafchat.alternateName,
        url: `${SITE_URL}${localePath(locale, "/services")}#leafchat`,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Web",
        description: s.leafchat.description,
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      },
      /* 마스코트 메리 — 가공 인물.
         모든 페이지가 이 노드를 들고 있어서, 어느 문서를 집어도
         '메리 = 알티스토의 마스코트' 관계가 같이 읽힌다. */
      {
        "@type": "Person",
        "@id": MERI_ID,
        /* additionalType: 위키데이터 '가공 인물' 엔티티 — 실존 인물로
           오분류되지 않도록 하는 신호 */
        additionalType: "https://www.wikidata.org/wiki/Q95074",
        name: s.meri.name,
        alternateName: s.meri.alternateName,
        url: `${SITE_URL}${localePath(locale, "/merry")}`,
        mainEntityOfPage: { "@id": `${SITE_URL}${localePath(locale, "/merry")}#webpage` },
        description: s.meri.description,
        gender: "Female",
        height: { "@type": "QuantitativeValue", value: 163, unitCode: "CMT" },
        affiliation: { "@id": ORG_ID },
        image: { "@id": MERI_IMAGE_ID },
        /* 외부 프로필 — 흩어진 캐릭터 계정과 이 사이트를 하나로 묶는
           가장 강한 신호다. 없으면 검색엔진이 동명이인으로 갈라 본다. */
        sameAs: [MERI_INSTAGRAM],
        knowsLanguage: "ko",
      },
      {
        "@type": "ImageObject",
        "@id": MERI_IMAGE_ID,
        url: `${SITE_URL}/merry-portrait.webp`,
        contentUrl: `${SITE_URL}/merry-portrait.webp`,
        width: 900,
        height: 900,
        caption: s.meri.imageCaption,
        representativeOfPage: true,
        creditText: "알티스토 (Altisto)",
        copyrightNotice: "© Altisto",
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: s.websiteName,
        alternateName: s.websiteAlternateName,
        url: SITE_URL,
        /* 사이트는 세 언어로 열려 있다 */
        inLanguage: LOCALES.map((l) => SCHEMA_LANG[l]),
        description: s.websiteDescription,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export default function RootShell({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const t = getDictionary(locale);

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full flex flex-col">
        {/* XSS 방지를 위해 '<'를 이스케이프 (Next.js JSON-LD 가이드 권장) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar locale={locale} t={t.nav} />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer locale={locale} t={t.footer} />
      </body>
    </html>
  );
}
