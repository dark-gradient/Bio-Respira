import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Download, 
  Calendar, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  Gauge, 
  Wind, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import { formatTemp } from '../utils/airQuality';

export const AnalyticsPage: React.FC = () => {
  const { activeRoom, settings, showToast } = useApp();
  const { history24h, history7d, history30d, environmental } = activeRoom;
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<'aqi' | 'pm' | 'co2_tvoc' | 'climate'>('aqi');

  const isDark = settings.theme === 'dark';
  const activeData = { '24h': history24h, '7d': history7d, '30d': history30d }[timeRange];

  // Calculate statistics
  const indoorVals = activeData.map(d => d.indoorAqi);
  const avgIndoor = Math.round(indoorVals.reduce((a, b) => a + b, 0) / indoorVals.length);
  const bestIndoor = Math.min(...indoorVals);
  const excellentPct = Math.round((indoorVals.filter(v => v <= 25).length / indoorVals.length) * 100);

  const exportCSV = () => {
    const headers = ['Timestamp', 'Indoor AQI', 'Outdoor AQI', 'PM2.5 (ug/m3)', 'PM10 (ug/m3)', 'CO2 (ppm)', 'TVOC (ppb)', 'Temp (C)', 'Humidity (%)'];
    const rows = activeData.map(d => [
      d.time,
      d.indoorAqi,
      d.outdoorAqi,
      d.pm25,
      d.pm10,
      d.co2,
      d.tvoc,
      d.temperature,
      d.humidity
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bio_Respira_${activeRoom.name}_${timeRange}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Air Quality Diagnostic CSV generated');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Atmospheric Health Verification
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
            Historical Air Quality Analytics
          </h2>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
            Analyzing telemetry for <strong className="text-neutral-800 dark:text-neutral-200">{activeRoom.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* 24H, 7D, 30D Selector */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#121E1C] rounded-xl border border-neutral-200 dark:border-[#1F3330] shadow-2xs">
            {(['24h', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Report */}
          <button
            onClick={exportCSV}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#121E1C] border border-neutral-200 dark:border-[#1F3330] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#182826] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121E1C] p-4 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
          <span className="text-[11px] text-neutral-400 block mb-1">Average AQI</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
              {avgIndoor}
            </span>
            <span className="text-xs font-semibold text-[#2E9D68]">Pristine</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Outdoor avg: 58 AQI</span>
        </div>

        <div className="bg-white dark:bg-[#121E1C] p-4 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
          <span className="text-[11px] text-neutral-400 block mb-1">Peak Clean Record</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#2E9D68] tabular-numbers font-sans">
              {bestIndoor}
            </span>
            <span className="text-xs text-neutral-400">AQI</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Lowest particle count</span>
        </div>

        <div className="bg-white dark:bg-[#121E1C] p-4 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
          <span className="text-[11px] text-neutral-400 block mb-1">Time in "Excellent"</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0F5C5A] dark:text-[#28B8C7] tabular-numbers font-sans">
              {excellentPct}%
            </span>
            <span className="text-xs font-semibold text-[#2E9D68]">99th percentile</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Safe breathing window</span>
        </div>

        <div className="bg-white dark:bg-[#121E1C] p-4 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
          <span className="text-[11px] text-neutral-400 block mb-1">Air Exchange Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-neutral-800 dark:text-[#EDF4F3] tabular-numbers font-sans">
              4.6
            </span>
            <span className="text-xs font-semibold text-neutral-500">ACH</span>
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Circulations per hour</span>
        </div>
      </div>

      {/* Main Multi-Metric Chart Card */}
      <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm">
        {/* Metric Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedMetric('aqi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedMetric === 'aqi'
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Indoor vs Outdoor AQI
            </button>
            <button
              onClick={() => setSelectedMetric('pm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedMetric === 'pm'
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400'
              }`}
            >
              PM2.5 & PM10 Particulates
            </button>
            <button
              onClick={() => setSelectedMetric('co2_tvoc')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedMetric === 'co2_tvoc'
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400'
              }`}
            >
              CO₂ & TVOC Concentration
            </button>
            <button
              onClick={() => setSelectedMetric('climate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedMetric === 'climate'
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Temperature & Humidity
            </button>
          </div>
        </div>

        {/* Dynamic Chart */}
        <div className="h-[340px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === 'aqi' ? (
              <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="anIndoorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28B8C7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F5C5A" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="anOutdoorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A441" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D6A441" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1F3330' : '#EDF2F1'} />
                <XAxis dataKey="time" stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} domain={[0, 'dataMax + 15']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#182826' : '#FFFFFF',
                    borderColor: isDark ? '#2A4440' : '#DCE7E5',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="outdoorAqi" stroke="#D6A441" strokeWidth={2} strokeDasharray="4 4" fill="url(#anOutdoorGrad)" name="Outdoor Ambient" />
                <Area type="monotone" dataKey="indoorAqi" stroke="#0F5C5A" strokeWidth={2.5} fill="url(#anIndoorGrad)" name="Indoor Purified" />
              </AreaChart>
            ) : selectedMetric === 'pm' ? (
              <LineChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1F3330' : '#EDF2F1'} />
                <XAxis dataKey="time" stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#182826' : '#FFFFFF',
                    borderColor: isDark ? '#2A4440' : '#DCE7E5',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [`${val} µg/m³`, name === 'pm25' ? 'PM2.5 Fine' : 'PM10 Coarse']}
                />
                <Line type="monotone" dataKey="pm25" stroke="#28B8C7" strokeWidth={2.5} dot={false} name="pm25" />
                <Line type="monotone" dataKey="pm10" stroke="#0F5C5A" strokeWidth={2} dot={false} name="pm10" />
              </LineChart>
            ) : selectedMetric === 'co2_tvoc' ? (
              <LineChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1F3330' : '#EDF2F1'} />
                <XAxis dataKey="time" stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#2E9D68" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                <YAxis yAxisId="right" orientation="right" stroke="#D6A441" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#182826' : '#FFFFFF',
                    borderColor: isDark ? '#2A4440' : '#DCE7E5',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="co2" stroke="#2E9D68" strokeWidth={2.5} dot={false} name="CO₂ (ppm)" />
                <Line yAxisId="right" type="monotone" dataKey="tvoc" stroke="#D6A441" strokeWidth={2} dot={false} name="TVOC (ppb)" />
              </LineChart>
            ) : (
              <LineChart data={activeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1F3330' : '#EDF2F1'} />
                <XAxis dataKey="time" stroke={isDark ? '#647573' : '#8F9D9B'} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#0284c7" fontSize={11} tickLine={false} axisLine={false} domain={[18, 30]} />
                <YAxis yAxisId="right" orientation="right" stroke="#0F5C5A" fontSize={11} tickLine={false} axisLine={false} domain={[30, 70]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#182826' : '#FFFFFF',
                    borderColor: isDark ? '#2A4440' : '#DCE7E5',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#0284c7" strokeWidth={2.5} dot={false} name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#0F5C5A" strokeWidth={2} dot={false} name="Humidity (%)" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deep Purification Efficiency Report */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#121E1C] p-5 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-[#0F5C5A] dark:text-[#28B8C7]">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">H13 HEPA Efficiency</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-[#96A8A5] leading-relaxed">
            Trapped approximately <strong>1.48 billion</strong> micro-particulates this week. 99.97% retention of particles down to 0.1 microns.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121E1C] p-5 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-[#2E9D68]">
            <CheckCircle2 className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">VOC Adsorption Status</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-[#96A8A5] leading-relaxed">
            Virgin carbon pellets successfully neutralized cooking fumes and electronic off-gassing, keeping TVOCs consistently under 60 ppb.
          </p>
        </div>

        <div className="bg-white dark:bg-[#121E1C] p-5 rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-sky-500">
            <Wind className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Air Circulation Volume</h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-[#96A8A5] leading-relaxed">
            Cumulative <strong>14,200 m³</strong> of indoor volume processed with average acoustic envelope of only 31 dB across the day.
          </p>
        </div>
      </div>
    </div>
  );
};
