import { motion } from 'framer-motion';
import { getRegionalHeatmapData } from '@/data/prices';

const BRAND_KEYS = ['yoplait', 'candia', 'j', 'candia-creme'] as const;
const BRAND_LABELS: Record<string, string> = { yoplait: 'Yoplait', candia: 'Candia', j: 'J', 'candia-creme': 'Crème' };
const BRAND_COLORS: Record<string, string> = { yoplait: '#E30613', candia: '#0068B8', j: '#F7A823', 'candia-creme': '#8B4513' };

function getCellBg(value: number, min: number, max: number, color: string): string {
  const ratio = max === min ? 0.5 : (value - min) / (max - min);
  const opacity = 0.1 + ratio * 0.35;
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}

export default function RegionalPriceHeatmap({ delay = 0 }: { delay?: number }) {
  const data = getRegionalHeatmapData();

  const minMax: Record<string, { min: number; max: number }> = {};
  BRAND_KEYS.forEach((key) => {
    const vals = data.map((d) => d[key]).filter((v) => v > 0);
    minMax[key] = { min: Math.min(...vals), max: Math.max(...vals) };
  });

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-1">Regional Price Heatmap</h3>
      <p className="text-xs text-pulse-meta mb-4">Avg price (MUR) by district & brand — current month</p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-mono text-pulse-meta uppercase tracking-wider">District</th>
              {BRAND_KEYS.map((key) => (
                <th key={key} className="text-center py-2 px-3 font-mono text-pulse-meta uppercase tracking-wider">
                  {BRAND_LABELS[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={row.region}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + i * 0.03 }}
                className="border-t border-pulse-border/50"
              >
                <td className="py-2 px-3 font-medium text-pulse-body whitespace-nowrap">{row.region}</td>
                {BRAND_KEYS.map((key) => {
                  const val = row[key];
                  const { min, max } = minMax[key];
                  return (
                    <td key={key} className="py-2 px-3 text-center font-mono" style={{ backgroundColor: getCellBg(val, min, max, BRAND_COLORS[key]) }}>
                      {val > 0 ? `Rs ${val.toFixed(0)}` : '—'}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
