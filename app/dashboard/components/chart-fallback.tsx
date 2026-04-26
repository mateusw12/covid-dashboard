"use client";

import styled from "@emotion/styled";

const FallbackCard = styled.div`
  border: 1px solid var(--border);
  border-radius: 1rem;
  height: 330px;
  background: linear-gradient(120deg, var(--card), color-mix(in srgb, var(--card) 65%, var(--accent)));
  animation: pulse 1.4s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 0.68;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.68;
    }
  }
`;

export default function ChartFallback() {
  return <FallbackCard aria-hidden="true" />;
}
