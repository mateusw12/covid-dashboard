"use client";

import { FormEvent, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IntervalType } from "@/lib/enum/interval-type.enum";
import { useI18n } from "@/lib/i18n/context";
import { resolveIntervalFromDateValue } from "@/lib/utils";
import {
  DateFilterBar,
  DateField,
  DateLabel,
  DateInput,
  ApplyButton,
  DateStatus,
} from "./date-range-filter.styles";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  resolvedInterval: IntervalType;
}

export default function DateRangeFilter({
  startDate,
  endDate,
  resolvedInterval,
}: DateRangeFilterProps) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleApply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const from = String(formData.get("startDate") ?? "");
    const to = String(formData.get("endDate") ?? "");
    const params = new URLSearchParams(searchParams.toString());

    if (from) {
      params.set("startDate", from);
    } else {
      params.delete("startDate");
    }

    if (to) {
      params.set("endDate", to);
      params.set("interval", resolveIntervalFromDateValue(to));
    } else {
      params.delete("endDate");
      params.delete("interval");
    }

    startTransition(() => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  const intervalLabel =
    resolvedInterval === IntervalType.TwoDaysAgo
      ? t("dateRange", "interval.twoDaysAgo", "two days ago")
      : resolvedInterval === IntervalType.Yesterday
        ? t("dateRange", "interval.yesterday", "yesterday")
        : t("dateRange", "interval.today", "today");

  return (
    <DateFilterBar onSubmit={handleApply}>
      <DateField>
        <DateLabel>{t("dateRange", "startDate", "Start Date")}</DateLabel>
        <DateInput name="startDate" type="date" defaultValue={startDate} />
      </DateField>

      <DateField>
        <DateLabel>{t("dateRange", "endDate", "End Date")}</DateLabel>
        <DateInput name="endDate" type="date" defaultValue={endDate} />
      </DateField>

      <ApplyButton type="submit" disabled={isPending}>
        {isPending ? t("dateRange", "applying", "Applying...") : t("dateRange", "apply", "Apply Date Filter")}
      </ApplyButton>

      <DateStatus>
        {t("dateRange", "snapshot", "Snapshot resolved as")} {intervalLabel}.
      </DateStatus>
    </DateFilterBar>
  );
}
