/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l-.219.874-.219-.874a1.5 1.5 0 00-1.023-1.023l-.874-.219.874-.219a1.5 1.5 0 001.023-1.023l.219-.874.219.874a1.5 1.5 0 001.023 1.023l.874.219-.874.219a1.5 1.5 0 00-1.023 1.023z" />
  </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3.75h.008v.008H12v-.008zM3 10.5a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
);


const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, availableLanguages } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10">
                <GlobeIcon className="w-5 h-5" />
                <span>{language.toUpperCase()}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                    {Object.keys(availableLanguages).map((lang) => (
                        <a
                            key={lang}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLanguageChange(lang);
                            }}
                            className={`block px-4 py-2 text-sm ${language === lang ? 'text-teal-400 font-bold' : 'text-gray-300 hover:bg-gray-700'}`}
                        >
                            {availableLanguages[lang]}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}


const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-8 border-b border-gray-700 bg-gray-900/60 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SparkleIcon className="w-6 h-6 text-teal-400" />
            <h1 className="text-xl font-bold tracking-tight text-gray-100">
              K AI photo edit
            </h1>
          </div>
          <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;