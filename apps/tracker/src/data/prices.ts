import type { PriceAlert } from '@/types';
import { PRODUCTS } from './products';
import { REGIONS } from './regions';
import { OUTLET_TYPES, OUTLET_MARKUP } from './outlets';

// Seeded random for reproducible data
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

export const MONTHS = ['Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026'];

// Base prices in MUR for each product
const BASE_PRICES: Record<string, number> = {
  'yop-straw-125': 45,
  'yop-nature-125': 42,
  'yop-vanilla-4pk': 165,
  'yop-drink-straw': 55,
  'yop-drink-mango': 55,
  'can-full-1l': 62,
  'can-semi-1l': 64,
  'can-skim-1l': 66,
  'can-full-500': 35,
  'j-orange-1l': 85,
  'j-tropical-1l': 85,
  'j-apple-500': 48,
  'j-mango-500': 48,
  'cc-cooking-200': 78,
  'cc-whipping-200': 85,
  'cc-cooking-500': 175,
};

// Competitor base prices (slightly varied)
const COMPETITOR_BASE_PRICES: Record<string, number> = {
  'comp-ev-yoghurt': 52,
  'comp-danone-yog': 48,
  'comp-local-yog': 38,
  'comp-anchor-milk': 68,
  'comp-nespray': 60,
  'comp-local-milk': 55,
  'comp-delmonte': 92,
  'comp-ceres': 88,
  'comp-local-juice': 42,
  'comp-ev-cream': 90,
  'comp-president': 95,
  'comp-anchor-cream': 82,
};

// Regional price factor (rural areas slightly higher)
const REGION_FACTOR: Record<string, number> = {
  'port-louis': 1.0,
  'pamplemousses': 1.02,
  'riviere-du-rempart': 1.04,
  'flacq': 1.05,
  'grand-port': 1.06,
  'savanne': 1.08,
  'black-river': 1.03,
  'plaines-wilhems': 1.0,
  'moka': 1.01,
  'curepipe': 1.01,
  'quatre-bornes': 1.0,
  'rodrigues': 1.15,
};

// Monthly inflation trend (cumulative, simulating price pressure)
const MONTH_TREND = [1.0, 1.01, 1.025, 1.04, 1.055, 1.07];

export interface PriceDataPoint {
  productId: string;
  regionId: string;
  outletType: string;
  month: string;
  price: number;
}

// Generate all price data points
export const PRICE_DATA: PriceDataPoint[] = (() => {
  const data: PriceDataPoint[] = [];

  PRODUCTS.forEach((product) => {
    const basePrice = BASE_PRICES[product.id] ?? 50;
    REGIONS.forEach((region) => {
      const regionFactor = REGION_FACTOR[region.id] ?? 1.0;
      OUTLET_TYPES.forEach((outlet) => {
        const outletFactor = OUTLET_MARKUP[outlet.id];
        MONTHS.forEach((month, mi) => {
          const trend = MONTH_TREND[mi];
          const noise = 0.97 + rand() * 0.06; // +/- 3% noise
          const price = Math.round(basePrice * regionFactor * outletFactor * trend * noise * 100) / 100;
          data.push({
            productId: product.id,
            regionId: region.id,
            outletType: outlet.id,
            month,
            price,
          });
        });
      });
    });
  });

  return data;
})();

// Competitor price data
export interface CompetitorPricePoint {
  competitorId: string;
  month: string;
  price: number;
}

export const COMPETITOR_PRICES: CompetitorPricePoint[] = (() => {
  const data: CompetitorPricePoint[] = [];

  Object.entries(COMPETITOR_BASE_PRICES).forEach(([compId, basePrice]) => {
    MONTHS.forEach((month, mi) => {
      const trend = MONTH_TREND[mi];
      const noise = 0.96 + rand() * 0.08;
      const price = Math.round(basePrice * trend * noise * 100) / 100;
      data.push({ competitorId: compId, month, price });
    });
  });

  return data;
})();

// Aggregate helpers
export function getAvgPriceByBrandAndMonth(brandId: string, month: string): number {
  const brandProducts = PRODUCTS.filter((p) => p.brandId === brandId).map((p) => p.id);
  const relevant = PRICE_DATA.filter((d) => brandProducts.includes(d.productId) && d.month === month);
  if (relevant.length === 0) return 0;
  return Math.round((relevant.reduce((sum, d) => sum + d.price, 0) / relevant.length) * 100) / 100;
}

