"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DashboardFilters } from "@/lib/dto/dashboard-filters.dto";
import { INTERVAL_OPTIONS, IntervalType } from "@/lib/enum/interval-type.enum";
import { METRIC_OPTIONS, MetricType } from "@/lib/enum/metric-type.enum";
import { useI18n } from "@/lib/i18n/context";

import { Field, FiltersWrapper, Input, Label, Select, Status } from "./filters.styles";

interface CountryOption {
  name: string;
  continent: string;
}

interface FiltersProps {
  continents: string[];
  countries: CountryOption[];
  current: DashboardFilters;
}

export default function Filters({ continents, countries, current }: FiltersProps) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filteredCountries = useMemo(() => {
    if (!current.continent) {
      return countries;
    }

    return countries.filter((item) => item.continent === current.continent);
  }, [countries, current.continent]);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key === "continent") {
      params.delete("country");
    }

    startTransition(() => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  return (
    <FiltersWrapper>
      <Field>
        <Label>{t("dashboardLayout", "filters.continent", "Continent")}</Label>
        <Select
          value={current.continent}
          onChange={(event) => updateQuery("continent", event.target.value)}
        >
          <option value="">{t("dashboardLayout", "filters.allContinents", "All Continents")}</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label>{t("dashboardLayout", "filters.countrySearch", "Country Search")}</Label>
        <Input
          list="countries-list"
          placeholder={t("dashboardLayout", "filters.typeCountry", "Type a country")}
          value={current.country}
          onChange={(event) => updateQuery("country", event.target.value)}
        />
        <datalist id="countries-list">
          {filteredCountries.map((country) => (
            <option key={country.name} value={country.name} />
          ))}
        </datalist>
      </Field>

      <Field>
        <Label>{t("dashboardLayout", "filters.metric", "Metric")}</Label>
        <Select
          value={current.metric}
          onChange={(event) => updateQuery("metric", event.target.value as MetricType)}
        >
          {METRIC_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label>{t("dashboardLayout", "filters.interval", "Interval")}</Label>
        <Select
          value={current.interval}
          onChange={(event) => updateQuery("interval", event.target.value as IntervalType)}
        >
          {INTERVAL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      {isPending ? (
        <Status>{t("dashboardLayout", "filters.updating", "Updating filters...")}</Status>
      ) : (
        <Status>{t("dashboardLayout", "filters.serverDriven", "Server-driven filtering")}</Status>
      )}
    </FiltersWrapper>
  );
}
