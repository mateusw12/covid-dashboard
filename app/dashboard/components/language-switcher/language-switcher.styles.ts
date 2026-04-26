import styled from "@emotion/styled";

export const Switcher = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-strong);
  background: color-mix(in srgb, var(--card) 88%, var(--bg));
  color: var(--text);
  border-radius: 0.65rem;
  padding: 0.35rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

export const TriggerFlag = styled.span`
  width: 28px;
  height: 20px;
  border-radius: 0.35rem;
  overflow: hidden;
  border: 1px solid var(--border);
  display: block;
`;

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 0.35rem);
  right: 0;
  min-width: 80px;
  border: 1px solid var(--border-strong);
  background: var(--card);
  border-radius: 0.45rem;
  padding: 0.35rem;
  box-shadow: var(--shadow-soft);
  z-index: 20;
`;

export const MenuItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid
    ${({ isActive }) => (isActive ? "var(--accent)" : "transparent")};
  background: ${({ isActive }) =>
    isActive
      ? "color-mix(in srgb, var(--accent) 18%, var(--card))"
      : "transparent"};
  color: var(--text);
  border-radius: 0.45rem;
  padding: 0.35rem 0.45rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
  }
`;

export const MenuFlag = styled.span`
  width: 28px;
  height: 20px;
  border-radius: 0.35rem;
  overflow: hidden;
  border: 1px solid var(--border);
  display: block;
`;
