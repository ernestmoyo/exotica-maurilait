import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '@/data/brands';
import { MONTHS } from '@/data/prices';
import { REGIONS } from '@/data/regions';

const REPORT_SECTIONS = [
  { id: 'exec', label: 'Executive Summary', default: true },
  { id: 'overview', label: 'Price Overview', default: true },
  { id: 'brand', label: 'Brand Analysis', default: true },
  { id: 'regional', label: 'Regional Breakdown', default: true },
  { id: 'competitor', label: 'Competitor Analysis', default: true },
  { id: 'outlet', label: 'Outlet Performance', default: true },
  { id: 'trends', label: 'Trend Analysis', default: false },
  { id: 'anomalies', label: 'Price Anomalies', default: false },
  { id: 'recommendations', label: 'Recommendations', default: false },
];

export default function PriceReportPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(BRANDS.map((b) => b.id));
  const [fromMonth, setFromMonth] = useState(MONTHS[0]);
  const [toMonth, setToMonth] = useState(MONTHS[MONTHS.length - 1]);
  const [format, setFormat] = useState<'pdf' | 'excel' | 'both'>('pdf');
  const [sections, setSections] = useState<Record<string, boolean>>(
    Object.fromEntries(REPORT_SECTIONS.map((s) => [s.id, s.default])),
  );

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  const toggleSection = (id: string) => {
    setSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectClass = "text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body focus:border-pulse-cyan focus:outline-none";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Price Reports</h1>
        <p className="text-sm text-pulse-meta mt-1">Configure and generate branded price intelligence reports</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Panel */}
        <motion.div className="lg:col-span-2 glass-card p-6 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {/* Brands */}
          <div>
            <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-3">Brands</h3>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => toggleBrand(b.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    selectedBrands.includes(b.id)
                      ? 'text-white border-transparent'
                      : 'text-pulse-body border-pulse-border bg-white'
                  }`}
                  style={selectedBrands.includes(b.id) ? { backgroundColor: b.color } : {}}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-pulse-meta mb-1 block">From</label>
                <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)} className={`${selectClass} w-full`}>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-pulse-meta mb-1 block">To</label>
                <select value={toMonth} onChange={(e) => setToMonth(e.target.value)} className={`${selectClass} w-full`}>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-3">Report Sections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REPORT_SECTIONS.map((s) => (
                <label key={s.id} className="flex items-center gap-2 text-sm text-pulse-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sections[s.id]}
                    onChange={() => toggleSection(s.id)}
                    className="w-4 h-4 rounded border-pulse-border text-pulse-cyan focus:ring-pulse-cyan"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-3">Output Format</h3>
            <div className="flex gap-3">
              {(['pdf', 'excel', 'both'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    format === f
                      ? 'bg-[#0068B8] text-white border-[#0068B8]'
                      : 'text-pulse-body border-pulse-border bg-white hover:border-[#CBD5E1]'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3 rounded-lg bg-[#0068B8] text-white font-medium text-sm hover:bg-[#005a9e] transition-colors">
            Generate Report
          </button>
        </motion.div>

        {/* Preview */}
        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Preview</h3>
          <div className="aspect-[3/4] bg-pulse-card-light rounded-lg border border-pulse-border flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-lg bg-[#003D7A] flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <p className="text-lg font-display text-pulse-text text-center">Maurilait Price Intelligence</p>
            <p className="text-sm text-pulse-meta text-center mt-1">{fromMonth} — {toMonth}</p>
            <div className="cyan-line w-full my-4" />
            <div className="text-xs text-pulse-meta space-y-1 text-center">
              <p>{selectedBrands.length} brands selected</p>
              <p>{Object.values(sections).filter(Boolean).length} sections</p>
              <p>{format.toUpperCase()} format</p>
            </div>
            <div className="mt-auto pt-6 text-[10px] text-pulse-meta opacity-60 text-center">
              Powered by Exotica Agency
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
