"use client";

import ChartsPanel from "@/app/dashboard/components/charts/charts-panel";
import DateRangeFilter from "@/app/dashboard/components/date-range/date-range-filter";
import StatsCards from "@/app/dashboard/components/stats-card/stats-cards";
import { GlobalData } from "@/lib/dto/global-data.dto";
import { IntervalType } from "@/lib/enum/interval-type.enum";

import { ChartsGrid, Hero, HeroText, HeroTitle, PageWrapper } from "./views.styles";

interface TrendItem {
  label: string;
  value: number;
}

interface ValueItem {
  name: string;
  value: number;
}

interface GlobalDashboardViewProps {
  globalData: GlobalData;
  trendData: TrendItem[];
  topCountries: ValueItem[];
  continentDistribution: ValueItem[];
  startDate: string;
  endDate: string;
  resolvedInterval: IntervalType;
  metricLabel: string;
}

export default function GlobalDashboardView({
  globalData,
  trendData,
  topCountries,
  continentDistribution,
  startDate,
  endDate,
  resolvedInterval,
  metricLabel,
}: GlobalDashboardViewProps) {
  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>Global Overview</HeroTitle>
        <HeroText>Global KPIs and comparative charts focused on worldwide evolution.</HeroText>
      </Hero>

      <DateRangeFilter
        key={`${startDate}-${endDate}`}
        startDate={startDate}
        endDate={endDate}
        resolvedInterval={resolvedInterval}
      />

      <StatsCards data={globalData} />

      <ChartsGrid>
        <ChartsPanel
          trendData={trendData}
          topCountries={topCountries}
          continentDistribution={continentDistribution}
          metricLabel={metricLabel}
        />
      </ChartsGrid>
    </PageWrapper>
  );
}
