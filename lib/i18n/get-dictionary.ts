import { cache } from "react";

import { LanguageLocaleEnum } from "@/lib/enum/language-locale.enum";
import { AppLocale } from "@/lib/i18n/config";

export interface I18nDictionary {
  dashboardLayout: Record<string, string>;
  dashboardViews: Record<string, string>;
  dateRange: Record<string, string>;
  vaccine: Record<string, string>;
}

const importers: Record<AppLocale, () => Promise<I18nDictionary>> = {
  [LanguageLocaleEnum.EN_US]: async () => {
    const [dashboardLayout, dashboardViews, dateRange, vaccine] = await Promise.all([
      import("@/messages/en-US/dashboard/layout.json"),
      import("@/messages/en-US/dashboard/views.json"),
      import("@/messages/en-US/dashboard/date-range.json"),
      import("@/messages/en-US/dashboard/vaccine.json"),
    ]);

    return {
      dashboardLayout: dashboardLayout.default,
      dashboardViews: dashboardViews.default,
      dateRange: dateRange.default,
      vaccine: vaccine.default,
    };
  },
  [LanguageLocaleEnum.PT_BR]: async () => {
    const [dashboardLayout, dashboardViews, dateRange, vaccine] = await Promise.all([
      import("@/messages/pt-BR/dashboard/layout.json"),
      import("@/messages/pt-BR/dashboard/views.json"),
      import("@/messages/pt-BR/dashboard/date-range.json"),
      import("@/messages/pt-BR/dashboard/vaccine.json"),
    ]);

    return {
      dashboardLayout: dashboardLayout.default,
      dashboardViews: dashboardViews.default,
      dateRange: dateRange.default,
      vaccine: vaccine.default,
    };
  },
  [LanguageLocaleEnum.ES_ES]: async () => {
    const [dashboardLayout, dashboardViews, dateRange, vaccine] = await Promise.all([
      import("@/messages/es-ES/dashboard/layout.json"),
      import("@/messages/es-ES/dashboard/views.json"),
      import("@/messages/es-ES/dashboard/date-range.json"),
      import("@/messages/es-ES/dashboard/vaccine.json"),
    ]);

    return {
      dashboardLayout: dashboardLayout.default,
      dashboardViews: dashboardViews.default,
      dateRange: dateRange.default,
      vaccine: vaccine.default,
    };
  },
};

export const getDictionary = cache(async (locale: AppLocale): Promise<I18nDictionary> => {
  return importers[locale]();
});
