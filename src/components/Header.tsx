import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DeviceSelector } from './DeviceSelector';
import { 
  Bell, 
  Sun, 
  Moon, 
  Activity, 
  Play, 
  Pause, 
  Flame, 
  Wind, 
  CheckCircle, 
  Sliders, 
  Menu, 
  X,
  Compass,
  Laptop2,
  BarChart3,
  CalendarDays,
  Layers,
  Settings
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    settings, 
    toggleTheme, 
    isSimulating, 
    toggleSimulation, 
    triggerScenario,
    simulationScenario,
    unreadAlertCount,
    setNotificationDrawerOpen
  } = useApp();

  const [simMenuOpen, setSimMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const simMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (simMenuRef.current && !simMenuRef.current.contains(e.target as Node)) {
        setSimMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'devices', label: 'Devices', icon: Laptop2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'schedules', label: 'Schedules', icon: CalendarDays },
    { id: 'filters', label: 'Filters', icon: Layers },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B1312]/90 backdrop-blur-md border-b border-[#DCE7E5] dark:border-[#1F3330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Brand & Room Selector */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Logo Wordmark */}
            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F5C5A] to-[#28B8C7] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-2.38 1.05-4.52 2.72-6L12 12l5.28-6C18.95 7.48 20 9.62 20 12c0 4.41-3.59 8-8 8z" />
                </svg>
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-[#172321] dark:text-[#EDF4F3] font-sans">
                  Bio Respira
                </span>
                <span className="hidden lg:block text-[10px] text-neutral-400 dark:text-[#96A8A5] font-medium leading-none">
                  Smart Air Platform
                </span>
              </div>
            </button>

            {/* Room / Device Selector dropdown */}
            <div className="hidden sm:block">
              <DeviceSelector />
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-[#0F5C5A] dark:text-[#28B8C7] bg-[#0F5C5A]/8 dark:bg-[#28B8C7]/15'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-[#EDF4F3]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'alerts' && unreadAlertCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#D84B4B] text-white">
                      {unreadAlertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Simulation scenario, Live status, Theme, Notifications) */}
          <div className="flex items-center gap-2">
            {/* Live Telemetry Indicator & Simulation Menu */}
            <div className="relative" ref={simMenuRef}>
              <button
                onClick={() => setSimMenuOpen(!simMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isSimulating 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
                }`}
                title="Simulation state & scenarios"
              >
                <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
                <span className="hidden sm:inline">{isSimulating ? 'LIVE' : 'PAUSED'}</span>
                <Sliders className="w-3 h-3 ml-0.5 opacity-60" />
              </button>

              {/* Simulation Scenarios Dropdown */}
              {simMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#121E1C] border border-[#DCE7E5] dark:border-[#1F3330] rounded-xl shadow-xl z-50 p-2 text-xs">
                  <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-neutral-100 dark:border-[#1F3330]/60">
                    <span className="font-bold text-neutral-400 text-[10px] uppercase tracking-wider">
                      Simulation Engine
                    </span>
                    <button
                      onClick={toggleSimulation}
                      className="text-[11px] font-semibold text-[#0F5C5A] dark:text-[#28B8C7] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isSimulating ? 'Pause' : 'Resume'}</span>
                    </button>
                  </div>

                  <div className="px-2 py-1 text-[11px] text-neutral-400 mb-1">
                    Inject realistic environmental conditions:
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        triggerScenario('normal');
                        setSimMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center gap-2 cursor-pointer transition-colors ${
                        simulationScenario === 'normal' 
                          ? 'bg-neutral-100 dark:bg-[#182826] font-semibold text-[#0F5C5A] dark:text-[#28B8C7]' 
                          : 'hover:bg-neutral-50 dark:hover:bg-[#182826] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <div>
                        <span className="block font-medium">Clean Air Baseline</span>
                        <span className="text-[10px] text-neutral-400">AQI 18 · PM2.5 7 µg/m³</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        triggerScenario('cooking');
                        setSimMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center gap-2 cursor-pointer transition-colors ${
                        simulationScenario === 'cooking' 
                          ? 'bg-neutral-100 dark:bg-[#182826] font-semibold text-[#0F5C5A] dark:text-[#28B8C7]' 
                          : 'hover:bg-neutral-50 dark:hover:bg-[#182826] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <div>
                        <span className="block font-medium">Cooking Event (PM2.5 Spike)</span>
                        <span className="text-[10px] text-neutral-400">Simulates dinner cooking odors & fumes</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        triggerScenario('window-open');
                        setSimMenuOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center gap-2 cursor-pointer transition-colors ${
                        simulationScenario === 'window-open' 
                          ? 'bg-neutral-100 dark:bg-[#182826] font-semibold text-[#0F5C5A] dark:text-[#28B8C7]' 
                          : 'hover:bg-neutral-50 dark:hover:bg-[#182826] text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <div>
                        <span className="block font-medium">Window Opened (Outdoor Air)</span>
                        <span className="text-[10px] text-neutral-400">Fresh air exchange with coarse dust</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              aria-label="Open notifications"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#182826] relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D84B4B] ring-2 ring-white dark:ring-[#0B1312]" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors cursor-pointer"
            >
              {settings.theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#182826]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-neutral-100 dark:border-[#1F3330] space-y-2">
            <div className="pb-2">
              <DeviceSelector />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                    activeTab === item.id 
                      ? 'bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#28B8C7]' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-[#182826]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
