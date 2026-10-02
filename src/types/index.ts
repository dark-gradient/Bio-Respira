export type RoomId = 'living-room' | 'master-bedroom' | 'home-office' | 'nursery';

export type PurifierMode = 'auto' | 'turbo' | 'sleep' | 'eco' | 'allergen' | 'manual';

export type AQIStatus = 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';

export interface DeviceState {
  online: boolean;
  poweredOn: boolean;
  mode: PurifierMode;
  fanLevel: number; // 1 to 5
  uvC: boolean;
  ionizer: boolean;
  childLock: boolean;
  timer: number | null; // minutes remaining, or null
  soundLevel: number; // dB
  airflow: number; // m³/h
  model: string;
  firmwareVersion: string;
  ledBrightness: number;
}

export interface EnvironmentalData {
  aqi: number;
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  co2: number; // ppm
  tvoc: number; // ppb
  temperature: number; // °C
  humidity: number; // %
  outdoorAqi: number;
  outdoorPm25: number;
  outdoorTemp: number;
  status: AQIStatus;
  trend: 'improving' | 'stable' | 'degrading';
  lastUpdated: string;
}

export interface HistoricalDataPoint {
  time: string;
  indoorAqi: number;
  outdoorAqi: number;
  pm25: number;
  pm10: number;
  co2: number;
  tvoc: number;
  temperature: number;
  humidity: number;
}

export interface FilterInfo {
  id: string;
  name: string;
  type: 'pre' | 'hepa' | 'carbon' | 'uv';
  healthPercentage: number;
  daysRemaining: number;
  totalLifeDays: number;
  installDate: string;
  status: 'healthy' | 'moderate' | 'replace-soon' | 'replace-now';
  description: string;
  filterMaterial: string;
  captures: string[];
}

export interface SmartSchedule {
  id: string;
  title: string;
  description: string;
  mode: PurifierMode;
  fanLevel: number;
  startTime: string;
  endTime: string;
  days: string[];
  enabled: boolean;
  roomIds: RoomId[];
}

export interface AirAlert {
  id: string;
  roomId: RoomId;
  roomName: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  resolved: boolean;
  actionLabel?: string;
  actionType?: 'turbo' | 'filter' | 'auto';
}

export interface RoomDevice {
  id: RoomId;
  name: string;
  deviceModel: string;
  areaSqM: number;
  deviceState: DeviceState;
  environmental: EnvironmentalData;
  filters: FilterInfo[];
  history24h: HistoricalDataPoint[];
  history7d: HistoricalDataPoint[];
  history30d: HistoricalDataPoint[];
}

export interface UserSettings {
  theme: 'light' | 'dark';
  tempUnit: 'celsius' | 'fahrenheit';
  simulationSpeed: 'realtime' | 'accelerated' | 'paused';
  simulationScenario: 'normal' | 'cooking' | 'window-open' | 'night';
  autoOptimizeSensitivity: 'balanced' | 'aggressive' | 'eco';
  alertThresholdPm25: number;
  chimeSound: boolean;
  ledBrightness: number;
}
