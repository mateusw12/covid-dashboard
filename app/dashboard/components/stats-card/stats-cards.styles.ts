import styled from "@emotion/styled";

export const CardsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

export const FilterScope = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.8rem;
  color: var(--text-muted);
`;

export const Card = styled.article<{ tone: string }>`
  background: linear-gradient(160deg, var(--card), color-mix(in srgb, var(--card) 70%, black));
  border: 1px solid color-mix(in srgb, var(--border) 75%, ${({ tone }) => tone});
  border-radius: 1rem;
  padding: 1rem;
  display: grid;
  gap: 0.35rem;
  box-shadow: var(--shadow-soft);
`;

export const Label = styled.p`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.82;
`;

export const Value = styled.p`
  font-size: clamp(1.2rem, 1.6vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
`;

export const Delta = styled.p`
  font-size: 0.82rem;
  color: var(--text-muted);
`;

export const LastUpdated = styled.p`
  font-size: 0.78rem;
  color: var(--text-muted);
`;
