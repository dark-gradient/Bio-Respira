import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoomId, FilterInfo } from '../types';
import { 
  Layers, 
  RefreshCw, 
  ShoppingCart, 
  ShieldCheck, 
  Info, 
  History, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const FiltersPage: React.FC = () => {
  const { rooms, activeRoomId, setActiveRoomId, setSelectedFilterModal, resetFilter, showToast } = useApp();
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<RoomId>(activeRoomId);

  const currentRoom = rooms.find(r => r.id === selectedRoomFilter) || rooms[0];

  const maintenanceHistory = [
    {
      date: '2026-03-15',
      action: 'Initial Factory Calibration & Filter Stack Insertion',
      technician: 'Bio Respira Certified QA',
      details: 'All 4 stages initialized with 100% integrity baseline.'
    },
    {
      date: '2026-06-20',
      action: 'Washable Pre-Filter Screen Vacuum Cleaning',
      technician: 'User Scheduled Care',
      details: 'Large pet lint and carpet fibers cleared; airflow increased by +12%.'
    },
    {
      date: '2026-09-02',
      action: 'VOC Chamber Optical Adsorption Check',
      technician: 'Diagnostic Matrix',
      details: 'Carbon granule honeycomb capacity measured nominal.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Consumable Health & Integrity
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
            Filtration Core Management
          </h2>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
            Real-time life tracking for multi-stage particulate, odor, and microbial defense
          </p>
        </div>

        {/* Room Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#121E1C] rounded-xl border border-neutral-200 dark:border-[#1F3330] shadow-2xs self-start sm:self-auto overflow-x-auto">
          {rooms.map(room => (
            <button
              key={room.id}
              onClick={() => setSelectedRoomFilter(room.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedRoomFilter === room.id
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Filter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentRoom.filters.map(filter => {
          let progressColor = 'bg-[#2E9D68]';
          let badgeColor = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400';
          let statusText = 'Optimal Condition';

          if (filter.healthPercentage <= 40) {
            progressColor = 'bg-[#D84B4B]';
            badgeColor = 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400';
            statusText = 'Replacement Recommended';
          } else if (filter.healthPercentage <= 65) {
            progressColor = 'bg-[#D6A441]';
            badgeColor = 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400';
            statusText = 'Moderate Wear';
          }

          return (
            <div
              key={filter.id}
              className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Stage {filter.type.toUpperCase()}
                    </span>
                    <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                      {filter.name}
                    </h3>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                    {statusText}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="my-4">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs text-neutral-500">Remaining Life</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
                        {filter.healthPercentage}%
                      </span>
                      <span className="text-xs text-neutral-400">
                        (~{filter.daysRemaining} days)
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${progressColor} rounded-full transition-all duration-700`}
                      style={{ width: `${filter.healthPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Description & Targets */}
                <p className="text-xs text-neutral-600 dark:text-[#96A8A5] leading-relaxed mb-4">
                  {filter.description}
                </p>

                <div className="p-3 bg-neutral-50 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Core Medium:</span>
                    <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">{filter.filterMaterial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Lifecycle:</span>
                    <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">{filter.totalLifeDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Installation Date:</span>
                    <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">{filter.installDate}</span>
                  </div>
                </div>

                {/* Captures */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {filter.captures.map((cap, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400">
                      ✓ {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => resetFilter(selectedRoomFilter, filter.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Counter</span>
                </button>

                <button
                  onClick={() => setSelectedFilterModal({ filter, roomId: selectedRoomFilter })}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Inspect Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Maintenance History Log */}
      <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100 dark:border-[#1F3330]">
          <History className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />
          <h3 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3]">
            Verified Maintenance Log
          </h3>
        </div>

        <div className="space-y-4">
          {maintenanceHistory.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs border-b border-neutral-100 dark:border-[#1F3330]/40 pb-3 last:border-0 last:pb-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-800 dark:text-[#EDF4F3]">
                    {item.action}
                  </span>
                  <span className="text-[10px] text-neutral-400 bg-neutral-100 dark:bg-[#182826] px-1.5 py-0.2 rounded">
                    {item.technician}
                  </span>
                </div>
                <p className="text-neutral-500 dark:text-[#96A8A5] mt-0.5">
                  {item.details}
                </p>
              </div>
              <span className="text-neutral-400 shrink-0 tabular-numbers font-sans">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
