import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://altisto.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "알티스토 (Altisto) — 콘텐츠 그 이상의 가치",
    template: "%s | 알티스토",
  },
  description:
    "알티스토(Altisto)는 크리에이터 협업 플랫폼 '알티'와 연령별 채팅 커뮤니티 '리프챗'을 만드는 콘텐츠 기술 기업입니다. 콘텐츠 그 이상의 가치를 만듭니다.",
  keywords: [
    "Altisto", "알티스토", "알티", "외주 플랫폼", "크리에이터",
    "리프챗", "LeafChat", "콘텐츠", "우리학교",
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
    title: "알티스토 (Altisto)",
    description:
      "콘텐츠 그 이상의 가치를, 알티스토. 크리에이터 협업 플랫폼 '알티'와 연령별 채팅 커뮤니티 '리프챗'을 만듭니다.",
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
    title: "알티스토 (Altisto)",
    description: "콘텐츠 그 이상의 가치를, 알티스토",
    images: ["/main.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "알티스토",
      alternateName: ["Altisto", "알티스토 (Altisto)"],
      url: SITE_URL,
      logo: `${SITE_URL}/main.png`,
      email: "connect@altisto.me",
      description:
        "알티스토는 크리에이터 협업 플랫폼 '알티'와 연령별 채팅 커뮤니티 '리프챗'을 만드는 콘텐츠 기술 기업입니다.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "connect@altisto.me",
        contactType: "customer support",
        availableLanguage: ["Korean"],
      },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
