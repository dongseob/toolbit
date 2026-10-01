'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface ConvertedFile {
  originalName: string;
  convertedUrl: string;
  size: number;
}

export default function PngToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [quality, setQuality] = useState<number>(0.92);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 및 드롭 처리
  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const pngFiles = Array.from(selectedFiles).filter(
      (file) => file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')
    );
    if (pngFiles.length === 0) {
      alert('PNG 파일만 업로드 가능합니다.');
      return;
    }
    setFiles(pngFiles);
    setConvertedFiles([]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Canvas 기반 PNG -> JPG 변환 (Client-side)
  const convertToJpg = async () => {
    if (files.length === 0) return;
    setIsConverting(true);

    const results: ConvertedFile[] = [];

    for (const file of files) {
      const converted = await new Promise<ConvertedFile>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
              // PNG 투명 영역을 흰색 배경으로 채우기
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);

              // Data URL 추출
              const jpgDataUrl = canvas.toDataURL('image/jpeg', quality);
              
              // 용량 계산 (약식)
              const head = 'data:image/jpeg;base64,';
              const sizeInBytes = Math.round((jpgDataUrl.length - head.length) * 3 / 4);

              resolve({
                originalName: file.name.replace(/\.png$/i, '.jpg'),
                convertedUrl: jpgDataUrl,
                size: sizeInBytes,
              });
            }
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
      results.push(converted);
    }

    setConvertedFiles(results);
    setIsConverting(false);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* SEO & Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PNG to JPG 변환기</h1>
        <p className="text-gray-600">
          서버 업로드 없이 브라우저에서 안전하고 빠르게 PNG 이미지를 JPG로 변환하세요.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 bg-white'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          accept="image/png"
          multiple
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-lg font-semibold text-gray-700">
            PNG 파일을 드래그하거나 클릭하여 업로드하세요
          </p>
          <p className="text-sm text-gray-500">여러 파일 동시 선택 가능</p>
        </div>
      </div>

      {/* Selected Files & Quality Options */}
      {files.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-bold mb-4">선택된 파일 ({files.length}개)</h2>
          <ul className="mb-6 space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex justify-between border-b pb-1">
                <span>{file.name}</span>
                <span>{(file.size / 1024).toFixed(1)} KB</span>
              </li>
            ))}
          </ul>

          {/* Quality Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JPG 화질 설정: <span className="font-bold text-blue-600">{Math.round(quality * 100)}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <button
            onClick={convertToJpg}
            disabled={isConverting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400"
          >
            {isConverting ? '변환 중...' : 'JPG로 변환하기'}
          </button>
        </div>
      )}

      {/* Download Area */}
      {convertedFiles.length > 0 && (
        <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
          <h2 className="text-lg font-bold text-green-900 mb-4">🎉 변환 완료!</h2>
          <div className="space-y-3">
            {convertedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{file.originalName}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <a
                  href={file.convertedUrl}
                  download={file.originalName}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  다운로드
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t pt-6">
        🔒 <strong>개인정보 보호 안내:</strong> 사용자의 파일은 서버로 전송되지 않으며, 모든 변환 작업은 사용자의 브라우저 내에서 안전하게 처리됩니다.
      </div>
    </main>
  );
}