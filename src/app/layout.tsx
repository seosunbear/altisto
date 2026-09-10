import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ARTI_ID, LEAFCHAT_ID, MERI_ID, MERI_IMAGE_ID, MERI_INSTAGRAM, ORG_ID, OURSCHOOL_ID, SITE_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* 브랜드명 + '공식 웹사이트'를 명시해 검색 결과에서 정체가 바로 드러나도록 */
  title: {
    default: "알티스토 | Altisto 공식 웹사이트",
    template: "%s | 알티스토",
  },
  /* '소프트웨어 및 플랫폼 개발사'라는 카테고리 정의를 문장 맨 앞에 배치 */
  description:
    "소프트웨어 및 플랫폼 개발사 알티스토(Altisto) 공식 홈페이지입니다. 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 '알티(Arti)', 스쿨 라이프 슈퍼앱 '우리학교(OurSchool)', 연령별 채팅·커뮤니티 '리프챗(LeafChat)'을 직접 개발하고 운영합니다.",
  /* 한/영 양방향 검색('알티스토' ↔ 'Altisto') 대응을 위해 두 표기를 모두 포함 */
  /* 한/영 양방향 검색('알티스토' ↔ 'Altisto')과, 프로덕트 이름을 모르는
     사람이 던지는 서술형 질의("예술 외주 플랫폼 만드는 회사")를 함께 덮는다. */
  keywords: [
    "Altisto", "알티스토", "altisto", "알티스토 회사",
    "소프트웨어 개발사", "플랫폼 개발사", "소프트웨어 회사", "IT 스타트업",
    "알티", "Arti", "Alti", "크리에이터 외주 플랫폼", "예술 외주 플랫폼",
    "아티스트 외주", "커미션 플랫폼", "일러스트 외주", "디자인 외주", "영상 외주",
    "외주 플랫폼", "크리에이터 협업 플랫폼", "크리에이터",
    "우리학교", "OurSchool", "스쿨 라이프 앱", "학생 앱", "시간표 급식 앱",
    "리프챗", "LeafChat", "연령별 커뮤니티", "채팅 커뮤니티 앱", "콘텐츠",
  ],
  applicationName: "알티스토",
  authors: [{ name: "알티스토", url: SITE_URL }],
  creator: "알티스토",
  publisher: "알티스토",
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
    title: "알티스토 | Altisto 공식 웹사이트",
    description:
      "소프트웨어 및 플랫폼 개발사 알티스토(Altisto)입니다. 크리에이터 외주 협업 플랫폼 '알티', 스쿨 라이프 앱 '우리학교', 연령별 커뮤니티 '리프챗'을 만듭니다.",
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "알티스토",
    images: [
      {
        url: "/og.jpg",
        width: 1920,
        height: 1080,
        alt: "알티스토 — 콘텐츠 그 이상의 가치",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "알티스토 | Altisto 공식 웹사이트",
    description: "소프트웨어 및 플랫폼 개발사 알티스토(Altisto) 공식 홈페이지",
    images: ["/og.jpg"],
  },
};

