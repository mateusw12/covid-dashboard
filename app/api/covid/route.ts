import { NextRequest, NextResponse } from "next/server";

import { IntervalType } from "@/lib/dto/dashboard-filters.dto";
import { CovidService } from "@/lib/services/covid.service";

function toInterval(value: string | null): IntervalType {
  if (value === "yesterday" || value === "twoDaysAgo") {
    return value;
  }

  return "today";
}

export async function GET(request: NextRequest) {
  const scope = request.nextUrl.searchParams.get("scope") ?? "all";
  const interval = toInterval(request.nextUrl.searchParams.get("interval"));

  try {
    if (scope === "all") {
      const data = await CovidService.getGlobalData(interval);
      return NextResponse.json(data);
    }

    if (scope === "continents") {
      const continent = request.nextUrl.searchParams.get("continent");

      if (continent) {
        const data = await CovidService.getContinentData(continent, interval);
        return NextResponse.json(data);
      }

      const data = await CovidService.getContinentsData(interval);
      return NextResponse.json(data);
    }

    if (scope === "countries") {
      const country = request.nextUrl.searchParams.get("country");

      if (country) {
        const data = await CovidService.getCountryData(country, interval);
        return NextResponse.json(data);
      }

      const data = await CovidService.getCountriesData(interval);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid scope" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch COVID data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
