// src/types/api.ts
// Rick & Morty API contract types — consumed by every subsequent phase.
// Zero use of `any`; all API shapes are fully known from rickandmortyapi.com/documentation.

export interface ApiInfo {
  count: number;       // Total number of results (e.g. 826 for all characters)
  pages: number;       // Total number of pages (e.g. 42 for characters)
  next: string | null; // URL of next page or null on last page
  prev: string | null; // URL of previous page or null on first page
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

// Status uses mixed case from the API: 'Alive' | 'Dead' | 'unknown' (lowercase third member).
// The lowercase 'unknown' is a documented API behavior — using 'Unknown' causes silent filter mismatches.
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterLocation {
  name: string; // e.g. "Earth (C-137)" or "unknown"
  url: string;  // e.g. "https://rickandmortyapi.com/api/location/1" or "" (empty for unknown)
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;           // e.g. "Human", "Alien", "Robot"
  /**
   * Sub-species or character type — frequently an empty string for main characters.
   * Always guard with `character.type !== ''` before rendering to avoid blank UI elements.
   */
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;             // 300x300 JPEG URL — always present
  episode: string[];         // Array of episode URLs like "https://...api/episode/1"
  url: string;               // Character self-URL
  created: string;           // ISO 8601 timestamp e.g. "2017-11-04T18:48:46.250Z"
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;      // Human-readable: "December 2, 2013" — NOT parseable as Date directly
  episode: string;       // Episode code: "S01E01"
  characters: string[];  // Array of character URLs
  url: string;
  created: string;
}
