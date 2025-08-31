
import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from './ui/Card';
import { useLanguage } from '../hooks/useLanguage';

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

const CpuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
);

const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t('about.title')}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t('about.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <InfoIcon className="w-6 h-6 text-primary" />
            <CardTitle>{t('about.what_is_it_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>{t('about.what_is_it_p1')}</p>
          <p>{t('about.what_is_it_p2')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <CpuIcon className="w-6 h-6 text-primary" />
            <CardTitle>{t('about.how_it_works_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>{t('about.how_it_works_p1')}</p>
          <p>{t('about.how_it_works_p2')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <LayersIcon className="w-6 h-6 text-primary" />
            <CardTitle>{t('about.stack_title')}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 dark:text-gray-300">
          <ul className="list-disc list-inside space-y-2">
            <li><strong>{t('about.stack_fe_label')}</strong>: React, TypeScript</li>
            <li><strong>{t('about.stack_styling_label')}</strong>: Tailwind CSS</li>
            <li><strong>{t('about.stack_ai_label')}</strong>: Google Gemini API (@google/genai)</li>
            <li><strong>{t('about.stack_routing_label')}</strong>: React Router</li>
          </ul>
        </CardContent>
      </Card>

       <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{t('about.disclaimer')}</p>
      </div>
    </div>
  );
};

export default About;
