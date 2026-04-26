"use client";

import styled from "@emotion/styled";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`;

const SkeletonBlock = styled.div`
  border: 1px solid var(--border);
  border-radius: 1rem;
  height: 140px;
  background: linear-gradient(110deg, var(--card), color-mix(in srgb, var(--card) 70%, var(--primary)));
  animation: pulse 1.4s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 0.72;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.72;
    }
  }
`;

export default function DashboardLoading() {
  return (
    <Grid>
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
    </Grid>
  );
}
