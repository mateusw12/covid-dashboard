"use client";

import BarChart from "@/app/dashboard/components/charts/bar-chart";
import LineChart from "@/app/dashboard/components/charts/line-chart";
import TableExportButton from "@/app/dashboard/components/table/table-export-button";
import VaccineFilter from "@/app/dashboard/components/vaccine/vaccine-filter";
import { formatCompactNumber } from "@/lib/utils";

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

interface TrendPoint {
  label: string;
  value: number;
}

interface RankingPoint {
  name: string;
  value: number;
}

interface VaccineRow {
  country: string;
  latestValue: number;
}

interface VaccinesDashboardViewProps {
  country: string;
  days: number;
  selectedCountry: string;
  trendData: TrendPoint[];
  rankingData: RankingPoint[];
  rows: VaccineRow[];
}

export default function VaccinesDashboardView({
  country,
  days,
  selectedCountry,
  trendData,
  rankingData,
  rows,
}: VaccinesDashboardViewProps) {
  return (
    <PageWrapper>
      <Hero>
        <HeroTitle>Vaccination Coverage</HeroTitle>
        <HeroText>
          Monitor vaccination evolution by country and compare latest coverage across countries.
        </HeroText>
      </Hero>

      <VaccineFilter country={country} days={days} />

      <LineChart data={trendData} metricLabel={`${selectedCountry} • last ${days} days`} />
      <BarChart data={rankingData} metricLabel={`Latest doses • last ${days} days`} />

      <Panel>
        <PanelHeader>
          <PanelTitle>Latest Coverage by Country</PanelTitle>
          <TableExportButton
            rows={rows.map((row) => ({
              country: row.country,
              latestCoverage: row.latestValue,
            }))}
            fileName="coviscope-vaccine-countries.xlsx"
          />
        </PanelHeader>
        <PanelBody>
          <Table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Latest Coverage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{formatCompactNumber(row.latestValue)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PanelBody>
      </Panel>
    </PageWrapper>
  );
}
