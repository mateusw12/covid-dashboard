import styled from "@emotion/styled";

export const DashboardPageWrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Hero = styled.section`
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.2rem;
  background:
    radial-gradient(circle at 90% -10%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 35%),
    radial-gradient(circle at -10% 130%, color-mix(in srgb, var(--primary) 26%, transparent), transparent 42%),
    var(--card);
  box-shadow: var(--shadow-soft);
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2rem);
`;

export const HeroText = styled.p`
  margin: 0.55rem 0 0;
  max-width: 72ch;
  color: var(--text-muted);
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
