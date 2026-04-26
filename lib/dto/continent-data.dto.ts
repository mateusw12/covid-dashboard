export interface ContinentData {
  updated: number;
  continent: string;
  continentInfo: {
    lat: number;
    long: number;
  };
  countries: string[];
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
