import { LanguageLocaleEnum } from "@/lib/enum/language-locale.enum";

export type AppLocale = `${LanguageLocaleEnum}`;

export const SUPPORTED_LOCALES: readonly AppLocale[] = [
  LanguageLocaleEnum.EN_US,
  LanguageLocaleEnum.PT_BR,
  LanguageLocaleEnum.ES_ES,
];

export const DEFAULT_LOCALE: AppLocale = LanguageLocaleEnum.EN_US;

export function isSupportedLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}
