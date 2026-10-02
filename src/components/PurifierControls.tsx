import React from 'react';
import { DeviceState, PurifierMode } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Power, 
  Wind, 
  Moon, 
  Zap, 
  Leaf, 
  ShieldAlert, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Timer, 
  SlidersHorizontal 
} from 'lucide-react';

interface PurifierControlsProps {
  deviceState: DeviceState;
  roomName: string;
}

export const PurifierControls: React.FC<PurifierControlsProps> = ({ deviceState, roomName }) => {
  const { 
    togglePower, 
    setMode, 
    setFanLevel, 
    toggleUvC, 
    toggleIonizer, 
    toggleChildLock, 
    setTimer 
  } = useApp();

  const {
    poweredOn,
    online,
    mode,
    fanLevel,
    uvC,
    ionizer,
    childLock,
    timer,
    soundLevel,
    airflow
  } = deviceState;

  const modes: { id: PurifierMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'auto', label: 'AUTO', icon: <Sparkles className="w-3.5 h-3.5" />, desc: 'Intelligent dynamic speed' },
    { id: 'turbo', label: 'TURBO', icon: <Zap className="w-3.5 h-3.5" />, desc: 'Max 420 m³/h airflow' },
    { id: 'sleep', label: 'SLEEP', icon: <Moon className="w-3.5 h-3.5" />, desc: 'Silent 20 dB operation' },
    { id: 'eco', label: 'ECO', icon: <Leaf className="w-3.5 h-3.5" />, desc: 'Low power conservation' },
    { id: 'allergen', label: 'ALLERGEN', icon: <ShieldAlert className="w-3.5 h-3.5" />, desc: 'Intensive pollen capture' },
  ];

  const timerOptions = [
    { label: 'OFF', val: null },
    { label: '1h', val: 60 },
    { label: '2h', val: 120 },
    { label: '4h', val: 240 },
    { label: '8h', val: 480 },
  ];

  // Dynamic fan spin class
  let fanSpinClass = '';
  if (poweredOn) {
    if (mode === 'turbo' || fanLevel >= 5) fanSpinClass = 'animate-fan-turbo';
    else if (mode === 'sleep' || fanLevel === 1) fanSpinClass = 'animate-fan-sleep';
    else fanSpinClass = 'animate-fan-spin';
  }

  return (
    <div className={`relative bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm flex flex-col justify-between transition-opacity ${!poweredOn ? 'opacity-90' : ''}`}>
      {/* Header & Power Button */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-[#1F3330]/60">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            poweredOn 
              ? 'bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-[#28B8C7]/20 dark:text-[#28B8C7]' 
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
          }`}>
            <Wind className={`w-5 h-5 ${fanSpinClass}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
                Purifier Unit
              </h3>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <span className="text-xs text-neutral-400 dark:text-[#96A8A5]">
              {deviceState.model} · {roomName}
            </span>
          </div>
        </div>

        {/* Master Power Toggle Button */}
        <button
          onClick={() => togglePower()}
          aria-label={poweredOn ? 'Turn purifier off' : 'Turn purifier on'}
          className={`px-3.5 py-1.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
            poweredOn
              ? 'bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] dark:hover:bg-[#1fa3b1] shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{poweredOn ? 'SYSTEM ON' : 'SYSTEM OFF'}</span>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-neutral-500 dark:text-[#96A8A5] uppercase tracking-wider">
            Operational Mode
          </label>
          <span className="text-[11px] text-[#0F5C5A] dark:text-[#28B8C7] font-medium">
            {modes.find(m => m.id === mode)?.desc || 'Custom fan profile'}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 p-1 bg-neutral-100/80 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
          {modes.map(m => {
            const isActive = mode === m.id && poweredOn;
            return (
              <button
                key={m.id}
                disabled={!poweredOn}
                onClick={() => setMode(m.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-[#121E1C] text-[#0F5C5A] dark:text-[#28B8C7] shadow-sm font-semibold'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-[#172321] dark:hover:text-white disabled:opacity-40 disabled:hover:text-neutral-500'
                }`}
              >
                <span className="mb-1">{m.icon}</span>
                <span className="text-[11px] tracking-tight">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fan Speed Slider */}
      <div className="mt-4 p-3 bg-neutral-50/70 dark:bg-[#182826]/70 rounded-xl border border-neutral-200/60 dark:border-[#1F3330]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs font-semibold text-neutral-600 dark:text-[#EDF4F3]">
              Fan Speed Level
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#0F5C5A] dark:text-[#28B8C7]">
              Level {poweredOn ? fanLevel : 0}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-[#96A8A5] tabular-numbers font-sans">
              {poweredOn ? `${airflow} m³/h` : '0 m³/h'}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 dark:text-[#96A8A5] tabular-numbers font-sans">
              {poweredOn ? `${soundLevel} dB` : 'Quiet'}
            </span>
          </div>
        </div>

        {/* Stepped Fan Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-neutral-400">Quiet</span>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            disabled={!poweredOn}
            value={fanLevel}
            onChange={(e) => setFanLevel(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
          />
          <span className="text-[11px] font-medium text-neutral-400">Turbo</span>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between px-7 mt-1.5">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              disabled={!poweredOn}
              onClick={() => setFanLevel(lvl)}
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                fanLevel === lvl && poweredOn
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Toggles: UV-C, Ionizer, Child Lock, Timer */}
      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60 grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* UV-C Toggle */}
        <button
          disabled={!poweredOn}
          onClick={() => toggleUvC()}
          className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-colors cursor-pointer disabled:opacity-40 ${
            uvC && poweredOn
              ? 'bg-[#28B8C7]/10 border-[#28B8C7]/40 text-[#0F5C5A] dark:text-[#28B8C7]'
              : 'bg-neutral-50 dark:bg-[#182826] border-neutral-200/60 dark:border-[#1F3330] text-neutral-500'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium">UV-C</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            uvC && poweredOn ? 'bg-[#28B8C7]/20 text-[#0F5C5A] dark:text-[#28B8C7]' : 'bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500'
          }`}>
            {uvC && poweredOn ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Ionizer Toggle */}
        <button
          disabled={!poweredOn}
          onClick={() => toggleIonizer()}
          className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-colors cursor-pointer disabled:opacity-40 ${
            ionizer && poweredOn
              ? 'bg-[#0F5C5A]/10 border-[#0F5C5A]/30 text-[#0F5C5A] dark:text-[#28B8C7]'
              : 'bg-neutral-50 dark:bg-[#182826] border-neutral-200/60 dark:border-[#1F3330] text-neutral-500'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-medium">Ionizer</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            ionizer && poweredOn ? 'bg-[#0F5C5A]/20 text-[#0F5C5A] dark:text-[#28B8C7]' : 'bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500'
          }`}>
            {ionizer && poweredOn ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Child Lock Toggle */}
        <button
          disabled={!poweredOn}
          onClick={() => toggleChildLock()}
          className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-colors cursor-pointer disabled:opacity-40 min-w-0 ${
            childLock && poweredOn
              ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400'
              : 'bg-neutral-50 dark:bg-[#182826] border-neutral-200/60 dark:border-[#1F3330] text-neutral-500'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium truncate">Lock</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
            childLock && poweredOn ? 'bg-amber-200/60 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' : 'bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500'
          }`}>
            {childLock && poweredOn ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Timer cycle toggle button */}
        <button
          disabled={!poweredOn}
          onClick={() => {
            const currentIndex = timerOptions.findIndex(o => o.val === timer);
            const nextIndex = (currentIndex + 1) % timerOptions.length;
            setTimer(timerOptions[nextIndex].val);
          }}
          className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-colors cursor-pointer disabled:opacity-40 min-w-0 ${
            timer && poweredOn
              ? 'bg-[#0F5C5A]/10 border-[#0F5C5A]/30 text-[#0F5C5A] dark:text-[#28B8C7]'
              : 'bg-neutral-50 dark:bg-[#182826] border-neutral-200/60 dark:border-[#1F3330] text-neutral-500'
          }`}
          title="Click to cycle timer: OFF, 1h, 2h, 4h, 8h"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Timer className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium truncate">Timer</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 tabular-numbers ${
            timer && poweredOn 
              ? 'bg-[#0F5C5A]/20 text-[#0F5C5A] dark:text-[#28B8C7]' 
              : 'bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500'
          }`}>
            {timer ? `${timer >= 60 ? `${timer / 60}h` : `${timer}m`}` : 'OFF'}
          </span>
        </button>
      </div>
    </div>
  );
};
