"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/app/dashboard/components/language-switcher/language-switcher";
import ThemeToggle from "@/app/dashboard/components/theme-toggle/theme-toggle";
import { useI18n } from "@/lib/i18n/context";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";

import {
  Brand,
  BrandHeader,
  BrandLogo,
  BrandSubtitle,
  BrandTitle,
  Content,
  DashboardShell,
  MainArea,
  MobileLink,
  MobileNav,
  Nav,
  NavLink,
  Sidebar,
  TopbarBrand,
  TopbarControls,
  TopbarLogo,
  TopbarTitle,
  Topbar,
} from "./dashboard-layout.styles";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { t } = useI18n();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? DEFAULT_LOCALE;
  const localePrefix = isSupportedLocale(firstSegment) ? `/${firstSegment}` : `/${DEFAULT_LOCALE}`;

  return (
    <DashboardShell>
      <Sidebar>
        <Brand>
          <BrandHeader>
            <BrandLogo>
              <Image
                src="/logo/covid-19.png"
                alt="CoviScope logo"
                width={44}
                height={44}
                priority
              />
            </BrandLogo>
            <BrandTitle>CoviScope</BrandTitle>
          </BrandHeader>
          <BrandSubtitle>
            {t(
              "dashboardLayout",
              "brandSubtitle",
              "Visualize the impact. Understand the data.",
            )}
          </BrandSubtitle>
        </Brand>
        <Nav>
          <NavLink href={`${localePrefix}/dashboard`}>
            {t("dashboardLayout", "nav.overview", "Overview")}
          </NavLink>
          <NavLink href={`${localePrefix}/dashboard/global`}>
            {t("dashboardLayout", "nav.global", "Global")}
          </NavLink>
          <NavLink href={`${localePrefix}/dashboard/countries`}>
            {t("dashboardLayout", "nav.countries", "Countries")}
          </NavLink>
          <NavLink href={`${localePrefix}/dashboard/continents`}>
            {t("dashboardLayout", "nav.continents", "Continents")}
          </NavLink>
          <NavLink href={`${localePrefix}/dashboard/vaccines`}>
            {t("dashboardLayout", "nav.vaccines", "Vaccines")}
          </NavLink>
        </Nav>
      </Sidebar>

      <MainArea>
        <Topbar>
          <TopbarBrand>
            <TopbarLogo>
              <Image
                src="/logo/covid-19.png"
                alt="CoviScope logo"
                width={32}
                height={32}
                priority
              />
            </TopbarLogo>
            <TopbarTitle>{t("dashboardLayout", "topbar.title", "CoviScope")}</TopbarTitle>
          </TopbarBrand>
          <TopbarControls>
            <LanguageSwitcher />
            <ThemeToggle />
          </TopbarControls>
        </Topbar>
        <Content>{children}</Content>
      </MainArea>

      <MobileNav>
        <MobileLink href={`${localePrefix}/dashboard/global`}>
          {t("dashboardLayout", "mobile.global", "Global")}
        </MobileLink>
        <MobileLink href={`${localePrefix}/dashboard/countries`}>
          {t("dashboardLayout", "mobile.countries", "Countries")}
        </MobileLink>
        <MobileLink href={`${localePrefix}/dashboard/continents`}>
          {t("dashboardLayout", "mobile.continents", "Continents")}
        </MobileLink>
        <MobileLink href={`${localePrefix}/dashboard/vaccines`}>
          {t("dashboardLayout", "mobile.vaccines", "Vaccines")}
        </MobileLink>
      </MobileNav>
    </DashboardShell>
  );
}
