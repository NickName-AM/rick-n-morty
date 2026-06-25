import { apiGet, ApiError } from './api';
import type { ApiResponse, Character, Episode } from '../types/api';
import type { FilterStatus } from '../types/app';

export interface GetCharactersParams {
  status?: FilterStatus;
  name?: string;
  page?: number;
}

const EMPTY_CHARACTERS_RESPONSE: ApiResponse<Character> = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export async function getCharacters(
  params: GetCharactersParams,
  signal?: AbortSignal,
): Promise<ApiResponse<Character>> {
  const { status, name, page } = params;

  try {
    return await apiGet<ApiResponse<Character>>(
      '/character',
      {
        page,
        name: name || undefined,
        status: status && status !== 'all' ? status : undefined,
      },
      signal,
    );
  } catch (error) {
    // API returns 404 with "There is nothing here" for zero-match filters — treat as empty list
    if (error instanceof ApiError && error.statusCode === 404) {
      return EMPTY_CHARACTERS_RESPONSE;
    }
    throw error;
  }
}

export async function getCharacter(
  id: number,
  signal?: AbortSignal,
): Promise<Character> {
  return apiGet<Character>(`/character/${id}`, undefined, signal);
}

// API returns a single object for one id and an array for multiple ids
function normalizeEpisodes(data: Episode | Episode[]): Episode[] {
  return Array.isArray(data) ? data : [data];
}

export function extractEpisodeIds(episodeUrls: string[]): number[] {
  return episodeUrls
    .map((url) => {
      const match = url.match(/\/episode\/(\d+)$/);
      return match ? Number(match[1]) : null;
    })
    .filter((id): id is number => id !== null);
}

export async function getEpisodesByIds(
  ids: number[],
  signal?: AbortSignal,
): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }

  const data = await apiGet<Episode | Episode[]>(
    `/episode/${ids.join(',')}`,
    undefined,
    signal,
  );
  return normalizeEpisodes(data);
}
