interface ExoticaLogoProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
  variant?: 'full' | 'icon' | 'wordmark';
  color?: 'gold' | 'dark' | 'white';
}

const SIZE_MAP = {
  small: { icon: 28, fontSize: 16, subtitleSize: 8, gap: 8 },
  default: { icon: 40, fontSize: 22, subtitleSize: 10, gap: 10 },
  large: { icon: 56, fontSize: 32, subtitleSize: 14, gap: 14 },
} as const;

const COLOR_MAP = {
  gold: '#D4A853',
  dark: '#2D3E50',
  white: '#FFFFFF',
} as const;

function StarIcon({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 2L38 24H26L32 2Z" fill={fill} />
      <path d="M32 62L26 40H38L32 62Z" fill={fill} />
      <path d="M2 32L24 26V38L2 32Z" fill={fill} />
      <path d="M62 32L40 38V26L62 32Z" fill={fill} />
      <path d="M12 12L28 24L20 28L12 12Z" fill={fill} opacity="0.7" />
      <path d="M52 12L44 28L36 24L52 12Z" fill={fill} opacity="0.7" />
      <path d="M12 52L20 36L28 40L12 52Z" fill={fill} opacity="0.7" />
      <path d="M52 52L36 40L44 36L52 52Z" fill={fill} opacity="0.7" />
      <circle cx="32" cy="32" r="6" fill={fill} />
    </svg>
  );
}

function WordmarkSvg({ fontSize, fill }: { fontSize: number; fill: string }) {
  const scale = fontSize / 22;
  return (
    <svg width={Math.round(160 * scale)} height={Math.round(28 * scale)} viewBox="0 0 160 28" fill="none">
      <path d="M0 2H18V7H6V11.5H16V16.5H6V21H18V26H0V2Z" fill={fill} />
      <path d="M22 2H29L33.5 10.5L38 2H45L37 14L45.5 26H38.5L33.5 17L28.5 26H21.5L30 14L22 2Z" fill={fill} />
      <path d="M56 1C63.5 1 69 7 69 14C69 21 63.5 27 56 27C48.5 27 43 21 43 14C43 7 48.5 1 56 1ZM56 6.5C51.8 6.5 49 9.8 49 14C49 18.2 51.8 21.5 56 21.5C60.2 21.5 63 18.2 63 14C63 9.8 60.2 6.5 56 6.5Z" fill={fill} />
      <path d="M70 2H90V7H83V26H77V7H70V2Z" fill={fill} />
      <path d="M92 2H98V26H92V2Z" fill={fill} />
      <path d="M112 1C119.5 1 124 5.5 125 10H119C118.2 8 115.8 6.5 112 6.5C107.8 6.5 105 9.8 105 14C105 18.2 107.8 21.5 112 21.5C115.8 21.5 118.2 20 119 18H125C124 22.5 119.5 27 112 27C104.5 27 99 21 99 14C99 7 104.5 1 112 1Z" fill={fill} />
      <path d="M126 26L137 2H143L154 26H148L145.5 20H134.5L132 26H126ZM136.5 15.5H143.5L140 7L136.5 15.5Z" fill={fill} />
    </svg>
  );
}

export default function ExoticaLogo({ className = '', size = 'default', variant = 'full', color = 'dark' }: ExoticaLogoProps) {
  const dimensions = SIZE_MAP[size];
  const fill = COLOR_MAP[color];

  if (variant === 'icon') {
    return <div className={className}><StarIcon size={dimensions.icon} fill={fill} /></div>;
  }

  return (
    <div className={`flex items-center ${className}`} style={{ gap: dimensions.gap }}>
      <StarIcon size={dimensions.icon} fill={fill} />
      <WordmarkSvg fontSize={dimensions.fontSize} fill={fill} />
    </div>
  );
}
