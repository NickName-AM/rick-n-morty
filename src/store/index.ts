// Combined Zustand v5 store — filterSlice only.

import { create } from 'zustand';
import { createFilterSlice, FilterSlice } from './filterSlice';

export type AppStore = FilterSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createFilterSlice(...a),
}));
