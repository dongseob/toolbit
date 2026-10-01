import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 요약 */}
          <div className="md:col-span-2">
            <span className="text-2xl font-black text-white tracking-tight">Toolbit</span>
            <p className="mt-3 text-sm text-gray-400 max-w-sm">
              서버 저장 없이 브라우저에서 안전하고 빠르게 이용하는 웹 유틸리티 플랫폼입니다.
            </p>
          </div>

          {/* 주요 카테고리 */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">도구</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/png-to-jpg" className="hover:text-white transition-colors">PNG to JPG</Link></li>
              <li><Link href="/#media-tools" className="hover:text-white transition-colors">유튜브 MP3</Link></li>
              <li><Link href="/#web-tools" className="hover:text-white transition-colors">QR 코드 생성기</Link></li>
            </ul>
          </div>

          {/* 법적 고지 & 문의 */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">안내 & 정책</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/dmca" className="hover:text-white transition-colors">저작권 고지 (DMCA)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Toolbit. All rights reserved.</p>
          <p>모든 변환 작업은 사용자의 브라우저 단에서 처리되어 안전합니다.</p>
        </div>
      </div>
    </footer>
  );
}