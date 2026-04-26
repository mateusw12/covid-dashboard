import styled from "@emotion/styled";

export const PieLegend = styled.ul`
  list-style: none;
  margin: 0.85rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.35rem;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
`;

export const PieLegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--text-muted);
`;

export const Swatch = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
