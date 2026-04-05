export interface Brand {
  id: string;
  name: string;
  slug: string;
  parentCompany: 'Maurilait';
  color: string;
  category: string;
}

export interface Product {
  id: string;
  brandId: string;
  name: string;
  variant: string;
  format: string;
  imageUrl: string | null;
}

export interface Region {
  id: string;
  name: string;
}

export type OutletType = 'supermarket' | 'hypermarket' | 'corner_shop' | 'convenience' | 'wholesaler';

export interface Outlet {
  id: string;
  name: string;
  type: OutletType;
  regionId: string;
}

export interface PriceEntry {
  id: string;
  productId: string;
  outletId: string;
  regionId: string;
  price: number;
  currency: 'MUR';
  collectedDate: string;
  monthPeriod: string;
  collectedBy: string;
  photoUrl?: string;
  isPromotion: boolean;
  promotionType?: 'discount' | 'bundle' | 'loyalty';
  notes?: string;
}

export interface CompetitorProduct {
  id: string;
  name: string;
  brand: string;
  competesWithBrandId: string;
  category: string;
}

export interface PriceAlert {
  id: string;
  type: 'price_increase' | 'price_decrease' | 'anomaly' | 'competitor_change';
  severity: 'high' | 'medium' | 'low';
  message: string;
  productId: string;
  regionId?: string;
  timestamp: string;
}
