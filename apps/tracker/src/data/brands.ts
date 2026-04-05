import type { Brand } from '@/types';

export const BRANDS: Brand[] = [
  { id: 'yoplait', name: 'Yoplait', slug: 'yoplait', parentCompany: 'Maurilait', color: '#E30613', category: 'Yoghurt' },
  { id: 'candia', name: 'Candia', slug: 'candia', parentCompany: 'Maurilait', color: '#0068B8', category: 'UHT Milk' },
  { id: 'j', name: 'J', slug: 'j', parentCompany: 'Maurilait', color: '#F7A823', category: 'Juice' },
  { id: 'candia-creme', name: 'Candia Crème', slug: 'candia-creme', parentCompany: 'Maurilait', color: '#8B4513', category: 'Cream' },
];

export const BRAND_MAP = Object.fromEntries(BRANDS.map((b) => [b.id, b]));
