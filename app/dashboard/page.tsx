import GlobalDashboardView from "@/app/dashboard/components/views/global-dashboard-view";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { parseDashboardFilters, buildTrendSeries, getMetricValue } from "@/lib/utils";
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

  const [globalData, continentsData, countriesData] = await Promise.all([
    CovidService.getGlobalData(filters.interval),
    CovidService.getContinentsData(filters.interval),
    CovidService.getCountriesData(filters.interval),
  ]);

  const focusedSource = globalData;
  const metricValue = getMetricValue(focusedSource, filters.metric);
  const dailyMetricField =
    filters.metric === "cases"
      ? "todayCases"
      : filters.metric === "deaths"
        ? "todayDeaths"
        : "todayRecovered";
  const dailyMetricValue = getMetricValue(focusedSource, dailyMetricField);

  const trendData = buildTrendSeries(metricValue, dailyMetricValue);
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
      globalData={globalData}
      trendData={trendData}
      topCountries={topCountries}
      continentDistribution={continentDistribution}
      startDate={filters.startDate}
      endDate={filters.endDate}
      resolvedInterval={filters.interval}
      metricLabel={getMetricLabel(filters)}
    />
  );
}
