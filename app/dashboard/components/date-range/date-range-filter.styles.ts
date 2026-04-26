import styled from "@emotion/styled";

export const DateFilterBar = styled.form`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  align-items: end;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: linear-gradient(145deg, var(--card), color-mix(in srgb, var(--card) 84%, var(--accent)));
  box-shadow: var(--shadow-soft);
`;

export const DateField = styled.label`
  display: grid;
  gap: 0.35rem;
`;

export const DateLabel = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const DateInput = styled.input`
  width: 100%;
  border-radius: 0.7rem;
  border: 1px solid var(--border-strong);
  padding: 0.58rem 0.65rem;
  background: color-mix(in srgb, var(--bg) 88%, var(--card));
  color: var(--text);
`;

export const ApplyButton = styled.button`
  border: 1px solid var(--border-strong);
  background: linear-gradient(145deg, var(--primary), color-mix(in srgb, var(--primary) 75%, black));
  color: #fff;
  border-radius: 0.7rem;
  padding: 0.6rem 0.8rem;
  font-weight: 700;
  cursor: pointer;
`;

export const DateStatus = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
`;
