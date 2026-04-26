import styled from "@emotion/styled";
import Link from "next/link";

export const DashboardShell = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 250px 1fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding-bottom: 4.2rem;
  }
`;

export const Sidebar = styled.aside`
  border-right: 1px solid var(--border);
  padding: 1.1rem;
  background: linear-gradient(170deg, color-mix(in srgb, var(--card) 90%, var(--primary)), var(--card));
  position: sticky;
  top: 0;
  height: 100dvh;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const Brand = styled.div`
  display: grid;
  gap: 0.25rem;
  margin-bottom: 1.15rem;
`;

export const BrandTitle = styled.h1`
  margin: 0;
  font-size: 1.35rem;
`;

export const BrandSubtitle = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

export const Nav = styled.nav`
  display: grid;
  gap: 0.55rem;
`;

export const NavLink = styled(Link)`
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  font-size: 0.92rem;
  color: var(--text-muted);
  transition: border-color 170ms ease, color 170ms ease;

  &:hover {
    border-color: var(--accent);
    color: var(--text);
  }
`;

export const MainArea = styled.div`
  display: grid;
  align-content: start;
`;

export const Topbar = styled.header`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  backdrop-filter: blur(6px);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  position: sticky;
  top: 0;
  z-index: 6;
`;

export const Breadcrumb = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
`;

export const Content = styled.main`
  padding: 1.2rem;
`;

export const MobileNav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: color-mix(in srgb, var(--card) 88%, var(--bg));
  border-top: 1px solid var(--border);
  padding: 0.6rem 1rem;
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;

  @media (max-width: 980px) {
    display: grid;
  }
`;

export const MobileLink = styled(Link)`
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
`;
