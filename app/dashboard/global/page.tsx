import GlobalDashboardView from "@/app/dashboard/components/views/global-dashboard-view";
import { isApiRequestError } from "@/lib/api";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { MetricType } from "@/lib/enum/metric-type.enum";
import { CovidService } from "@/lib/services/covid.service";
import {
  buildTrendSeries,
  buildTrendSeriesFromTimeline,
  getMetricValue,
  parseDashboardFilters,
} from "@/lib/utils";
import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

interface GlobalPageProps {
  searchParams: Promise<SearchParams>;
}

function getMetricLabel(filters: DashboardFilters) {
  return `${filters.metric.toUpperCase()} • ${filters.interval}`;
}

export default async function GlobalPage({ searchParams }: GlobalPageProps) {
  const rawSearchParams = await searchParams;
  const filters = parseDashboardFilters(rawSearchParams);
  const hasCountryFilter = Boolean(filters.country);
  const shouldUseHistoricalTrend = Boolean(filters.startDate && filters.endDate);

  const [globalData, continentsData, countriesData, historicalData] = await Promise.all([
    CovidService.getGlobalData(filters.interval),
    CovidService.getContinentsData(filters.interval),
    CovidService.getCountriesData(filters.interval),
    shouldUseHistoricalTrend ? CovidService.getGlobalHistoricalData("all") : Promise.resolve(null),
  ]);

  let countryData = null;

  if (hasCountryFilter) {
    const normalizedCountryFilter = filters.country.trim().toLocaleLowerCase();
    const matchedCountry = countriesData.find(
      (country) => country.country.toLocaleLowerCase() === normalizedCountryFilter,
    );

    if (!matchedCountry) {
      redirect("/");
    }

    countryData = await CovidService.getCountryData(matchedCountry.country, filters.interval).catch(
      (error: unknown) => {
        if (isApiRequestError(error) && error.status === 404) {
          redirect("/");
        }

        throw error;
      },
    );
  }

  const focusedSource = countryData ?? globalData;
  const metricValue = getMetricValue(focusedSource, filters.metric);
  const dailyMetricField =
    filters.metric === MetricType.Cases
      ? "todayCases"
      : filters.metric === MetricType.Deaths
        ? "todayDeaths"
        : "todayRecovered";

  const historicalTimeline =
    filters.metric === MetricType.Cases
      ? historicalData?.cases
      : filters.metric === MetricType.Deaths
        ? historicalData?.deaths
        : historicalData?.recovered;

  const trendDataFromSnapshot = buildTrendSeries(
    metricValue,
    getMetricValue(focusedSource, dailyMetricField),
  );

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
      selectedCountry={countryData?.country ?? filters.country}
    />
  );
}
