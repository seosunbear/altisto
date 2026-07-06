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
    "알티스토가 만든 다양한 플렛폼을 만나보세요!",
  keywords: [
    "Altisto", "알티스토", "알티", "외주 플랫폼", "크리에이터",
    "리프챗", "LeafChat", "콘텐츠", "우리학교",
  ],
  openGraph: {
    title: "알티스토",
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
