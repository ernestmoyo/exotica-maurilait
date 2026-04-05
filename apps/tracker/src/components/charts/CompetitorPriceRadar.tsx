import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BRANDS } from '@/data/brands';
import { getCompetitorsByBrand } from '@/data/competitors';
import { MONTHS, COMPETITOR_PRICES, getAvgPriceByBrandAndMonth } from '@/data/prices';

const latestMonth = MONTHS[MONTHS.length - 1];
const prevMonth = MONTHS[MONTHS.length - 2];

function buildRadarData() {
  const brandData = BRANDS.map((brand) => {
    const maurilaitPrice = getAvgPriceByBrandAndMonth(brand.id, latestMonth);
    const competitors = getCompetitorsByBrand(brand.id);
    const compPrices = competitors
      .map((c) => COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === latestMonth)?.price ?? 0)
      .filter((p) => p > 0);
    const competitorAvg = compPrices.length > 0 ? compPrices.reduce((s, p) => s + p, 0) / compPrices.length : 0;

    return {
      metric: brand.category,
      maurilait: Math.round(maurilaitPrice),
      competitor: Math.round(competitorAvg),
      fullMark: Math.max(Math.round(maurilaitPrice), Math.round(competitorAvg)) + 30,
    };
  });

  // Add Price Stability (lower month-over-month variance = higher score)
  const maurilaitVariance = BRANDS.reduce((sum, b) => {
    const curr = getAvgPriceByBrandAndMonth(b.id, latestMonth);
    const prev = getAvgPriceByBrandAndMonth(b.id, prevMonth);
    return sum + Math.abs(((curr - prev) / prev) * 100);
  }, 0) / BRANDS.length;

  const compVariance = BRANDS.reduce((sum, b) => {
    const comps = getCompetitorsByBrand(b.id);
    const changes = comps.map((c) => {
      const curr = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === latestMonth)?.price ?? 0;
      const prev = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === prevMonth)?.price ?? 0;
      return prev > 0 ? Math.abs(((curr - prev) / prev) * 100) : 0;
    });
    return sum + (changes.length > 0 ? changes.reduce((s, v) => s + v, 0) / changes.length : 0);
  }, 0) / BRANDS.length;

  brandData.push({
    metric: 'Price Stability',
    maurilait: Math.round(100 - maurilaitVariance * 10),
    competitor: Math.round(100 - compVariance * 10),
    fullMark: 100,
  });

  brandData.push({
    metric: 'Coverage',
    maurilait: 88,
    competitor: 70,
    fullMark: 100,
  });

  return brandData;
}

const radarData = buildRadarData();

export default function CompetitorPriceRadar({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-1">Competitive Position</h3>
      <p className="text-xs text-pulse-meta mb-4">Maurilait vs avg competitor pricing (MUR)</p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#334155', fontFamily: 'DM Sans' }} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar name="Maurilait" dataKey="maurilait" stroke="#0068B8" fill="#0068B8" fillOpacity={0.2} strokeWidth={2} isAnimationActive animationDuration={1200} animationBegin={delay * 1000 + 400} />
            <Radar name="Competitor Avg" dataKey="competitor" stroke="#E85D75" fill="#E85D75" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 4" isAnimationActive animationDuration={1200} animationBegin={delay * 1000 + 600} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans' }} />
            <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
