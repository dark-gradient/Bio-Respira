import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AirAlert, RoomId } from '../types';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Check, 
  CheckCheck, 
  Trash2, 
  Filter, 
  Zap, 
  Layers 
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { 
    alerts, 
    resolveAlert, 
    resolveAllAlerts, 
    clearAlert, 
    rooms, 
    setMode, 
    setSelectedFilterModal 
  } = useApp();

  const [severityFilter, setSeverityFilter] = useState<'all' | 'warning' | 'critical' | 'info'>('all');
  const [roomFilter, setRoomFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (roomFilter !== 'all' && alert.roomId !== roomFilter) return false;
    return true;
  });

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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            System Event Log
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
            Atmospheric Diagnostics & Alerts
          </h2>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
            Real-time optical particulate spikes, filter health degradation, and automatic compensations
          </p>
        </div>

        <button
          onClick={resolveAllAlerts}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#121E1C] border border-neutral-200 dark:border-[#1F3330] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#182826] transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-emerald-500" />
          <span>Resolve All Events</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-[#121E1C] rounded-2xl border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xs">
        {/* Severity Tabs */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-neutral-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Severity:
          </span>
          {(['all', 'critical', 'warning', 'info'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer ${
                severityFilter === sev
                  ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                  : 'bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Room Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Room:</span>
          <select
            value={roomFilter}
            onChange={e => setRoomFilter(e.target.value)}
            className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3]"
          >
            <option value="all">All Rooms</option>
            {rooms.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white dark:bg-[#121E1C] rounded-2xl p-12 text-center border border-[#DCE7E5] dark:border-[#1F3330]">
            <Check className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-80" />
            <h4 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
              No Alerts Match Criteria
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Your Bio Respira network reports nominal particulate levels and healthy filter lifecycles.
            </p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isWarn = alert.severity === 'warning';
            const isCrit = alert.severity === 'critical';

            return (
              <div
                key={alert.id}
                className={`bg-white dark:bg-[#121E1C] rounded-2xl p-5 border transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  alert.resolved
                    ? 'opacity-65 border-neutral-200/50 dark:border-[#1F3330]/40 bg-neutral-50/40 dark:bg-[#121E1C]/40'
                    : isCrit
                      ? 'border-red-300 dark:border-red-900/60'
                      : isWarn
                        ? 'border-amber-300 dark:border-amber-900/60'
                        : 'border-[#DCE7E5] dark:border-[#1F3330]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isCrit
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                      : isWarn
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                  }`}>
                    {isCrit ? <AlertCircle className="w-5 h-5" /> : isWarn ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#172321] dark:text-[#EDF4F3]">
                        {alert.title}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-[#182826] text-neutral-600 dark:text-neutral-400">
                        {alert.roomName}
                      </span>
                      {alert.resolved && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-[#96A8A5] mt-1 leading-relaxed max-w-2xl">
                      {alert.message}
                    </p>
                    <span className="text-[11px] text-neutral-400 block mt-1">
                      Reported {alert.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {!alert.resolved && alert.actionLabel && (
                    <button
                      onClick={() => handleAction(alert)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {alert.actionType === 'turbo' && <Zap className="w-3.5 h-3.5" />}
                      {alert.actionType === 'filter' && <Layers className="w-3.5 h-3.5" />}
                      <span>{alert.actionLabel}</span>
                    </button>
                  )}

                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}

                  <button
                    onClick={() => clearAlert(alert.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
