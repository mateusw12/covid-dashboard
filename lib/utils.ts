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

export function buildTrendSeriesFromTimeline(
  timeline: Record<string, number>,
  startDate: string,
  endDate: string,
) {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);

  if (!start || !end) {
    return [];
  }

  const lower = start <= end ? start : end;
  const upper = start <= end ? end : start;

  return Object.entries(timeline)
    .map(([label, value]) => ({
      label,
      date: parseTimelineDate(label),
      value,
    }))
    .filter((item) => item.date && item.date >= lower && item.date <= upper)
    .sort((left, right) => (left.date && right.date ? left.date.getTime() - right.date.getTime() : 0))
    .map((item) => ({
      label: item.label,
      value: item.value,
    }));
}

export function parseDashboardFilters(
  searchParams: Record<string, string | string[] | undefined>,
): DashboardFilters {
  const metric = normalizeMetric(searchParams.metric);
  const parsedStartDate = normalizeDateInput(searchParams.startDate);
  const parsedEndDate = normalizeDateInput(searchParams.endDate);
  const interval = parsedEndDate
    ? resolveIntervalFromDateValue(parsedEndDate)
    : normalizeInterval(searchParams.interval);

  return {
    continent: getSingleValue(searchParams.continent),
    country: getSingleValue(searchParams.country),
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    metric,
    interval,
  };
}

export function resolveIntervalFromDateValue(inputDate: string): IntervalType {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(`${inputDate}T00:00:00`);

  if (Number.isNaN(target.getTime())) {
    return IntervalType.Today;
  }

  const diff = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 1) {
    return IntervalType.Yesterday;
  }

  if (diff >= 2) {
    return IntervalType.TwoDaysAgo;
  }

  return IntervalType.Today;
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

function normalizeDateInput(value: string | string[] | undefined): string {
  const candidate = getSingleValue(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    return candidate;
  }

  return "";
}

function parseDateInput(value: string): Date | null {
  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function parseTimelineDate(value: string): Date | null {
  const [monthRaw, dayRaw, yearRaw] = value.split("/");
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  const year = Number(yearRaw);

  if (!month || !day || Number.isNaN(year)) {
    return null;
  }

  const fullYear = year < 100 ? 2000 + year : year;
  const parsed = new Date(fullYear, month - 1, day);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  parsed.setHours(0, 0, 0, 0);
  return parsed;
}
