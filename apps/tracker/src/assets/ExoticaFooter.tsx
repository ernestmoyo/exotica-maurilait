import ExoticaLogo from './ExoticaLogo';

export default function ExoticaFooter({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <ExoticaLogo size="small" variant="full" color="gold" />
      <span className="text-[10px] text-pulse-meta font-mono opacity-60">
        Powered by Exotica Agency | Port Louis, Mauritius
      </span>
    </div>
  );
}
