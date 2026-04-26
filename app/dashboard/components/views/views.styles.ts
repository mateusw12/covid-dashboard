"use client";

import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Hero = styled.section`
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.2rem;
  background:
    radial-gradient(circle at 92% -12%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 36%),
    radial-gradient(circle at -10% 120%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 44%),
    var(--card);
  box-shadow: var(--shadow-soft);
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.3rem, 2.6vw, 1.95rem);
`;

export const HeroText = styled.p`
  margin: 0.5rem 0 0;
  color: var(--text-muted);
`;

export const SelectedFilterBar = styled.section`
  border: 1px solid color-mix(in srgb, var(--accent) 38%, var(--border));
  border-radius: 0.85rem;
  padding: 0.75rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: color-mix(in srgb, var(--accent) 10%, var(--card));
`;

export const SelectedFilterMeta = styled.p`
  margin: 0;
  color: var(--text);
  font-size: 0.92rem;

  strong {
    color: var(--accent-strong);
    font-weight: 700;
  }
`;

export const ClearFilterButton = styled.button`
  appearance: none;
  border: 1px solid var(--border-strong);
  background: var(--card);
  color: var(--text);
  border-radius: 0.7rem;
  padding: 0.4rem 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--card) 80%, var(--bg));
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ChartsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;

  > * {
    grid-column: span 12;
  }

  @media (min-width: 980px) {
    > *:nth-of-type(1),
    > *:nth-of-type(2) {
      grid-column: span 6;
    }

    > *:nth-of-type(3) {
      grid-column: span 12;
    }
  }
`;

export const Panel = styled.section`
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--card);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
`;

export const PanelHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

export const PanelBody = styled.div`
  padding: 0.75rem 1rem 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th,
  td {
    text-align: left;
    padding: 0.62rem 0.48rem;
    border-bottom: 1px solid var(--border);
  }

  th {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }
`;

export const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.8rem;
`;

export const ListCard = styled.article`
  border: 1px solid var(--border);
  border-radius: 0.8rem;
  padding: 0.75rem;
  background: color-mix(in srgb, var(--card) 92%, var(--bg));
`;

export const ListLabel = styled.p`
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
`;

export const ListValue = styled.p`
  margin: 0.35rem 0 0;
  font-size: 1.1rem;
  font-weight: 700;
`;
