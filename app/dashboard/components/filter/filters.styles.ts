import styled from "@emotion/styled";

export const FiltersWrapper = styled.section`
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  align-items: end;
  padding: 1rem;
  border: 1px solid var(--border);
  background: linear-gradient(145deg, var(--card), color-mix(in srgb, var(--card) 84%, var(--primary)));
  border-radius: 1rem;
  box-shadow: var(--shadow-soft);
`;

export const Field = styled.label`
  display: grid;
  gap: 0.35rem;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

const inputStyles = `
  width: 100%;
  border-radius: 0.7rem;
  border: 1px solid var(--border-strong);
  padding: 0.58rem 0.65rem;
  background: color-mix(in srgb, var(--bg) 88%, var(--card));
  color: var(--text);
`;

export const Select = styled.select`
  ${inputStyles}
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Status = styled.span`
  font-size: 0.75rem;
  color: var(--accent);
`;
