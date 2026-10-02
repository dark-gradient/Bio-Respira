import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCheck, AlertTriangle, AlertCircle, Info, Bell, Check } from 'lucide-react';
import { AirAlert } from '../types';

export const NotificationDrawer: React.FC = () => {
  const { 
    notificationDrawerOpen, 
    setNotificationDrawerOpen, 
    alerts, 
    resolveAlert, 
    resolveAllAlerts, 
    markAlertRead,
    setMode,
    setSelectedFilterModal,
    rooms
  } = useApp();

  const [severityFilter, setSeverityFilter] = useState<'all' | 'warning' | 'critical' | 'info'>('all');

  if (!notificationDrawerOpen) return null;

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter === 'all') return true;
    return a.severity === severityFilter;
  });

  const handleAction = (alert: AirAlert) => {
    if (alert.actionType === 'turbo') {
      setMode('turbo', alert.roomId);
      resolveAlert(alert.id);
    } else if (alert.actionType === 'filter') {
      const room = rooms.find(r => r.id === alert.roomId) || rooms[0];
      const degrading = room.filters.find(f => f.healthPercentage <= 65) || room.filters[2];
      setSelectedFilterModal({ filter: degrading, roomId: alert.roomId });
      setNotificationDrawerOpen(false);
    } else {
      resolveAlert(alert.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setNotificationDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#121E1C] border-l border-[#DCE7E5] dark:border-[#1F3330] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-100 dark:border-[#1F3330] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-[#28B8C7]/20 dark:text-[#28B8C7] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                  Atmosphere Notifications
                </h3>
                <span className="text-xs text-neutral-400">
                  {alerts.filter(a => !a.resolved).length} active events
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resolveAllAlerts}
                title="Mark all as resolved"
                className="p-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Resolve All</span>
              </button>
              <button
                onClick={() => setNotificationDrawerOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Severity Filters */}
          <div className="px-5 py-3 border-b border-neutral-100 dark:border-[#1F3330] flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'warning', 'critical', 'info'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                    : 'bg-neutral-100 dark:bg-[#182826] text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Alert Cards List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                <Check className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-80" />
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  No notifications match filter
                </p>
                <p className="text-xs mt-1">Indoor air metrics remain well within target safety ranges.</p>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const isWarn = alert.severity === 'warning';
                const isCrit = alert.severity === 'critical';

                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border transition-all ${
                      alert.resolved 
                        ? 'opacity-60 bg-neutral-50 dark:bg-[#182826]/40 border-neutral-200/50 dark:border-[#1F3330]/50'
                        : 'bg-white dark:bg-[#182826] border-neutral-200 dark:border-[#1F3330] shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isCrit
                            ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                            : isWarn
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                        }`}>
                          {isCrit ? <AlertCircle className="w-4 h-4" /> : isWarn ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#172321] dark:text-[#EDF4F3]">
                              {alert.title}
                            </h4>
                            {alert.resolved && (
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.2 rounded">
                                Resolved
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 block mt-0.5">
                            {alert.roomName} · {alert.timestamp}
                          </span>
                          <p className="text-xs text-neutral-600 dark:text-[#96A8A5] mt-1.5 leading-relaxed">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    {!alert.resolved && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-end gap-2">
                        {alert.actionLabel && (
                          <button
                            onClick={() => handleAction(alert)}
                            className="text-xs px-3 py-1 font-semibold rounded-lg bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors cursor-pointer"
                          >
                            {alert.actionLabel}
                          </button>
                        )}
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="text-xs px-2.5 py-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-[#121E1C] cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
