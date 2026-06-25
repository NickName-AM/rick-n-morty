import { useInfiniteQuery } from '@tanstack/react-query';

import { getCharacters } from '../services/characters';
import { useAppStore } from '../store';

export function useCharacters() {
  const status = useAppStore((s) => s.status);
  const searchQuery = useAppStore((s) => s.searchQuery);

  return useInfiniteQuery({
    queryKey: ['characters', { status, searchQuery }],
    queryFn: ({ pageParam, signal }) =>
      getCharacters(
        { page: pageParam, status, name: searchQuery || undefined },
        signal,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.info.next ? lastPageParam + 1 : undefined,
  });
}
