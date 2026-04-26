"use client";

import styled from "@emotion/styled";
import { utils, writeFile } from "xlsx";

const ExportButton = styled.button`
  border: 1px solid var(--border-strong);
  border-radius: 0.65rem;
  background: linear-gradient(145deg, var(--primary), color-mix(in srgb, var(--primary) 74%, black));
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.45rem 0.75rem;
  cursor: pointer;
`;

interface TableExportButtonProps {
  rows: Array<Record<string, string | number>>;
  fileName: string;
}

export default function TableExportButton({ rows, fileName }: TableExportButtonProps) {
  const handleExport = () => {
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Countries");
    writeFile(workbook, fileName);
  };

  return (
    <ExportButton type="button" onClick={handleExport}>
      Export Excel
    </ExportButton>
  );
}
