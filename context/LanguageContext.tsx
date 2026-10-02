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

// 쿠키 파싱 헬퍼 함수
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 1. 기존에 저장된 언어 쿠키 확인
    const savedLang = getCookie('toolbit_lang') as Language;

    if (savedLang && (savedLang === 'en' || savedLang === 'ko')) {
      setLanguage(savedLang);
    } else {
      // 2. 쿠키가 없을 경우 브라우저 언어 감지 (한국어 유저 감지)
      const browserLang = navigator.language.toLowerCase();
      const initialLang: Language = browserLang.startsWith('ko') ? 'ko' : 'en';

      setLanguage(initialLang);
      // 초기 감지 결과를 쿠키에 1년간 보관
      document.cookie = `toolbit_lang=${initialLang}; path=/; max-age=31536000`;
    }
  }, []);

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