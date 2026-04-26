import { apiFetch } from "@/lib/api";
import {
  VaccineCountryCoverage,
  VaccineCountryLatestValue,
  VaccineCountrySeriesPoint,
} from "@/lib/dto/vaccine-coverage.dto";

export class VaccineService {
  private static readonly defaultDays = 60;

  static async getCountriesCoverage(lastDays = this.defaultDays): Promise<VaccineCountryCoverage[]> {
    return apiFetch<VaccineCountryCoverage[]>("vaccine/coverage/countries", {
      query: { lastdays: this.normalizeDays(lastDays), fullData: false },
      revalidate: 300,
    });
  }

  static async getCountryCoverage(
    country: string,
    lastDays = this.defaultDays,
  ): Promise<VaccineCountryCoverage> {
    return apiFetch<VaccineCountryCoverage>(
      `vaccine/coverage/countries/${encodeURIComponent(country)}`,
      {
        query: { lastdays: this.normalizeDays(lastDays), fullData: false },
        revalidate: 300,
      },
    );
  }

  static buildSeriesFromCoverage(coverage: VaccineCountryCoverage): VaccineCountrySeriesPoint[] {
    return Object.entries(coverage.timeline)
      .map(([label, value]) => ({
        label,
        value,
        date: this.parseTimelineDate(label),
      }))
      .filter((item) => item.date !== null)
      .sort((left, right) => {
        if (!left.date || !right.date) {
          return 0;
        }

        return left.date.getTime() - right.date.getTime();
      })
      .map((item) => ({
        label: item.label,
        value: item.value,
      }));
  }

  static getTopCountriesByLatestCoverage(
    countries: VaccineCountryCoverage[],
    limit = 12,
  ): VaccineCountryLatestValue[] {
    return countries
      .map((country) => ({
        country: country.country,
        latestValue: this.getLatestValue(country.timeline),
      }))
      .sort((left, right) => right.latestValue - left.latestValue)
      .slice(0, limit);
  }

  private static getLatestValue(timeline: Record<string, number>): number {
    const timelineEntries = Object.entries(timeline)
      .map(([label, value]) => ({
        value,
        date: this.parseTimelineDate(label),
      }))
      .filter((item) => item.date !== null)
      .sort((left, right) => {
        if (!left.date || !right.date) {
          return 0;
        }

        return right.date.getTime() - left.date.getTime();
      });

    return timelineEntries[0]?.value ?? 0;
  }

  private static normalizeDays(lastDays: number): number {
    if (!Number.isFinite(lastDays)) {
      return this.defaultDays;
    }

    return Math.min(730, Math.max(1, Math.floor(lastDays)));
  }

  private static parseTimelineDate(value: string): Date | null {
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
}
