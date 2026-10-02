'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'image' | 'doc' | null>(null);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 브랜드 로고 */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#0078d7] flex items-center justify-center text-white shadow-sm">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            <span className="text-[#0078d7]">Tool</span>bit
          </span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
            {/* 1. 이미지 도구 드롭다운 */}
            <div
              className="relative group py-5"
              onMouseEnter={() => setActiveDropdown('image')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#0078d7] transition-colors py-1 cursor-pointer">
                {t.header.imageTools.label}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    activeDropdown === 'image' ? 'rotate-180 text-[#0078d7]' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 드롭다운 패널 (왼쪽 정렬 및 화면 이탈 방지) */}
              {activeDropdown === 'image' && (
                <div className="absolute top-full left-0 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 grid grid-cols-2 gap-4 transition-all z-50">
                  <div>
                    <span className="text-xs font-bold text-[#0078d7] uppercase tracking-wider block mb-2">
                      {t.header.imageTools.categories.convert}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>
                        <Link
                          href="/png-to-jpg"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium"
                        >
                          {t.header.imageTools.tools.pngToJpg}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#jpg-to-png"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.imageTools.tools.jpgToPng}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#webp-to-png"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.imageTools.tools.webpToPng}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#0078d7] uppercase tracking-wider block mb-2">
                      {t.header.imageTools.categories.edit}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>
                        <Link
                          href="/#compress"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.imageTools.tools.compress}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#resize"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.imageTools.tools.resize}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 2. 문서 & PDF 드롭다운 */}
            <div
              className="relative group py-5"
              onMouseEnter={() => setActiveDropdown('doc')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#0078d7] transition-colors py-1 cursor-pointer">
                {t.header.docTools.label}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    activeDropdown === 'doc' ? 'rotate-180 text-[#0078d7]' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 드롭다운 패널 (중앙/좌측 세밀 정렬) */}
              {activeDropdown === 'doc' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 grid grid-cols-2 gap-4 transition-all z-50">
                  <div>
                    <span className="text-xs font-bold text-[#0078d7] uppercase tracking-wider block mb-2">
                      {t.header.docTools.categories.pdfConvert}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>
                        <Link
                          href="/#pdf-to-word"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.docTools.tools.pdfToWord}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#word-to-pdf"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.docTools.tools.wordToPdf}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#pdf-to-jpg"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.docTools.tools.pdfToJpg}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#0078d7] uppercase tracking-wider block mb-2">
                      {t.header.docTools.categories.pdfEdit}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>
                        <Link
                          href="/#merge-pdf"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.docTools.tools.mergePdf}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#split-pdf"
                          onClick={() => setActiveDropdown(null)}
                          className="block p-1.5 rounded-lg hover:bg-gray-50 hover:text-gray-900"
                        >
                          {t.header.docTools.tools.splitPdf}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 언어 전환 스위처 */}
          <div className="flex items-center gap-1 text-xs font-semibold border-l border-gray-200 pl-6">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                language === 'ko' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              KO
            </button>
          </div>
        </div>

        {/* 모바일 컨트롤 */}
        <div className="md:hidden flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded ${language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 rounded ${language === 'ko' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
            >
              KO
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            aria-label="Toggle menu"
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
      </div>

      {/* 모바일 하단 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-4 text-xs">
          <div>
            <p className="font-bold text-[#0078d7] mb-2">{t.header.imageTools.label}</p>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <Link href="/png-to-jpg" onClick={() => setIsMenuOpen(false)} className="py-1 text-gray-700 hover:text-[#0078d7]">
                {t.header.imageTools.tools.pngToJpg}
              </Link>
              <Link href="/#compress" onClick={() => setIsMenuOpen(false)} className="py-1 text-gray-700 hover:text-[#0078d7]">
                {t.header.imageTools.tools.compress}
              </Link>
            </div>
          </div>

          <div>
            <p className="font-bold text-[#0078d7] mb-2">{t.header.docTools.label}</p>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <Link href="/#pdf-to-word" onClick={() => setIsMenuOpen(false)} className="py-1 text-gray-700 hover:text-[#0078d7]">
                {t.header.docTools.tools.pdfToWord}
              </Link>
              <Link href="/#merge-pdf" onClick={() => setIsMenuOpen(false)} className="py-1 text-gray-700 hover:text-[#0078d7]">
                {t.header.docTools.tools.mergePdf}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}