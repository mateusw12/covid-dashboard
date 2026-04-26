import { apiFetch } from "@/lib/api";
import { ContinentData } from "@/lib/dto/continent-data.dto";
import { CountryData } from "@/lib/dto/country-data.dto";
import { GlobalData } from "@/lib/dto/global-data.dto";
import { GlobalHistoricalData } from "@/lib/dto/global-historical-data.dto";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import { MetricType } from "@/lib/enum/metric-type.enum";
import { getMetricValue } from "@/lib/utils";

export class CovidService {
  private static readonly defaultRevalidate = 120;
  private static readonly historicalRevalidate = 600;

  static async getGlobalData(interval: IntervalType = IntervalType.Today): Promise<GlobalData> {
    return apiFetch<GlobalData>("all", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getContinentsData(
    interval: IntervalType = IntervalType.Today,
  ): Promise<ContinentData[]> {
    return apiFetch<ContinentData[]>("continents", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getContinentData(
    continent: string,
    interval: IntervalType = IntervalType.Today,
  ): Promise<ContinentData> {
    return apiFetch<ContinentData>(`continents/${encodeURIComponent(continent)}`, {
      query: { strict: true, ...this.resolveIntervalQuery(interval) },
      revalidate: this.defaultRevalidate,
    });
  }

  static async getCountriesData(interval: IntervalType = IntervalType.Today): Promise<CountryData[]> {
    return apiFetch<CountryData[]>("countries", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getGlobalHistoricalData(
    lastDays: number | "all" = 30,
  ): Promise<GlobalHistoricalData> {
    return apiFetch<GlobalHistoricalData>("historical/all", {
      query: { lastdays: lastDays },
      revalidate: this.historicalRevalidate,
    });
  }

  static async getCountryData(
    country: string,
    interval: IntervalType = IntervalType.Today,
  ): Promise<CountryData> {
    return apiFetch<CountryData>(`countries/${encodeURIComponent(country)}`, {
      query: { strict: true, ...this.resolveIntervalQuery(interval) },
      revalidate: this.defaultRevalidate,
    });
  }

  static getTopCountriesByMetric(
    countries: CountryData[],
    metric: MetricType,
    limit = 10,
  ): CountryData[] {
    return [...countries]
      .sort((left, right) => getMetricValue(right, metric) - getMetricValue(left, metric))
      .slice(0, limit);
  }

  private static resolveIntervalQuery(interval: IntervalType) {
    if (interval === IntervalType.Yesterday) {
      return { yesterday: true };
    }

    if (interval === IntervalType.TwoDaysAgo) {
      return { twoDaysAgo: true };
    }

    return {};
  }
}
