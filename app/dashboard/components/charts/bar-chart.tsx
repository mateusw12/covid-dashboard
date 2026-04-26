"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRef } from "react";

import ChartExportActions from "@/app/dashboard/components/charts/export/chart-export-actions";
import { formatCompactNumber } from "@/lib/utils";

import { ChartBody, ChartCard, ChartHeader, ChartSubTitle, ChartTitle } from "./line-chart.styles";

interface BarItem {
  name: string;
  value: number;
}

interface BarChartProps {
  data: BarItem[];
  metricLabel: string;
  onCountryClick?: (country: string) => void;
}

export default function BarChart({ data, metricLabel, onCountryClick }: BarChartProps) {
  const chartRef = useRef<HTMLElement | null>(null);

  const handleBarClick = (entry: { name?: string; payload?: { name?: string } }) => {
    const countryName = entry?.name ?? entry?.payload?.name;

    if (countryName && onCountryClick) {
      onCountryClick(countryName);
    }
  };

  return (
    <ChartCard ref={chartRef}>
      <ChartHeader>
        <div>
          <ChartTitle>Top Countries</ChartTitle>
          <ChartSubTitle>{metricLabel}</ChartSubTitle>
        </div>
        <ChartExportActions targetRef={chartRef} fileBaseName="coviscope-countries-chart" />
      </ChartHeader>
      <ChartBody>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
            <YAxis
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={formatCompactNumber}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "0.6rem",
              }}
              formatter={(value) => {
                const numericValue = typeof value === "number" ? value : Number(value ?? 0);
                return formatCompactNumber(numericValue);
              }}
            />
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
              cursor={onCountryClick ? "pointer" : "default"}
              onClick={handleBarClick}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartBody>
    </ChartCard>
  );
}
