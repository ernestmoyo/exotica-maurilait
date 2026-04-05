import { motion } from 'framer-motion';
import { OUTLET_TYPES } from '@/data/outlets';
import { PRICE_DATA, MONTHS, getAvgPriceByOutletAndMonth } from '@/data/prices';
import { BRANDS } from '@/data/brands';
import { PRODUCTS } from '@/data/products';

const latestMonth = MONTHS[MONTHS.length - 1];
const prevMonth = MONTHS[MONTHS.length - 2];

export default function OutletAnalysisPage() {
  const outletData = OUTLET_TYPES.map((ot) => {
    const currAvg = getAvgPriceByOutletAndMonth(ot.id, latestMonth);
    const prevAvg = getAvgPriceByOutletAndMonth(ot.id, prevMonth);
    const change = prevAvg > 0 ? ((currAvg - prevAvg) / prevAvg) * 100 : 0;
    const dataPoints = PRICE_DATA.filter((d) => d.outletType === ot.id && d.month === latestMonth).length;
    return { name: ot.label, type: ot.id, avg: currAvg, change: Math.round(change * 10) / 10, dataPoints };
  });

  const superPrice = outletData.find((o) => o.type === 'supermarket')?.avg ?? 1;

  // Brand x Outlet breakdown
  const brandOutletData = OUTLET_TYPES.map((ot) => {
    const row: Record<string, any> = { outlet: ot.label };
    BRANDS.forEach((b) => {
      const productIds = PRODUCTS.filter((p) => p.brandId === b.id).map((p) => p.id);
      const entries = PRICE_DATA.filter((d) => productIds.includes(d.productId) && d.outletType === ot.id && d.month === latestMonth);
      row[b.slug] = entries.length > 0 ? Math.round((entries.reduce((s, d) => s + d.price, 0) / entries.length) * 100) / 100 : 0;
    });
    return row;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Outlet Analysis</h1>
        <p className="text-sm text-pulse-meta mt-1">Price premium by outlet type — {latestMonth}</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {outletData.map((ot, i) => {
          const premium = ((ot.avg - superPrice) / superPrice) * 100;
          return (
            <motion.div
              key={ot.type}
              className="glass-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-xs text-pulse-meta font-mono uppercase tracking-wider mb-2">{ot.name}</p>
              <p className="text-2xl font-mono font-bold text-pulse-text">Rs {ot.avg.toFixed(0)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-mono ${ot.change > 0 ? 'text-pulse-danger' : 'text-pulse-success'}`}>
                  {ot.change > 0 ? '+' : ''}{ot.change}% MoM
                </span>
              </div>
              <div className="mt-2 text-xs text-pulse-meta">
                {premium > 0 ? `+${premium.toFixed(1)}% vs supermarket` : premium < 0 ? `${premium.toFixed(1)}% vs supermarket` : 'Baseline'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Brand x Outlet Table */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Brand x Outlet Avg Price</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pulse-border">
                <th className="text-left py-2 text-pulse-meta font-mono text-xs uppercase">Outlet</th>
                {BRANDS.map((b) => (
                  <th key={b.id} className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">{b.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brandOutletData.map((row) => (
                <tr key={row.outlet} className="border-b border-pulse-border/50">
                  <td className="py-2.5 font-medium text-pulse-body">{row.outlet}</td>
                  {BRANDS.map((b) => (
                    <td key={b.id} className="py-2.5 text-right font-mono text-pulse-text">
                      Rs {(row[b.slug] as number).toFixed(0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
