import { motion } from 'framer-motion';

interface PercentChangeArrowProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  invertColors?: boolean;
  suffix?: string;
  delay?: number;
}

const sizeStyles = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

export default function PercentChangeArrow({
  value,
  size = 'md',
  invertColors = false,
  suffix = '%',
  delay = 0,
}: PercentChangeArrowProps) {
  const isUp = value > 0;
  const isDown = value < 0;
  const isNeutral = value === 0;

  const positiveIsGood = invertColors;
  const colorClass = isNeutral
    ? 'bg-pulse-card-light text-pulse-body'
    : (isUp && !positiveIsGood) || (isDown && positiveIsGood)
      ? 'bg-[rgba(220,38,38,0.1)] text-pulse-danger'
      : 'bg-[rgba(22,163,74,0.1)] text-pulse-success';

  return (
    <motion.span
      className={`inline-flex items-center gap-1 font-mono rounded-full font-semibold ${sizeStyles[size]} ${colorClass}`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {isUp ? '\u25B2' : isDown ? '\u25BC' : '\u25CF'}{' '}
      {isUp ? '+' : ''}{value.toFixed(1)}{suffix}
    </motion.span>
  );
}
