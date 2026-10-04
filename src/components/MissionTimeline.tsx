import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { Calendar, ChevronRight, Rocket, Compass, Radio } from 'lucide-react';

interface MissionTimelineProps {
  onSelectMission: (mission: Mission) => void;
  selectedWorld?: Destination;
}

export const MissionTimeline: React.FC<MissionTimelineProps> = ({
  onSelectMission,
  selectedWorld,
}) => {
  // Sort missions chronologically by launch/landing year
  const timelineMissions = [...missionsData].sort((a, b) => {
    const yearA = parseInt(a.landingDate.match(/\d{4}/)?.[0] || '1970', 10);
    const yearB = parseInt(b.landingDate.match(/\d{4}/)?.[0] || '1970', 10);
    return yearA - yearB;
  });

  const [activeId, setActiveId] = useState<string>(timelineMissions[0].id);

  const activeMission = timelineMissions.find((m) => m.id === activeId) || timelineMissions[0];

  return (
    <section id="timeline" className="relative py-20 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              02 // ИНТЕРАКТИВНАЯ ХРОНОЛОГИЯ
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Лента времени внеземных посадок
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              От первого шага Армстронга в 1969 году до заката крыльев вертолета Ingenuity в 2024 году. Кликайте на вехи времени.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>55+ ЛЕТ ИСТОРИИ</span>
          </div>
        </div>

        {/* Horizontal Timeline Track */}
        <div className="relative mb-12 pb-4 overflow-x-auto scrollbar-thin">
          {/* Central Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-800" />

          <div className="flex items-center justify-between min-w-[760px] px-4 gap-4">
            {timelineMissions.map((mission, index) => {
              const yearMatch = mission.landingDate.match(/\d{4}/);
              const year = yearMatch ? yearMatch[0] : '1969';
              const isSelected = mission.id === activeMission.id;
              const isWorldMatch = !selectedWorld || mission.destination === selectedWorld;

              return (
                <button
                  key={mission.id}
                  onClick={() => {
                    setActiveId(mission.id);
                    spaceAudio.playTelemetryBeep(1200 + index * 60, 0.04);
                  }}
                  className={`group relative flex flex-col items-center focus:outline-none transition-all ${
                    isWorldMatch ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  {/* Year Tag */}
                  <span
                    className={`text-xs font-mono-tabular font-bold tracking-wider mb-2 transition-colors ${
                      isSelected ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {year}
                  </span>

                  {/* Node Circle */}
                  <div
                    className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-red-600 border-white shadow-[0_0_16px_rgba(225,29,72,0.6)] scale-110'
                        : 'bg-slate-900 border-slate-700 group-hover:border-slate-400 group-hover:scale-105'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-white">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Vehicle Label Under Node */}
                  <div className="mt-3 text-center w-24">
                    <div
                      className={`text-[11px] font-medium truncate transition-colors ${
                        isSelected ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {mission.name}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tight">
                      {mission.destination === 'Moon' ? 'Луна' : 'Марс'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Spotlight Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-slate-800 bg-slate-950/90 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                <span className="text-red-400 font-bold tracking-wider">
                  {activeMission.activeSpan}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeMission.destination === 'Moon' ? 'Поверхность Луны' : 'Поверхность Марса'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{activeMission.type}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                {activeMission.name} ({activeMission.englishName})
              </h3>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {activeMission.shortDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-slate-500" />
                  <span>{activeMission.locationName}</span>
                </div>
                {activeMission.distanceTraveled && (
                  <div className="flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-slate-500" />
                    <span>Пробег: {activeMission.distanceTraveled}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch">
              <button
                onClick={() => {
                  spaceAudio.playTelemetryBeep(1400, 0.05);
                  onSelectMission(activeMission);
                }}
                className="w-full px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-md transition-all flex items-center justify-center gap-2"
              >
                <span>Изучить досье миссии</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded text-center">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Статус аппарата</div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-0.5 truncate">
                  {activeMission.status}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
