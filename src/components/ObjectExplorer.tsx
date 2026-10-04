import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { MissionCard } from './MissionCard';
import { Search, SlidersHorizontal, Rocket, RefreshCw } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface ObjectExplorerProps {
  onOpenDetail: (mission: Mission) => void;
  activeWorld: Destination;
  onSelectWorld: (world: Destination) => void;
}

export const ObjectExplorer: React.FC<ObjectExplorerProps> = ({
  onOpenDetail,
  activeWorld,
  onSelectWorld,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMissions = useMemo(() => {
    return missionsData.filter((mission) => {
      // World check
      const matchesWorld = activeWorld ? mission.destination === activeWorld : true;

      // Type check
      const matchesType =
        selectedType === 'all'
          ? true
          : selectedType === 'rover'
          ? mission.type === 'Ровер' || mission.type === 'Лунный автомобиль'
          : selectedType === 'lander'
          ? mission.type === 'Посадочный модуль' || mission.type === 'Сейсмическая станция'
          : selectedType === 'helicopter'
          ? mission.type === 'Атмосферный вертолет'
          : true;

      // Query check
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        mission.name.toLowerCase().includes(q) ||
        mission.englishName.toLowerCase().includes(q) ||
        mission.locationName.toLowerCase().includes(q) ||
        mission.shortDescription.toLowerCase().includes(q);

      return matchesWorld && matchesType && matchesQuery;
    });
  }, [activeWorld, selectedType, searchQuery]);

  return (
    <section id="explorer" className="relative py-20 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              03 // РЕГИСТР АППАРАТОВ
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Каталог оставленных машин
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Нажмите на любую карточку, чтобы открыть полное досье с историей прибытия, открытиями, последним контактом и точными координатами.
            </p>
          </div>

          {/* Quick World Toggle Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectWorld('Mars');
                spaceAudio.playTelemetryBeep(1200, 0.03);
              }}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-md border transition-all ${
                activeWorld === 'Mars'
                  ? 'bg-red-600/90 text-white border-red-500 font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Марсианский сектор
            </button>
            <button
              onClick={() => {
                onSelectWorld('Moon');
                spaceAudio.playTelemetryBeep(1000, 0.03);
              }}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-md border transition-all ${
                activeWorld === 'Moon'
                  ? 'bg-slate-200 text-slate-950 border-white font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Лунный сектор
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Vehicle Type Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
            <button
              onClick={() => {
                setSelectedType('all');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Все типы
            </button>
            <button
              onClick={() => {
                setSelectedType('rover');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                selectedType === 'rover'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Роверы & Вездеходы
            </button>
            <button
              onClick={() => {
                setSelectedType('lander');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                selectedType === 'lander'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Посадочные платформы
            </button>
            <button
              onClick={() => {
                setSelectedType('helicopter');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                selectedType === 'helicopter'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Авиация (Ingenuity)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по имени, кратеру..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Counter readout */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            ОТОБРАНО ОБЪЕКТОВ:{' '}
            <span className="text-white font-mono-tabular font-bold">
              {filteredMissions.length}
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Кликните на карточку для детализации
          </div>
        </div>

        {/* Card Grid */}
        {filteredMissions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
            <Rocket className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <div className="text-base font-medium text-slate-300">
              По данному запросу аппаратов не найдено
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Попробуйте сбросить поисковый запрос или переключить сектор планеты.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
