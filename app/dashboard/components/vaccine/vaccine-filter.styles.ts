import styled from "@emotion/styled";

export const VaccineFilterBar = styled.form`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  align-items: end;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: linear-gradient(145deg, var(--card), color-mix(in srgb, var(--card) 84%, var(--secondary)));
  box-shadow: var(--shadow-soft);
`;

export const FilterField = styled.label`
  display: grid;
  gap: 0.35rem;
`;

export const FilterLabel = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const sharedInput = `
  width: 100%;
  border-radius: 0.7rem;
  border: 1px solid var(--border-strong);
  padding: 0.58rem 0.65rem;
  background: color-mix(in srgb, var(--bg) 88%, var(--card));
  color: var(--text);
`;

export const FilterInput = styled.input`
  ${sharedInput}
`;

export const FilterButton = styled.button`
  border: 1px solid var(--border-strong);
  border-radius: 0.7rem;
  padding: 0.58rem 0.8rem;
  background: linear-gradient(145deg, var(--primary), color-mix(in srgb, var(--primary) 70%, black));
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;
