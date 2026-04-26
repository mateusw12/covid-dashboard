export enum MetricType {
  Cases = "cases",
  Deaths = "deaths",
  Recovered = "recovered",
}

export const METRIC_OPTIONS: Array<{ value: MetricType; label: string }> = [
  { value: MetricType.Cases, label: "Cases" },
  { value: MetricType.Deaths, label: "Deaths" },
  { value: MetricType.Recovered, label: "Recovered" },
];
