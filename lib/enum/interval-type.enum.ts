export enum IntervalType {
  Today = "today",
  Yesterday = "yesterday",
  TwoDaysAgo = "twoDaysAgo",
}

export const INTERVAL_OPTIONS: Array<{ value: IntervalType; label: string }> = [
  { value: IntervalType.Today, label: "Today" },
  { value: IntervalType.Yesterday, label: "Yesterday" },
  { value: IntervalType.TwoDaysAgo, label: "Two Days Ago" },
];
