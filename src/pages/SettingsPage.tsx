import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Sun, 
  Moon, 
  Thermometer, 
  Sliders, 
  Bell, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    toggleTheme, 
    showToast 
  } = useApp();

  const handleResetToBaseline = () => {
    localStorage.removeItem('bio_respira_rooms');
    localStorage.removeItem('bio_respira_schedules');
    localStorage.removeItem('bio_respira_alerts');
    localStorage.removeItem('bio_respira_settings');
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
          System Preferences
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
          Platform Configuration
        </h2>
        <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
          Customize telemetry sensitivity, unit conventions, simulation cadence, and hardware feedback
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Appearance & Units */}
        <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <h3 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />
            Display & Unit Standards
          </h3>

          <div className="space-y-4 text-xs">
            {/* Theme */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                  Interface Theme
                </span>
                <span className="text-neutral-400">
                  Select clean high-contrast light surfaces or calm deep-teal dark mode
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    settings.theme === 'light'
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    settings.theme === 'dark'
                      ? 'bg-[#121E1C] text-[#28B8C7] shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-[#28B8C7]" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Temperature Unit */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                  Temperature Format
                </span>
                <span className="text-neutral-400">
                  Unit for room climate sensors and outdoor thermal readings
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
                <button
                  onClick={() => updateSettings({ tempUnit: 'celsius' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    settings.tempUnit === 'celsius'
                      ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Celsius (°C)
                </button>
                <button
                  onClick={() => updateSettings({ tempUnit: 'fahrenheit' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    settings.tempUnit === 'fahrenheit'
                      ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Fahrenheit (°F)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence & Auto-Optimize */}
        <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <h3 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />
            Automation & Advisory Sensitivities
          </h3>

          <div className="space-y-4 text-xs">
            {/* Sensitivity */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                  Auto-Optimization Profile
                </span>
                <span className="text-neutral-400">
                  Governs how proactively purifier ramps fan speed in Auto mode
                </span>
              </div>
              <select
                value={settings.autoOptimizeSensitivity}
                onChange={e => updateSettings({ autoOptimizeSensitivity: e.target.value as any })}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3]"
              >
                <option value="eco">Eco Quiet (Favors lower noise)</option>
                <option value="balanced">Balanced (Nominal clean/noise)</option>
                <option value="aggressive">Aggressive (Rapid particle extraction)</option>
              </select>
            </div>

            {/* Alert threshold slider */}
            <div className="py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                    PM2.5 Warning Threshold
                  </span>
                  <span className="text-neutral-400">
                    Triggers a high particulate warning when sustained levels exceed:
                  </span>
                </div>
                <span className="font-bold text-[#0F5C5A] dark:text-[#28B8C7] text-sm tabular-numbers font-sans">
                  {settings.alertThresholdPm25} µg/m³
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={55}
                step={5}
                value={settings.alertThresholdPm25}
                onChange={e => updateSettings({ alertThresholdPm25: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Simulation Engine Controls */}
        <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <h3 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />
            Atmospheric Simulation Engine
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                  Simulation Refresh Rate
                </span>
                <span className="text-neutral-400">
                  Controls the step frequency of environmental sensor drift
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
                <button
                  onClick={() => updateSettings({ simulationSpeed: 'realtime' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    settings.simulationSpeed === 'realtime'
                      ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Standard (3.5s)
                </button>
                <button
                  onClick={() => updateSettings({ simulationSpeed: 'accelerated' })}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    settings.simulationSpeed === 'accelerated'
                      ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Fast (2.0s)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Chimes & LED */}
        <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <h3 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />
            Physical Device Feedback
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
              <div>
                <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3] block">
                  Acoustic Confirmation Chime
                </span>
                <span className="text-neutral-400">
                  Emit gentle confirmation tone when changing modes or fan levels
                </span>
              </div>
              <button
                onClick={() => updateSettings({ chimeSound: !settings.chimeSound })}
                className={`px-3 py-1.5 rounded-xl font-semibold border transition-colors cursor-pointer ${
                  settings.chimeSound
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-neutral-200'
                }`}
              >
                {settings.chimeSound ? 'Audible Chime ON' : 'Muted'}
              </button>
            </div>
          </div>
        </div>

        {/* Reset State */}
        <div className="p-6 rounded-2xl border border-red-200 dark:border-red-950/40 bg-red-50/20 dark:bg-red-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-red-700 dark:text-red-400">
              Reset Prototype Baseline State
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Restores initial demo room sensors, filters, schedules, and alerts to Section 35 specifications.
            </p>
          </div>

          <button
            onClick={handleResetToBaseline}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Baseline</span>
          </button>
        </div>
      </div>
    </div>
  );
};
