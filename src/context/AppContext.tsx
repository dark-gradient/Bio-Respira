import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  RoomDevice, 
  RoomId, 
  PurifierMode, 
  SmartSchedule, 
  AirAlert, 
  UserSettings, 
  FilterInfo 
} from '../types';
import { 
  INITIAL_ROOMS, 
  INITIAL_SCHEDULES, 
  INITIAL_ALERTS, 
  INITIAL_SETTINGS 
} from '../data/initialData';
import { getAQIStatus, calculateFanTelemetry } from '../utils/airQuality';

interface AppContextType {
  rooms: RoomDevice[];
  activeRoomId: RoomId;
  activeRoom: RoomDevice;
  setActiveRoomId: (id: RoomId) => void;
  updateRoomName: (id: RoomId, name: string) => void;
  
  // Device Controls
  togglePower: (roomId?: RoomId) => void;
  setMode: (mode: PurifierMode, roomId?: RoomId) => void;
  setFanLevel: (level: number, roomId?: RoomId) => void;
  toggleUvC: (roomId?: RoomId) => void;
  toggleIonizer: (roomId?: RoomId) => void;
  toggleChildLock: (roomId?: RoomId) => void;
  setTimer: (minutes: number | null, roomId?: RoomId) => void;
  autoOptimize: (roomId?: RoomId) => void;
  setLedBrightness: (brightness: number, roomId?: RoomId) => void;

  // Simulation
  isSimulating: boolean;
  toggleSimulation: () => void;
  simulationScenario: 'normal' | 'cooking' | 'window-open' | 'night';
  setSimulationScenario: (scenario: 'normal' | 'cooking' | 'window-open' | 'night') => void;
  triggerScenario: (scenario: 'normal' | 'cooking' | 'window-open' | 'night') => void;

  // Filters
  resetFilter: (roomId: RoomId, filterId: string) => void;
  selectedFilterModal: { filter: FilterInfo; roomId: RoomId } | null;
  setSelectedFilterModal: (data: { filter: FilterInfo; roomId: RoomId } | null) => void;

  // Schedules
  schedules: SmartSchedule[];
  toggleSchedule: (id: string) => void;
  addSchedule: (schedule: Omit<SmartSchedule, 'id'>) => void;
  updateSchedule: (schedule: SmartSchedule) => void;
  deleteSchedule: (id: string) => void;

  // Alerts
  alerts: AirAlert[];
  unreadAlertCount: number;
  markAlertRead: (id: string) => void;
  resolveAlert: (id: string) => void;
  resolveAllAlerts: () => void;
  clearAlert: (id: string) => void;

  // Settings & Theme
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  toggleTheme: () => void;

