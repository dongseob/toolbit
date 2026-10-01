import type { Metadata } from 'next';
import Header from './header/page';
import Footer from './footer/page';
import './globals.css';

export const metadata: Metadata = {
  title: 'Toolbit - 무료 온라인 웹 유틸리티 모음',
  description: '서버 업로드 없이 브라우저에서 무료로 사용하는 웹 도구 모음',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header />
        {/* pt-16을 주어 fixed 헤더 높이만큼 여백 확보 */}
        <div className="flex-1 pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}