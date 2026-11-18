import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { info as infoEn, type Info } from '../data/info';
import { infoEs } from '../data/info.es';
import { ui, type UI } from './ui';
import type { Lang } from './types';

interface I18nContextValue {
  lang: Lang;
  info: Info;
  ui: UI;
  locale: string;
  switchLanguage: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLanguage(): Lang {
  const fromDocument = document.documentElement.dataset.lang;
  if (fromDocument === 'es') return 'es';
  if (fromDocument === 'en') return 'en';
  return window.location.pathname.startsWith('/es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = detectLanguage();

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      info: lang === 'es' ? infoEs : infoEn,
      ui: ui[lang],
      locale: lang === 'es' ? 'es-ES' : 'en-GB',
      switchLanguage: () => {
        window.location.assign(lang === 'es' ? '/' : '/es/');
      },
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within LanguageProvider');
  return context;
}
