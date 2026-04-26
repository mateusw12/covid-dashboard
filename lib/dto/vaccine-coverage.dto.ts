export interface VaccineTimeline {
  [date: string]: number;
}

export interface VaccineCountryCoverage {
  country: string;
  timeline: VaccineTimeline;
}

export interface VaccineCountrySeriesPoint {
  label: string;
  value: number;
}

export interface VaccineCountryLatestValue {
  country: string;
  latestValue: number;
}
