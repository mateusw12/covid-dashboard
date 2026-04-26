import { describe, expect, it } from "vitest";

import { IntervalType } from "@/lib/enum/interval-type.enum";
import { MetricType } from "@/lib/enum/metric-type.enum";
import { buildTrendSeriesFromTimeline, parseDashboardFilters } from "@/lib/utils";

describe("parseDashboardFilters", () => {
  it("uses endDate to resolve interval", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, "0");
    const dd = String(yesterday.getDate()).padStart(2, "0");
    const endDate = `${yyyy}-${mm}-${dd}`;

    const filters = parseDashboardFilters({
      metric: MetricType.Deaths,
      interval: IntervalType.Today,
      endDate,
      country: "Brazil",
    });

    expect(filters.metric).toBe(MetricType.Deaths);
    expect(filters.country).toBe("Brazil");
    expect(filters.endDate).toBe(endDate);
    expect(filters.interval).toBe(IntervalType.Yesterday);
  });

  it("falls back to defaults for invalid values", () => {
    const filters = parseDashboardFilters({
      metric: "invalid",
      interval: "invalid",
      startDate: "not-a-date",
      endDate: "",
    });

    expect(filters.metric).toBe(MetricType.Cases);
    expect(filters.interval).toBe(IntervalType.Today);
    expect(filters.startDate).toBe("");
    expect(filters.endDate).toBe("");
  });
});

describe("buildTrendSeriesFromTimeline", () => {
  it("returns timeline entries within the date range", () => {
    const timeline = {
      "1/1/24": 100,
      "1/2/24": 120,
      "1/3/24": 130,
      "1/4/24": 150,
    };

    const series = buildTrendSeriesFromTimeline(timeline, "2024-01-02", "2024-01-03");

    expect(series).toEqual([
      { label: "1/2/24", value: 120 },
      { label: "1/3/24", value: 130 },
    ]);
  });

  it("returns an empty array when dates are invalid", () => {
    const series = buildTrendSeriesFromTimeline({ "1/1/24": 100 }, "", "2024-01-03");

    expect(series).toEqual([]);
  });
});
