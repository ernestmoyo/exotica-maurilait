import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { OUTLET_TYPES } from '@/data/outlets';
import { getAvgPriceByOutletAndMonth, MONTHS } from '@/data/prices';

const BRAND_COLORS: Record<string, string> = {
  yoplait: '#E30613',
  candia: '#0068B8',
  j: '#F7A823',
  'candia-creme': '#8B4513',
};

export default function OutletPriceBar({ delay = 0 }: { delay?: number }) {
  const latestMonth = MONTHS[MONTHS.length - 1];

  const data = OUTLET_TYPES.map((ot) => ({
    outlet: ot.label,
    price: getAvgPriceByOutletAndMonth(ot.id, latestMonth),
  }));

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-1">Avg Price by Outlet Type</h3>
      <p className="text-xs text-pulse-meta mb-4">Current month avg across all products</p>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="outlet" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
            <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} formatter={(v: number) => [`Rs ${v.toFixed(0)}`, 'Avg Price']} />
            <Bar dataKey="price" fill="#0068B8" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={1000} animationBegin={delay * 1000 + 300} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
