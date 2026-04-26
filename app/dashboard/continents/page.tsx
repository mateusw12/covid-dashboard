import ContinentsDashboardView from "@/app/dashboard/components/views/continents-dashboard-view";
import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { CovidService } from "@/lib/services/covid.service";
import { getMetricValue, parseDashboardFilters } from "@/lib/utils";

type SearchParams = Record<string, string | string[] | undefined>;

interface ContinentsPageProps {
  searchParams: Promise<SearchParams>;
}

function getMetricLabel(filters: DashboardFilters) {
  return `${filters.metric.toUpperCase()} • ${filters.interval}`;
}

export default async function ContinentsPage({ searchParams }: ContinentsPageProps) {
  const rawSearchParams = await searchParams;
  const filters = parseDashboardFilters(rawSearchParams);

  const continentsData = await CovidService.getContinentsData(filters.interval);

  const distribution = continentsData.map((continent) => ({
    name: continent.continent,
    value: getMetricValue(continent, filters.metric),
  }));

  const rows = [...continentsData]
    .sort((left, right) => getMetricValue(right, filters.metric) - getMetricValue(left, filters.metric))
    .map((continent) => ({
      name: continent.continent,
      value: getMetricValue(continent, filters.metric),
      population: continent.population,
    }));

  return (
    <ContinentsDashboardView
      titleMetric={getMetricLabel(filters)}
      distribution={distribution}
      rows={rows}
      startDate={filters.startDate}
      endDate={filters.endDate}
      resolvedInterval={filters.interval}
    />
  );
}
