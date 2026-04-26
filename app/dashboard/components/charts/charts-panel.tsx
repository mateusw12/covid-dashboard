"use client";

import dynamic from "next/dynamic";

import ChartFallback from "@/app/dashboard/components/charts/chart-fallback";

const LineChart = dynamic(() => import("./line-chart"), {
  ssr: false,
  loading: () => <ChartFallback />,
});

const BarChart = dynamic(() => import("./bar-chart"), {
  ssr: false,
  loading: () => <ChartFallback />,
});

const ContinentMap = dynamic(() => import("../continent-map/continent-map"), {
  ssr: false,
  loading: () => <ChartFallback />,
});

interface TrendItem {
  label: string;
  value: number;
}

interface ValueItem {
  name: string;
  value: number;
}

interface ChartsPanelProps {
  trendData: TrendItem[];
  topCountries: ValueItem[];
  continentDistribution: ValueItem[];
  metricLabel: string;
  onCountryClick?: (country: string) => void;
  selectedCountry?: string;
}

export default function ChartsPanel({
  trendData,
  topCountries,
  continentDistribution,
  metricLabel,
  onCountryClick,
  selectedCountry,
}: ChartsPanelProps) {
  return (
    <>
      <LineChart data={trendData} metricLabel={metricLabel} />
      <BarChart
        data={topCountries}
        metricLabel={metricLabel}
        onCountryClick={onCountryClick}
        selectedCountry={selectedCountry}
      />
      <ContinentMap data={continentDistribution} metricLabel={metricLabel} />
    </>
  );
}
