"use client";

import { GlobalData } from "@/lib/dto/global-data.dto";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import { useI18n } from "@/lib/i18n/context";
import { formatAsDate, formatCompactNumber } from "@/lib/utils";

import {
  Card,
  CardsGrid,
  Delta,
  FilterScope,
  Label,
  LastUpdated,
  Value,
} from "./stats-cards.styles";

interface StatsCardsProps {
  data: GlobalData;
  selectedCountry?: string;
  startDate: string;
  endDate: string;
  resolvedInterval: IntervalType;
}

const tones = {
  primary: "var(--primary)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
  accent: "var(--accent)",
};

export default function StatsCards({
  data,
  selectedCountry,
  startDate,
  endDate,
  resolvedInterval,
}: StatsCardsProps) {
  const { t } = useI18n();

  const intervalLabel =
    resolvedInterval === IntervalType.TwoDaysAgo
      ? t("dateRange", "interval.twoDaysAgo", "two days ago")
      : resolvedInterval === IntervalType.Yesterday
        ? t("dateRange", "interval.yesterday", "yesterday")
        : t("dateRange", "interval.today", "today");

  const dateRangeLabel =
    startDate && endDate
      ? `${startDate} -> ${endDate}`
      : intervalLabel;

  const scopeLabel = selectedCountry
    ? `${t("dashboardViews", "stats.scope.country", "Country")}: ${selectedCountry}`
    : t("dashboardViews", "stats.scope.global", "Global scope");

  const cards = [
    {
      label: t("dashboardViews", "stats.totalCases", "Total Cases"),
      value: data.cases,
      delta: data.todayCases,
      tone: tones.primary,
    },
    {
      label: t("dashboardViews", "stats.deaths", "Deaths"),
      value: data.deaths,
      delta: data.todayDeaths,
      tone: tones.danger,
    },
    {
      label: t("dashboardViews", "stats.recovered", "Recovered"),
      value: data.recovered,
      delta: data.todayRecovered,
      tone: tones.success,
    },
    {
      label: t("dashboardViews", "stats.active", "Active"),
      value: data.active,
      delta: 0,
      tone: tones.warning,
    },
    {
      label: t("dashboardViews", "stats.critical", "Critical"),
      value: data.critical,
      delta: 0,
      tone: tones.accent,
    },
  ] as const;

  return (
    <div>
      <FilterScope>
        {scopeLabel} | {t("dashboardViews", "stats.scope.snapshot", "Snapshot")}: {dateRangeLabel}
      </FilterScope>
      <CardsGrid>
        {cards.map((card) => (
          <Card key={card.label} tone={card.tone}>
            <Label>{card.label}</Label>
            <Value>{formatCompactNumber(card.value)}</Value>
            <Delta>
              {card.delta > 0
                ? `+${formatCompactNumber(card.delta)} ${t("dashboardViews", "stats.today", "today")}`
                : t("dashboardViews", "stats.noDailyDelta", "No daily delta")}
            </Delta>
          </Card>
        ))}
      </CardsGrid>
      <LastUpdated>
        {t("dashboardViews", "stats.updatedAt", "Updated at")} {formatAsDate(data.updated)}
      </LastUpdated>
    </div>
  );
}
