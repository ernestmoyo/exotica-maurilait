import type { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // Yoplait
  { id: 'yop-straw-125', brandId: 'yoplait', name: 'Yoplait Strawberry', variant: 'Strawberry', format: '125g pot', imageUrl: null },
  { id: 'yop-nature-125', brandId: 'yoplait', name: 'Yoplait Nature', variant: 'Nature', format: '125g pot', imageUrl: null },
  { id: 'yop-vanilla-4pk', brandId: 'yoplait', name: 'Yoplait Vanilla 4-Pack', variant: 'Vanilla', format: '4x125g', imageUrl: null },
  { id: 'yop-drink-straw', brandId: 'yoplait', name: 'Yoplait Drink Strawberry', variant: 'Strawberry Drink', format: '250ml', imageUrl: null },
  { id: 'yop-drink-mango', brandId: 'yoplait', name: 'Yoplait Drink Mango', variant: 'Mango Drink', format: '250ml', imageUrl: null },

  // Candia
  { id: 'can-full-1l', brandId: 'candia', name: 'Candia Full Fat', variant: 'Full Fat', format: '1L', imageUrl: null },
  { id: 'can-semi-1l', brandId: 'candia', name: 'Candia Semi-Fat', variant: 'Semi-Fat', format: '1L', imageUrl: null },
  { id: 'can-skim-1l', brandId: 'candia', name: 'Candia Skimmed', variant: 'Skimmed', format: '1L', imageUrl: null },
  { id: 'can-full-500', brandId: 'candia', name: 'Candia Full Fat 500ml', variant: 'Full Fat', format: '500ml', imageUrl: null },

  // J
  { id: 'j-orange-1l', brandId: 'j', name: 'J Orange', variant: 'Orange', format: '1L', imageUrl: null },
  { id: 'j-tropical-1l', brandId: 'j', name: 'J Tropical', variant: 'Tropical', format: '1L', imageUrl: null },
  { id: 'j-apple-500', brandId: 'j', name: 'J Apple', variant: 'Apple', format: '500ml', imageUrl: null },
  { id: 'j-mango-500', brandId: 'j', name: 'J Mango', variant: 'Mango', format: '500ml', imageUrl: null },

  // Candia Crème
  { id: 'cc-cooking-200', brandId: 'candia-creme', name: 'Candia Cooking Cream', variant: 'Cooking Cream', format: '200ml', imageUrl: null },
  { id: 'cc-whipping-200', brandId: 'candia-creme', name: 'Candia Whipping Cream', variant: 'Whipping Cream', format: '200ml', imageUrl: null },
  { id: 'cc-cooking-500', brandId: 'candia-creme', name: 'Candia Cooking Cream 500ml', variant: 'Cooking Cream', format: '500ml', imageUrl: null },
];

export const getProductsByBrand = (brandId: string): Product[] =>
  PRODUCTS.filter((p) => p.brandId === brandId);
