import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { NotificationDrawer } from './components/NotificationDrawer';
import { FilterDetailModal } from './components/FilterDetailModal';
import { OverviewPage } from './pages/OverviewPage';
import { DevicesPage } from './pages/DevicesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SchedulesPage } from './pages/SchedulesPage';
import { FiltersPage } from './pages/FiltersPage';
import { AlertsPage } from './pages/AlertsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ShieldCheck, Wind } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA] dark:bg-[#0B1312] text-[#172321] dark:text-[#EDF4F3] transition-colors duration-300">
      {/* Top Application Header */}
      <Header />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312] px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Wind className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && <OverviewPage />}
        {activeTab === 'devices' && <DevicesPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'schedules' && <SchedulesPage />}
        {activeTab === 'filters' && <FiltersPage />}
        {activeTab === 'alerts' && <AlertsPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      {/* Slide-over Drawers & Modals */}
      <NotificationDrawer />
      <FilterDetailModal />

      {/* Quiet Clean Footer */}
      <footer className="border-t border-[#DCE7E5] dark:border-[#1F3330] py-6 bg-white/50 dark:bg-[#0B1312]/50 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-600 dark:text-neutral-300">Bio Respira</span>
            <span>·</span>
            <span>Smart Indoor Atmospheric Intelligence</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              HEPA H13 True Filtration Certified
            </span>
            <span>·</span>
            <span className="text-[11px]">Local Prototype Environment</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
