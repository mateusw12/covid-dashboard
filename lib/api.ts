type QueryValue = string | number | boolean | null | undefined;

interface ApiFetchOptions {
  query?: Record<string, QueryValue>;
  revalidate?: number;
  cache?: RequestCache;
}

const API_BASE_URL = "https://disease.sh/v3/covid-19";

function buildQueryString(query: Record<string, QueryValue> = {}): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    search.set(key, String(value));
  }

  return search.toString();
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { query, revalidate = 60, cache = "force-cache" } = options;
  const queryString = buildQueryString(query);
  const url = queryString
    ? `${API_BASE_URL}/${endpoint}?${queryString}`
    : `${API_BASE_URL}/${endpoint}`;

  const response = await fetch(url, {
    cache,
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
}
