import React from 'react';
import { useApp } from '../context/AppContext';
import { AQIGauge } from '../components/AQIGauge';
import { PurifierControls } from '../components/PurifierControls';
import { AdvisoryCard } from '../components/AdvisoryCard';
import { SensorMetricCard } from '../components/SensorMetricCard';
import { AirQualityChart } from '../components/AirQualityChart';
import { FilterHealthCard } from '../components/FilterHealthCard';
import { AlertPanel } from '../components/AlertPanel';
import { formatTemp } from '../utils/airQuality';
import { 
  CloudRain, 
  Thermometer, 
  Wind, 
  Activity, 
  Sparkles, 
  Gauge, 
  ArrowUpRight,
  ShieldCheck 
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { activeRoom, settings, rooms, setActiveRoomId } = useApp();
  const { environmental, deviceState, filters, history24h, history7d, history30d } = activeRoom;
  const isDark = settings.theme === 'dark';

  // Sensor statuses
  const getPm25Status = (val: number) => {
    if (val <= 12) return { status: 'Optimal', color: 'green' as const };
    if (val <= 35) return { status: 'Moderate', color: 'amber' as const };
    return { status: 'High', color: 'red' as const };
  };

  const getPm10Status = (val: number) => {
    if (val <= 25) return { status: 'Healthy', color: 'green' as const };
    if (val <= 50) return { status: 'Acceptable', color: 'amber' as const };
    return { status: 'Elevated', color: 'red' as const };
  };

  const getCo2Status = (val: number) => {
    if (val <= 600) return { status: 'Fresh Air', color: 'green' as const };
    if (val <= 1000) return { status: 'Normal', color: 'teal' as const };
    return { status: 'Ventilate', color: 'amber' as const };
  };

  const getTvocStatus = (val: number) => {
    if (val <= 65) return { status: 'Pristine', color: 'green' as const };
    if (val <= 150) return { status: 'Normal', color: 'teal' as const };
    return { status: 'Adsorbing', color: 'amber' as const };
  };

  const pm25Stat = getPm25Status(environmental.pm25);
  const pm10Stat = getPm10Status(environmental.pm10);
  const co2Stat = getCo2Status(environmental.co2);
  const tvocStat = getTvocStatus(environmental.tvoc);

  return (
    <div className="space-y-6 pb-12">
      {/* Room Quick Switcher Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 pt-1">
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#121E1C] rounded-xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
          {rooms.map(room => {
            const isSelected = room.id === activeRoom.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312] shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{room.name}</span>
                <span className="ml-1.5 text-[10px] opacity-80 font-normal">
                  {room.environmental.aqi} AQI
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs text-neutral-500 dark:text-[#96A8A5]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Outdoor AQI: <strong className="text-neutral-800 dark:text-[#EDF4F3]">{environmental.outdoorAqi}</strong>
          </span>
          <span>·</span>
          <span>
            Outdoor Temp: <strong className="text-neutral-800 dark:text-[#EDF4F3]">{formatTemp(environmental.outdoorTemp, settings.tempUnit)}</strong>
          </span>
        </div>
      </div>

      {/* Smart Air Advisory Banner */}
      <AdvisoryCard
        environmental={environmental}
        deviceState={deviceState}
        filters={filters}
      />

      {/* Two-Column Main Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Large AQI Visualization */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
          <AQIGauge data={environmental} roomName={activeRoom.name} />
        </div>

        {/* Right: Purifier Controls */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
          <PurifierControls deviceState={deviceState} roomName={activeRoom.name} />
        </div>
      </div>

      {/* Environmental Sensor Metrics (6 Core Sensors) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold tracking-tight text-[#172321] dark:text-[#EDF4F3] uppercase tracking-wider text-[11px] text-neutral-400">
            Real-Time Atmospheric Telemetry
          </h3>
          <span className="text-xs text-neutral-400">
            Precision optical & chemical sensors
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* PM2.5 */}
          <SensorMetricCard
            name="PM2.5"
            subName="Fine"
            value={environmental.pm25}
            unit="µg/m³"
            status={pm25Stat.status}
            statusColor={pm25Stat.color}
            icon={Wind}
            trend={environmental.trend === 'improving' ? 'down' : environmental.trend === 'degrading' ? 'up' : 'flat'}
            referenceTarget="< 12 µg/m³"
          />

          {/* PM10 */}
          <SensorMetricCard
            name="PM10"
            subName="Coarse"
            value={environmental.pm10}
            unit="µg/m³"
            status={pm10Stat.status}
            statusColor={pm10Stat.color}
            icon={Activity}
            trend={environmental.trend === 'improving' ? 'down' : 'flat'}
            referenceTarget="< 25 µg/m³"
          />

          {/* CO2 */}
          <SensorMetricCard
            name="CO₂"
            subName="Carbon"
            value={environmental.co2}
            unit="ppm"
            status={co2Stat.status === 'Fresh Air' ? 'Fresh' : co2Stat.status}
            statusColor={co2Stat.color}
            icon={Gauge}
            trend="flat"
            referenceTarget="< 600 ppm"
          />

          {/* TVOC */}
          <SensorMetricCard
            name="TVOC"
            subName="Volatiles"
            value={environmental.tvoc}
            unit="ppb"
            status={tvocStat.status}
            statusColor={tvocStat.color}
            icon={Sparkles}
            trend="down"
            referenceTarget="< 65 ppb"
          />

          {/* Temperature */}
          <SensorMetricCard
            name="Temperature"
            subName="Ambient"
            value={formatTemp(environmental.temperature, settings.tempUnit).replace(/°[CF]/, '')}
            unit={settings.tempUnit === 'fahrenheit' ? '°F' : '°C'}
            status="Optimal"
            statusColor="blue"
            icon={Thermometer}
            trend="flat"
            referenceTarget={settings.tempUnit === 'fahrenheit' ? '70 – 74°F' : '21 – 24°C'}
          />

          {/* Humidity */}
          <SensorMetricCard
            name="Humidity"
            subName="Moisture"
            value={environmental.humidity}
            unit="%"
            status={environmental.humidity >= 40 && environmental.humidity <= 60 ? 'Ideal' : 'Moderate'}
            statusColor="teal"
            icon={CloudRain}
            trend="flat"
            referenceTarget="40% – 60%"
          />
        </div>
      </div>

      {/* Analytics Chart & Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Air Quality Analytics (Indoor vs Outdoor) */}
        <div className="lg:col-span-8 flex flex-col">
          <AirQualityChart
            history24h={history24h}
            history7d={history7d}
            history30d={history30d}
            isDark={isDark}
          />
        </div>

        {/* Filter Health Summary */}
        <div className="lg:col-span-4 flex flex-col">
          <FilterHealthCard filters={filters} roomId={activeRoom.id} />
        </div>
      </div>

      {/* Atmosphere Diagnostic Events Panel */}
      <AlertPanel alerts={activeRoom ? activeRoom.environmental.aqi > 50 ? [
        {
          id: 'live-dyn-1',
          roomId: activeRoom.id,
          roomName: activeRoom.name,
          severity: 'warning',
          title: 'Particulate Density Higher than Baseline',
          message: 'Active room particulate count has exceeded nominal quiet levels. Filtration is compensating.',
          timestamp: 'Moments ago',
          read: false,
          resolved: false,
          actionLabel: 'Boost Turbo',
          actionType: 'turbo'
        }
      ] : [] : []} />
    </div>
  );
};
