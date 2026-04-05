import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { REGIONS } from '@/data/regions';
import { PRICE_DATA, MONTHS } from '@/data/prices';

const latestMonth = MONTHS[MONTHS.length - 1];
const prevMonth = MONTHS[MONTHS.length - 2];

export default function RegionalPricePage() {
  const regionalData = REGIONS.map((r) => {
    const currentEntries = PRICE_DATA.filter((d) => d.regionId === r.id && d.month === latestMonth);
    const prevEntries = PRICE_DATA.filter((d) => d.regionId === r.id && d.month === prevMonth);
    const avg = currentEntries.length > 0 ? currentEntries.reduce((s, d) => s + d.price, 0) / currentEntries.length : 0;
    const prevAvg = prevEntries.length > 0 ? prevEntries.reduce((s, d) => s + d.price, 0) / prevEntries.length : 0;
    const change = prevAvg > 0 ? ((avg - prevAvg) / prevAvg) * 100 : 0;
    return { region: r.name, regionId: r.id, avg: Math.round(avg * 100) / 100, change: Math.round(change * 10) / 10, dataPoints: currentEntries.length };
  });

  const chartData = regionalData.map((r) => ({ name: r.region, price: r.avg }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Regional Analysis</h1>
        <p className="text-sm text-pulse-meta mt-1">Price comparison across Mauritius's {REGIONS.length} districts — {latestMonth}</p>
      </motion.div>

      {/* District Price Chart */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Avg Price by District</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'DM Sans' }} angle={-45} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} formatter={(v: number) => [`Rs ${v.toFixed(0)}`, 'Avg Price']} />
              <Bar dataKey="price" fill="#0068B8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* District Table */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">District Detail</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pulse-border">
                <th className="text-left py-2 text-pulse-meta font-mono text-xs uppercase">District</th>
                <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">Avg Price (MUR)</th>
                <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">MoM Change</th>
                <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">Data Points</th>
              </tr>
            </thead>
            <tbody>
              {regionalData.map((row, i) => (
                <motion.tr
                  key={row.regionId}
                  className="border-b border-pulse-border/50 hover:bg-pulse-card-light transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.03 }}
                >
                  <td className="py-2.5 font-medium text-pulse-body">{row.region}</td>
                  <td className="py-2.5 text-right font-mono text-pulse-text">Rs {row.avg.toFixed(0)}</td>
                  <td className={`py-2.5 text-right font-mono ${row.change > 0 ? 'text-pulse-danger' : 'text-pulse-success'}`}>
                    {row.change > 0 ? '+' : ''}{row.change}%
                  </td>
                  <td className="py-2.5 text-right font-mono text-pulse-meta">{row.dataPoints}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
