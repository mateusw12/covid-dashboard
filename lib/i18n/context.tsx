"use client";

import { createContext, useContext } from "react";

import { DEFAULT_LOCALE, type AppLocale } from "@/lib/i18n/config";
import { type I18nDictionary } from "@/lib/i18n/get-dictionary";

interface I18nContextValue {
  locale: AppLocale;
  dictionary: I18nDictionary;
}

const emptyDictionary: I18nDictionary = {
  dashboardLayout: {},
  dashboardViews: {},
  dateRange: {},
  vaccine: {},
};

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  dictionary: emptyDictionary,
});

export function I18nProvider({
  children,
  locale,
  dictionary,
}: {
  children: React.ReactNode;
  locale: AppLocale;
  dictionary: I18nDictionary;
}) {
  return <I18nContext.Provider value={{ locale, dictionary }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);

  function t(
    namespace: keyof I18nDictionary,
    key: string,
    fallback: string,
  ): string {
    return value.dictionary[namespace]?.[key] ?? fallback;
  }

  return {
    locale: value.locale,
    t,
  };
}
