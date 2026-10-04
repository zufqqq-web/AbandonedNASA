import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Dictionary, LocalizedText } from './types';
import { ru } from './ru';
import { en } from './en';
import { uz } from './uz';

const dictionaries: Record<Language, Dictionary> = { ru, en, uz };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  localize: (obj: LocalizedText | string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'app_language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && (stored === 'ru' || stored === 'en' || stored === 'uz')) {
    return stored;
  }

  const browserLang = navigator.language?.toLowerCase() || '';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('uz')) return 'uz';

  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch {
      // Ignore localStorage errors in private mode
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const localize = (obj: LocalizedText | string | undefined): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || obj.ru || '';
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: dictionaries[language] || dictionaries.en,
    localize,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useT(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useT must be used within a LanguageProvider');
  }
  return context;
}
