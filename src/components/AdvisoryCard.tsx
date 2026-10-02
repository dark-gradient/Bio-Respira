import React from 'react';
import { EnvironmentalData, DeviceState, FilterInfo } from '../types';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface AdvisoryCardProps {
  environmental: EnvironmentalData;
  deviceState: DeviceState;
  filters: FilterInfo[];
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({
  environmental,
  deviceState,
  filters
}) => {
  const { autoOptimize, setMode, setActiveTab, setSelectedFilterModal, activeRoomId } = useApp();
  const { aqi, pm25 } = environmental;

  // Check filter degradation
  const degradingFilter = filters.find(f => f.healthPercentage <= 60);

  let badgeText = 'AIR INSIGHT';
  let title = 'Air quality is excellent';
  let description = 'Indoor particulate levels are currently low. Eco Mode can maintain air quality while reducing unnecessary airflow.';
  let buttonLabel = 'AUTO-OPTIMIZE';
  let buttonAction = () => autoOptimize();
  let Icon = CheckCircle2;
  let iconBg = 'bg-[#2E9D68]/15 text-[#2E9D68]';
  let borderStyle = 'border-neutral-200/80 dark:border-[#1F3330]';

  if (!deviceState.poweredOn) {
    badgeText = 'SYSTEM ADVISORY';
    title = 'Purifier is currently powered off';
    description = 'Indoor air circulation is dormant. Power on to maintain positive room air pressure and particle interception.';
    buttonLabel = 'POWER ON PURIFIER';
    buttonAction = () => autoOptimize();
    Icon = Sparkles;
    iconBg = 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500';
  } else if (pm25 >= 35 || aqi > 50) {
    badgeText = 'PURIFICATION NEEDED';
    title = 'PM2.5 levels are increasing';
    description = 'Elevated particulates detected. Activating Turbo cleaning will rapidly extract particles and normalize atmosphere.';
    buttonLabel = 'BOOST CLEANING';
    buttonAction = () => setMode('turbo');
    Icon = Zap;
    iconBg = 'bg-[#D97745]/15 text-[#D97745]';
    borderStyle = 'border-[#D97745]/40 bg-[#D97745]/5';
  } else if (degradingFilter) {
    badgeText = 'MAINTENANCE ADVISORY';
    title = `${degradingFilter.name} is at ${degradingFilter.healthPercentage}%`;
    description = `Replacement recommended within ~${degradingFilter.daysRemaining} days to preserve full adsorption capacity.`;
    buttonLabel = 'VIEW FILTER';
    buttonAction = () => {
      setSelectedFilterModal({ filter: degradingFilter, roomId: activeRoomId });
    };
    Icon = AlertTriangle;
    iconBg = 'bg-[#D6A441]/15 text-[#D6A441]';
  } else if (deviceState.mode === 'turbo') {
    badgeText = 'HIGH PERFORMANCE';
    title = 'Turbo cleaning active';
    description = 'Operating at maximum 420 m³/h capacity. Air particles are dropping rapidly.';
    buttonLabel = 'SWITCH TO AUTO';
    buttonAction = () => setMode('auto');
    Icon = RefreshCw;
    iconBg = 'bg-[#0F5C5A]/15 text-[#0F5C5A] dark:text-[#28B8C7]';
  }

  return (
    <div className={`rounded-2xl p-4 md:p-5 bg-white dark:bg-[#121E1C] border ${borderStyle} shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all`}>
      <div className="flex items-start gap-3.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold tracking-wider text-[#0F5C5A] dark:text-[#28B8C7] uppercase">
              {badgeText}
            </span>
          </div>
          <h4 className="text-sm md:text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
            {title}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-0.5 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
        <button
          onClick={buttonAction}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] dark:hover:bg-[#1fa3b1] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
