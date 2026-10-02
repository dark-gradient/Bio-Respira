import React from 'react';
import { AirAlert } from '../types';
import { useApp } from '../context/AppContext';
import { Bell, AlertTriangle, Info, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface AlertPanelProps {
  alerts: AirAlert[];
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  const { resolveAlert, setActiveTab, setMode, setSelectedFilterModal, activeRoomId, rooms } = useApp();

  const unresolved = alerts.filter(a => !a.resolved).slice(0, 3);

  const handleAction = (alert: AirAlert) => {
    if (alert.actionType === 'turbo') {
      setMode('turbo', alert.roomId);
      resolveAlert(alert.id);
    } else if (alert.actionType === 'filter') {
      const room = rooms.find(r => r.id === alert.roomId) || rooms[0];
      const degrading = room.filters.find(f => f.healthPercentage <= 65) || room.filters[2];
      setSelectedFilterModal({ filter: degrading, roomId: alert.roomId });
    } else {
      resolveAlert(alert.id);
    }
  };

  return (
    <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-5 md:p-6 border border-[#DCE7E5] dark:border-[#1F3330] shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-[#1F3330]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-[#96A8A5] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase block leading-none">
              Diagnostic Feed
            </span>
            <h3 className="text-base font-semibold text-[#172321] dark:text-[#EDF4F3]">
              Atmosphere & Device Events
            </h3>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('alerts')}
          className="text-xs font-semibold text-[#0F5C5A] hover:text-[#0a4342] dark:text-[#28B8C7] dark:hover:text-[#3CD0DF] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>All Alerts ({alerts.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Alert list */}
      <div className="my-3 divide-y divide-neutral-100 dark:divide-[#1F3330]/60">
        {unresolved.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-7 h-7 text-[#2E9D68] mb-2 opacity-80" />
            <p className="text-sm font-semibold text-[#172321] dark:text-[#EDF4F3]">All Systems Nominal</p>
            <p className="text-xs text-neutral-400 mt-0.5">No active atmosphere or filter alerts pending.</p>
          </div>
        ) : (
          unresolved.map(alert => {
            const isWarn = alert.severity === 'warning';
            const isCrit = alert.severity === 'critical';

            return (
              <div key={alert.id} className="py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    isCrit 
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400' 
                      : isWarn 
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                  }`}>
                    {isCrit ? <AlertCircle className="w-3.5 h-3.5" /> : isWarn ? <AlertTriangle className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#172321] dark:text-[#EDF4F3]">
                        {alert.title}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {alert.roomName} · {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-0.5 line-clamp-1">
                      {alert.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {alert.actionLabel && (
                    <button
                      onClick={() => handleAction(alert)}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium bg-[#0F5C5A]/10 text-[#0F5C5A] hover:bg-[#0F5C5A]/20 dark:bg-[#28B8C7]/20 dark:text-[#28B8C7] dark:hover:bg-[#28B8C7]/30 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {alert.actionLabel}
                    </button>
                  )}
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    aria-label="Dismiss alert"
                    className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-1"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 text-right">
        <span className="text-[11px] text-neutral-400">
          Auto-triaged by Bio Respira Air Matrix Engine
        </span>
      </div>
    </div>
  );
};
