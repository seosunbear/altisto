import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://altisto.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* 브랜드명 + '공식 웹사이트'를 명시해 검색 결과에서 정체가 바로 드러나도록 */
  title: {
    default: "알티스토 | Altisto 공식 웹사이트",
    template: "%s | 알티스토",
  },
  /* '소프트웨어 및 플랫폼 개발사'라는 카테고리 정의를 문장 맨 앞에 배치 */
  description:
    "소프트웨어 및 플랫폼 개발사 알티스토(Altisto) 공식 홈페이지입니다. 크리에이터 플랫폼 '알티', 스쿨 라이프 앱 '우리학교', 연령별 커뮤니티 '리프챗'을 통해 일상 속 몰두할 수 있는 세상을 만듭니다.",
  /* 한/영 양방향 검색('알티스토' ↔ 'Altisto') 대응을 위해 두 표기를 모두 포함 */
  keywords: [
    "Altisto", "알티스토", "altisto", "소프트웨어 개발사", "플랫폼 개발사",
    "알티", "Alti", "외주 플랫폼", "크리에이터",
    "우리학교", "OurSchool", "리프챗", "LeafChat", "콘텐츠",
  ],
  applicationName: "알티스토",
  authors: [{ name: "알티스토", url: SITE_URL }],
  creator: "알티스토",
  publisher: "알티스토",
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
      "소프트웨어 및 플랫폼 개발사 알티스토(Altisto)입니다.",
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "알티스토",
    images: [
      {
        url: "/main.png",
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
    images: ["/main.png"],
  },
};

/* Organization + 하위 프로덕트(알티·리프챗)를 하나의 @graph로 연결한 구조화 데이터.
   법인 등록 전 프로젝트 팀/회사 조직 기준이라 legalName·사업자번호류 필드는 넣지 않음. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      /* additionalType: 위키데이터 '소프트웨어 기업' 엔티티 — 업종 오분류(영상 스튜디오 등) 방지 신호 */
      additionalType: "https://www.wikidata.org/wiki/Q1058914",
      name: "알티스토",
      alternateName: ["Altisto", "알티스토 (Altisto)"],
      url: SITE_URL,
      logo: `${SITE_URL}/main.png`,
      email: "connect@altisto.me",
      description:
        "알티스토(Altisto)는 크리에이터 플랫폼 '알티', 스쿨 라이프 앱 '우리학교', 연령별 커뮤니티 '리프챗'을 만드는 소프트웨어 및 플랫폼 개발사입니다.",
      /* 업종 오분류 교정용 — 영상 스튜디오가 아닌 소프트웨어 개발사임을 명시적으로 구분 */
      disambiguatingDescription:
        "영상 제작 스튜디오가 아닌, 웹·앱 플랫폼을 직접 개발·운영하는 소프트웨어 개발사",
      slogan: "콘텐츠 그 이상의 가치를, 알티스토",
      foundingDate: "2023",
      knowsAbout: ["소프트웨어 개발", "플랫폼 개발", "크리에이터 플랫폼", "커뮤니티 서비스", "교육 서비스"],
      /* 하위 프로덕트를 Organization에 연결 */
      owns: [
        { "@id": `${SITE_URL}/services#alti` },
        { "@id": `${SITE_URL}/services#ourschool` },
        { "@id": `${SITE_URL}/services#leafchat` },
      ],
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
      "@id": `${SITE_URL}/services#alti`,
      name: "알티",
      alternateName: "Alti",
      url: `${SITE_URL}/services#alti`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "아티스트와 클라이언트를 연결하는 크리에이터 협업 플랫폼",
      creator: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    /* 프로덕트 2 — 우리학교 (스쿨 라이프 앱) */
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/services#ourschool`,
      name: "우리학교",
      alternateName: ["OurSchool", "Our School"],
      url: `${SITE_URL}/services#ourschool`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description: "시간표·급식·학생증·조퇴외출을 하나로 모은 스쿨 라이프 슈퍼앱",
      creator: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    /* 프로덕트 3 — 리프챗 (연령별 커뮤니티) */
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/services#leafchat`,
      name: "리프챗",
      alternateName: "LeafChat",
      url: `${SITE_URL}/services#leafchat`,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      description: "연령별로 소통하는 채팅 & 커뮤니티 서비스",
      creator: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "알티스토",
      alternateName: "Altisto",
      url: SITE_URL,
      inLanguage: "ko-KR",
      publisher: { "@id": `${SITE_URL}/#organization` },
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
