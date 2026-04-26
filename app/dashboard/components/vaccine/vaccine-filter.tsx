"use client";

import { FormEvent, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";

import {
  FilterButton,
  FilterField,
  FilterInput,
  FilterLabel,
  VaccineFilterBar,
} from "./vaccine-filter.styles";

interface VaccineFilterProps {
  country: string;
  days: number;
}

export default function VaccineFilter({ country, days }: VaccineFilterProps) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const countryValue = String(formData.get("country") ?? "").trim();
    const daysRaw = Number(formData.get("days"));
    const daysValue = Number.isFinite(daysRaw) ? Math.max(1, Math.min(730, Math.floor(daysRaw))) : 60;

    const params = new URLSearchParams(searchParams.toString());

    if (countryValue) {
      params.set("country", countryValue);
    } else {
      params.delete("country");
    }

    params.set("days", String(daysValue));

    startTransition(() => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  return (
    <VaccineFilterBar onSubmit={handleSubmit}>
      <FilterField>
        <FilterLabel>{t("vaccine", "country", "Country")}</FilterLabel>
        <FilterInput
          name="country"
          defaultValue={country}
          placeholder={t("vaccine", "countryPlaceholder", "Brazil")}
        />
      </FilterField>

      <FilterField>
        <FilterLabel>{t("vaccine", "days", "Days")}</FilterLabel>
        <FilterInput name="days" type="number" min={1} max={730} defaultValue={days} />
      </FilterField>

      <FilterButton type="submit" disabled={isPending}>
        {isPending ? t("vaccine", "applying", "Applying...") : t("vaccine", "apply", "Apply Vaccine Filter")}
      </FilterButton>
    </VaccineFilterBar>
  );
}
