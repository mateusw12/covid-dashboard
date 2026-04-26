"use client";

import Image from "next/image";
import ThemeToggle from "@/app/dashboard/components/theme-toggle/theme-toggle";

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
  TopbarLogo,
  TopbarTitle,
  Topbar,
} from "./dashboard-layout.styles";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
          <BrandSubtitle>Visualize the impact. Understand the data.</BrandSubtitle>
        </Brand>
        <Nav>
          <NavLink href="/dashboard">Overview</NavLink>
          <NavLink href="/dashboard/global">Global</NavLink>
          <NavLink href="/dashboard/countries">Countries</NavLink>
          <NavLink href="/dashboard/continents">Continents</NavLink>
          <NavLink href="/dashboard/vaccines">Vaccines</NavLink>
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
            <TopbarTitle>CoviScope</TopbarTitle>
          </TopbarBrand>
          <ThemeToggle />
        </Topbar>
        <Content>{children}</Content>
      </MainArea>

      <MobileNav>
        <MobileLink href="/dashboard/global">Global</MobileLink>
        <MobileLink href="/dashboard/countries">Countries</MobileLink>
        <MobileLink href="/dashboard/continents">Continents</MobileLink>
        <MobileLink href="/dashboard/vaccines">Vaccines</MobileLink>
      </MobileNav>
    </DashboardShell>
  );
}
