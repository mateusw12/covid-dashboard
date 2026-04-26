import styled from "@emotion/styled";

export const ChartCard = styled.article`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--shadow-soft);
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
`;

export const ChartTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
`;

export const ChartSubTitle = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: 0.82rem;
`;

export const ChartBody = styled.div`
  width: 100%;
  height: 280px;
`;
