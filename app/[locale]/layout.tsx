import { notFound } from "next/navigation";

import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isSupportedLocale } from "@/lib/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <I18nProvider locale={locale} dictionary={dictionary}>{children}</I18nProvider>;
}
