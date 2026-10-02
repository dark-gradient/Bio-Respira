import React, { useState } from 'react';
import { HistoricalDataPoint } from '../types';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { ArrowDownRight, Sparkles, Clock, CheckCircle } from 'lucide-react';

interface AirQualityChartProps {
  history24h: HistoricalDataPoint[];
  history7d: HistoricalDataPoint[];
  history30d: HistoricalDataPoint[];
  isDark?: boolean;
}

export const AirQualityChart: React.FC<AirQualityChartProps> = ({
  history24h,
  history7d,
  history30d,
  isDark = false
}) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const activeData = {
    '24h': history24h,
    '7d': history7d,
    '30d': history30d,
  }[timeRange];

  // Calculate statistics from active data
  const indoorVals = activeData.map(d => d.indoorAqi);
  const avgIndoor = Math.round(indoorVals.reduce((a, b) => a + b, 0) / indoorVals.length);
  const bestIndoor = Math.min(...indoorVals);
  const excellentPct = Math.round((indoorVals.filter(v => v <= 25).length / indoorVals.length) * 100);

  const outdoorVals = activeData.map(d => d.outdoorAqi);
  const avgOutdoor = Math.round(outdoorVals.reduce((a, b) => a + b, 0) / outdoorVals.length);
  const purificationDelta = Math.round(((avgOutdoor - avgIndoor) / avgOutdoor) * 100);

  return (
    <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-5 md:p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-[#1F3330]/60">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Performance Verification
          </span>
          <h3 className="text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
            Indoor AQI vs Outdoor Ambient
          </h3>
        </div>

        {/* 24H, 7D, 30D Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330] self-start sm:self-auto">
          {(['24h', '7d', '30d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Viewport */}
      <div className="h-[260px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="indoorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#28B8C7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0F5C5A" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="outdoorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D6A441" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#D6A441" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={isDark ? '#1F3330' : '#EDF2F1'} 
            />
            <XAxis 
              dataKey="time" 
              stroke={isDark ? '#647573' : '#8F9D9B'} 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke={isDark ? '#647573' : '#8F9D9B'} 
              fontSize={11} 
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax + 15']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#182826' : '#FFFFFF',
                borderColor: isDark ? '#2A4440' : '#DCE7E5',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
              formatter={(value: any, name: any) => {
                const label = name === 'indoorAqi' ? 'Indoor AQI' : 'Outdoor Ambient';
                return [`${value} AQI`, label];
              }}
            />
            <Area
              type="monotone"
              dataKey="outdoorAqi"
              stroke="#D6A441"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#outdoorGradient)"
              name="outdoorAqi"
            />
            <Area
              type="monotone"
              dataKey="indoorAqi"
              stroke="#0F5C5A"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#indoorGradient)"
              name="indoorAqi"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Series Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0F5C5A] dark:bg-[#28B8C7]" />
          <span className="font-semibold text-neutral-700 dark:text-[#EDF4F3]">Indoor Protected Air</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-[#D6A441]" />
          <span className="text-neutral-500 dark:text-[#96A8A5]">Outdoor City Air</span>
        </div>
      </div>

      {/* Statistical Verification Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-100 dark:border-[#1F3330]/60">
        <div className="bg-neutral-50 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
          <span className="text-[11px] text-neutral-400 block mb-0.5">Average AQI</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
              {avgIndoor}
            </span>
            <span className="text-[10px] text-[#2E9D68] font-semibold">Healthy</span>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
          <span className="text-[11px] text-neutral-400 block mb-0.5">Best Recorded</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#2E9D68] tabular-numbers font-sans">
              {bestIndoor}
            </span>
            <span className="text-[10px] text-neutral-400">AQI</span>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
          <span className="text-[11px] text-neutral-400 block mb-0.5">Time in Excellent</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#0F5C5A] dark:text-[#28B8C7] tabular-numbers font-sans">
              {excellentPct}%
            </span>
            <span className="text-[10px] text-neutral-400">of period</span>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-[#182826] p-2.5 rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
          <span className="text-[11px] text-neutral-400 block mb-0.5">Purifier Protection</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#2E9D68] tabular-numbers font-sans">
              +{purificationDelta}%
            </span>
            <span className="text-[10px] text-neutral-400">vs Outside</span>
          </div>
        </div>
      </div>
    </div>
  );
};
