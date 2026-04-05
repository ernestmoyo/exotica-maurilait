import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getBrandTrendData } from '@/data/prices';

const BRAND_COLORS: Record<string, string> = {
  yoplait: '#E30613',
  candia: '#0068B8',
  j: '#F7A823',
  'candia-creme': '#8B4513',
};

const BRAND_LABELS: Record<string, string> = {
  yoplait: 'Yoplait',
  candia: 'Candia',
  j: 'J',
  'candia-creme': 'Candia Crème',
};

export default function PriceTrendChart({ delay = 0 }: { delay?: number }) {
  const data = getBrandTrendData();

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-1">Avg Price Trend by Brand</h3>
      <p className="text-xs text-pulse-meta mb-4">Monthly average price (MUR) across all products, regions & outlets</p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              {Object.entries(BRAND_COLORS).map(([key, color]) => (
                <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
            <Tooltip
              contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }}
              formatter={(value: number, name: string) => [`Rs ${value.toFixed(0)}`, BRAND_LABELS[name] ?? name]}
            />
            <Legend formatter={(value: string) => BRAND_LABELS[value] ?? value} wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans' }} />
            {Object.entries(BRAND_COLORS).map(([key, color]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                fill={`url(#grad-${key})`}
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={delay * 1000 + 300}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
