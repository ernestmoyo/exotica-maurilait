import { create } from 'zustand';
import type { OutletType } from '@/types';
import { MONTHS } from '@/data/prices';

interface FilterState {
  selectedBrands: string[];
  selectedRegions: string[];
  selectedOutletTypes: OutletType[];
  selectedMonth: string;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedRegions: (regions: string[]) => void;
  setSelectedOutletTypes: (types: OutletType[]) => void;
  setSelectedMonth: (month: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedBrands: [],
  selectedRegions: [],
  selectedOutletTypes: [],
  selectedMonth: MONTHS[MONTHS.length - 1],
  setSelectedBrands: (brands) => set({ selectedBrands: brands }),
  setSelectedRegions: (regions) => set({ selectedRegions: regions }),
  setSelectedOutletTypes: (types) => set({ selectedOutletTypes: types }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  resetFilters: () =>
    set({
      selectedBrands: [],
      selectedRegions: [],
      selectedOutletTypes: [],
      selectedMonth: MONTHS[MONTHS.length - 1],
    }),
}));
