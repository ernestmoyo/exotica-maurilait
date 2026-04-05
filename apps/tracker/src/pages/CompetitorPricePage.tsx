import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BRANDS } from '@/data/brands';
import { COMPETITORS, getCompetitorsByBrand } from '@/data/competitors';
import { MONTHS, COMPETITOR_PRICES, getAvgPriceByBrandAndMonth } from '@/data/prices';

export default function CompetitorPricePage() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0].id);
  const brand = BRANDS.find((b) => b.id === selectedBrand)!;
  const competitors = getCompetitorsByBrand(selectedBrand);
  const latestMonth = MONTHS[MONTHS.length - 1];
  const brandAvg = getAvgPriceByBrandAndMonth(selectedBrand, latestMonth);

  // Trend comparison
  const trendData = MONTHS.map((m) => {
    const row: Record<string, any> = { month: m.replace('-20', "'"), maurilait: getAvgPriceByBrandAndMonth(selectedBrand, m) };
    competitors.forEach((c) => {
      const entry = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === m);
      row[c.id] = entry?.price ?? 0;
    });
    return row;
  });

  // Gap analysis
  const gapData = competitors.map((c) => {
    const entry = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === latestMonth);
    const price = entry?.price ?? 0;
    const gap = brandAvg > 0 ? ((price - brandAvg) / brandAvg) * 100 : 0;
    return { name: c.brand, product: c.name, price, gap: Math.round(gap * 10) / 10 };
  });

  const compColors = ['#E85D75', '#F59E0B', '#8B5EA6'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-pulse-text">Competitor Radar</h1>
          <p className="text-sm text-pulse-meta mt-1">Competitive price intelligence — {latestMonth}</p>
        </div>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="text-sm border border-pulse-border rounded-lg px-3 py-2 bg-white text-pulse-body focus:border-pulse-cyan focus:outline-none"
        >
          {BRANDS.map((b) => (
            <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
          ))}
        </select>
      </motion.div>

      {/* Price Gap Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {gapData.map((comp, i) => (
          <motion.div
            key={comp.name}
            className="glass-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-xs text-pulse-meta font-mono uppercase tracking-wider mb-1">{comp.name}</p>
            <p className="text-sm text-pulse-body mb-2">{comp.product}</p>
            <p className="text-2xl font-mono font-bold text-pulse-text">Rs {comp.price.toFixed(0)}</p>
            <p className={`text-sm font-mono mt-1 ${comp.gap > 0 ? 'text-pulse-success' : 'text-pulse-danger'}`}>
              {comp.gap > 0 ? '+' : ''}{comp.gap}% vs {brand.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Trend Comparison */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Price Trajectory Comparison</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans' }} />
              <Line type="monotone" dataKey="maurilait" name={brand.name} stroke={brand.color} strokeWidth={2.5} dot={{ r: 4 }} />
              {competitors.map((c, i) => (
                <Line key={c.id} type="monotone" dataKey={c.id} name={c.brand} stroke={compColors[i % compColors.length]} strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
