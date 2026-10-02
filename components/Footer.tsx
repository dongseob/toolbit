'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* 브랜드 개요 */}
          <div className="md:col-span-2">
            <span className="text-xl font-black text-white tracking-tight">
              <span className="text-[#0078d7]">Tool</span>bit
            </span>
            <p className="mt-3 text-xs text-gray-400 max-w-sm leading-relaxed">
              {t.footer.aboutDesc}
            </p>
          </div>

          {/* 이미지 도구 세부 링크 */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              {t.header.imageTools.label}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/png-to-jpg" className="hover:text-white transition-colors">
                  {t.header.imageTools.tools.pngToJpg}
                </Link>
              </li>
              <li>
                <Link href="/#compress" className="hover:text-white transition-colors">
                  {t.header.imageTools.tools.compress}
                </Link>
              </li>
              <li>
                <Link href="/#resize" className="hover:text-white transition-colors">
                  {t.header.imageTools.tools.resize}
                </Link>
              </li>
            </ul>
          </div>

          {/* 문서 도구 세부 링크 */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              {t.header.docTools.label}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#pdf-to-word" className="hover:text-white transition-colors">
                  {t.header.docTools.tools.pdfToWord}
                </Link>
              </li>
              <li>
                <Link href="/#merge-pdf" className="hover:text-white transition-colors">
                  {t.header.docTools.tools.mergePdf}
                </Link>
              </li>
              <li>
                <Link href="/#split-pdf" className="hover:text-white transition-colors">
                  {t.header.docTools.tools.splitPdf}
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 고지 및 정보 */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3">
              {t.footer.legalTitle}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-white transition-colors">
                  {t.footer.dmca}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Toolbit. {t.footer.rights}</p>
          <p>{t.footer.privacyNote}</p>
        </div>
      </div>
    </footer>
  );
}