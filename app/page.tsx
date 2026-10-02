'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // 새로운 딕셔너리 계층 구조에 맞춘 도구 리스트
  const TOOLS = [
    // 1. 이미지 도구
    {
      id: 'png-to-jpg',
      title: t.tools.pngToJpg.title,
      description: t.tools.pngToJpg.description,
      href: '/png-to-jpg',
      category: t.header.imageTools.label,
      section: 'image',
    },
    {
      id: 'image-compress',
      title: t.header.imageTools.tools.compress,
      description: 'PNG, JPG, WebP 이미지 용량을 손실 없이 빠르게 압축합니다.',
      href: '#',
      category: t.header.imageTools.label,
      section: 'image',
    },
    // 2. 문서 & PDF 도구
    {
      id: 'pdf-to-word',
      title: t.header.docTools.tools.pdfToWord,
      description: 'PDF 문서를 수정 가능한 Word(DOCX) 파일로 변환합니다.',
      href: '#',
      category: t.header.docTools.label,
      section: 'doc',
    },
    {
      id: 'merge-pdf',
      title: t.header.docTools.tools.mergePdf,
      description: '여러 개의 PDF 파일을 하나의 파일로 순서대로 병합합니다.',
      href: '#',
      category: t.header.docTools.label,
      section: 'doc',
    },
  ];

  const filteredTools = TOOLS.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* 헤더 섹션 */}
      <div className="text-center mb-10 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {t.home.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          {t.home.subtitle}
        </p>
      </div>

      {/* 검색 바 */}
      <div className="relative max-w-2xl mx-auto mb-14">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.home.searchPlaceholder}
          className="w-full px-5 py-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-[#0078d7] focus:ring-2 focus:ring-[#0078d7]/20 text-sm shadow-sm transition-all"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* 도구 목록 카드 */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="p-6 bg-white rounded-2xl border border-gray-200/80 hover:border-[#0078d7] transition-all block group hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="font-bold text-gray-900 group-hover:text-[#0078d7] transition-colors">
                  {tool.title}
                </h2>
                <span className="text-[11px] font-semibold text-[#0078d7] bg-[#0078d7]/10 px-2.5 py-1 rounded-md border border-[#0078d7]/20">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-400">{t.home.noResults}</p>
        </div>
      )}
    </div>
  );
}