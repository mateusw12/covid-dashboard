"use client";

import ContinentMap from "@/app/dashboard/components/continent-map/continent-map";
import DateRangeFilter from "@/app/dashboard/components/date-range/date-range-filter";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import { useI18n } from "@/lib/i18n/context";
import { formatCompactNumber } from "@/lib/utils";

import {
  Hero,
  HeroText,
  HeroTitle,
  ListCard,
  ListGrid,
  ListLabel,
  ListValue,
  PageWrapper,
} from "./views.styles";

interface ContinentRow {
  name: string;
  value: number;
  population: number;
}

interface ContinentsDashboardViewProps {
  titleMetric: string;
  distribution: { name: string; value: number }[];
  rows: ContinentRow[];
  startDate: string;
  endDate: string;
  resolvedInterval: IntervalType;
}

export default function ContinentsDashboardView({
  titleMetric,
  distribution,
  rows,
  startDate,
  endDate,
  resolvedInterval,
}: ContinentsDashboardViewProps) {
  const { t } = useI18n();

  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>{t("dashboardViews", "continents.title", "Continents")}</HeroTitle>
        <HeroText>
          {t(
            "dashboardViews",
            "continents.text",
            "Continental health indicators and regional distribution map.",
          )}
        </HeroText>
      </Hero>

      <DateRangeFilter
        key={`${startDate}-${endDate}`}
        startDate={startDate}
        endDate={endDate}
        resolvedInterval={resolvedInterval}
      />

      <ContinentMap data={distribution} metricLabel={titleMetric} />

      <ListGrid>
        {rows.map((row) => (
          <ListCard key={row.name}>
            <ListLabel>{row.name}</ListLabel>
            <ListValue>{formatCompactNumber(row.value)}</ListValue>
            <ListLabel>
              {t("dashboardViews", "continents.populationLabel", "Population")}: {formatCompactNumber(row.population)}
            </ListLabel>
          </ListCard>
        ))}
      </ListGrid>
    </PageWrapper>
  );
}
