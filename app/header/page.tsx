'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-black text-blue-600 tracking-tight">
          <span>Toolbit</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link href="/#image-tools" className="hover:text-blue-600 transition-colors">
            이미지 도구
          </Link>
          <Link href="/#media-tools" className="hover:text-blue-600 transition-colors">
            미디어 도구
          </Link>
          <Link href="/#doc-tools" className="hover:text-blue-600 transition-colors">
            문서 & PDF
          </Link>
          <Link href="/#web-tools" className="hover:text-blue-600 transition-colors">
            개발 & 유틸리티
          </Link>
        </nav>

        {/* 모바일 토글 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 펼침 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 text-sm font-medium text-gray-700">
          <Link
            href="/#image-tools"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            이미지 도구
          </Link>
          <Link
            href="/#media-tools"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            미디어 도구
          </Link>
          <Link
            href="/#doc-tools"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            문서 & PDF
          </Link>
          <Link
            href="/#web-tools"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-100"
          >
            개발 & 유틸리티
          </Link>
        </div>
      )}
    </header>
  );
}