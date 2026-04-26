"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IntervalType } from "@/lib/enum/interval-type.enum";
import { resolveIntervalFromDateValue } from "@/lib/utils";

import {
  ApplyButton,
  DateField,
  DateFilterBar,
  DateInput,
  DateLabel,
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [from, setFrom] = useState(startDate);
  const [to, setTo] = useState(endDate);

  const handleApply = () => {
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
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const intervalLabel =
    resolvedInterval === IntervalType.TwoDaysAgo
      ? "two days ago"
      : resolvedInterval === IntervalType.Yesterday
        ? "yesterday"
        : "today";

  return (
    <DateFilterBar>
      <DateField>
        <DateLabel>Start Date</DateLabel>
        <DateInput type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
      </DateField>

      <DateField>
        <DateLabel>End Date</DateLabel>
        <DateInput type="date" value={to} onChange={(event) => setTo(event.target.value)} />
      </DateField>

      <ApplyButton type="button" onClick={handleApply} disabled={isPending}>
        {isPending ? "Applying..." : "Apply Date Filter"}
      </ApplyButton>

      <DateStatus>
        Snapshot source resolved as {intervalLabel} based on end date (disease.sh endpoints).
      </DateStatus>
    </DateFilterBar>
  );
}
