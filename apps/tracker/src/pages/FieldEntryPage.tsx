import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDS } from '@/data/brands';
import { getProductsByBrand } from '@/data/products';
import { REGIONS } from '@/data/regions';
import { OUTLET_TYPES } from '@/data/outlets';

export default function FieldEntryPage() {
  const [brandId, setBrandId] = useState('');
  const [productId, setProductId] = useState('');
  const [regionId, setRegionId] = useState('');
  const [outletType, setOutletType] = useState('');
  const [outletName, setOutletName] = useState('');
  const [price, setPrice] = useState('');
  const [isPromo, setIsPromo] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const products = brandId ? getProductsByBrand(brandId) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const selectClass = "w-full text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body focus:border-pulse-cyan focus:outline-none transition-colors";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Field Data Entry</h1>
        <p className="text-sm text-pulse-meta mt-1">Record price observations from the field</p>
      </motion.div>

      <motion.form
        className="glass-card p-6 space-y-5"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Brand */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Brand</label>
          <select value={brandId} onChange={(e) => { setBrandId(e.target.value); setProductId(''); }} className={selectClass} required>
            <option value="">Select brand...</option>
            {BRANDS.map((b) => (
              <option key={b.id} value={b.id}>{b.name} — {b.category}</option>
            ))}
          </select>
        </div>

        {/* Product */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Product</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className={selectClass} required disabled={!brandId}>
            <option value="">Select product...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.variant} — {p.format}</option>
            ))}
          </select>
        </div>

        {/* Region & Outlet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">District</label>
            <select value={regionId} onChange={(e) => setRegionId(e.target.value)} className={selectClass} required>
              <option value="">Select district...</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Outlet Type</label>
            <select value={outletType} onChange={(e) => setOutletType(e.target.value)} className={selectClass} required>
              <option value="">Select type...</option>
              {OUTLET_TYPES.map((ot) => (
                <option key={ot.id} value={ot.id}>{ot.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Outlet Name */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Outlet Name</label>
          <input
            type="text"
            value={outletName}
            onChange={(e) => setOutletName(e.target.value)}
            placeholder="e.g., Super U Flacq"
            className={selectClass}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Price (MUR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-pulse-meta font-mono">Rs</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className={`${selectClass} pl-10`}
              required
            />
          </div>
        </div>

        {/* Promotion */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="promo"
            checked={isPromo}
            onChange={(e) => setIsPromo(e.target.checked)}
            className="w-4 h-4 rounded border-pulse-border text-pulse-cyan focus:ring-pulse-cyan"
          />
          <label htmlFor="promo" className="text-sm text-pulse-body">Product is on promotion</label>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Photo</label>
          <div className="border-2 border-dashed border-pulse-border rounded-lg p-6 text-center hover:border-pulse-cyan transition-colors cursor-pointer">
            <svg className="w-8 h-8 mx-auto text-pulse-meta mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-pulse-meta">Tap to take photo or upload</p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any additional observations..."
            className={`${selectClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#0068B8] text-white font-medium text-sm hover:bg-[#005a9e] transition-colors"
        >
          Submit Price Entry
        </button>

        {submitted && (
          <motion.div
            className="p-4 bg-pulse-success/10 border border-pulse-success/20 rounded-lg text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-pulse-success font-medium">Price entry submitted successfully!</p>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
