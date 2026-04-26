"use client";

import ThemeToggle from "@/app/dashboard/components/theme-toggle/theme-toggle";

import {
  Brand,
  BrandSubtitle,
  BrandTitle,
  Breadcrumb,
  Content,
  DashboardShell,
  MainArea,
  MobileLink,
  MobileNav,
  Nav,
  NavLink,
  Sidebar,
  Topbar,
} from "./dashboard-layout.styles";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardShell>
      <Sidebar>
        <Brand>
          <BrandTitle>CoviScope</BrandTitle>
          <BrandSubtitle>Visualize the impact. Understand the data.</BrandSubtitle>
        </Brand>
        <Nav>
          <NavLink href="/dashboard">Overview</NavLink>
          <NavLink href="/dashboard/global">Global</NavLink>
          <NavLink href="/dashboard/countries">Countries</NavLink>
          <NavLink href="/dashboard/continents">Continents</NavLink>
        </Nav>
      </Sidebar>

      <MainArea>
        <Topbar>
          <Breadcrumb>Home / Dashboard</Breadcrumb>
          <ThemeToggle />
        </Topbar>
        <Content>{children}</Content>
      </MainArea>

      <MobileNav>
        <MobileLink href="/dashboard/global">Global</MobileLink>
        <MobileLink href="/dashboard/countries">Countries</MobileLink>
        <MobileLink href="/dashboard/continents">Continents</MobileLink>
      </MobileNav>
    </DashboardShell>
  );
}
