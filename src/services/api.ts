// src/services/api.ts
// API base URL + typed fetch wrapper.
// Phase 3 builds getCharacters, getCharacter, and getEpisodesByIds on top of apiGet.

// HTTPS enforced at the type level — never change to HTTP.
export const BASE_URL = 'https://rickandmortyapi.com/api' as const;

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
    // Required to restore prototype chain broken by TS/Babel ES5 transpilation
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Generic typed fetch wrapper for the Rick & Morty API.
 * Appends only defined, non-empty params via URLSearchParams (encodes values — prevents injection).
 * FilterStatus union upstream constrains the status param to an allowlist of four values.
 * Throws ApiError on non-2xx responses.
 */
export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== '' && val !== null) {
        url.searchParams.set(key, String(val));
      }
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(response.status, `Failed to parse API response as JSON`);
  }
  return data as T;
}
