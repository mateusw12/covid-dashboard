import { IntervalType } from "@/lib/enum/interval-type.enum";
import { MetricType } from "@/lib/enum/metric-type.enum";

export interface DashboardFilters {
  continent: string;
  country: string;
  startDate: string;
  endDate: string;
  metric: MetricType;
  interval: IntervalType;
}
