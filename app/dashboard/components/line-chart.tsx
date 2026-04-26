"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompactNumber } from "@/lib/utils";

import { ChartBody, ChartCard, ChartHeader, ChartSubTitle, ChartTitle } from "./line-chart.styles";

interface TrendItem {
  label: string;
  value: number;
}

interface LineChartProps {
  data: TrendItem[];
  metricLabel: string;
}

export default function LineChart({ data, metricLabel }: LineChartProps) {
  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>Temporal Trend</ChartTitle>
        <ChartSubTitle>{metricLabel}</ChartSubTitle>
      </ChartHeader>
      <ChartBody>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis dataKey="label" tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
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
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={3}
              dot={{ fill: "var(--accent)", strokeWidth: 0, r: 5 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </ChartBody>
    </ChartCard>
  );
}
