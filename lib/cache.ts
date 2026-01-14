import { cache } from "react";

/**
 * Server-side data fetching utilities with React.cache() for request deduplication.
 *
 * React.cache() ensures that multiple calls to the same cached function within
 * a single request return the same result without re-executing the function.
 *
 * @example
 * // Define a cached fetcher
 * const getUser = createCachedFetcher(
 *   async (id: string) => {
 *     const res = await fetch(`/api/users/${id}`);
 *     return res.json();
 *   }
 * );
 *
 * // Use in multiple components - only fetches once per request
 * const user = await getUser("123");
 */

type AsyncFunction<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

/**
 * Creates a cached version of an async function using React.cache().
 * The cached function will only execute once per unique arguments within a request.
 */
export function createCachedFetcher<TArgs extends unknown[], TResult>(
  fn: AsyncFunction<TArgs, TResult>
): AsyncFunction<TArgs, TResult> {
  return cache(fn);
}

/**
 * Fetches JSON data from a URL with request deduplication.
 * Uses React.cache() to prevent duplicate requests within the same render.
 */
export const fetchJson = cache(async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
});

/**
 * Fetches multiple URLs in parallel with Promise.all().
 * Each individual URL is deduplicated via fetchJson's cache.
 *
 * @example
 * const [users, posts] = await fetchJsonParallel<[User[], Post[]]>([
 *   "/api/users",
 *   "/api/posts"
 * ]);
 */
export function fetchJsonParallel<T extends unknown[]>(
  urls: string[]
): Promise<T> {
  return Promise.all(urls.map((url) => fetchJson(url))) as Promise<T>;
}

/**
 * Creates a cached fetcher with automatic revalidation tag.
 * Useful for data that needs to be invalidated via revalidateTag().
 *
 * @example
 * const getProducts = createTaggedFetcher<Product[]>(
 *   "/api/products",
 *   ["products"]
 * );
 */
export function createTaggedFetcher<T>(
  url: string,
  tags: string[]
): () => Promise<T> {
  return cache(async () => {
    const response = await fetch(url, { next: { tags } });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  });
}
