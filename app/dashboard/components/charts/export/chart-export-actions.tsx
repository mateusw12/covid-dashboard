"use client";

import styled from "@emotion/styled";
import { toPng, toSvg } from "html-to-image";
import { RefObject, useState } from "react";

const Actions = styled.div`
  display: flex;
  gap: 0.45rem;
  margin-left: auto;
`;

const ActionButton = styled.button`
  border: 1px solid var(--border-strong);
  border-radius: 0.55rem;
  background: color-mix(in srgb, var(--card) 84%, var(--bg));
  color: var(--text);
  font-size: 0.74rem;
  padding: 0.35rem 0.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

interface ChartExportActionsProps {
  targetRef: RefObject<HTMLElement | null>;
  fileBaseName: string;
}

function downloadFromDataUrl(dataUrl: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

export default function ChartExportActions({ targetRef, fileBaseName }: ChartExportActionsProps) {
  const [isBusy, setIsBusy] = useState(false);

  const handleExportPng = async () => {
    if (!targetRef.current) {
      return;
    }

    setIsBusy(true);
    try {
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      downloadFromDataUrl(dataUrl, `${fileBaseName}.png`);
    } finally {
      setIsBusy(false);
    }
  };

  const handleExportSvg = async () => {
    if (!targetRef.current) {
      return;
    }

    setIsBusy(true);
    try {
      const dataUrl = await toSvg(targetRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      downloadFromDataUrl(dataUrl, `${fileBaseName}.svg`);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Actions>
      <ActionButton type="button" onClick={handleExportPng} disabled={isBusy}>
        PNG
      </ActionButton>
      <ActionButton type="button" onClick={handleExportSvg} disabled={isBusy}>
        SVG
      </ActionButton>
    </Actions>
  );
}
