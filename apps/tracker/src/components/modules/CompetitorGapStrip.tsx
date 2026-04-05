import { motion } from 'framer-motion';
import PercentChangeArrow from '@/components/ui/PercentChangeArrow';
import { BRANDS } from '@/data/brands';
import { getCompetitorsByBrand } from '@/data/competitors';
import { MONTHS, COMPETITOR_PRICES, getAvgPriceByBrandAndMonth } from '@/data/prices';

const latestMonth = MONTHS[MONTHS.length - 1];
const prevMonth = MONTHS[MONTHS.length - 2];

interface BrandGap {
  brandId: string;
  brandName: string;
  category: string;
  color: string;
  maurilaitPrice: number;
  competitorAvgPrice: number;
  gapPercent: number;
  momChange: number;
}

function computeGaps(): BrandGap[] {
  return BRANDS.map((brand) => {
    const maurilaitPrice = getAvgPriceByBrandAndMonth(brand.id, latestMonth);
    const maurilaitPrev = getAvgPriceByBrandAndMonth(brand.id, prevMonth);
    const competitors = getCompetitorsByBrand(brand.id);

    const competitorPrices = competitors.map((c) => {
      const entry = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === latestMonth);
      return entry?.price ?? 0;
    }).filter((p) => p > 0);

    const competitorAvgPrice = competitorPrices.length > 0
      ? competitorPrices.reduce((sum, p) => sum + p, 0) / competitorPrices.length
      : 0;

    const gapPercent = maurilaitPrice > 0
      ? ((competitorAvgPrice - maurilaitPrice) / maurilaitPrice) * 100
      : 0;

    const momChange = maurilaitPrev > 0
      ? ((maurilaitPrice - maurilaitPrev) / maurilaitPrev) * 100
      : 0;

    return {
      brandId: brand.id,
      brandName: brand.name,
      category: brand.category,
      color: brand.color,
      maurilaitPrice: Math.round(maurilaitPrice),
      competitorAvgPrice: Math.round(competitorAvgPrice),
      gapPercent: Math.round(gapPercent * 10) / 10,
      momChange: Math.round(momChange * 10) / 10,
    };
  });
}

export default function CompetitorGapStrip({ delay = 0 }: { delay?: number }) {
  const gaps = computeGaps();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xs font-mono text-pulse-meta uppercase tracking-wider">
          Competitor Price Gap — {latestMonth}
        </h3>
        <span className="text-[10px] text-pulse-meta bg-pulse-card-light px-2 py-0.5 rounded-full font-mono">
          vs avg competitor
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gaps.map((gap, i) => (
          <motion.div
            key={gap.brandId}
            className="glass-card p-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.08, duration: 0.35 }}
          >
            {/* Color accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: gap.color }} />

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: gap.color }} />
              <span className="text-sm font-semibold text-pulse-text">{gap.brandName}</span>
            </div>

            <p className="text-[10px] text-pulse-meta font-mono uppercase tracking-wider mb-2">
              {gap.category}
            </p>

            {/* Price comparison */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-mono font-bold text-pulse-text">Rs {gap.maurilaitPrice}</span>
              <span className="text-xs text-pulse-meta font-mono">vs Rs {gap.competitorAvgPrice}</span>
            </div>

            {/* Gap arrow */}
            <div className="flex items-center gap-2 mt-2">
              <PercentChangeArrow
                value={gap.gapPercent}
                size="sm"
                invertColors={true}
                delay={delay + i * 0.08 + 0.3}
              />
              <span className="text-[10px] text-pulse-meta">gap</span>
            </div>

            {/* MoM change */}
            <div className="flex items-center gap-2 mt-1.5">
              <PercentChangeArrow
                value={gap.momChange}
                size="sm"
                delay={delay + i * 0.08 + 0.4}
              />
              <span className="text-[10px] text-pulse-meta">MoM</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
