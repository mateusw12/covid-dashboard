"use client";

import ChartsPanel from "@/app/dashboard/components/charts/charts-panel";
import Filters from "@/app/dashboard/components/filter/filters";
import StatsCards from "@/app/dashboard/components/stats-card/stats-cards";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { GlobalData } from "@/lib/dto/global-data.dto";
import { useI18n } from "@/lib/i18n/context";

import {
  ChartsGrid,
  DashboardPageWrapper,
  Hero,
  HeroText,
  HeroTitle,
} from "@/app/dashboard/page.styles";

interface TrendItem {
  label: string;
  value: number;
}

interface ValueItem {
  name: string;
  value: number;
}

interface CountryOption {
  name: string;
  continent: string;
}

interface DashboardViewProps {
  filters: DashboardFilters;
  globalData: GlobalData;
  trendData: TrendItem[];
  topCountries: ValueItem[];
  continentDistribution: ValueItem[];
  continentsOptions: string[];
  countryOptions: CountryOption[];
  metricLabel: string;
}

export default function DashboardView({
  filters,
  globalData,
  trendData,
  topCountries,
  continentDistribution,
  continentsOptions,
  countryOptions,
  metricLabel,
}: DashboardViewProps) {
  const { t } = useI18n();

  return (
    <DashboardPageWrapper>
      <Hero>
        <HeroTitle>{t("dashboardViews", "overview.title", "Global Health Snapshot")}</HeroTitle>
        <HeroText>
          {t(
            "dashboardViews",
            "overview.text",
            "Analyze global and regional indicators with server-driven filtering, cached fetches, and lightweight interactive charts.",
          )}
        </HeroText>
      </Hero>

      <Filters continents={continentsOptions} countries={countryOptions} current={filters} />

      <StatsCards
        data={globalData}
        selectedCountry={filters.country}
        startDate={filters.startDate}
        endDate={filters.endDate}
        resolvedInterval={filters.interval}
      />

      <ChartsGrid>
        <ChartsPanel
          trendData={trendData}
          topCountries={topCountries}
          continentDistribution={continentDistribution}
          metricLabel={metricLabel}
        />
      </ChartsGrid>
    </DashboardPageWrapper>
  );
}
