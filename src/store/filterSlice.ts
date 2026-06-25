// src/store/filterSlice.ts
// Zustand v5 filter slice — status + searchQuery + actions.
// Phase 3 adds characterSlice alongside this; the AppStore union expands there.

import { StateCreator } from 'zustand';
import type { AppStore } from './index';
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

export const createFilterSlice: StateCreator<AppStore, [], [], FilterSlice> = (set) => ({
  status: 'all',
  searchQuery: '',
  setStatus: (status) => set({ status }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ status: 'all', searchQuery: '' }),
});
