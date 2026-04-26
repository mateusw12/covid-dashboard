import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";
import { redirect } from "next/navigation";

interface LocaleCatchAllPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleCatchAllPage({ params }: LocaleCatchAllPageProps) {
  const { locale } = await params;
  const nextLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  redirect(`/${nextLocale}/dashboard`);
}
