"use client";

import ChartsPanel from "@/app/dashboard/components/charts/charts-panel";
import DateRangeFilter from "@/app/dashboard/components/date-range/date-range-filter";
import StatsCards from "@/app/dashboard/components/stats-card/stats-cards";
import { GlobalData } from "@/lib/dto/global-data.dto";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import { useI18n } from "@/lib/i18n/context";

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
  const { t } = useI18n();

  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>{t("dashboardViews", "global.title", "Global Overview")}</HeroTitle>
        <HeroText>
          {t(
            "dashboardViews",
            "global.text",
            "Global KPIs and comparative charts focused on worldwide evolution.",
          )}
        </HeroText>
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
