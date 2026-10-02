'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ConvertedFile {
  originalName: string;
  jpgUrl: string;
  size: number;
}

// 보편화된 파일 크기 포맷팅 함수 (Bytes, KB, MB 단위 자동 변환)
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  if (i === 0) return `${bytes} Bytes`;
  if (i === 1) return `${Math.round(bytes / k)} KB`; // KB 단위는 반올림 정수 표기
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`; // MB 이상은 소수점 1자리
}

export default function PngToJpgPage() {
  const { t } = useLanguage();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState<number>(0.92);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filterPngFiles = (files: FileList | File[]) => {
    const MAX_SIZE = 30 * 1024 * 1024; // 30MB 제한
    const validPngs: File[] = [];
  
    Array.from(files).forEach((file) => {
      // 1. MIME 타입 및 확장자 검증
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      if (!isPng) {
        alert(t.tools.pngToJpg.errorInvalidType);
        return;
      }
  
      // 2. 파일 크기 검증 (0 Byte 또는 초과 크기)
      if (file.size === 0) return;
      if (file.size > MAX_SIZE) {
        alert(`${file.name}: ${t.tools.pngToJpg.errorFileSize}`);
        return;
      }
  
      validPngs.push(file);
    });
  
    if (validPngs.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validPngs]);
      setConvertedFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      filterPngFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      filterPngFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setConvertedFiles([]);
  };

  const convertAllToJpg = async () => {
    if (selectedFiles.length === 0) return;

    setIsConverting(true);
    const results: ConvertedFile[] = [];

    for (const file of selectedFiles) {
      const url = await convertSingleFile(file, quality);
      // url이 null이 아닌 유효한 string일 때만 결과 배열에 추가
      if (url) {
        results.push({
          originalName: file.name,
          jpgUrl: url,
          size: file.size,
        });
      }
    }

    setConvertedFiles(results);
    setIsConverting(false);
  };

  const convertSingleFile = (file: File, q: number): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
  
      // 이미지 로드 성공
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            resolve(null);
            return;
          }
  
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(objectUrl); // 메모리 해제
              if (blob) {
                resolve(URL.createObjectURL(blob));
              } else {
                resolve(null);
              }
            },
            'image/jpeg',
            q
          );
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
          console.error('Canvas Error:', error);
          resolve(null);
        }
      };
  
      // 이미지 로드 실패 (손상된 파일)
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        alert(`${file.name}: ${t.tools.pngToJpg.errorCorrupted}`);
        resolve(null);
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* 타이틀 헤더 */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {t.tools.pngToJpg.title}
        </h1>
        <p className="text-sm text-gray-500">
          {t.tools.pngToJpg.description}
        </p>
      </div>

      {/* 파일 업로드 카드 영역 */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <input
          type="file"
          accept="image/png"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        {selectedFiles.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#0078d7] bg-[#0078d7]/10 scale-[0.99]'
                : 'border-gray-300 hover:border-[#0078d7] bg-gray-50/50'
            }`}
          >
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {t.tools.pngToJpg.dragDrop}
            </p>
            <span className="inline-block mt-3 px-4 py-2 bg-[#0078d7] text-white text-xs font-semibold rounded-lg shadow-sm">
              {t.tools.pngToJpg.selectFile}
            </span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 선택된 파일 목록 */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedFiles.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="text-base">📄</span>
                    <span className="font-medium text-gray-900 truncate">
                      {file.name}
                    </span>
                    {/* 동적 파일 크기 표시 (예: 30 KB, 1.4 MB) */}
                    <span className="text-gray-400 shrink-0">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    {t.tools.pngToJpg.removeFile}
                  </button>
                </div>
              ))}
            </div>

            {/* 파일 추가 및 전체 삭제 컨트롤 */}
            <div className="flex justify-between items-center text-xs pt-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#0078d7] font-semibold hover:underline cursor-pointer"
              >
                {t.tools.pngToJpg.addMore}
              </button>
              <button
                onClick={() => {
                  setSelectedFiles([]);
                  setConvertedFiles([]);
                }}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              >
                {t.tools.pngToJpg.clearAll}
              </button>
            </div>

            {/* 화질 조절 슬라이더 */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>{t.tools.pngToJpg.qualityLabel}</span>
                <span className="text-[#0078d7]">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.01"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-[#0078d7] cursor-pointer"
              />
            </div>

            {/* 변환 실행 버튼 */}
            <button
              onClick={convertAllToJpg}
              disabled={isConverting}
              className="w-full py-3.5 bg-[#0078d7] hover:opacity-90 text-white text-sm font-bold rounded-xl transition-all cursor-pointer disabled:bg-gray-400 disabled:opacity-100 disabled:cursor-not-allowed"
            >
              {isConverting
                ? t.tools.pngToJpg.converting
                : t.tools.pngToJpg.convertAll.replace(
                    '{count}',
                    String(selectedFiles.length)
                  )}
            </button>

            {/* 변환 완료 결과 다운로드 섹션 */}
            {convertedFiles.length > 0 && (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <p className="text-xs font-semibold text-green-600 text-center">
                  ✓ {t.tools.pngToJpg.successMsg}{' '}
                  {t.tools.pngToJpg.doneCount.replace(
                    '{count}',
                    String(convertedFiles.length)
                  )}
                </p>

                <div className="space-y-2">
                  {convertedFiles.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-green-50/50 rounded-xl border border-green-100 text-xs"
                    >
                      <span className="font-medium text-gray-800 truncate pr-2">
                        {res.originalName.replace(/\.png$/i, '.jpg')}
                      </span>
                      <a
                        href={res.jpgUrl}
                        download={res.originalName.replace(/\.png$/i, '.jpg')}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shrink-0 cursor-pointer"
                      >
                        {t.tools.pngToJpg.downloadBtn}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}