import GlobalDashboardView from "@/app/dashboard/components/views/global-dashboard-view";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { MetricType } from "@/lib/enum/metric-type.enum";
import {
  parseDashboardFilters,
  buildTrendSeries,
  buildTrendSeriesFromTimeline,
  getMetricValue,
} from "@/lib/utils";
import { CovidService } from "@/lib/services/covid.service";

type SearchParams = Record<string, string | string[] | undefined>;

interface DashboardPageProps {
  searchParams: Promise<SearchParams>;
}

function getMetricLabel(filters: DashboardFilters) {
  return `${filters.metric.toUpperCase()} • ${filters.interval}`;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const rawSearchParams = await searchParams;
  const filters = parseDashboardFilters(rawSearchParams);
  const hasCountryFilter = Boolean(filters.country);
  const shouldUseHistoricalTrend = Boolean(filters.startDate && filters.endDate);

  const [globalData, continentsData, countriesData, historicalData, countryData] = await Promise.all([
    CovidService.getGlobalData(filters.interval),
    CovidService.getContinentsData(filters.interval),
    CovidService.getCountriesData(filters.interval),
    shouldUseHistoricalTrend ? CovidService.getGlobalHistoricalData("all") : Promise.resolve(null),
    hasCountryFilter ? CovidService.getCountryData(filters.country, filters.interval) : Promise.resolve(null),
  ]);

  const focusedSource = countryData ?? globalData;
  const metricValue = getMetricValue(focusedSource, filters.metric);
  const dailyMetricField =
    filters.metric === MetricType.Cases
      ? "todayCases"
      : filters.metric === MetricType.Deaths
        ? "todayDeaths"
        : "todayRecovered";
  const dailyMetricValue = getMetricValue(focusedSource, dailyMetricField);

  const historicalTimeline =
    filters.metric === MetricType.Cases
      ? historicalData?.cases
      : filters.metric === MetricType.Deaths
        ? historicalData?.deaths
        : historicalData?.recovered;

  const trendDataFromSnapshot = buildTrendSeries(metricValue, dailyMetricValue);

  const trendData =
    shouldUseHistoricalTrend && historicalTimeline
      ? buildTrendSeriesFromTimeline(historicalTimeline, filters.startDate, filters.endDate)
      : trendDataFromSnapshot;

  const safeTrendData = trendData.length > 0 ? trendData : trendDataFromSnapshot;
  const topCountries = CovidService.getTopCountriesByMetric(countriesData, filters.metric, 8).map(
    (country) => ({
      name: country.country,
      value: getMetricValue(country, filters.metric),
    }),
  );

  const continentDistribution = continentsData.map((continent) => ({
    name: continent.continent,
    value: getMetricValue(continent, filters.metric),
  }));

  return (
    <GlobalDashboardView
      globalData={focusedSource}
      trendData={safeTrendData}
      topCountries={topCountries}
      continentDistribution={continentDistribution}
      startDate={filters.startDate}
      endDate={filters.endDate}
      resolvedInterval={filters.interval}
      metricLabel={getMetricLabel(filters)}
      selectedCountry={filters.country}
    />
  );
}
