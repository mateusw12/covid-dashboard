"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRef } from "react";

import ChartExportActions from "@/app/dashboard/components/charts/export/chart-export-actions";
import { formatCompactNumber } from "@/lib/utils";

import { ChartBody, ChartCard, ChartHeader, ChartSubTitle, ChartTitle } from "../charts/line-chart.styles";
import { PieLegend, PieLegendItem, Swatch } from "./continent-map.styles";

interface PieItem {
  name: string;
  value: number;
}

interface ContinentMapProps {
  data: PieItem[];
  metricLabel: string;
}

const colors = ["#FF7A1A", "#FF9A3D", "#FFC16E", "#E36B2C", "#C8641E", "#A9521A"];

export default function ContinentMap({ data, metricLabel }: ContinentMapProps) {
  const chartRef = useRef<HTMLElement | null>(null);

  return (
    <ChartCard ref={chartRef}>
      <ChartHeader>
        <div>
          <ChartTitle>Continent Distribution</ChartTitle>
          <ChartSubTitle>{metricLabel}</ChartSubTitle>
        </div>
        <ChartExportActions targetRef={chartRef} fileBaseName="coviscope-continents-chart" />
      </ChartHeader>
      <ChartBody>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={95}
              labelLine={false}
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => {
                const numericValue = typeof value === "number" ? value : Number(value ?? 0);
                return formatCompactNumber(numericValue);
              }}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border-strong)",
                borderRadius: "0.6rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartBody>
      <PieLegend>
        {data.map((item, index) => (
          <PieLegendItem key={item.name}>
            <Swatch color={colors[index % colors.length]} />
            {item.name}: {formatCompactNumber(item.value)}
          </PieLegendItem>
        ))}
      </PieLegend>
    </ChartCard>
  );
}
