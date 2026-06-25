// src/store/index.ts
// Combined Zustand v5 store — Phase 1 holds filterSlice only.
// Phase 3 will expand: export type AppStore = FilterSlice & CharacterSlice;

import { create } from 'zustand';
import { createFilterSlice, FilterSlice } from './filterSlice';

// Phase 3 will add CharacterSlice to this union
export type AppStore = FilterSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createFilterSlice(...a),
}));
