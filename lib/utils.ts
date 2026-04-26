import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import { MetricType } from "@/lib/enum/metric-type.enum";

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value ?? 0);
}

export function formatAsDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(timestamp);
}

export function getMetricValue<T extends object>(
  item: T,
  metric: MetricType | "todayCases" | "todayDeaths" | "todayRecovered",
): number {
  const value = item[metric as keyof T];
  return typeof value === "number" ? value : 0;
}

export function buildTrendSeries(total: number, todayDelta: number) {
  const safeTotal = Math.max(0, total);
  const safeDelta = Math.max(0, todayDelta);
  const yesterday = Math.max(0, safeTotal - safeDelta);
  const twoDaysAgo = Math.max(0, yesterday - safeDelta * 0.82);

  return [
    { label: "Two Days Ago", value: Math.round(twoDaysAgo) },
    { label: "Yesterday", value: Math.round(yesterday) },
    { label: "Today", value: Math.round(safeTotal) },
  ];
}

export function parseDashboardFilters(
  searchParams: Record<string, string | string[] | undefined>,
): DashboardFilters {
  const metric = normalizeMetric(searchParams.metric);
  const interval = normalizeInterval(searchParams.interval);

  return {
    continent: getSingleValue(searchParams.continent),
    country: getSingleValue(searchParams.country),
    metric,
    interval,
  };
}

function getSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function normalizeMetric(value: string | string[] | undefined): MetricType {
  const candidate = getSingleValue(value);

  if (candidate === MetricType.Deaths || candidate === MetricType.Recovered) {
    return candidate as MetricType;
  }

  return MetricType.Cases;
}

function normalizeInterval(value: string | string[] | undefined): IntervalType {
  const candidate = getSingleValue(value);

  if (candidate === IntervalType.Yesterday || candidate === IntervalType.TwoDaysAgo) {
    return candidate as IntervalType;
  }

  return IntervalType.Today;
}
