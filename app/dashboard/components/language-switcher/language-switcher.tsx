"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { LanguageLocaleEnum } from "@/lib/enum/language-locale.enum";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type AppLocale, isSupportedLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";

import {
  Menu,
  MenuFlag,
  MenuItem,
  Switcher,
  Trigger,
  TriggerFlag,
} from "./language-switcher.styles";

const localeToFlag: Record<AppLocale, string> = {
  [LanguageLocaleEnum.EN_US]: "/lang-flag/en.svg",
  [LanguageLocaleEnum.PT_BR]: "/lang-flag/br.svg",
  [LanguageLocaleEnum.ES_ES]: "/lang-flag/es.svg",
};

const localeToLabel: Record<AppLocale, string> = {
  [LanguageLocaleEnum.EN_US]: "English",
  [LanguageLocaleEnum.PT_BR]: "Portuguese",
  [LanguageLocaleEnum.ES_ES]: "Spanish",
};

function swapLocaleInPath(pathname: string, locale: AppLocale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (isSupportedLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}/${segments.join("/")}`;
}

export default function LanguageSwitcher() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const firstPathSegment = pathname.split("/").filter(Boolean)[0] ?? DEFAULT_LOCALE;
  const activeLocale: AppLocale = isSupportedLocale(firstPathSegment)
    ? firstPathSegment
    : DEFAULT_LOCALE;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleChangeLocale = (locale: AppLocale) => {
    if (locale === activeLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const nextPathname = swapLocaleInPath(pathname, locale);
      const query = typeof window !== "undefined" ? window.location.search.slice(1) : "";
      router.replace(query ? `${nextPathname}?${query}` : nextPathname, { scroll: false });
    });
    setIsOpen(false);
  };

  return (
    <Switcher aria-label={t("dashboardLayout", "language.aria", "Language switcher")} ref={rootRef}>
      <Trigger
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t("dashboardLayout", "language.trigger", "Select language")}
        disabled={isPending}
      >
        <TriggerFlag>
          <Image
            src={localeToFlag[activeLocale]}
            alt={localeToLabel[activeLocale]}
            width={28}
            height={20}
            sizes="(max-width: 768px) 24px, 28px"
          />
        </TriggerFlag>
      </Trigger>

      {isOpen ? (
        <Menu role="menu">
          {SUPPORTED_LOCALES.map((locale) => (
            <MenuItem
              key={locale}
              type="button"
              isActive={locale === activeLocale}
              onClick={() => handleChangeLocale(locale)}
              aria-label={localeToLabel[locale]}
              role="menuitem"
            >
              <MenuFlag>
                <Image
                  src={localeToFlag[locale]}
                  alt={localeToLabel[locale]}
                  width={28}
                  height={20}
                  sizes="(max-width: 768px) 24px, 28px"
                />
              </MenuFlag>
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </Switcher>
  );
}
