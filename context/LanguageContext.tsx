'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/dictionaries/en';
import { ko } from '@/dictionaries/ko';

type Language = 'en' | 'ko';
type Dictionary = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 쿠키 읽기 헬퍼
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// 브라우저 초기 언어 결정 헬퍼
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  // 1. 기존 저장된 쿠키 확인
  const savedLang = getCookie('toolbit_lang') as Language;
  if (savedLang && (savedLang === 'en' || savedLang === 'ko')) {
    return savedLang;
  }

  // 2. 쿠키가 없을 경우 브라우저 언어 감지
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('ko') ? 'ko' : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // useState 초기화 함수(Lazy Initialization)를 사용해 최초 1회만 계산
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  // 쿠키 동기화만 effect에서 처리 (동기 setState 호출 없음)
  useEffect(() => {
    const savedLang = getCookie('toolbit_lang');
    if (!savedLang) {
      document.cookie = `toolbit_lang=${language}; path=/; max-age=31536000`;
    }
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    document.cookie = `toolbit_lang=${lang}; path=/; max-age=31536000`;
  };

  const t = language === 'ko' ? ko : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}