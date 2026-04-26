import styled from "@emotion/styled";

export const ToggleButton = styled.button`
  border: 1px solid var(--border-strong);
  background: linear-gradient(140deg, var(--card), color-mix(in srgb, var(--accent) 16%, var(--card)));
  color: var(--text);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--accent);
  }
`;
