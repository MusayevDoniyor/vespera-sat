/**
 * In-memory client-side fetch deduplication and caching for Vespera SAT.
 * Prevents redundant concurrent requests when multiple components mount simultaneously.
 */

const pendingRequests = new Map<string, Promise<any>>();
const clientCache = new Map<string, { data: any; expiry: number }>();

export async function fetchWithDeduplication<T = any>(
  url: string,
  options?: RequestInit,
  ttlMs = 10000
): Promise<T> {
  const method = options?.method?.toUpperCase() || "GET";
  // Only cache and deduplicate GET requests
  if (method !== "GET") {
    const res = await fetch(url, options);
    return res.json();
  }

  const now = Date.now();
  const cached = clientCache.get(url);
  if (cached && now < cached.expiry) {
    return cached.data as T;
  }

  // If a request is already in-flight for this URL, return that promise
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url) as Promise<T>;
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`Fetch failed with status ${res.status}`);
      }
      const data = await res.json();
      clientCache.set(url, { data, expiry: Date.now() + ttlMs });
      return data as T;
    } finally {
      pendingRequests.delete(url);
    }
  })();

  pendingRequests.set(url, fetchPromise);
  return fetchPromise;
}

export function invalidateClientCache(urlPrefix?: string) {
  if (!urlPrefix) {
    clientCache.clear();
    return;
  }
  for (const key of clientCache.keys()) {
    if (key.startsWith(urlPrefix)) {
      clientCache.delete(key);
    }
  }
}
