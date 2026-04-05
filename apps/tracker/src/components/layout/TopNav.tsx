import { useState, useRef, useEffect } from 'react';
import { PRICE_ALERTS } from '@/data/prices';

const demoUser = { name: 'Irfan Mooradun', role: 'ADMIN' };

export default function TopNav() {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-pulse-border bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-pulse-success animate-pulse" />
          <span className="text-sm text-pulse-body font-mono">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.2)]">
          <div className="w-2 h-2 rounded-full bg-pulse-success animate-pulse" />
          <span className="text-xs font-mono font-semibold text-pulse-success">Week 4</span>
          <span className="text-[10px] text-pulse-meta font-mono">Dashboard Live</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-xs font-display text-pulse-brand tracking-widest">MAURILAIT</span>
        <span className="text-xs font-display text-pulse-body tracking-widest">PRICE</span>
        <span className="text-xs font-mono font-light text-pulse-cyan tracking-widest">PULSE</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button
            aria-label="Notifications"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 rounded-lg text-pulse-meta hover:text-pulse-body hover:bg-pulse-card-light transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pulse-amber rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-pulse-border bg-white shadow-lg z-50">
              <div className="px-4 py-3 border-b border-pulse-border">
                <span className="text-xs font-mono text-pulse-meta uppercase tracking-wider">Price Alerts</span>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {PRICE_ALERTS.map((a) => (
                  <li key={a.id} className="px-4 py-3 border-b border-pulse-border/50 hover:bg-pulse-card-light transition-colors">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        a.severity === 'high' ? 'bg-pulse-danger' : a.severity === 'medium' ? 'bg-pulse-amber' : 'bg-pulse-teal'
                      }`} />
                      <div>
                        <p className="text-xs text-pulse-body">{a.message}</p>
                        <span className="text-[10px] text-pulse-meta mt-1 block">{a.timestamp}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-[#003D7A] flex items-center justify-center text-sm font-medium text-white">
            {demoUser.name.charAt(0)}
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm text-pulse-text font-medium">{demoUser.name}</div>
            <div className="text-xs text-pulse-meta">{demoUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
