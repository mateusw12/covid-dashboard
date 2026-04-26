import VaccinesDashboardView from "@/app/dashboard/components/views/vaccines-dashboard-view";
import { VaccineService } from "@/lib/services/vaccine.service";

type SearchParams = Record<string, string | string[] | undefined>;

interface VaccinesPageProps {
  searchParams: Promise<SearchParams>;
}

function getSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function parseDays(value: string | string[] | undefined): number {
  const parsed = Number(getSingleValue(value));

  if (!Number.isFinite(parsed)) {
    return 60;
  }

  return Math.min(730, Math.max(1, Math.floor(parsed)));
}

export default async function VaccinesPage({ searchParams }: VaccinesPageProps) {
  const rawSearchParams = await searchParams;

  const requestedCountry = getSingleValue(rawSearchParams.country);
  const days = parseDays(rawSearchParams.days);

  const countriesCoverage = await VaccineService.getCountriesCoverage(days);
  const fallbackCountry = countriesCoverage[0]?.country ?? "Brazil";
  const selectedCountry = requestedCountry || fallbackCountry;

  let countryCoverage;

  try {
    countryCoverage = await VaccineService.getCountryCoverage(selectedCountry, days);
  } catch {
    countryCoverage = await VaccineService.getCountryCoverage(fallbackCountry, days);
  }

  const trendData = VaccineService.buildSeriesFromCoverage(countryCoverage);

  const ranking = VaccineService.getTopCountriesByLatestCoverage(countriesCoverage, 14);
  const rankingData = ranking.map((item) => ({
    name: item.country,
    value: item.latestValue,
  }));

  const rows = VaccineService.getTopCountriesByLatestCoverage(countriesCoverage, 40).map((item) => ({
    country: item.country,
    latestValue: item.latestValue,
  }));

  return (
    <VaccinesDashboardView
      country={requestedCountry}
      days={days}
      selectedCountry={countryCoverage.country}
      trendData={trendData}
      rankingData={rankingData}
      rows={rows}
    />
  );
}
