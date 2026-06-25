import { useQuery } from '@tanstack/react-query';

import {
  extractEpisodeIds,
  getCharacter,
  getEpisodesByIds,
} from '../services/characters';

export function useCharacterDetail(characterId: number) {
  const characterQuery = useQuery({
    queryKey: ['character', characterId],
    queryFn: ({ signal }) => getCharacter(characterId, signal),
  });

  const episodeIds = characterQuery.data
    ? extractEpisodeIds(characterQuery.data.episode)
    : [];

  const episodesQuery = useQuery({
    queryKey: ['episodes', characterId, episodeIds],
    queryFn: ({ signal }) => getEpisodesByIds(episodeIds, signal),
    enabled: episodeIds.length > 0,
  });

  return {
    character: characterQuery.data,
    episodes: episodesQuery.data ?? [],
    isLoading:
      characterQuery.isLoading ||
      (episodeIds.length > 0 && episodesQuery.isLoading),
    isError: characterQuery.isError || episodesQuery.isError,
    error: characterQuery.error ?? episodesQuery.error,
    refetch: () => {
      characterQuery.refetch();
      episodesQuery.refetch();
    },
  };
}
