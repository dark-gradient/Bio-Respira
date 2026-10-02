import React from 'react';
import { FilterInfo, RoomId } from '../types';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Layers, AlertCircle } from 'lucide-react';

interface FilterHealthCardProps {
  filters: FilterInfo[];
  roomId: RoomId;
}

export const FilterHealthCard: React.FC<FilterHealthCardProps> = ({ filters, roomId }) => {
  const { setSelectedFilterModal, setActiveTab } = useApp();

  return (
    <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-5 md:p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-[#1F3330]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-[#28B8C7]/20 dark:text-[#28B8C7] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase block leading-none">
              Consumable Health
            </span>
            <h3 className="text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
              Filtration Core Integrity
            </h3>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('filters')}
          className="text-xs font-semibold text-[#0F5C5A] hover:text-[#0a4342] dark:text-[#28B8C7] dark:hover:text-[#3CD0DF] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>All Filters</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter bars list */}
      <div className="space-y-4 my-4">
        {filters.map(filter => {
          let progressColor = 'bg-[#2E9D68]';
          let textColor = 'text-[#2E9D68]';
          let statusText = 'Healthy';

          if (filter.healthPercentage <= 40) {
            progressColor = 'bg-[#D84B4B]';
            textColor = 'text-[#D84B4B]';
            statusText = 'Replace Soon';
          } else if (filter.healthPercentage <= 65) {
            progressColor = 'bg-[#D6A441]';
            textColor = 'text-[#D6A441]';
            statusText = 'Attention';
          }

          return (
            <div 
              key={filter.id}
              onClick={() => setSelectedFilterModal({ filter, roomId })}
              className="group p-2.5 -mx-1 rounded-xl hover:bg-neutral-50 dark:hover:bg-[#182826] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#172321] dark:text-[#EDF4F3] group-hover:text-[#0F5C5A] dark:group-hover:text-[#28B8C7] transition-colors">
                    {filter.name}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    filter.healthPercentage > 65 
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                  }`}>
                    {statusText}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-neutral-800 dark:text-[#EDF4F3] tabular-numbers font-sans">
                    {filter.healthPercentage}%
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-[#96A8A5]">
                    ~{filter.daysRemaining} days left
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressColor} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${filter.healthPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action */}
      <div className="pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-[#96A8A5]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E9D68]" />
          <span>Multi-stage HEPA H13 + Carbon defense active</span>
        </div>
        <button
          onClick={() => setActiveTab('filters')}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          Maintenance Log
        </button>
      </div>
    </div>
  );
};
