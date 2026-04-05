import type { CompetitorProduct } from '@/types';

export const COMPETITORS: CompetitorProduct[] = [
  // vs Yoplait
  { id: 'comp-ev-yoghurt', name: 'Elle & Vire Yoghurt', brand: 'Elle & Vire', competesWithBrandId: 'yoplait', category: 'Yoghurt' },
  { id: 'comp-danone-yog', name: 'Danone Nature', brand: 'Danone', competesWithBrandId: 'yoplait', category: 'Yoghurt' },
  { id: 'comp-local-yog', name: 'Local Fresh Yoghurt', brand: 'Maurifrais', competesWithBrandId: 'yoplait', category: 'Yoghurt' },

  // vs Candia
  { id: 'comp-anchor-milk', name: 'Anchor UHT Full Fat', brand: 'Anchor', competesWithBrandId: 'candia', category: 'UHT Milk' },
  { id: 'comp-nespray', name: 'Nespray UHT', brand: 'Nestlé', competesWithBrandId: 'candia', category: 'UHT Milk' },
  { id: 'comp-local-milk', name: 'Local UHT Milk', brand: 'Maulait', competesWithBrandId: 'candia', category: 'UHT Milk' },

  // vs J
  { id: 'comp-delmonte', name: 'Del Monte Orange', brand: 'Del Monte', competesWithBrandId: 'j', category: 'Juice' },
  { id: 'comp-ceres', name: 'Ceres Fruit Juice', brand: 'Ceres', competesWithBrandId: 'j', category: 'Juice' },
  { id: 'comp-local-juice', name: 'Island Fresh Juice', brand: 'Island Fresh', competesWithBrandId: 'j', category: 'Juice' },

  // vs Candia Crème
  { id: 'comp-ev-cream', name: 'Elle & Vire Cooking Cream', brand: 'Elle & Vire', competesWithBrandId: 'candia-creme', category: 'Cream' },
  { id: 'comp-president', name: 'Président Cream', brand: 'Président', competesWithBrandId: 'candia-creme', category: 'Cream' },
  { id: 'comp-anchor-cream', name: 'Anchor Cream', brand: 'Anchor', competesWithBrandId: 'candia-creme', category: 'Cream' },
];

export const getCompetitorsByBrand = (brandId: string): CompetitorProduct[] =>
  COMPETITORS.filter((c) => c.competesWithBrandId === brandId);
