import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ExoticaFooter from '@/assets/ExoticaFooter';
import { BRANDS } from '@/data/brands';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const mainNavItems = [
  { path: '/dashboard', label: 'Pricing Audit Centre', icon: GridIcon },
];

const bottomNavItems = [
  { path: '/regions', label: 'Regional Analysis', icon: MapIcon },
  { path: '/outlets', label: 'Outlet Analysis', icon: StoreIcon },
  { path: '/competitors', label: 'Competitor Radar', icon: RadarIcon },
  { path: '/field-entry', label: 'Field Data Entry', icon: ClipboardIcon },
  { path: '/reports', label: 'Price Reports', icon: FileIcon },
  { path: '/settings', label: 'Settings', icon: GearIcon },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [brandsExpanded, setBrandsExpanded] = useState(true);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <motion.aside
      className="h-screen flex flex-col flex-shrink-0 overflow-hidden bg-[#003D7A]"
      style={{ width: collapsed ? 72 : 260 }}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[rgba(255,255,255,0.08)]">
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-sm font-bold text-white">M</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-display text-white tracking-tight">PRICE</span>
                <span className="text-xs font-mono text-[#CBD5E1] tracking-widest">PULSE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {/* Command Center */}
        {mainNavItems.map((item) => (
          <SidebarLink key={item.path} item={item} isActive={isActive(item.path)} collapsed={collapsed} />
        ))}

        {/* Brand Prices section */}
        {!collapsed && (
          <button
            onClick={() => setBrandsExpanded(!brandsExpanded)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-[#CBD5E1] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
          >
            <TagIcon className="w-5 h-5 flex-shrink-0 text-[#94A3B8]" />
            <span className="flex-1 text-left whitespace-nowrap">Brand Prices</span>
            <svg className={`w-4 h-4 transition-transform ${brandsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
        {collapsed && (
          <SidebarLink
            item={{ path: '/brands/yoplait', label: 'Brands', icon: TagIcon }}
            isActive={location.pathname.startsWith('/brands')}
            collapsed={collapsed}
          />
        )}

        <AnimatePresence>
          {brandsExpanded && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-4"
            >
              {BRANDS.map((brand) => {
                const brandPath = `/brands/${brand.slug}`;
                const active = location.pathname === brandPath;
                return (
                  <NavLink
                    key={brand.id}
                    to={brandPath}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      active
                        ? 'bg-[rgba(255,255,255,0.08)] text-white'
                        : 'text-[#CBD5E1] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: brand.color }} />
                    <span className="whitespace-nowrap">{brand.name}</span>
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Remaining nav items */}
        {bottomNavItems.map((item) => (
          <SidebarLink key={item.path} item={item} isActive={isActive(item.path)} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[rgba(255,255,255,0.08)] p-3">
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-full flex items-center justify-center p-2 rounded-lg text-[#94A3B8] hover:text-[#CBD5E1] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          <svg className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <ExoticaFooter />
        </div>
      )}
    </motion.aside>
  );
}

function SidebarLink({ item, isActive: active, collapsed }: { item: { path: string; label: string; icon: React.FC<{ className?: string }> }; isActive: boolean; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${
        active
          ? 'bg-[rgba(255,255,255,0.08)] text-white'
          : 'text-[#CBD5E1] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
      }`}
    >
      {active && (
        <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[#0068B8]" />
      )}
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-[#94A3B8] group-hover:text-[#CBD5E1]'}`} />
      <AnimatePresence>
        {!collapsed && (
          <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
}

// Icons
function GridIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}

function TagIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function MapIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function StoreIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  );
}

function RadarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l6-6 4 4 8-8m0 0h-6m6 0v6" />
    </svg>
  );
}

function ClipboardIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function FileIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function GearIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