  // UI state
  activeTab: 'overview' | 'devices' | 'analytics' | 'schedules' | 'filters' | 'alerts' | 'settings';
  setActiveTab: (tab: 'overview' | 'devices' | 'analytics' | 'schedules' | 'filters' | 'alerts' | 'settings') => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomDevice[]>(() => {
    const saved = localStorage.getItem('bio_respira_rooms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored rooms:', e);
      }
    }
    return INITIAL_ROOMS;
  });

  const [activeRoomId, setActiveRoomId] = useState<RoomId>('living-room');

  const [schedules, setSchedules] = useState<SmartSchedule[]>(() => {
    const saved = localStorage.getItem('bio_respira_schedules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SCHEDULES;
  });

  const [alerts, setAlerts] = useState<AirAlert[]>(() => {
    const saved = localStorage.getItem('bio_respira_alerts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ALERTS;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('bio_respira_settings');
    const localTheme = localStorage.getItem('bio_respira_theme') as 'light' | 'dark' | null;
    let initial = INITIAL_SETTINGS;
    if (saved) {
      try { initial = { ...INITIAL_SETTINGS, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    if (localTheme) {
      initial.theme = localTheme;
    }
    return initial;
  });

  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationScenario, setSimulationScenarioState] = useState<'normal' | 'cooking' | 'window-open' | 'night'>('normal');
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'analytics' | 'schedules' | 'filters' | 'alerts' | 'settings'>('overview');
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState<boolean>(false);
  const [selectedFilterModal, setSelectedFilterModal] = useState<{ filter: FilterInfo; roomId: RoomId } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  }, []);

  // Sync theme to HTML root element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bio_respira_theme', settings.theme);
  }, [settings.theme]);

  // Persist state
  useEffect(() => {
    localStorage.setItem('bio_respira_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('bio_respira_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('bio_respira_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('bio_respira_settings', JSON.stringify(settings));
  }, [settings]);

  const activeRoom = useMemo(() => {
    return rooms.find(r => r.id === activeRoomId) || rooms[0];
  }, [rooms, activeRoomId]);

  const unreadAlertCount = useMemo(() => {
    return alerts.filter(a => !a.read && !a.resolved).length;
  }, [alerts]);

  // Update single room helper
  const updateRoomDevice = useCallback((roomId: RoomId, updater: (room: RoomDevice) => RoomDevice) => {
    setRooms(prev => prev.map(room => room.id === roomId ? updater(room) : room));
  }, []);

  // Purifier Device Controls
  const togglePower = useCallback((roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => {
      const nextPower = !room.deviceState.poweredOn;
      const tele = nextPower 
        ? calculateFanTelemetry(room.deviceState.fanLevel, room.deviceState.mode)
        : { sound: 0, airflow: 0, label: 'Powered Off' };

      return {
        ...room,
        deviceState: {
          ...room.deviceState,
          poweredOn: nextPower,
          soundLevel: tele.sound,
          airflow: tele.airflow
        }
      };
    });
    showToast(`Purifier ${activeRoom.deviceState.poweredOn ? 'powered off' : 'turned on'}`);
  }, [activeRoomId, activeRoom.deviceState.poweredOn, showToast, updateRoomDevice]);

  const setMode = useCallback((mode: PurifierMode, roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => {
      let targetFan = room.deviceState.fanLevel;
      if (mode === 'turbo') targetFan = 5;
      else if (mode === 'sleep') targetFan = 1;
      else if (mode === 'eco') targetFan = 2;
      else if (mode === 'allergen') targetFan = 4;
      else if (mode === 'auto') {
        // Adjust fan based on current AQI
        const aqi = room.environmental.aqi;
        if (aqi <= 20) targetFan = 2;
        else if (aqi <= 40) targetFan = 3;
        else if (aqi <= 80) targetFan = 4;
        else targetFan = 5;
      }

      const tele = calculateFanTelemetry(targetFan, mode);

      return {
        ...room,
        deviceState: {
          ...room.deviceState,
          poweredOn: true,
          mode,
          fanLevel: targetFan,
          soundLevel: tele.sound,
          airflow: tele.airflow
        }
      };
    });
    showToast(`Switched mode to ${mode.toUpperCase()}`);
  }, [activeRoomId, showToast, updateRoomDevice]);

  const setFanLevel = useCallback((level: number, roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    const clamped = Math.max(1, Math.min(5, Math.round(level)));
    updateRoomDevice(targetId, room => {
      const tele = calculateFanTelemetry(clamped, 'manual');
      return {
        ...room,
        deviceState: {
          ...room.deviceState,
          poweredOn: true,
          mode: 'manual',
          fanLevel: clamped,
          soundLevel: tele.sound,
          airflow: tele.airflow
        }
      };
    });
  }, [activeRoomId, updateRoomDevice]);

  const toggleUvC = useCallback((roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => ({
      ...room,
      deviceState: {
        ...room.deviceState,
        uvC: !room.deviceState.uvC
      }
    }));
    showToast('UV-C sterilization state toggled');
  }, [activeRoomId, showToast, updateRoomDevice]);

  const toggleIonizer = useCallback((roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => ({
      ...room,
      deviceState: {
        ...room.deviceState,
        ionizer: !room.deviceState.ionizer
      }
    }));
    showToast('Negative Ion generator toggled');
  }, [activeRoomId, showToast, updateRoomDevice]);

  const toggleChildLock = useCallback((roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => ({
      ...room,
      deviceState: {
        ...room.deviceState,
        childLock: !room.deviceState.childLock
      }
    }));
    showToast('Child Lock toggled');
  }, [activeRoomId, showToast, updateRoomDevice]);

  const setTimer = useCallback((minutes: number | null, roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => ({
      ...room,
      deviceState: {
        ...room.deviceState,
        timer: minutes
      }
    }));
    showToast(minutes ? `Shutdown timer set for ${minutes} min` : 'Timer disabled');
  }, [activeRoomId, showToast, updateRoomDevice]);

  const setLedBrightness = useCallback((brightness: number, roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => ({
      ...room,
      deviceState: {
        ...room.deviceState,
        ledBrightness: brightness
      }
    }));
  }, [activeRoomId, updateRoomDevice]);

  const autoOptimize = useCallback((roomId?: RoomId) => {
    const targetId = roomId || activeRoomId;
    updateRoomDevice(targetId, room => {
      const aqi = room.environmental.aqi;
      let newMode: PurifierMode = 'auto';
      let fan = 3;
      if (aqi <= 20) {
        newMode = 'eco';
        fan = 2;
      } else if (aqi > 40) {
        newMode = 'turbo';
        fan = 5;
      }
      const tele = calculateFanTelemetry(fan, newMode);

      return {
        ...room,
        deviceState: {
          ...room.deviceState,
          poweredOn: true,
          mode: newMode,
          fanLevel: fan,
          uvC: true,
          ionizer: true,
          soundLevel: tele.sound,
          airflow: tele.airflow
        }
      };
    });
    showToast('Auto-Optimize applied: Balanced air quality & acoustic efficiency');
  }, [activeRoomId, showToast, updateRoomDevice]);

  const updateRoomName = useCallback((id: RoomId, name: string) => {
    updateRoomDevice(id, room => ({ ...room, name }));
    showToast(`Room renamed to ${name}`);
  }, [showToast, updateRoomDevice]);

  // Simulation Controls & Scenarios
  const toggleSimulation = useCallback(() => {
    setIsSimulating(prev => !prev);
    showToast(isSimulating ? 'Live telemetry simulation paused' : 'Live telemetry simulation resumed');
  }, [isSimulating, showToast]);

  const setSimulationScenario = useCallback((scenario: 'normal' | 'cooking' | 'window-open' | 'night') => {
    setSimulationScenarioState(scenario);
  }, []);

  const triggerScenario = useCallback((scenario: 'normal' | 'cooking' | 'window-open' | 'night') => {
    setSimulationScenarioState(scenario);
    if (scenario === 'cooking') {
      // Spike PM2.5 and TVOC in active room
      updateRoomDevice(activeRoomId, room => {
        const pm25 = 48;
        const pm10 = 76;
        const tvoc = 160;
        const aqi = 72;
        return {
          ...room,
          environmental: {
            ...room.environmental,
            pm25,
            pm10,
            tvoc,
            aqi,
            status: getAQIStatus(aqi),
            trend: 'degrading'
          }
        };
      });
      // Add alert
      const newAlert: AirAlert = {
        id: `alert-cook-${Date.now()}`,
        roomId: activeRoomId,
        roomName: activeRoom.name,
        severity: 'warning',
        title: 'Elevated Particulates Detected',
        message: 'Sudden spike in PM2.5 and VOCs likely caused by cooking or smoke. Auto/Turbo cleaning advised.',
        timestamp: 'Just now',
        read: false,
        resolved: false,
        actionLabel: 'Boost Cleaning',
        actionType: 'turbo'
      };
      setAlerts(prev => [newAlert, ...prev]);
      showToast('Scenario: Cooking activity simulated (PM2.5 spike)');
    } else if (scenario === 'window-open') {
      updateRoomDevice(activeRoomId, room => {
        const pm10 = 55;
        const co2 = 410; // Fresh outside air drops CO2
        const aqi = 44;
        return {
          ...room,
          environmental: {
            ...room.environmental,
            pm10,
            co2,
            aqi,
            status: getAQIStatus(aqi),
            trend: 'degrading'
          }
        };
      });
      showToast('Scenario: Window opened (Outside air exchange)');
    } else if (scenario === 'night') {
      updateRoomDevice(activeRoomId, room => ({
        ...room,
        deviceState: {
          ...room.deviceState,
          mode: 'sleep',
          fanLevel: 1,
          soundLevel: 20,
          airflow: 70
        },
        environmental: {
          ...room.environmental,
          co2: 520,
          temperature: 21.2
        }
      }));
      showToast('Scenario: Quiet nighttime mode simulated');
    } else {
      // Normal
      updateRoomDevice(activeRoomId, room => ({
        ...room,
        environmental: {
          ...room.environmental,
          pm25: 7,
          pm10: 14,
          co2: 488,
          tvoc: 42,
          aqi: 18,
          status: 'excellent',
          trend: 'stable'
        }
      }));
      showToast('Scenario: Nominal clean air baseline restored');
    }
  }, [activeRoomId, activeRoom.name, showToast, updateRoomDevice]);

  // Periodic Environmental Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalTime = settings.simulationSpeed === 'accelerated' ? 2000 : 3500;

    const interval = setInterval(() => {
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          const { poweredOn, mode, fanLevel } = room.deviceState;
          const env = { ...room.environmental };

          // Purifier cleaning power based on fan and power
          let cleanEfficiency = 0;
          if (poweredOn) {
            if (mode === 'turbo') cleanEfficiency = 1.4;
            else if (mode === 'allergen') cleanEfficiency = 1.2;
            else if (fanLevel >= 4) cleanEfficiency = 1.1;
            else if (fanLevel >= 2) cleanEfficiency = 0.6;
            else cleanEfficiency = 0.3; // sleep / level 1
          } else {
            // Powered off: air slowly drifts towards outdoor levels
            cleanEfficiency = -0.5;
          }

          // Gentle random walk
          // PM2.5
          const pmDelta = (Math.random() - 0.5) * 0.8;
          let targetPm25 = env.pm25 + pmDelta - (cleanEfficiency * 0.4);
          // Clamp realistic bounds
          if (poweredOn) {
            targetPm25 = Math.max(3, Math.min(65, targetPm25));
          } else {
            targetPm25 = Math.min(env.outdoorPm25, targetPm25 + 0.4);
          }
          env.pm25 = Math.round(targetPm25 * 10) / 10;

          // PM10 (usually ~ 1.8x - 2.2x of PM2.5)
          const pm10Delta = (Math.random() - 0.5) * 1.2;
          let targetPm10 = env.pm10 + pm10Delta - (cleanEfficiency * 0.6);
          targetPm10 = Math.max(env.pm25 + 2, Math.min(110, targetPm10));
          env.pm10 = Math.round(targetPm10);

          // CO2
          const co2Delta = (Math.random() - 0.5) * 4;
          env.co2 = Math.round(Math.max(410, Math.min(850, env.co2 + co2Delta)));

          // TVOC
          const tvocDelta = (Math.random() - 0.5) * 2;
          const tvocClean = poweredOn && room.deviceState.uvC ? 0.6 : 0;
          env.tvoc = Math.round(Math.max(20, Math.min(180, env.tvoc + tvocDelta - tvocClean)));

          // Temperature (very slow float)
          const tempDelta = (Math.random() - 0.5) * 0.05;
          env.temperature = Math.round((env.temperature + tempDelta) * 10) / 10;

          // Humidity
          const humDelta = (Math.random() - 0.5) * 0.3;
          env.humidity = Math.round(Math.max(35, Math.min(65, env.humidity + humDelta)));

          // Calculate AQI from PM2.5
          // EPA linear formula approximation
          let calcAqi = Math.round(env.pm25 * 2.5);
          calcAqi = Math.max(10, Math.min(220, calcAqi));
          env.aqi = calcAqi;
          env.status = getAQIStatus(calcAqi);

          // Trend
          if (cleanEfficiency > 0.5 && env.aqi < 30) env.trend = 'improving';
          else if (!poweredOn || env.aqi > 45) env.trend = 'degrading';
          else env.trend = 'stable';

          // Update latest 24h history point smoothly
          const updated24h = [...room.history24h];
          if (updated24h.length > 0) {
            const lastIdx = updated24h.length - 1;
            updated24h[lastIdx] = {
              ...updated24h[lastIdx],
              indoorAqi: env.aqi,
              pm25: env.pm25,
              pm10: env.pm10,
              co2: env.co2,
              tvoc: env.tvoc,
              temperature: env.temperature,
              humidity: env.humidity
            };
          }

          return {
            ...room,
            environmental: env,
            history24h: updated24h
          };
        });
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isSimulating, settings.simulationSpeed]);

  // Filters management
  const resetFilter = useCallback((roomId: RoomId, filterId: string) => {
    updateRoomDevice(roomId, room => {
      const updatedFilters = room.filters.map(f => {
        if (f.id === filterId) {
          return {
            ...f,
            healthPercentage: 100,
            daysRemaining: f.totalLifeDays,
            status: 'healthy' as const,
            installDate: new Date().toISOString().split('T')[0]
          };
        }
        return f;
      });
      return { ...room, filters: updatedFilters };
    });
    showToast('Filter lifecycle counter reset to 100%');
  }, [showToast, updateRoomDevice]);

  // Schedules management
  const toggleSchedule = useCallback((id: string) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    showToast('Schedule status updated');
  }, [showToast]);

  const addSchedule = useCallback((newSched: Omit<SmartSchedule, 'id'>) => {
    const id = `sched-${Date.now()}`;
    setSchedules(prev => [...prev, { ...newSched, id }]);
    showToast('New smart schedule saved');
  }, [showToast]);

  const updateSchedule = useCallback((updated: SmartSchedule) => {
    setSchedules(prev => prev.map(s => s.id === updated.id ? updated : s));
    showToast('Schedule settings updated');
  }, [showToast]);

  const deleteSchedule = useCallback((id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
    showToast('Schedule removed');
  }, [showToast]);

  // Alerts management
  const markAlertRead = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  const resolveAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true, read: true } : a));
    showToast('Alert resolved');
  }, [showToast]);

  const resolveAllAlerts = useCallback(() => {
    setAlerts(prev => prev.map(a => ({ ...a, resolved: true, read: true })));
    showToast('All alerts marked resolved');
  }, [showToast]);

  const clearAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  // Settings
  const updateSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
    showToast('Settings saved');
  }, [showToast]);

  const toggleTheme = useCallback(() => {
    setSettings(prev => {
      const next = prev.theme === 'light' ? 'dark' : 'light';
      return { ...prev, theme: next };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        rooms,
        activeRoomId,
        activeRoom,
        setActiveRoomId,
        updateRoomName,

        togglePower,
        setMode,
        setFanLevel,
        toggleUvC,
        toggleIonizer,
        toggleChildLock,
        setTimer,
        autoOptimize,
        setLedBrightness,

        isSimulating,
        toggleSimulation,
        simulationScenario,
        setSimulationScenario,
        triggerScenario,

        resetFilter,
        selectedFilterModal,
        setSelectedFilterModal,

        schedules,
        toggleSchedule,
        addSchedule,
        updateSchedule,
        deleteSchedule,

        alerts,
        unreadAlertCount,
        markAlertRead,
        resolveAlert,
        resolveAllAlerts,
        clearAlert,

        settings,
        updateSettings,
        toggleTheme,

        activeTab,
        setActiveTab,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
