import React from 'react';
import { AQIStatus } from '../types';
import { AQI_COLORS } from '../utils/airQuality';

interface StatusBadgeProps {
  status: AQIStatus | 'online' | 'offline' | 'active' | 'standby';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
  className = ''
}) => {
  const isAqiStatus = ['excellent', 'good', 'moderate', 'poor', 'critical'].includes(status);

  let label = status.toUpperCase();
  let colorStyles = 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700';
  let dotColor = 'bg-neutral-400';

  if (isAqiStatus) {
    const config = AQI_COLORS[status as AQIStatus];
    label = config.label;
    colorStyles = `${config.bgLight} ${config.text} ${config.borderLight}`;
    dotColor = config.text.replace('text-', 'bg-');
  } else if (status === 'online' || status === 'active') {
    label = status === 'online' ? 'Online' : 'Active';
    colorStyles = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
    dotColor = 'bg-emerald-500';
  } else if (status === 'offline' || status === 'standby') {
    label = status === 'offline' ? 'Offline' : 'Standby';
    colorStyles = 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700';
    dotColor = 'bg-neutral-400';
  }

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${sizeStyles} ${colorStyles} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor} ${status === 'online' || status === 'excellent' ? 'animate-pulse' : ''}`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
