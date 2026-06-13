import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Altisto — 콘텐츠 그 이상의 가치를",
    template: "%s | Altisto",
  },
  description:
    "알티스토는 외주 플랫폼 알티와 소통 플랫폼 리프챗을 운영하는 크리에이티브 스튜디오입니다. 크리에이터와 기업을 연결하고 콘텐츠 생태계를 혁신합니다.",
  keywords: [
    "Altisto", "알티스토", "알티", "외주 플랫폼", "크리에이터",
    "리프챗", "LeafChat", "콘텐츠", "비즈니스",
  ],
  openGraph: {
    title: "Altisto — 콘텐츠 그 이상의 가치를",
    description: "크리에이터와 기업을 연결하는 스마트 플랫폼, 알티스토",
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
