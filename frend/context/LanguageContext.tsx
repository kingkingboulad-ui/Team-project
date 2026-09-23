'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

// قواميس النصوص
const translations: Record<Lang, Record<string, string>> = {
  en: {
    findNurse: "Find a Nurse",
    meetOurNurses: "Meet Our Nurses",
    viewAllNurses: "View All Nurses →",
    bookNow: "Book Now",
    ourTeam: "Our Team",
    verifiedNurse: "Verified Nurse",
    hourlyRate: "Hourly Rate",
    experience: "Experience",
    rating: "Rating",
    Find_your_ideal_caregiver:"Find your ideal caregiver"
  },
  ar: {
    findNurse: "ابحث عن ممرض",
    meetOurNurses: "تعرف على ممرضينا",
    viewAllNurses: "عرض جميع الممرضين ←",
    bookNow: "احجز الآن",
    ourTeam: "فريقنا",
    verifiedNurse: "ممرض موثوق",
    hourlyRate: "السعر بالساعة",
    experience: "الخبرة",
    rating: "التقييم",
    Find_your_ideal_caregiver:"اعثر على مقدم الرعاية المثالي لك"
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  dir: 'ltr',
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = (localStorage.getItem('preferred_lang') as Lang) || 'en';
    setLang(saved);
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = saved;
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    localStorage.setItem('preferred_lang', next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, dir: lang === 'ar' ? 'rtl' : 'ltr', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);