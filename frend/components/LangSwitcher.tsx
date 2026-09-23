'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LangSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      <span>🌐</span>
      <span>{lang === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}