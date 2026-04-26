"use client";

import { FormEvent, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
        <FilterLabel>Country</FilterLabel>
        <FilterInput name="country" defaultValue={country} placeholder="Brazil" />
      </FilterField>

      <FilterField>
        <FilterLabel>Days</FilterLabel>
        <FilterInput name="days" type="number" min={1} max={730} defaultValue={days} />
      </FilterField>

      <FilterButton type="submit" disabled={isPending}>
        {isPending ? "Applying..." : "Apply Vaccine Filter"}
      </FilterButton>
    </VaccineFilterBar>
  );
}
