"use client";

import BarChart from "@/app/dashboard/components/charts/bar-chart";
import { formatCompactNumber } from "@/lib/utils";
import DateRangeFilter from "@/app/dashboard/components/date-range/date-range-filter";
import { IntervalType } from "@/lib/enum/interval-type.enum";
import TableExportButton from "@/app/dashboard/components/table/table-export-button";

import {
  Hero,
  HeroText,
  HeroTitle,
  PageWrapper,
  Panel,
  PanelBody,
  PanelHeader,
  PanelTitle,
  Table,
} from "./views.styles";

interface CountryRow {
  country: string;
  continent: string;
  value: number;
  population: number;
}

interface ValueItem {
  name: string;
  value: number;
}

interface CountriesDashboardViewProps {
  titleMetric: string;
  topCountries: ValueItem[];
  rows: CountryRow[];
  startDate: string;
  endDate: string;
  resolvedInterval: IntervalType;
}

export default function CountriesDashboardView({
  titleMetric,
  topCountries,
  rows,
  startDate,
  endDate,
  resolvedInterval,
}: CountriesDashboardViewProps) {
  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>Countries</HeroTitle>
        <HeroText>Detailed ranking of countries and comparative metric distribution.</HeroText>
      </Hero>

      <DateRangeFilter
        key={`${startDate}-${endDate}`}
        startDate={startDate}
        endDate={endDate}
        resolvedInterval={resolvedInterval}
      />

      <BarChart data={topCountries} metricLabel={titleMetric} />

      <Panel>
        <PanelHeader>
          <PanelTitle>Top Countries Table</PanelTitle>
          <TableExportButton
            rows={rows.map((row) => ({
              country: row.country,
              continent: row.continent,
              metric: row.value,
              population: row.population,
            }))}
            fileName="coviscope-countries.xlsx"
          />
        </PanelHeader>
        <PanelBody>
          <Table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Continent</th>
                <th>Metric</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{row.continent}</td>
                  <td>{formatCompactNumber(row.value)}</td>
                  <td>{formatCompactNumber(row.population)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PanelBody>
      </Panel>
    </PageWrapper>
  );
}
