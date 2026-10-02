import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, RefreshCw, ShoppingCart, Calendar, Check, Layers } from 'lucide-react';

export const FilterDetailModal: React.FC = () => {
  const { selectedFilterModal, setSelectedFilterModal, resetFilter, showToast, rooms } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);

  if (!selectedFilterModal) return null;

  const { filter, roomId } = selectedFilterModal;
  const room = rooms.find(r => r.id === roomId) || rooms[0];

  const handleOrder = () => {
    setIsOrdered(true);
    showToast(`Replacement cartridge for ${filter.name} scheduled for delivery`);
    setTimeout(() => setIsOrdered(false), 4000);
  };

  const handleReset = () => {
    resetFilter(roomId, filter.id);
    setSelectedFilterModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedFilterModal(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-[#121E1C] rounded-2xl max-w-lg w-full border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xl p-6 z-10">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-[#28B8C7]/20 dark:text-[#28B8C7] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 dark:text-[#96A8A5] uppercase tracking-wider block">
                {room.name} · {room.deviceModel}
              </span>
              <h3 className="text-base md:text-lg font-bold text-[#172321] dark:text-[#EDF4F3]">
                {filter.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedFilterModal(null)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Life & Health Status Gauge */}
        <div className="my-5 p-4 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200/60 dark:border-[#1F3330]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-neutral-600 dark:text-[#96A8A5]">
              Remaining Filtration Health
            </span>
            <span className="text-sm font-extrabold text-[#172321] dark:text-[#EDF4F3] tabular-numbers font-sans">
              {filter.healthPercentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                filter.healthPercentage > 65
                  ? 'bg-[#2E9D68]'
                  : filter.healthPercentage > 35
                    ? 'bg-[#D6A441]'
                    : 'bg-[#D84B4B]'
              }`}
              style={{ width: `${filter.healthPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-neutral-400 block text-[11px]">Estimated Remaining</span>
              <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">
                ~{filter.daysRemaining} days of normal duty
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[11px]">Install / Reset Date</span>
              <span className="font-semibold text-neutral-800 dark:text-[#EDF4F3]">
                {filter.installDate}
              </span>
            </div>
          </div>
        </div>

        {/* Specifications & Capture Matrix */}
        <div className="space-y-3 mb-6 text-xs">
          <div>
            <h4 className="font-bold text-neutral-700 dark:text-[#EDF4F3] mb-1">
              Filter Engineering
            </h4>
            <p className="text-neutral-500 dark:text-[#96A8A5] leading-relaxed">
              {filter.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-700 dark:text-[#EDF4F3] mb-1">
              Core Material
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 font-medium">
              {filter.filterMaterial}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-700 dark:text-[#EDF4F3] mb-1.5">
              Target Pollutants Intercepted
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {filter.captures.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-[#182826] text-neutral-700 dark:text-neutral-300 font-medium"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-neutral-100 dark:border-[#1F3330] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Lifecycle Counter</span>
          </button>

          <button
            onClick={handleOrder}
            disabled={isOrdered}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75"
          >
            {isOrdered ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Replacement Requested</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Order Replacement Cartridge</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
