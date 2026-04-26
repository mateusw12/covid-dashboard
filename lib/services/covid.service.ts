import { apiFetch } from "@/lib/api";
import { ContinentData } from "@/lib/dto/continent-data.dto";
import { CountryData } from "@/lib/dto/country-data.dto";
import { GlobalData } from "@/lib/dto/global-data.dto";
import { IntervalType, MetricType } from "@/lib/dto/dashboard-filters.dto";
import { getMetricValue } from "@/lib/utils";

export class CovidService {
  private static readonly defaultRevalidate = 60;

  static async getGlobalData(interval: IntervalType = "today"): Promise<GlobalData> {
    return apiFetch<GlobalData>("all", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getContinentsData(
    interval: IntervalType = "today",
  ): Promise<ContinentData[]> {
    return apiFetch<ContinentData[]>("continents", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getContinentData(
    continent: string,
    interval: IntervalType = "today",
  ): Promise<ContinentData> {
    return apiFetch<ContinentData>(`continents/${encodeURIComponent(continent)}`, {
      query: { strict: true, ...this.resolveIntervalQuery(interval) },
      revalidate: this.defaultRevalidate,
    });
  }

  static async getCountriesData(interval: IntervalType = "today"): Promise<CountryData[]> {
    return apiFetch<CountryData[]>("countries", {
      query: this.resolveIntervalQuery(interval),
      revalidate: this.defaultRevalidate,
    });
  }

  static async getCountryData(
    country: string,
    interval: IntervalType = "today",
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
    if (interval === "yesterday") {
      return { yesterday: true };
    }

    if (interval === "twoDaysAgo") {
      return { twoDaysAgo: true };
    }

    return {};
  }
}
