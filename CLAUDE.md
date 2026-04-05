# Exotica x Maurilait — Price Pulse

Price monitoring & brand intelligence platform for Maurilait Mauritius, built by Exotica Agency.

## Quick Start

```bash
cd apps/tracker
npm install
npm run dev    # http://localhost:5176
```

## Tech Stack

- React 18 + TypeScript (strict)
- Vite 6 (port 5176)
- Tailwind CSS 3 (custom Maurilait theme)
- Recharts 2 (all charts)
- Framer Motion 11 (animations)
- Zustand 5 (filter state)
- React Router DOM 6

## Project Structure

```
apps/tracker/src/
  types/          TypeScript interfaces
  data/           Mock data (brands, products, regions, outlets, prices, competitors)
  store/          Zustand stores
  hooks/          useCountUp
  assets/         ExoticaLogo, ExoticaFooter
  components/
    layout/       AppShell, Sidebar, TopNav
    charts/       PriceTrendChart, CompetitorPriceRadar, RegionalPriceHeatmap, OutletPriceBar
    modules/      PriceAlertsFeed
    ui/           PulseKpiCard
  pages/          8 pages (Dashboard, BrandPrice, Regional, Outlet, Competitor, FieldEntry, Reports, Settings)
```

## Client Context

**Maurilait** is parent company of: Yoplait (yoghurt), Candia (UHT milk), J (juice), Candia Crème (cream).

Price monitoring tracks ~16 products across 12 districts, 5 outlet types, with 6 months of demo data (Nov 2025 - Apr 2026). Prices in MUR (Mauritian Rupee).

## Design Tokens

- Primary: #0068B8 (Maurilait blue)
- Sidebar: #003D7A (navy)
- Yoplait: #E30613, Candia: #0068B8, J: #F7A823, Crème: #8B4513
- Fonts: DM Serif Display (headings), DM Sans (body), JetBrains Mono (data)
