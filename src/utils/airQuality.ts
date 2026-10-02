import { AQIStatus, PurifierMode } from '../types';

export const AQI_COLORS = {
  excellent: {
    hex: '#2E9D68',
    bgLight: 'bg-[#2E9D68]/10',
    borderLight: 'border-[#2E9D68]/30',
    text: 'text-[#2E9D68]',
    ring: 'ring-[#2E9D68]/20',
    label: 'EXCELLENT',
    tagline: 'Air is clean & fresh'
  },
  good: {
    hex: '#6FAF55',
    bgLight: 'bg-[#6FAF55]/10',
    borderLight: 'border-[#6FAF55]/30',
    text: 'text-[#6FAF55]',
    ring: 'ring-[#6FAF55]/20',
    label: 'GOOD',
    tagline: 'Air quality is acceptable'
  },
  moderate: {
    hex: '#D6A441',
    bgLight: 'bg-[#D6A441]/10',
    borderLight: 'border-[#D6A441]/30',
    text: 'text-[#D6A441]',
    ring: 'ring-[#D6A441]/20',
    label: 'MODERATE',
    tagline: 'Mild particulates detected'
  },
  poor: {
    hex: '#D97745',
    bgLight: 'bg-[#D97745]/10',
    borderLight: 'border-[#D97745]/30',
    text: 'text-[#D97745]',
    ring: 'ring-[#D97745]/20',
    label: 'POOR',
    tagline: 'Unhealthy for sensitive groups'
  },
  critical: {
    hex: '#D84B4B',
    bgLight: 'bg-[#D84B4B]/10',
    borderLight: 'border-[#D84B4B]/30',
    text: 'text-[#D84B4B]',
    ring: 'ring-[#D84B4B]/20',
    label: 'CRITICAL',
    tagline: 'Active purification recommended'
  }
};

export function getAQIStatus(aqi: number): AQIStatus {
  if (aqi <= 25) return 'excellent';
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'poor';
  return 'critical';
}

export function calculateFanTelemetry(level: number, mode: PurifierMode) {
  // Level ranges 1 to 5
  const clampedLevel = Math.max(1, Math.min(5, level));
  
  const telemetryByLevel: Record<number, { sound: number; airflow: number; label: string }> = {
    1: { sound: 22, airflow: 85, label: 'Whisper Quiet' },
    2: { sound: 29, airflow: 155, label: 'Gentle Breeze' },
    3: { sound: 38, airflow: 245, label: 'Normal Flow' },
    4: { sound: 46, airflow: 330, label: 'High Clean' },
    5: { sound: 54, airflow: 420, label: 'Turbo Boost' },
  };

  const base = telemetryByLevel[clampedLevel] || telemetryByLevel[3];

  if (mode === 'sleep') {
    return { sound: 20, airflow: 70, label: 'Ultra Quiet' };
  } else if (mode === 'turbo') {
    return { sound: 54, airflow: 420, label: 'Maximum Airflow' };
  } else if (mode === 'eco') {
    return { sound: 26, airflow: 110, label: 'Energy Saver' };
  }

  return base;
}

export function formatTemp(celsius: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    const f = (celsius * 9) / 5 + 32;
    return `${f.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
}
