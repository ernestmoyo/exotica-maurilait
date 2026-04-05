import type { OutletType } from '@/types';

export const OUTLET_TYPES: { id: OutletType; label: string }[] = [
  { id: 'supermarket', label: 'Supermarket' },
  { id: 'hypermarket', label: 'Hypermarket' },
  { id: 'corner_shop', label: 'Corner Shop' },
  { id: 'convenience', label: 'Convenience Store' },
  { id: 'wholesaler', label: 'Wholesaler' },
];

export const OUTLET_MARKUP: Record<OutletType, number> = {
  supermarket: 1.0,
  hypermarket: 0.97,
  corner_shop: 1.12,
  convenience: 1.08,
  wholesaler: 0.92,
};
