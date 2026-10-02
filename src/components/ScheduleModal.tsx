import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartSchedule, PurifierMode, RoomId } from '../types';
import { X, Clock, Calendar, Check } from 'lucide-react';

interface ScheduleModalProps {
  schedule?: SmartSchedule | null;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ schedule, onClose }) => {
  const { addSchedule, updateSchedule, rooms } = useApp();

  const [title, setTitle] = useState(schedule?.title || '');
  const [description, setDescription] = useState(schedule?.description || '');
  const [mode, setMode] = useState<PurifierMode>(schedule?.mode || 'auto');
  const [fanLevel, setFanLevel] = useState<number>(schedule?.fanLevel || 2);
  const [startTime, setStartTime] = useState(schedule?.startTime || '22:00');
  const [endTime, setEndTime] = useState(schedule?.endTime || '06:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    schedule?.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  );
  const [selectedRooms, setSelectedRooms] = useState<RoomId[]>(
    schedule?.roomIds || ['living-room', 'master-bedroom']
  );

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleRoom = (roomId: RoomId) => {
    setSelectedRooms(prev =>
      prev.includes(roomId) ? prev.filter(r => r !== roomId) : [...prev, roomId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (schedule) {
      updateSchedule({
        ...schedule,
        title,
        description: description || `Automated ${mode.toUpperCase()} routine`,
        mode,
        fanLevel,
        startTime,
        endTime,
        days: selectedDays.length > 0 ? selectedDays : ['Every day'],
        roomIds: selectedRooms.length > 0 ? selectedRooms : ['living-room']
      });
    } else {
      addSchedule({
        title,
        description: description || `Automated ${mode.toUpperCase()} routine`,
        mode,
        fanLevel,
        startTime,
        endTime,
        days: selectedDays.length > 0 ? selectedDays : ['Every day'],
        enabled: true,
        roomIds: selectedRooms.length > 0 ? selectedRooms : ['living-room']
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#121E1C] rounded-2xl max-w-lg w-full border border-[#DCE7E5] dark:border-[#1F3330] shadow-2xl p-6 z-10">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-[#1F3330]">
          <h3 className="text-base font-bold text-[#172321] dark:text-[#EDF4F3]">
            {schedule ? 'Edit Smart Schedule' : 'New Smart Schedule'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Schedule Title */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1">
              Routine Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Evening Allergen Cleanse"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3] focus:outline-none focus:border-[#0F5C5A] dark:focus:border-[#28B8C7]"
            />
          </div>

          {/* Mode & Fan Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1">
                Target Mode
              </label>
              <select
                value={mode}
                onChange={e => setMode(e.target.value as PurifierMode)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3]"
              >
                <option value="auto">Auto (Adaptive)</option>
                <option value="turbo">Turbo (Maximum)</option>
                <option value="sleep">Sleep (Silent)</option>
                <option value="eco">Eco (Low Energy)</option>
                <option value="allergen">Allergen Shield</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1">
                Fan Speed (Level {fanLevel})
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={fanLevel}
                onChange={e => setFanLevel(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>

          {/* Time range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3]"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#182826] border border-neutral-200 dark:border-[#1F3330] text-neutral-800 dark:text-[#EDF4F3]"
              />
            </div>
          </div>

          {/* Days of week selector */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1.5">
              Active Days
            </label>
            <div className="flex gap-1.5">
              {daysOfWeek.map(day => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F5C5A] text-white dark:bg-[#28B8C7] dark:text-[#0B1312]'
                        : 'bg-neutral-100 dark:bg-[#182826] text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Rooms */}
          <div>
            <label className="font-semibold text-neutral-700 dark:text-[#EDF4F3] block mb-1.5">
              Apply to Rooms
            </label>
            <div className="grid grid-cols-2 gap-2">
              {rooms.map(r => {
                const isChecked = selectedRooms.includes(r.id);
                return (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => toggleRoom(r.id)}
                    className={`p-2 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-[#0F5C5A]/10 border-[#0F5C5A]/40 text-[#0F5C5A] dark:text-[#28B8C7]'
                        : 'bg-neutral-50 dark:bg-[#182826] border-neutral-200/60 dark:border-[#1F3330] text-neutral-500'
                    }`}
                  >
                    <span>{r.name}</span>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-neutral-100 dark:border-[#1F3330] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-[#182826] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-semibold bg-[#0F5C5A] text-white hover:bg-[#0a4342] dark:bg-[#28B8C7] dark:text-[#0B1312] transition-colors cursor-pointer"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
