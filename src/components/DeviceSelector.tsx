import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RoomId } from '../types';
import { ChevronDown, Check, Home, BedDouble, Briefcase, Baby } from 'lucide-react';
import { AQI_COLORS } from '../utils/airQuality';

export const DeviceSelector: React.FC = () => {
  const { rooms, activeRoomId, setActiveRoomId } = useApp();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoomIcon = (id: RoomId) => {
    switch (id) {
      case 'living-room': return <Home className="w-3.5 h-3.5" />;
      case 'master-bedroom': return <BedDouble className="w-3.5 h-3.5" />;
      case 'home-office': return <Briefcase className="w-3.5 h-3.5" />;
      case 'nursery': return <Baby className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#121E1C] border border-[#DCE7E5] dark:border-[#1F3330] hover:border-neutral-300 dark:hover:border-[#2A4440] shadow-2xs transition-colors cursor-pointer"
        aria-label="Select Room and Device"
        aria-expanded={open}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-[#172321] dark:text-[#EDF4F3]">
          {activeRoom.name}
        </span>
        <span className="text-[11px] text-neutral-400 dark:text-[#96A8A5] hidden sm:inline">
          · {activeRoom.deviceModel}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-1.5 w-64 bg-white dark:bg-[#121E1C] border border-[#DCE7E5] dark:border-[#1F3330] rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-[#1F3330]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Active Environment
            </span>
          </div>

          <div className="py-1">
            {rooms.map(room => {
              const isSelected = room.id === activeRoomId;
              const aqiConfig = AQI_COLORS[room.environmental.status];

              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-neutral-50 dark:bg-[#182826] font-semibold text-[#0F5C5A] dark:text-[#28B8C7]' 
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#182826]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-neutral-400 dark:text-neutral-500">
                      {getRoomIcon(room.id)}
                    </span>
                    <div>
                      <span className="block leading-tight">{room.name}</span>
                      <span className="text-[10px] text-neutral-400 font-normal">
                        {room.deviceState.poweredOn ? `${room.deviceState.mode.toUpperCase()} · Fan ${room.deviceState.fanLevel}` : 'Powered Off'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${aqiConfig.hex}15`, 
                        color: aqiConfig.hex 
                      }}
                    >
                      {room.environmental.aqi} AQI
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#0F5C5A] dark:text-[#28B8C7]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
