import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, LanguageContextType } from '../types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const savedLang = localStorage.getItem('language') as Language;
    
    if (savedLang && ['en', 'fr', 'de'].includes(savedLang)) {
      setLanguage(savedLang);
    } else if (['fr', 'de'].includes(browserLang)) {
      setLanguage(browserLang as Language);
    } else {
      setLanguage('fr'); // Default to French
    }
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Fetching from the root since the locales folder is at the root level.
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(`Failed to fetch translations for ${language}:`, error);
        // Fallback to an empty object to prevent crashes, t() will return keys as-is
        setTranslations({});
      }
    };

    if (language) {
      fetchTranslations();
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string): string => {
    try {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
            if (result === undefined || result === null) return key;
            result = result[k];
        }
        return typeof result === 'string' ? result : key;
    } catch (error) {
        console.warn(`Translation key not found: ${key}`);
        return key;
    }
  }, [translations]);

  const amazonDomain = {
      en: 'www.amazon.com',
      fr: 'www.amazon.fr',
      de: 'www.amazon.de',
  }[language];

  const currencySymbol = {
    en: '$',
    fr: '€',
    de: '€',
  }[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, amazonDomain, currencySymbol }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
