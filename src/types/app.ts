// src/types/app.ts
// App-level types distinct from API response types.

/**
 * FilterStatus uses lowercase to match API query param values (status=alive, not Alive).
 * This is intentionally distinct from CharacterStatus (API response casing: 'Alive' | 'Dead' | 'unknown').
 * The service layer maps 'all' to undefined (no status filter applied).
 * Mapping: 'all' → undefined, 'alive' → 'alive', 'dead' → 'dead', 'unknown' → 'unknown'
 */
export type FilterStatus = 'all' | 'alive' | 'dead' | 'unknown';
