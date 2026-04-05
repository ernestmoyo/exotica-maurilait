import { useState } from 'react';
import { motion } from 'framer-motion';

const TABS = ['Profile', 'Organization', 'Notifications'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-pulse-text">Settings</h1>
        <p className="text-sm text-pulse-meta mt-1">Manage your account and preferences</p>
      </motion.div>

      <div className="flex gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-[#0068B8] text-white'
                : 'glass-card text-pulse-body hover:border-[#CBD5E1]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 0 && <ProfileSection />}
        {activeTab === 1 && <OrgSection />}
        {activeTab === 2 && <NotificationsSection />}
      </motion.div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#003D7A] flex items-center justify-center text-2xl font-bold text-white">I</div>
        <div>
          <p className="font-medium text-pulse-text">Irfan Mooradun</p>
          <p className="text-sm text-pulse-meta">irfan@maurilait.mu</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Full Name</label>
          <input type="text" defaultValue="Irfan Mooradun" className="w-full text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body" />
        </div>
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Email</label>
          <input type="email" defaultValue="irfan@maurilait.mu" className="w-full text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body" />
        </div>
      </div>
      <button className="px-6 py-2.5 rounded-lg bg-[#0068B8] text-white text-sm font-medium hover:bg-[#005a9e] transition-colors">
        Save Changes
      </button>
    </div>
  );
}

function OrgSection() {
  return (
    <div className="glass-card p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Organization</label>
          <input type="text" defaultValue="Maurilait Mauritius" className="w-full text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body" />
        </div>
        <div>
          <label className="block text-xs font-mono text-pulse-meta uppercase tracking-wider mb-1.5">Website</label>
          <input type="url" defaultValue="https://maurilait.mu" className="w-full text-sm border border-pulse-border rounded-lg px-3 py-2.5 bg-white text-pulse-body" />
        </div>
      </div>
      <button className="px-6 py-2.5 rounded-lg bg-[#0068B8] text-white text-sm font-medium hover:bg-[#005a9e] transition-colors">
        Save Changes
      </button>
    </div>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    priceAlert: true,
    competitorChange: true,
    monthlyDigest: true,
    fieldSubmission: false,
  });

  return (
    <div className="glass-card p-6 space-y-4">
      {Object.entries(prefs).map(([key, val]) => (
        <label key={key} className="flex items-center justify-between py-2">
          <span className="text-sm text-pulse-body capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          <button
            onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))}
            className={`w-10 h-6 rounded-full transition-colors relative ${val ? 'bg-[#0068B8]' : 'bg-pulse-border'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${val ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </label>
      ))}
    </div>
  );
}
