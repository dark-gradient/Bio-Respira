import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoomId, RoomDevice } from '../types';
import { AQI_COLORS } from '../utils/airQuality';
import { 
  Laptop2, 
  Power, 
  Wind, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Check, 
  Sliders, 
  Edit3, 
  Sparkles,
  Wifi
} from 'lucide-react';

export const DevicesPage: React.FC = () => {
  const { 
    rooms, 
    activeRoomId, 
    setActiveRoomId, 
    togglePower, 
    setMode, 
    setActiveTab, 
    updateRoomName,
    showToast 
  } = useApp();

  const [editingRoomId, setEditingRoomId] = useState<RoomId | null>(null);
  const [editingName, setEditingName] = useState('');
  const [pairModalOpen, setPairModalOpen] = useState(false);
  const [pairingStep, setPairingStep] = useState<'scan' | 'found' | 'done'>('scan');

  const startRename = (room: RoomDevice) => {
    setEditingRoomId(room.id);
    setEditingName(room.name);
  };

  const saveRename = (roomId: RoomId) => {
    if (editingName.trim()) {
      updateRoomName(roomId, editingName.trim());
    }
    setEditingRoomId(null);
  };

  const handlePairSimulation = () => {
    setPairModalOpen(true);
    setPairingStep('scan');
    setTimeout(() => {
      setPairingStep('found');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Ecosystem Hardware
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
            Connected Purifier Network
          </h2>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
            {rooms.length} active purification units synchronized across your home
          </p>
        </div>

        <button
          onClick={handlePairSimulation}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Pair New Unit</span>
        </button>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room => {
          const isCurrentActive = room.id === activeRoomId;
          const aqiConfig = AQI_COLORS[room.environmental.status];
          const { poweredOn, mode, fanLevel, soundLevel, airflow } = room.deviceState;
          const lowestFilter = [...room.filters].sort((a, b) => a.healthPercentage - b.healthPercentage)[0];

          return (
            <div
              key={room.id}
              className={`bg-white dark:bg-[#121E1C] rounded-2xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
                isCurrentActive
                  ? 'border-[#0F5C5A]/60 dark:border-[#28B8C7]/60 ring-2 ring-[#0F5C5A]/10 dark:ring-[#28B8C7]/15'
                  : 'border-[#DCE7E5] dark:border-[#1F3330] hover:border-neutral-300 dark:hover:border-[#2A4440]'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {editingRoomId === room.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editingName}
                            onChange={e => setEditingName(e.target.value)}
                            className="px-2 py-0.5 text-base font-bold bg-neutral-100 dark:bg-[#182826] rounded border border-neutral-300 dark:border-neutral-700"
                            autoFocus
                            onKeyDown={e => e.key === 'Enter' && saveRename(room.id)}
                          />
                          <button
                            onClick={() => saveRename(room.id)}
                            className="p-1 rounded bg-[#0F5C5A] text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 group">
                          <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                            {room.name}
                          </h3>
                          <button
                            onClick={() => startRename(room)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                            title="Rename Room"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {isCurrentActive && (
                        <span className="text-[10px] font-bold text-[#0F5C5A] dark:text-[#28B8C7] bg-[#0F5C5A]/10 dark:bg-[#28B8C7]/20 px-2 py-0.5 rounded-full">
                          ACTIVE CONTEXT
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">
                      {room.deviceModel} · {room.areaSqM} m² floor space
                    </span>
                  </div>

                  {/* Power Button */}
                  <button
                    onClick={() => togglePower(room.id)}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                      poweredOn
                        ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312] border-transparent shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border-neutral-200 dark:border-neutral-700'
                    }`}
                    title={poweredOn ? 'Turn off' : 'Turn on'}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">{poweredOn ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {/* AQI and Metrics summary */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div 
                    className="p-3.5 rounded-xl border flex items-center justify-between"
                    style={{
                      backgroundColor: `${aqiConfig.hex}08`,
                      borderColor: `${aqiConfig.hex}25`
                    }}
                  >
                    <div>
                      <span className="text-[11px] text-neutral-500 font-medium block">Room AQI</span>
                      <span className="text-2xl font-extrabold tabular-numbers font-sans" style={{ color: aqiConfig.hex }}>
                        {room.environmental.aqi}
                      </span>
                    </div>
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${aqiConfig.hex}18`,
                        color: aqiConfig.hex
                      }}
                    >
                      {aqiConfig.label}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200/60 dark:border-[#1F3330] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 font-medium block">PM2.5 / PM10</span>
                      <span className="text-base font-bold text-neutral-800 dark:text-[#EDF4F3] tabular-numbers font-sans">
                        {room.environmental.pm25} <span className="text-xs text-neutral-400">/ {room.environmental.pm10}</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400">µg/m³</span>
                  </div>
                </div>

                {/* Device Status Strip */}
                <div className="p-3 bg-neutral-50/70 dark:bg-[#182826]/70 rounded-xl border border-neutral-200/60 dark:border-[#1F3330] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Purifier Mode</span>
                    <div className="flex items-center gap-1">
                      {(['auto', 'turbo', 'sleep', 'eco'] as const).map(m => (
                        <button
                          key={m}
                          disabled={!poweredOn}
                          onClick={() => setMode(m, room.id)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase transition-colors cursor-pointer ${
                            mode === m && poweredOn
                              ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                              : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-neutral-500">
                    <span>Fan & Airflow</span>
                    <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">
                      Level {fanLevel} · {airflow} m³/h ({soundLevel} dB)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-500">
                    <span>Lowest Filter</span>
                    <span className={`font-semibold ${
                      lowestFilter.healthPercentage <= 60 ? 'text-[#D6A441]' : 'text-[#2E9D68]'
                    }`}>
                      {lowestFilter.name} ({lowestFilter.healthPercentage}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Wi-Fi 5GHz · Low Latency</span>
                </div>

                <button
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setActiveTab('overview');
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0F5C5A]/10 text-[#0F5C5A] hover:bg-[#0F5C5A]/20 dark:bg-[#28B8C7]/20 dark:text-[#28B8C7] dark:hover:bg-[#28B8C7]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Device Pairing Modal */}
      {pairModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setPairModalOpen(false)} />
          <div className="relative bg-white dark:bg-[#121E1C] rounded-2xl max-w-md w-full border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xl p-6 z-10 text-center">
            {pairingStep === 'scan' && (
              <div className="py-6">
                <div className="w-14 h-14 rounded-full bg-[#0F5C5A]/10 dark:bg-[#28B8C7]/20 text-[#0F5C5A] dark:text-[#28B8C7] mx-auto flex items-center justify-center mb-4 animate-spin">
                  <Wind className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                  Scanning for Bio Respira Devices
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Ensure the new purifier unit is plugged in and within range.
                </p>
              </div>
            )}

            {pairingStep === 'found' && (
              <div className="py-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                  Bio Respira X1 Pro Found!
                </h3>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  Hardware MAC: E4:95:6E:28:B8:C7 · Ready to assign room
                </p>
                <button
                  onClick={() => {
                    setPairModalOpen(false);
                    showToast('Device registered to ecosystem. 4 rooms currently active.');
                  }}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors cursor-pointer"
                >
                  Complete Setup & Assign
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
