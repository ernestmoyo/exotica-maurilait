import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import PriceDashboardPage from '@/pages/PriceDashboardPage';
import BrandPricePage from '@/pages/BrandPricePage';
import RegionalPricePage from '@/pages/RegionalPricePage';
import OutletAnalysisPage from '@/pages/OutletAnalysisPage';
import CompetitorPricePage from '@/pages/CompetitorPricePage';
import FieldEntryPage from '@/pages/FieldEntryPage';
import PriceReportPage from '@/pages/PriceReportPage';
import SettingsPage from '@/pages/SettingsPage';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<PriceDashboardPage />} />
          <Route path="/brands/:brandSlug" element={<BrandPricePage />} />
          <Route path="/regions" element={<RegionalPricePage />} />
          <Route path="/outlets" element={<OutletAnalysisPage />} />
          <Route path="/competitors" element={<CompetitorPricePage />} />
          <Route path="/field-entry" element={<FieldEntryPage />} />
          <Route path="/reports" element={<PriceReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