export function getAvgPriceByRegionAndMonth(regionId: string, month: string): number {
  const relevant = PRICE_DATA.filter((d) => d.regionId === regionId && d.month === month);
  if (relevant.length === 0) return 0;
  return Math.round((relevant.reduce((sum, d) => sum + d.price, 0) / relevant.length) * 100) / 100;
}

export function getAvgPriceByOutletAndMonth(outletType: string, month: string): number {
  const relevant = PRICE_DATA.filter((d) => d.outletType === outletType && d.month === month);
  if (relevant.length === 0) return 0;
  return Math.round((relevant.reduce((sum, d) => sum + d.price, 0) / relevant.length) * 100) / 100;
}

export function getPriceIndex(month: string): number {
  const baseline = PRICE_DATA.filter((d) => d.month === MONTHS[0]);
  const current = PRICE_DATA.filter((d) => d.month === month);
  if (baseline.length === 0 || current.length === 0) return 100;
  const baseAvg = baseline.reduce((s, d) => s + d.price, 0) / baseline.length;
  const currAvg = current.reduce((s, d) => s + d.price, 0) / current.length;
  return Math.round((currAvg / baseAvg) * 100 * 10) / 10;
}

// Brand trend data for charts
export function getBrandTrendData(): { month: string; yoplait: number; candia: number; j: number; 'candia-creme': number }[] {
  return MONTHS.map((month) => ({
    month: month.replace('-20', "'"),
    yoplait: getAvgPriceByBrandAndMonth('yoplait', month),
    candia: getAvgPriceByBrandAndMonth('candia', month),
    j: getAvgPriceByBrandAndMonth('j', month),
    'candia-creme': getAvgPriceByBrandAndMonth('candia-creme', month),
  }));
}

// Regional heatmap data
export function getRegionalHeatmapData(): { region: string; yoplait: number; candia: number; j: number; 'candia-creme': number }[] {
  const latestMonth = MONTHS[MONTHS.length - 1];
  return REGIONS.map((region) => {
    const getAvg = (brandId: string) => {
      const brandProducts = PRODUCTS.filter((p) => p.brandId === brandId).map((p) => p.id);
      const relevant = PRICE_DATA.filter(
        (d) => brandProducts.includes(d.productId) && d.regionId === region.id && d.month === latestMonth,
      );
      if (relevant.length === 0) return 0;
      return Math.round((relevant.reduce((s, d) => s + d.price, 0) / relevant.length) * 100) / 100;
    };
    return {
      region: region.name,
      yoplait: getAvg('yoplait'),
      candia: getAvg('candia'),
      j: getAvg('j'),
      'candia-creme': getAvg('candia-creme'),
    };
  });
}

// Price alerts
export const PRICE_ALERTS: PriceAlert[] = [
  { id: 'a1', type: 'price_increase', severity: 'high', message: 'Yoplait Strawberry 125g up 8.2% in Rodrigues this month', productId: 'yop-straw-125', regionId: 'rodrigues', timestamp: '2 hours ago' },
  { id: 'a2', type: 'competitor_change', severity: 'high', message: 'Elle & Vire Cream dropped 12% — potential threat to Candia Crème', productId: 'cc-cooking-200', timestamp: '5 hours ago' },
  { id: 'a3', type: 'price_increase', severity: 'medium', message: 'Candia Full Fat 1L prices rising across all outlets (+3.5% avg)', productId: 'can-full-1l', timestamp: '1 day ago' },
  { id: 'a4', type: 'anomaly', severity: 'medium', message: 'J Orange 1L corner shop price 22% above supermarket in Flacq', productId: 'j-orange-1l', regionId: 'flacq', timestamp: '1 day ago' },
  { id: 'a5', type: 'price_decrease', severity: 'low', message: 'Del Monte Orange promotional pricing detected in Port Louis supermarkets', productId: 'j-orange-1l', regionId: 'port-louis', timestamp: '2 days ago' },
  { id: 'a6', type: 'competitor_change', severity: 'medium', message: 'Anchor UHT now priced 9% above Candia Full Fat — competitive advantage', productId: 'can-full-1l', timestamp: '3 days ago' },
];
