import { apiGet, ApiError } from './api';
import type { ApiResponse, Character } from '../types/api';
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
