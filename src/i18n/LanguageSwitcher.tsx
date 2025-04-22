import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRtl } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`btn btn-outline-primary language-switcher ${isRtl ? 'ms-2' : 'me-2'}`}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher; 