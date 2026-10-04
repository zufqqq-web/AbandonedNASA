import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { MissionCard } from './MissionCard';
import { Search, Rocket, RefreshCw } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';

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
  const { t, localize } = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMissions = useMemo(() => {
    return missionsData.filter((mission) => {
      // World check
      const matchesWorld = activeWorld ? mission.destination === activeWorld : true;

      // Type check by schematicType
      const matchesType =
        selectedType === 'all'
          ? true
          : selectedType === 'rover'
          ? mission.schematicType === 'rover' || mission.schematicType === 'rover-buggy'
          : selectedType === 'lander'
          ? mission.schematicType === 'lander' || mission.schematicType === 'station'
          : selectedType === 'helicopter'
          ? mission.schematicType === 'helicopter'
          : true;

      // Query check
      const q = searchQuery.toLowerCase().trim();
      const name = localize(mission.name).toLowerCase();
      const engName = mission.englishName.toLowerCase();
      const loc = localize(mission.locationName).toLowerCase();
      const desc = localize(mission.shortDescription).toLowerCase();

      const matchesQuery =
        !q ||
        name.includes(q) ||
        engName.includes(q) ||
        loc.includes(q) ||
        desc.includes(q);

      return matchesWorld && matchesType && matchesQuery;
    });
  }, [activeWorld, selectedType, searchQuery, localize]);

  return (
    <section id="explorer" className="relative py-20 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {t.explorer.sectionTag}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              {t.explorer.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              {t.explorer.subtitle}
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
              {t.worldSelector.marsTitle}
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
              {t.worldSelector.moonTitle}
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
              {t.explorer.filterAll}
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
              {t.explorer.filterRover}
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
              {t.explorer.filterLander}
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
              {t.explorer.filterHeli}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.explorer.searchPlaceholder}
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
            {t.explorer.showingCount}{' '}
            <span className="text-white font-mono-tabular font-bold">
              {filteredMissions.length}
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            {t.map.clickToView}
          </div>
        </div>

        {/* Card Grid */}
        {filteredMissions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
            <Rocket className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <div className="text-base font-medium text-slate-300">
              {t.explorer.noResultsTitle}
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {t.explorer.noResultsDesc}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.explorer.resetFilters}
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
