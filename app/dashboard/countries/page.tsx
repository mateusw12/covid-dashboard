import CountriesDashboardView from "@/app/dashboard/components/views/countries-dashboard-view";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { CovidService } from "@/lib/services/covid.service";
import { getMetricValue, parseDashboardFilters } from "@/lib/utils";

type SearchParams = Record<string, string | string[] | undefined>;

interface CountriesPageProps {
  searchParams: Promise<SearchParams>;
}

function getMetricLabel(filters: DashboardFilters) {
  return `${filters.metric.toUpperCase()} • ${filters.interval}`;
}

export default async function CountriesPage({ searchParams }: CountriesPageProps) {
  const rawSearchParams = await searchParams;
  const filters = parseDashboardFilters(rawSearchParams);

  const countriesData = await CovidService.getCountriesData(filters.interval);

  const topCountries = CovidService.getTopCountriesByMetric(countriesData, filters.metric, 12).map(
    (country) => ({
      name: country.country,
      value: getMetricValue(country, filters.metric),
    }),
  );

  const rows = CovidService.getTopCountriesByMetric(countriesData, filters.metric, 30).map(
    (country) => ({
      country: country.country,
      continent: country.continent,
      value: getMetricValue(country, filters.metric),
      population: country.population,
    }),
  );

  return (
    <CountriesDashboardView
      titleMetric={getMetricLabel(filters)}
      topCountries={topCountries}
      rows={rows}
      startDate={filters.startDate}
      endDate={filters.endDate}
      resolvedInterval={filters.interval}
    />
  );
}
