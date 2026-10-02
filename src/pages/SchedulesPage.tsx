import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartSchedule } from '../types';
import { ScheduleModal } from '../components/ScheduleModal';
import { 
  Plus, 
  CalendarDays, 
  Clock, 
  Trash2, 
  Edit3, 
  Power, 
  Sparkles, 
  Moon, 
  Zap, 
  Leaf, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

export const SchedulesPage: React.FC = () => {
  const { schedules, toggleSchedule, deleteSchedule, rooms } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<SmartSchedule | null>(null);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'turbo': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'sleep': return <Moon className="w-4 h-4 text-indigo-400" />;
      case 'eco': return <Leaf className="w-4 h-4 text-emerald-500" />;
      case 'allergen': return <ShieldAlert className="w-4 h-4 text-orange-500" />;
      default: return <Sparkles className="w-4 h-4 text-[#0F5C5A] dark:text-[#28B8C7]" />;
    }
  };

  const getRoomName = (id: string) => {
    return rooms.find(r => r.id === id)?.name || id;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-[#1F3330]">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-[#96A8A5] uppercase">
            Automation Engine
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#172321] dark:text-[#EDF4F3]">
            Intelligent Air Quality Schedules
          </h2>
          <p className="text-xs text-neutral-500 dark:text-[#96A8A5] mt-1">
            Automate quiet nighttime modes, scheduled deep cleans, and energy-conserving work hours
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSchedule(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Schedule</span>
        </button>
      </div>

      {/* Schedules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map(schedule => {
          return (
            <div
              key={schedule.id}
              className={`bg-white dark:bg-[#121E1C] rounded-2xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
                schedule.enabled
                  ? 'border-[#DCE7E5] dark:border-[#1F3330]'
                  : 'border-neutral-200/50 dark:border-[#1F3330]/40 opacity-70 bg-neutral-50/50 dark:bg-[#121E1C]/50'
              }`}
            >
              <div>
                {/* Header & Toggle */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-[#182826] flex items-center justify-center">
                      {getModeIcon(schedule.mode)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
                        {schedule.title}
                      </h3>
                      <span className="text-xs text-neutral-400 capitalize">
                        {schedule.mode} Mode · Fan Level {schedule.fanLevel}
                      </span>
                    </div>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    onClick={() => toggleSchedule(schedule.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      schedule.enabled ? 'bg-[#0F5C5A] dark:bg-[#28B8C7]' : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        schedule.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-neutral-600 dark:text-[#96A8A5] leading-relaxed mb-4">
                  {schedule.description}
                </p>

                {/* Timing & Days */}
                <div className="p-3 bg-neutral-50 dark:bg-[#182826] rounded-xl border border-neutral-200/60 dark:border-[#1F3330] space-y-2 text-xs mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Active Window
                    </span>
                    <span className="font-bold text-neutral-800 dark:text-[#EDF4F3] tabular-numbers font-sans">
                      {schedule.startTime} — {schedule.endTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Repeat Days
                    </span>
                    <div className="flex items-center gap-1">
                      {schedule.days.map((day, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Room targets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-neutral-400 mr-1">Rooms:</span>
                  {schedule.roomIds.map(rid => (
                    <span
                      key={rid}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0F5C5A]/10 text-[#0F5C5A] dark:bg-[#28B8C7]/20 dark:text-[#28B8C7]"
                    >
                      {getRoomName(rid)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-[#1F3330]/60 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  {schedule.enabled ? '● Active in memory' : '○ Suspended'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingSchedule(schedule);
                      setModalOpen(true);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors cursor-pointer"
                    title="Edit Routine"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    title="Delete Routine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <ScheduleModal
          schedule={editingSchedule}
          onClose={() => {
            setModalOpen(false);
            setEditingSchedule(null);
          }}
        />
      )}
    </div>
  );
};
