// Zustand v5 filter slice — status + searchQuery + actions.
// Holds filter UI state only; character data lives in the TanStack Query cache.

import { StateCreator } from 'zustand';
import type { FilterStatus } from '../types/app';

export interface FilterSlice {
  // State
  status: FilterStatus;      // 'all' | 'alive' | 'dead' | 'unknown'
  searchQuery: string;

  // Actions
  setStatus: (status: FilterStatus) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const createFilterSlice: StateCreator<FilterSlice, [], [], FilterSlice> = (set) => ({
  status: 'all',
  searchQuery: '',
  setStatus: (status) => set({ status }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ status: 'all', searchQuery: '' }),
});
