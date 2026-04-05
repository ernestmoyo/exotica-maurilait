import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BRAND_MAP } from '@/data/brands';
import { getProductsByBrand } from '@/data/products';
import { MONTHS, PRICE_DATA, getAvgPriceByBrandAndMonth, COMPETITOR_PRICES } from '@/data/prices';
import { REGIONS } from '@/data/regions';
import { OUTLET_TYPES } from '@/data/outlets';
import { getCompetitorsByBrand } from '@/data/competitors';

const TABS = ['Overview', 'Product Breakdown', 'Regional Spread', 'Outlet Analysis', 'Competitor Comparison'];

export default function BrandPricePage() {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const [activeTab, setActiveTab] = useState(0);

  const brand = BRAND_MAP[brandSlug ?? ''];
  if (!brand) {
    return <div className="text-pulse-body p-8">Brand not found.</div>;
  }

  const products = getProductsByBrand(brand.id);
  const competitors = getCompetitorsByBrand(brand.id);
  const brandColor = brand.color;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brandColor }} />
          <h1 className="text-2xl font-display text-pulse-text">{brand.name}</h1>
          <span className="text-sm text-pulse-meta bg-pulse-card-light px-3 py-1 rounded-full font-mono">{brand.category}</span>
        </div>
        <p className="text-sm text-pulse-meta mt-1">{products.length} products tracked across {REGIONS.length} districts</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === i
                ? 'text-white'
                : 'glass-card text-pulse-body hover:border-[#CBD5E1]'
            }`}
            style={activeTab === i ? { backgroundColor: brandColor } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 0 && <OverviewTab brand={brand} products={products} brandColor={brandColor} />}
        {activeTab === 1 && <ProductBreakdownTab brand={brand} products={products} brandColor={brandColor} />}
        {activeTab === 2 && <RegionalSpreadTab brand={brand} products={products} brandColor={brandColor} />}
        {activeTab === 3 && <OutletAnalysisTab brand={brand} products={products} brandColor={brandColor} />}
        {activeTab === 4 && <CompetitorTab brand={brand} competitors={competitors} brandColor={brandColor} />}
      </motion.div>
    </div>
  );
}

function OverviewTab({ brand, products, brandColor }: { brand: any; products: any[]; brandColor: string }) {
  const trendData = MONTHS.map((m) => ({
    month: m.replace('-20', "'"),
    avg: getAvgPriceByBrandAndMonth(brand.id, m),
  }));

  const latestMonth = MONTHS[MONTHS.length - 1];
  const prevMonth = MONTHS[MONTHS.length - 2];
  const latest = getAvgPriceByBrandAndMonth(brand.id, latestMonth);
  const prev = getAvgPriceByBrandAndMonth(brand.id, prevMonth);
  const change = ((latest - prev) / prev) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6">
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Price Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={brandColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={brandColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} formatter={(v: number) => [`Rs ${v.toFixed(0)}`, 'Avg Price']} />
              <Area type="monotone" dataKey="avg" stroke={brandColor} fill="url(#brandGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-pulse-body">Avg Price</span>
            <span className="font-mono font-bold text-pulse-text">Rs {latest.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-pulse-body">MoM Change</span>
            <span className={`font-mono font-bold ${change > 0 ? 'text-pulse-danger' : 'text-pulse-success'}`}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-pulse-body">Products</span>
            <span className="font-mono font-bold text-pulse-text">{products.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-pulse-body">Category</span>
            <span className="font-mono text-pulse-text">{brand.category}</span>
          </div>
        </div>
        <div className="cyan-line my-4" />
        <h4 className="text-xs font-mono text-pulse-meta uppercase tracking-wider">Products</h4>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-xs">
              <span className="text-pulse-body">{p.variant}</span>
              <span className="font-mono text-pulse-meta">{p.format}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductBreakdownTab({ brand, products, brandColor }: { brand: any; products: any[]; brandColor: string }) {
  const latestMonth = MONTHS[MONTHS.length - 1];

  const productPrices = products.map((p) => {
    const entries = PRICE_DATA.filter((d) => d.productId === p.id && d.month === latestMonth);
    const avg = entries.length > 0 ? entries.reduce((s, d) => s + d.price, 0) / entries.length : 0;
    return { name: `${p.variant} ${p.format}`, avg: Math.round(avg * 100) / 100 };
  });

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Product Price Comparison</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productPrices} layout="vertical" margin={{ left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#334155', fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} width={120} />
            <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} formatter={(v: number) => [`Rs ${v.toFixed(0)}`, 'Avg Price']} />
            <Bar dataKey="avg" fill={brandColor} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RegionalSpreadTab({ brand, products, brandColor }: { brand: any; products: any[]; brandColor: string }) {
  const latestMonth = MONTHS[MONTHS.length - 1];
  const productIds = products.map((p) => p.id);

  const regionalData = REGIONS.map((r) => {
    const entries = PRICE_DATA.filter((d) => productIds.includes(d.productId) && d.regionId === r.id && d.month === latestMonth);
    const avg = entries.length > 0 ? entries.reduce((s, d) => s + d.price, 0) / entries.length : 0;
    return { region: r.name, avg: Math.round(avg * 100) / 100 };
  });

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Price by District</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionalData} margin={{ bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="region" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'DM Sans' }} angle={-45} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} unit=" Rs" />
            <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} formatter={(v: number) => [`Rs ${v.toFixed(0)}`, 'Avg Price']} />
            <Bar dataKey="avg" fill={brandColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function OutletAnalysisTab({ brand, products, brandColor }: { brand: any; products: any[]; brandColor: string }) {
  const latestMonth = MONTHS[MONTHS.length - 1];
  const productIds = products.map((p) => p.id);

  const outletData = OUTLET_TYPES.map((ot) => {
    const entries = PRICE_DATA.filter((d) => productIds.includes(d.productId) && d.outletType === ot.id && d.month === latestMonth);
    const avg = entries.length > 0 ? entries.reduce((s, d) => s + d.price, 0) / entries.length : 0;
    return { name: ot.label, value: Math.round(avg * 100) / 100 };
  });

  const COLORS = ['#0068B8', '#2E9E6B', '#E85D75', '#F7A823', '#8B4513'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Price Distribution by Outlet</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={outletData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: Rs ${value}`}>
                {outletData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-6">
        <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Outlet Price Table</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pulse-border">
              <th className="text-left py-2 text-pulse-meta font-mono text-xs uppercase">Outlet Type</th>
              <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">Avg Price</th>
              <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">vs Supermarket</th>
            </tr>
          </thead>
          <tbody>
            {outletData.map((row) => {
              const superPrice = outletData.find((o) => o.name === 'Supermarket')?.value ?? 1;
              const diff = ((row.value - superPrice) / superPrice) * 100;
              return (
                <tr key={row.name} className="border-b border-pulse-border/50">
                  <td className="py-2.5 text-pulse-body">{row.name}</td>
                  <td className="py-2.5 text-right font-mono text-pulse-text">Rs {row.value.toFixed(0)}</td>
                  <td className={`py-2.5 text-right font-mono ${diff > 0 ? 'text-pulse-danger' : diff < 0 ? 'text-pulse-success' : 'text-pulse-meta'}`}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompetitorTab({ brand, competitors, brandColor }: { brand: any; competitors: any[]; brandColor: string }) {
  const latestMonth = MONTHS[MONTHS.length - 1];
  const brandAvg = getAvgPriceByBrandAndMonth(brand.id, latestMonth);

  const compData = competitors.map((c) => {
    const priceEntry = COMPETITOR_PRICES.find((cp) => cp.competitorId === c.id && cp.month === latestMonth);
    const price = priceEntry?.price ?? 0;
    const gap = brandAvg > 0 ? ((price - brandAvg) / brandAvg) * 100 : 0;
    return { name: c.name, brand: c.brand, price, gap };
  });

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-mono text-pulse-meta uppercase tracking-wider mb-4">Competitor Price Comparison</h3>
      <div className="mb-4 p-3 bg-pulse-card-light rounded-lg">
        <span className="text-xs text-pulse-meta font-mono">
          {brand.name} avg price: <strong className="text-pulse-text">Rs {brandAvg.toFixed(0)}</strong>
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-pulse-border">
            <th className="text-left py-2 text-pulse-meta font-mono text-xs uppercase">Competitor</th>
            <th className="text-left py-2 text-pulse-meta font-mono text-xs uppercase">Brand</th>
            <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">Price (MUR)</th>
            <th className="text-right py-2 text-pulse-meta font-mono text-xs uppercase">vs {brand.name}</th>
          </tr>
        </thead>
        <tbody>
          {compData.map((row) => (
            <tr key={row.name} className="border-b border-pulse-border/50">
              <td className="py-2.5 text-pulse-body">{row.name}</td>
              <td className="py-2.5 text-pulse-meta">{row.brand}</td>
              <td className="py-2.5 text-right font-mono text-pulse-text">Rs {row.price.toFixed(0)}</td>
              <td className={`py-2.5 text-right font-mono font-medium ${row.gap > 0 ? 'text-pulse-success' : 'text-pulse-danger'}`}>
                {row.gap > 0 ? '+' : ''}{row.gap.toFixed(1)}%
                <span className="text-[10px] text-pulse-meta ml-1">
                  {row.gap > 0 ? '(higher)' : '(lower)'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
