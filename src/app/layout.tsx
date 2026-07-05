import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "알티스토",
    template: "%s | 알티스토",
  },
  description:
    "알티스토는 한국의 플랫폼 및 어플리케이션 개발사 입니다 주요 서비스는 외주 플랫폼 알티, 고등학교 도우미 어플리케이션 우리학교, 연령별 친구만들기 리프챗 등이 있습니다",
  keywords: [
    "Altisto", "알티스토", "알티", "외주 플랫폼", "크리에이터",
    "리프챗", "LeafChat", "콘텐츠", "우리학교",
  ],
  openGraph: {
    title: "Altisto",
    description: "콘텐츠 그 이상의 가치를, 알티스토",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
