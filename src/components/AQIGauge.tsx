import React from 'react';
import { EnvironmentalData } from '../types';
import { AQI_COLORS } from '../utils/airQuality';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface AQIGaugeProps {
  data: EnvironmentalData;
  roomName: string;
}

export const AQIGauge: React.FC<AQIGaugeProps> = ({ data, roomName }) => {
  const { aqi, status, pm25, pm10, trend } = data;
  const colorConfig = AQI_COLORS[status];

  // SVG Gauge calculations
  // Semi-circular arc from -135deg to 135deg (270 degrees total)
  const radius = 96;
  const strokeWidth = 14;
  const center = 120;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * (270 / 360); // 270 degree span
  
  // Calculate fill based on AQI (scale 0 to 150)
  const normalizedAQI = Math.min(150, Math.max(0, aqi));
  const fillPercentage = normalizedAQI / 150;
  const strokeDashoffset = arcLength * (1 - fillPercentage);

  return (
    <div className="relative bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm flex flex-col justify-between overflow-hidden">
      {/* Background ambient radial glow */}
      <div 
        className="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none opacity-20 dark:opacity-10 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: colorConfig.hex }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-[#1F3330]/60">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Indoor Atmosphere
          </span>
          <h3 className="text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
            Air Quality Index
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-[#96A8A5] bg-neutral-50 dark:bg-[#182826] px-2.5 py-1 rounded-full border border-neutral-200/80 dark:border-[#1F3330]">
          {trend === 'improving' && (
            <>
              <TrendingDown className="w-3.5 h-3.5 text-[#2E9D68]" />
              <span className="text-[#2E9D68] font-medium">Improving</span>
            </>
          )}
          {trend === 'stable' && (
            <>
              <Minus className="w-3.5 h-3.5 text-neutral-400" />
              <span>Stable</span>
            </>
          )}
          {trend === 'degrading' && (
            <>
              <TrendingUp className="w-3.5 h-3.5 text-[#D97745]" />
              <span className="text-[#D97745] font-medium">Elevating</span>
            </>
          )}
        </div>
      </div>

      {/* Circular Visualization */}
      <div className="relative flex flex-col items-center justify-center my-4 py-2">
        <div className="relative w-[240px] h-[210px] flex items-center justify-center">
          <svg className="w-full h-full transform rotate-135" viewBox="0 0 240 240">
            {/* Background Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeLinecap="round"
              className="text-neutral-100 dark:text-[#182826]"
            />
            {/* Dynamic Value Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={colorConfig.hex}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Info Cluster */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center pointer-events-none">
            <span 
              className="text-5xl md:text-6xl font-extrabold tracking-tight tabular-numbers transition-colors duration-500 font-sans"
              style={{ color: colorConfig.hex }}
            >
              {aqi}
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span 
                className="text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full border"
                style={{ 
                  backgroundColor: `${colorConfig.hex}15`, 
                  borderColor: `${colorConfig.hex}40`,
                  color: colorConfig.hex 
                }}
              >
                {colorConfig.label}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1.5 max-w-[150px] line-clamp-1">
              {colorConfig.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Particle Row */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60">
        <div className="bg-neutral-50/80 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-neutral-400 dark:text-[#96A8A5] block">PM2.5 Fine</span>
            <span className="text-base font-bold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
              {pm25}
            </span>
            <span className="text-[11px] text-neutral-400 ml-1">µg/m³</span>
          </div>
          <span className="text-[10px] font-semibold text-[#2E9D68] bg-[#2E9D68]/10 px-1.5 py-0.5 rounded">
            Target &lt;12
          </span>
        </div>

        <div className="bg-neutral-50/80 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-neutral-400 dark:text-[#96A8A5] block">PM10 Coarse</span>
            <span className="text-base font-bold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
              {pm10}
            </span>
            <span className="text-[11px] text-neutral-400 ml-1">µg/m³</span>
          </div>
          <span className="text-[10px] font-semibold text-[#2E9D68] bg-[#2E9D68]/10 px-1.5 py-0.5 rounded">
            Target &lt;25
          </span>
        </div>
      </div>
    </div>
  );
};
