import { motion } from 'framer-motion';
import PulseKpiCard from '@/components/ui/PulseKpiCard';
import PriceTrendChart from '@/components/charts/PriceTrendChart';
import CompetitorPriceRadar from '@/components/charts/CompetitorPriceRadar';
import RegionalPriceHeatmap from '@/components/charts/RegionalPriceHeatmap';
import OutletPriceBar from '@/components/charts/OutletPriceBar';
import PriceAlertsFeed from '@/components/modules/PriceAlertsFeed';
import CompetitorGapStrip from '@/components/modules/CompetitorGapStrip';
import { getPriceIndex, MONTHS, PRICE_DATA } from '@/data/prices';
import { PRODUCTS } from '@/data/products';
import { REGIONS } from '@/data/regions';
import { OUTLET_TYPES } from '@/data/outlets';

const latestMonth = MONTHS[MONTHS.length - 1];
const prevMonth = MONTHS[MONTHS.length - 2];
const currentIndex = getPriceIndex(latestMonth);
const prevIndex = getPriceIndex(prevMonth);

const totalProducts = PRODUCTS.length;
const totalOutlets = REGIONS.length * OUTLET_TYPES.length;
const dataPointsThisMonth = PRICE_DATA.filter((d) => d.month === latestMonth).length;

// Monthly price change %
const allCurrentPrices = PRICE_DATA.filter((d) => d.month === latestMonth);
const allPrevPrices = PRICE_DATA.filter((d) => d.month === prevMonth);
const avgCurrent = allCurrentPrices.reduce((s, d) => s + d.price, 0) / allCurrentPrices.length;
const avgPrev = allPrevPrices.reduce((s, d) => s + d.price, 0) / allPrevPrices.length;
const monthlyChange = ((avgCurrent - avgPrev) / avgPrev) * 100;
const prevMonthlyChange = monthlyChange * 0.7;

const kpiData = [
  {
    label: 'Price Index',
    value: currentIndex,
    previousValue: prevIndex,
    unit: '',
    threshold: 105,
    sparkline: MONTHS.map((m) => getPriceIndex(m)),
    color: '#0068B8',
  },
  {
    label: 'Monthly Change',
    value: parseFloat(monthlyChange.toFixed(1)),
    previousValue: parseFloat(prevMonthlyChange.toFixed(1)),
    unit: '%',
    threshold: 3,
    sparkline: [0.8, 1.1, 1.5, 1.8, 2.1, monthlyChange],
    color: '#E85D75',
  },
  {
    label: 'Products Tracked',
    value: totalProducts,
    previousValue: totalProducts,
    unit: '',
    threshold: 10,
    sparkline: [12, 14, 14, 16, 16, totalProducts],
    color: '#2E9E6B',
  },
  {
    label: 'Outlets Covered',
    value: totalOutlets,
    previousValue: totalOutlets - 5,
    unit: '',
    threshold: 40,
    sparkline: [35, 40, 45, 50, 55, totalOutlets],
    color: '#F7A823',
  },
  {
    label: 'Active Alerts',
    value: 6,
    previousValue: 4,
    unit: '',
    threshold: 5,
    sparkline: [2, 3, 3, 5, 4, 6],
    color: '#DC2626',
  },
  {
    label: 'Data Points',
    value: dataPointsThisMonth,
    previousValue: dataPointsThisMonth - 120,
    unit: '',
    threshold: 3000,
    sparkline: [2800, 3000, 3200, 3400, 3600, dataPointsThisMonth],
    color: '#8B4513',
  },
];

export default function PriceDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Pricing Audit Centre</h1>
        <p className="text-sm text-pulse-meta mt-1">Maurilait portfolio pricing audit intelligence — {latestMonth}</p>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, i) => (
          <PulseKpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            previousValue={kpi.previousValue}
            unit={kpi.unit}
            threshold={kpi.threshold}
            sparklineData={kpi.sparkline}
            delay={i * 0.08}
            accentColor={kpi.color}
          />
        ))}
      </div>

      {/* Competitor Gap Strip */}
      <CompetitorGapStrip delay={0.45} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceTrendChart delay={0.5} />
        </div>
        <CompetitorPriceRadar delay={0.6} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RegionalPriceHeatmap delay={0.7} />
        <PriceAlertsFeed delay={0.8} />
        <OutletPriceBar delay={0.9} />
      </div>
    </div>
  );
}
