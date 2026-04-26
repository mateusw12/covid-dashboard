import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";

interface LocaleHomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect(`/${DEFAULT_LOCALE}/dashboard`);
  }

  redirect(`/${locale}/dashboard`);
}
