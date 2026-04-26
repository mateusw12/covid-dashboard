export interface CountryData {
  updated: number;
  country: string;
  countryInfo: {
    iso2: string | null;
    iso3: string | null;
    lat: number;
    long: number;
    flag: string;
  };
  continent: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  tests: number;
  population: number;
}
