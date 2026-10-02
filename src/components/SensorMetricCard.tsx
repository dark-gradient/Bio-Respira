import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorMetricCardProps {
  name: string;
  subName?: string;
  value: number | string;
  unit: string;
  status: string;
  statusColor: 'green' | 'amber' | 'red' | 'blue' | 'teal';
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'flat';
  referenceTarget?: string;
}

export const SensorMetricCard: React.FC<SensorMetricCardProps> = ({
  name,
  subName,
  value,
  unit,
  status,
  statusColor,
  icon: Icon,
  trend = 'flat',
  referenceTarget
}) => {
  const colorMap = {
    green: {
      bg: 'bg-[#2E9D68]/10 text-[#2E9D68] border-[#2E9D68]/20',
      dot: 'bg-[#2E9D68]',
      badge: 'text-[#2E9D68] bg-[#2E9D68]/10'
    },
    amber: {
      bg: 'bg-[#D6A441]/10 text-[#D6A441] border-[#D6A441]/20',
      dot: 'bg-[#D6A441]',
      badge: 'text-[#D6A441] bg-[#D6A441]/10'
    },
    red: {
      bg: 'bg-[#D84B4B]/10 text-[#D84B4B] border-[#D84B4B]/20',
      dot: 'bg-[#D84B4B]',
      badge: 'text-[#D84B4B] bg-[#D84B4B]/10'
    },
    blue: {
      bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      dot: 'bg-sky-500',
      badge: 'text-sky-600 dark:text-sky-400 bg-sky-500/10'
    },
    teal: {
      bg: 'bg-[#0F5C5A]/10 text-[#0F5C5A] dark:text-[#28B8C7] border-[#0F5C5A]/20',
      dot: 'bg-[#0F5C5A] dark:bg-[#28B8C7]',
      badge: 'text-[#0F5C5A] dark:text-[#28B8C7] bg-[#0F5C5A]/10 dark:bg-[#28B8C7]/10'
    }
  };

  const currentTheme = colorMap[statusColor] || colorMap.green;

  return (
    <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-3.5 sm:p-4 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-[#2A4440] transition-all min-w-0 overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-1.5 mb-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-50 dark:bg-[#182826] border border-neutral-200/60 dark:border-[#1F3330] flex items-center justify-center text-neutral-600 dark:text-[#96A8A5] shrink-0">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-neutral-800 dark:text-[#EDF4F3] block leading-tight truncate">
              {name}
            </span>
            {subName && (
              <span className="text-[10px] text-neutral-400 dark:text-[#96A8A5] block truncate">
                {subName}
              </span>
            )}
          </div>
        </div>

        {/* Status tag */}
        <span className={`text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 truncate max-w-[70px] ${currentTheme.badge}`}>
          {status}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="my-2 flex items-baseline justify-between gap-1 min-w-0">
        <div className="flex items-baseline gap-1 min-w-0">
          <span className="text-xl sm:text-2xl font-extrabold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans tracking-tight truncate">
            {value}
          </span>
          <span className="text-xs font-medium text-neutral-400 dark:text-[#96A8A5] shrink-0">
            {unit}
          </span>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center gap-1 text-[11px] text-neutral-400 shrink-0">
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-[#2E9D68]" />}
          {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-[#D97745]" />}
          {trend === 'flat' && <Minus className="w-3.5 h-3.5 text-neutral-400" />}
        </div>
      </div>

      {/* Reference baseline */}
      {referenceTarget && (
        <div className="pt-2 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-between text-[10px] text-neutral-400 dark:text-[#96A8A5] min-w-0 gap-1">
          <span className="shrink-0">Target</span>
          <span className="font-semibold text-neutral-600 dark:text-[#EDF4F3] truncate text-right">
            {referenceTarget}
          </span>
        </div>
      )}
    </div>
  );
};