/* Organization + 하위 프로덕트(알티·리프챗)를 하나의 @graph로 연결한 구조화 데이터.
   법인 등록 전 프로젝트 팀/회사 조직 기준이라 legalName·사업자번호류 필드는 넣지 않음. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      /* additionalType: 위키데이터 '소프트웨어 기업' 엔티티 — 업종 오분류(영상 스튜디오 등) 방지 신호 */
      additionalType: "https://www.wikidata.org/wiki/Q1058914",
      name: "알티스토",
      alternateName: ["Altisto", "알티스토 (Altisto)"],
      url: SITE_URL,
      logo: `${SITE_URL}/og.jpg`,
      email: "connect@altisto.me",
      description:
        "알티스토(Altisto)는 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 '알티(Arti)', 스쿨 라이프 슈퍼앱 '우리학교(OurSchool)', 연령별 채팅·커뮤니티 '리프챗(LeafChat)'을 직접 개발·운영하는 소프트웨어 및 플랫폼 개발사입니다.",
      /* 업종 오분류 교정용 — 영상 스튜디오가 아닌 소프트웨어 개발사임을 명시적으로 구분 */
      disambiguatingDescription:
        "영상 제작 스튜디오가 아닌, 웹·앱 플랫폼을 직접 개발·운영하는 소프트웨어 개발사",
      slogan: "콘텐츠 그 이상의 가치를, 알티스토",
      foundingDate: "2023",
      /* 회사 이름을 모르는 사람이 던지는 주제어 — 답변 엔진이 질의를
         엔티티로 잇는 실마리가 된다. 사실인 범위만 적는다. */
      knowsAbout: [
        "소프트웨어 개발", "플랫폼 개발", "웹 서비스 개발", "모바일 앱 개발",
        "크리에이터 외주 플랫폼", "아티스트 커미션 중개", "일러스트·디자인·영상 외주",
        "크리에이터 협업", "스쿨 라이프 앱", "연령별 커뮤니티 서비스", "콘텐츠 서비스",
      ],
      areaServed: { "@type": "Country", name: "대한민국" },
      inLanguage: "ko-KR",
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
      name: "알티",
      /* 로마자 표기가 Arti/Alti 두 갈래로 검색된다. 둘 다 같은 엔티티로 묶는다 */
      alternateName: ["Arti", "Alti", "알티(Arti)"],
      url: `${SITE_URL}/services#arti`,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "크리에이터 외주·커미션 마켓플레이스",
      operatingSystem: "Web",
      description:
        "아티스트와 클라이언트를 연결하는 크리에이터 외주·커미션 협업 플랫폼. 일러스트·디자인·영상 등 창작 외주를 의뢰하고 수주한다.",
      audience: {
        "@type": "Audience",
        audienceType: ["아티스트", "크리에이터", "일러스트레이터", "디자이너", "영상 제작자", "외주 의뢰 클라이언트"],
      },
      creator: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    },
    /* 프로덕트 2 — 우리학교 (스쿨 라이프 앱) */
    {
      "@type": "SoftwareApplication",
      "@id": OURSCHOOL_ID,
      name: "우리학교",
      url: `${SITE_URL}/services#ourschool`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      alternateName: ["OurSchool", "Our School", "우리학교 앱"],
      description: "시간표·급식·학생증·조퇴외출을 하나로 모은 학생용 스쿨 라이프 슈퍼앱",
      creator: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    },
    /* 프로덕트 3 — 리프챗 (연령별 커뮤니티) */
    {
      "@type": "SoftwareApplication",
      "@id": LEAFCHAT_ID,
      name: "리프챗",
      alternateName: "LeafChat",
      url: `${SITE_URL}/services#leafchat`,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      description: "연령대별로 나뉘어 안전하게 소통하는 채팅 & 커뮤니티 서비스",
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
      name: "메리",
      alternateName: ["Meri", "메리 (Meri)", "알티스토 메리", "Altisto Meri", "마스코트 메리", "알티 메리"],
      url: `${SITE_URL}/merry`,
      mainEntityOfPage: { "@id": `${SITE_URL}/merry#webpage` },
      description:
        "알티스토의 브랜드 마스코트 캐릭터. 은발에 분홍빛 눈을 했고, 알티스토와 크리에이터 플랫폼 알티에서 방문자를 맞이하는 인사 담당이다. 키 163cm, MBTI ENFJ, 생일 2월 21일(물고기자리).",
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
      caption: "알티스토 마스코트 메리(Meri)",
      representativeOfPage: true,
      creditText: "알티스토 (Altisto)",
      copyrightNotice: "© Altisto",
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: "알티스토",
      alternateName: "Altisto",
      url: SITE_URL,
      inLanguage: "ko-KR",
      description: "알티스토 공식 웹사이트",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* XSS 방지를 위해 '<'를 이스케이프 (Next.js JSON-LD 가이드 권장) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
