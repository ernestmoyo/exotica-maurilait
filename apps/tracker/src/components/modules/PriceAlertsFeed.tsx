import { motion } from 'framer-motion';
import { PRICE_ALERTS } from '@/data/prices';

const SEVERITY_STYLES: Record<string, string> = {
  high: 'border-l-pulse-danger bg-[rgba(220,38,38,0.04)]',
  medium: 'border-l-pulse-amber bg-[rgba(245,158,11,0.04)]',
  low: 'border-l-pulse-teal bg-[rgba(46,158,107,0.04)]',
};

const TYPE_ICONS: Record<string, string> = {
  price_increase: '\u25B2',
  price_decrease: '\u25BC',
  anomaly: '\u26A0',
  competitor_change: '\u2694',
};

export default function PriceAlertsFeed({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-1">Price Alerts</h3>
      <p className="text-xs text-pulse-meta mb-4">Anomalies, competitor moves & significant changes</p>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {PRICE_ALERTS.map((alert, i) => (
          <motion.div
            key={alert.id}
            className={`rounded-lg border-l-[3px] p-3 ${SEVERITY_STYLES[alert.severity]}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + i * 0.08 }}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{TYPE_ICONS[alert.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-pulse-body leading-relaxed">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    alert.severity === 'high' ? 'bg-pulse-danger/10 text-pulse-danger' :
                    alert.severity === 'medium' ? 'bg-pulse-amber/10 text-pulse-amber' :
                    'bg-pulse-teal/10 text-pulse-teal'
                  }`}>{alert.severity}</span>
                  <span className="text-[10px] text-pulse-meta">{alert.timestamp}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
