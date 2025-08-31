
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Theme, Language } from '../types';

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === Theme.DARK ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
    );
};

const LanguageSwitcher = () => {
    const { language, changeLanguage } = useLanguage();

    const languages: { code: Language; flag: string; name: string }[] = [
        { code: 'en', flag: '🇬🇧', name: 'English' },
        { code: 'fr', flag: '🇫🇷', name: 'Français' },
        { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    ];

    return (
        <div className="flex items-center gap-1">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-2 py-1 rounded-md text-sm transition-colors ${language === lang.code ? 'bg-gray-200 dark:bg-gray-800 opacity-100' : 'opacity-50 hover:opacity-100 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'}`}
                    aria-label={`Switch to ${lang.name}`}
                >
                    {lang.flag}
                </button>
            ))}
        </div>
    );
}

const Header: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const activeLinkClass = "text-primary dark:text-primary";
  const inactiveLinkClass = "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#/" className="flex items-center gap-2 text-lg font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h8v8"/><path d="M12 12h4v4"/></svg>
            <span>PC Config Gen</span>
          </a>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a href="#/" className={location.pathname === '/' ? activeLinkClass : inactiveLinkClass}>
              {t('header.generator')}
            </a>
            <a href="#/about" className={location.pathname === '/about' ? activeLinkClass : inactiveLinkClass}>
              {t('header.about')}
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
