"use client";

import { GlobalData } from "@/lib/dto/global-data.dto";
import { useI18n } from "@/lib/i18n/context";
import { formatAsDate, formatCompactNumber } from "@/lib/utils";

import { Card, CardsGrid, Delta, Label, LastUpdated, Value } from "./stats-cards.styles";

interface StatsCardsProps {
  data: GlobalData;
}

const tones = {
  primary: "var(--primary)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
  accent: "var(--accent)",
};

export default function StatsCards({ data }: StatsCardsProps) {
  const { t } = useI18n();

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
